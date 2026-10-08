import { ChangeSet, EditorSelection, type ChangeSpec } from '@codemirror/state';
import { indentLess, indentMore } from '@codemirror/commands';
import { insertNewlineContinueMarkupCommand } from '@codemirror/lang-markdown';
import type { Command } from '@codemirror/view';
import type { Blockquote, List, ListItem, Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { parsePersonalMarkdown } from './personal-markdown';
import { parseTaskPrefix, taskState } from './task-states';

interface Item {
  node: ListItem;
  list: List;
  parent?: Item;
}

function listItems(tree: Root) {
  const items: Item[] = [];
  function collect(root: Root | ListItem | Blockquote, parent?: Item) {
    for (const node of root.children) {
      if (node.type === 'blockquote') collect(node);
      if (node.type !== 'list') continue;
      for (const child of node.children) {
        const item = { node: child, list: node, parent };
        items.push(item);
        collect(child, item);
      }
    }
  }
  collect(tree);
  return items;
}

// Reach the item text directly, even when it wraps. A repeat reaches the
// absolute line start so indentation, list markers, and quote syntax remain editable.
export function moveToListBoundary(
  side: 'start' | 'end',
  extend = false,
): Command {
  return (view) => {
    const { state } = view;
    const items = listItems(parsePersonalMarkdown(state.doc.toString()));
    const starts = state.selection.ranges.map((range) => {
      const line = state.doc.lineAt(range.head);
      const start = items.find(
        (item) => item.node.position!.start.line === line.number,
      )?.node.position!.start.offset;
      if (start === undefined) return;
      const source = state.sliceDoc(start, line.to);
      const prefix = /^(?:[-+*]|\d+[.)])(?:[ \t]+|$)/.exec(source);
      return (
        start + (parseTaskPrefix(source)?.length ?? prefix?.[0].length ?? 0)
      );
    });
    // Let the native command handle prose, code, continuation lines, and mixed selections.
    if (starts.some((start) => start === undefined)) return false;
    view.dispatch({
      selection: EditorSelection.create(
        state.selection.ranges.map((range, index) => {
          const line = state.doc.lineAt(range.head);
          const head =
            side === 'end'
              ? line.to
              : range.head === starts[index]
                ? line.from
                : starts[index]!;
          return extend
            ? EditorSelection.range(range.anchor, head)
            : EditorSelection.cursor(head, side === 'end' ? -1 : 1);
        }),
        state.selection.mainIndex,
      ),
      scrollIntoView: true,
      userEvent: 'select',
    });
    return true;
  };
}

// Move whole items, including their continuation paragraphs and child lists.
// A fixed two-space indent is insufficient beneath an ordered marker ("10. ").
function indentList(direction: 'in' | 'out'): Command {
  return (view) => {
    const { state } = view;
    const tree = parsePersonalMarkdown(state.doc.toString());
    const items = listItems(tree);
    const chosen = new Set<Item>();
    for (const range of state.selection.ranges) {
      const first = state.doc.lineAt(range.from).number;
      const last = state.doc.lineAt(
        range.empty ? range.to : range.to - 1,
      ).number;
      for (const item of items) {
        const number = item.node.position!.start.line;
        if (number >= first && number <= last) chosen.add(item);
      }
      if (
        range.empty &&
        ![...chosen].some((item) => item.node.position!.start.line === first)
      ) {
        const containing = items
          .filter((item) =>
            item.node.children.some(
              (child) =>
                child.type === 'paragraph' &&
                child.position!.start.offset! <= range.from &&
                child.position!.end.offset! >= range.to,
            ),
          )
          .at(-1);
        if (containing) chosen.add(containing);
      }
    }
    if (!chosen.size)
      return (direction === 'in' ? indentMore : indentLess)(view);
    const roots = [...chosen].filter((item) => {
      for (let parent = item.parent; parent; parent = parent.parent)
        if (chosen.has(parent)) return false;
      return true;
    });
    const edits: ChangeSpec[] = [];
    for (const item of roots) {
      const start = item.node.position!.start;
      const base = state.doc.line(start.line);
      const column = start.offset! - base.from;
      let amount: number;
      if (direction === 'out') {
        if (!item.parent) continue;
        const parent = item.parent.node.position!.start;
        amount = column - (parent.offset! - state.doc.line(parent.line).from);
      } else {
        let index = item.list.children.indexOf(item.node);
        while (
          index > 0 &&
          roots.some((root) => root.node === item.list.children[index - 1])
        )
          index--;
        if (!index) continue;
        const previous = item.list.children[index - 1].position!.start.offset!;
        const marker = /^(?:[-+*]|\d+[.)])\s+/.exec(
          state.sliceDoc(previous, state.doc.lineAt(previous).to),
        );
        if (!marker) continue;
        amount = marker[0].length;
      }
      for (let n = start.line; n <= item.node.position!.end.line; n++) {
        const line = state.doc.line(n);
        if (!line.length) continue;
        const quote = /^(?:\s*> ?)+/.exec(line.text)?.[0].length ?? 0;
        const contentFrom = line.from + quote;
        if (direction === 'in') {
          const number =
            n === start.line && item.list.ordered
              ? /^\d+/.exec(state.sliceDoc(start.offset!, line.to))
              : null;
          if (number)
            edits.push({
              from: contentFrom,
              to: start.offset! + number[0].length,
              insert:
                ' '.repeat(amount) +
                state.sliceDoc(contentFrom, start.offset!) +
                '1',
            });
          else edits.push({ from: contentFrom, insert: ' '.repeat(amount) });
        } else
          edits.push({
            from: contentFrom,
            to:
              contentFrom +
              Math.min(amount, /^ */.exec(line.text.slice(quote))![0].length),
          });
      }
    }
    if (!edits.length) return true;
    let changes = state.changes(edits);
    const document = changes.apply(state.doc);
    const selection = state.selection.map(changes);
    const renumber: ChangeSpec[] = [];
    visit(parsePersonalMarkdown(document.toString()), 'list', (list) => {
      if (!list.ordered) return;
      // Keep explicitly numbered lists elsewhere in the note untouched.
      const from = list.position!.start.offset!;
      const to = list.position!.end.offset!;
      if (
        !selection.ranges.some((range) => range.from <= to && range.to >= from)
      )
        return;
      const prefix = document.sliceString(document.lineAt(from).from, from);
      const nested = prefix.replace(/^(?:\s*> ?)+/, '').length > 0;
      let number = nested ? 1 : (list.start ?? 1);
      for (const item of list.children) {
        const start = item.position!.start.offset!;
        const marker = /^\d+/.exec(
          document.sliceString(start, document.lineAt(start).to),
        );
        if (marker && marker[0] !== String(number))
          renumber.push({
            from: start,
            to: start + marker[0].length,
            insert: String(number),
          });
        number++;
      }
    });
    // Compose both edits so one undo restores the indentation and numbering.
    const numbered = ChangeSet.of(renumber, document.length);
    changes = changes.compose(numbered);
    view.dispatch({
      changes,
      selection: state.selection.map(changes),
      scrollIntoView: true,
      userEvent: 'input.indent',
    });
    return true;
  };
}

export const indentMarkdownList = indentList('in');
export const outdentMarkdownList = indentList('out');

const newline = insertNewlineContinueMarkupCommand({ nonTightLists: false });

export const continueMarkdownList: Command = (view) => {
  const { state } = view;
  if (
    !state.selection.ranges.some((range) => {
      const text = state.doc
        .lineAt(range.head)
        .text.replace(/^(?:[ \t]*> ?)+/, '');
      return range.empty && parseTaskPrefix(text);
    })
  )
    return newline(view);
  const tasks = listItems(parsePersonalMarkdown(state.doc.toString()));
  const taskSelections = state.selection.ranges.map((range) => {
    if (!range.empty) return false;
    const line = state.doc.lineAt(range.head);
    return tasks.some(({ node }) => {
      const from = node.position!.start.offset!;
      if (node.position!.start.line !== line.number) return false;
      const prefix = parseTaskPrefix(state.sliceDoc(from, line.to));
      return prefix && range.head >= from + prefix.length;
    });
  });
  return newline({
    state,
    dispatch: (transaction) => {
      const corrections: ChangeSpec[] = [];
      transaction.newSelection.ranges.forEach((range, index) => {
        if (!taskSelections[index] || !range.empty) return;
        const line = transaction.newDoc.lineAt(range.head);
        const prefix = transaction.newDoc.sliceString(line.from, range.head);
        if (/(?:^|[\s>])(?:[-+*]|\d+[.)])[ \t]+$/.test(prefix))
          corrections.push({ from: range.head, insert: '[ ] ' });
      });
      if (!corrections.length) {
        view.dispatch(transaction);
        return;
      }
      // Preserve CodeMirror's quoting, indentation and renumbering, and keep
      // the added task marker in the same transaction for a single undo.
      const correction = ChangeSet.of(corrections, transaction.newDoc.length);
      view.dispatch(
        state.update({
          changes: transaction.changes.compose(correction),
          selection: EditorSelection.create(
            transaction.newSelection.ranges.map((range) =>
              EditorSelection.cursor(correction.mapPos(range.head, 1)),
            ),
            transaction.newSelection.mainIndex,
          ),
          scrollIntoView: true,
          userEvent: 'input',
        }),
      );
    },
  });
};

// A paragraph after a list needs a blank line, otherwise CommonMark treats it
// as a lazy continuation of the final item.
export const exitMarkdownList: Command = (view) => {
  const { state } = view;
  const { main } = state.selection;
  if (!main.empty || state.selection.ranges.length !== 1) return false;
  const line = state.doc.lineAt(main.head);
  const marker =
    /^((?:[ \t]*> ?)*[ \t]*)(?:[-+*]|\d+[.)])(?:[ \t]+(?:\[(.)\][ \t]*)?)?$/.exec(
      line.text,
    );
  if (
    main.head !== line.to ||
    !marker ||
    (marker[2] !== undefined && taskState(marker[2]) === undefined)
  )
    return false;
  const tree = parsePersonalMarkdown(state.doc.toString());
  let protectedSource = false;
  visit(tree, (node) => {
    if (
      [
        'code',
        'inlineCode',
        'math',
        'inlineMath',
        'html',
        'link',
        'image',
        'table',
      ].includes(node.type) &&
      node.position!.start.offset! <= line.from &&
      node.position!.end.offset! >= line.to
    )
      protectedSource = true;
  });
  if (protectedSource) return false;
  const from = line.from + marker[1].length;
  const item = listItems(tree).find(
    ({ node }) => node.position!.start.offset === from,
  );
  if (item?.parent) return outdentMarkdownList(view);
  const quoted = marker[1].includes('>');
  view.dispatch({
    changes: {
      from: quoted ? from : line.from,
      to: line.to,
      insert: quoted ? '' : '\n',
    },
    selection: { anchor: quoted ? from : line.from + 1 },
    userEvent: 'input',
    scrollIntoView: true,
  });
  return true;
};
