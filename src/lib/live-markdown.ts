import {
  EditorState,
  EditorSelection,
  StateEffect,
  StateField,
  type Range,
} from '@codemirror/state';
import {
  EditorView,
  Decoration,
  WidgetType,
  keymap,
  placeholder,
  type DecorationSet,
} from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  temporarilySetTabFocusMode,
} from '@codemirror/commands';
import {
  markdown,
  markdownLanguage,
  markdownKeymap,
} from '@codemirror/lang-markdown';
import {
  indentUnit,
  syntaxHighlighting,
  bracketMatching,
} from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { codeHighlightStyle } from './editor-highlight';
import {
  indentMarkdownList,
  outdentMarkdownList,
  exitMarkdownList,
  continueMarkdownList,
  moveToListBoundary,
} from './markdown-commands';
import { visit, SKIP } from 'unist-util-visit';
import type { Root, RootContent } from 'mdast';
import {
  parsePersonalMarkdown,
  renderPersonalBlock,
} from './personal-markdown';
import { parseTaskPrefix } from './task-states';
import { TaskWidget } from './task-widget';

const refreshPreview = StateEffect.define<boolean>();

function sourceBounds(state: EditorState, node: RootContent) {
  const from = node.position!.start.offset!;
  const to = node.position!.end.offset!;
  if (node.type === 'inlineMath') {
    const width = /^\$+/.exec(state.sliceDoc(from, to))![0].length;
    return { from: from + width, to: to - width };
  }
  if (node.type === 'math') {
    const first = state.doc.lineAt(from);
    const last = state.doc.lineAt(to);
    const body = Math.min(first.to + 1, to);
    const closed =
      last.number > first.number && /^\s*\${2,}\s*$/.test(last.text);
    return { from: body, to: Math.max(body, closed ? last.from - 1 : to) };
  }
  return { from, to };
}

interface LiveMarkdownOptions {
  markdown: string;
  images: Map<string, string>;
  change: (markdown: string) => void;
  attach: (files: File[]) => void;
}

export function liveMarkdown(
  parent: HTMLElement,
  options: LiveMarkdownOptions,
) {
  let focused = false;
  let tree: Root = parsePersonalMarkdown(options.markdown);
  const taskIcons = new Map(
    Array.from(
      document.querySelector<HTMLTemplateElement>('#note-task-icons')?.content
        .children || [],
    ).map((icon) => [(icon as SVGElement).dataset.taskState!, icon] as const),
  );
  class Preview extends WidgetType {
    constructor(
      readonly node: RootContent,
      readonly html: string,
    ) {
      super();
    }
    eq(other: Preview) {
      return (
        this.html === other.html &&
        this.node.position?.start.offset === other.node.position?.start.offset
      );
    }
    toDOM(view: EditorView) {
      const block = document.createElement(
        this.node.type === 'inlineMath' || this.node.type === 'image'
          ? 'span'
          : 'div',
      );
      block.className = 'note-preview';
      block.innerHTML = this.html;
      block.addEventListener('mousedown', (event) => event.preventDefault());
      block.addEventListener('click', () => {
        view.dispatch({
          selection: { anchor: sourceBounds(view.state, this.node).from },
          effects: refreshPreview.of(true),
          scrollIntoView: true,
        });
        view.focus();
      });
      return block;
    }
    ignoreEvent() {
      return true;
    }
  }
  class ListMarker extends WidgetType {
    constructor(readonly marker: string) {
      super();
    }
    eq(other: ListMarker) {
      return this.marker === other.marker;
    }
    toDOM() {
      const element = document.createElement('span');
      element.className = 'note-list-marker';
      element.textContent = this.marker;
      return element;
    }
    ignoreEvent() {
      return false;
    }
  }
  function decorations(state: EditorState) {
    const ranges: Range<Decoration>[] = [];
    const listEnds: number[] = [];
    const text = state.doc.toString();
    const editing = (from: number, to: number) =>
      focused &&
      state.selection.ranges.some((r) => r.from <= to && r.to >= from);
    const mark = (
      from: number,
      to: number,
      tagName: string,
      className?: string,
      attributes?: Record<string, string>,
    ) => {
      if (from < to)
        ranges.push(
          Decoration.mark({ tagName, class: className, attributes }).range(
            from,
            to,
          ),
        );
    };
    const hide = (from: number, to: number, active: boolean) => {
      if (from >= to) return;
      ranges.push(
        (active
          ? Decoration.mark({ class: 'note-syntax' })
          : Decoration.replace({})
        ).range(from, to),
      );
    };
    const line = (
      pos: number,
      className: string,
      attributes?: Record<string, string>,
    ) =>
      ranges.push(
        Decoration.line({ class: className, attributes }).range(
          state.doc.lineAt(pos).from,
        ),
      );
    visit(tree, (node) => {
      const from = node.position?.start.offset;
      const to = node.position?.end.offset;
      if (from === undefined || to === undefined || from === to) return;
      while (listEnds.length && listEnds.at(-1)! <= from) listEnds.pop();
      if (node.type === 'list') listEnds.push(to);
      const active = editing(from, to);
      if (
        ['math', 'inlineMath', 'image', 'table', 'thematicBreak'].includes(
          node.type,
        )
      ) {
        // Only structured objects become widgets. Text keeps CodeMirror's native caret and selection.
        if (!active) {
          ranges.push(
            Decoration.replace({
              block: ['math', 'table', 'thematicBreak'].includes(node.type),
              widget: new Preview(
                node as RootContent,
                renderPersonalBlock(node as RootContent, options.images),
              ),
            }).range(from, to),
          );
          return SKIP;
        }
      }
      if (node.type === 'math') {
        for (
          let n = state.doc.lineAt(from).number;
          n <= state.doc.lineAt(to).number;
          n++
        )
          line(state.doc.line(n).from, 'note-math-source');
      }
      if (node.type === 'inlineMath') mark(from, to, 'code');
      if (node.type === 'heading') {
        const underline = state.doc.lineAt(to);
        // A lone '-' is an unfinished bullet in live preview. Longer Setext
        // underlines remain headings, and the saved Markdown stays unchanged.
        if (
          node.depth === 2 &&
          underline.number > state.doc.lineAt(from).number &&
          /^(?:\s*>\s*)*\s*-\s*$/.test(underline.text)
        )
          return;
        const first = node.children[0]?.position?.start.offset ?? to;
        const last = node.children.at(-1)?.position?.end.offset ?? to;
        line(from, `note-heading note-h${node.depth}`, {
          role: 'heading',
          'aria-level': String(node.depth),
        });
        hide(from, first, active);
        hide(last, to, active);
      }
      if (
        node.type === 'strong' ||
        node.type === 'emphasis' ||
        node.type === 'delete'
      ) {
        const size = node.type === 'emphasis' ? 1 : 2;
        mark(
          from + size,
          to - size,
          node.type === 'strong'
            ? 'strong'
            : node.type === 'emphasis'
              ? 'em'
              : 's',
        );
        hide(from, from + size, active);
        hide(to - size, to, active);
      }
      if (node.type === 'inlineCode') {
        const size = /^`+/.exec(text.slice(from, to))?.[0].length ?? 1;
        mark(from + size, to - size, 'code');
        hide(from, from + size, active);
        hide(to - size, to, active);
      }
      if (node.type === 'link') {
        const first = node.children[0]?.position?.start.offset ?? from + 1;
        const last = node.children.at(-1)?.position?.end.offset ?? to;
        const safe = /^(https?:|mailto:|\/|#)/i.test(node.url);
        mark(
          first,
          last,
          safe ? 'a' : 'span',
          'note-link',
          safe
            ? { href: node.url, title: 'Ctrl / ⌘ + clique para abrir' }
            : undefined,
        );
        hide(from, first, active);
        hide(last, to, active);
      }
      if (node.type === 'listItem') {
        const first = state.doc.lineAt(from);
        const marker =
          /^(\s*)([-+*]|\d+[.)])[ \t]+(?:\[(.)\](?:[ \t]+|$))?/.exec(
            state.sliceDoc(from, first.to),
          );
        if (marker) {
          line(from, 'note-list-line', {
            style: `--note-list-depth: ${listEnds.length - 1}`,
          });
          const task = parseTaskPrefix(state.sliceDoc(from, first.to));
          if (task) {
            const contentFrom = from + task.length;
            const statusFrom = from + task.statusOffset;
            if (!editing(first.from, first.to)) {
              ranges.push(
                Decoration.replace({
                  widget: new TaskWidget(
                    task.state,
                    statusFrom,
                    state.sliceDoc(contentFrom, first.to),
                    taskIcons.get(task.state),
                  ),
                }).range(from, contentFrom),
              );
            } else mark(from, contentFrom, 'span', 'note-list-marker');
            if (task.state === '-')
              mark(contentFrom, first.to, 's', 'note-task-canceled');
            return;
          }
          if (
            !editing(from, first.to) &&
            !marker[3] &&
            /^[-+*]$/.test(marker[2])
          ) {
            ranges.push(
              Decoration.replace({ widget: new ListMarker('•') }).range(
                from,
                from + marker[2].length,
              ),
            );
          } else
            mark(from, from + marker[0].length, 'span', 'note-list-marker');
        }
      }
      if (node.type === 'blockquote') {
        for (
          let n = state.doc.lineAt(from).number;
          n <= state.doc.lineAt(to).number;
          n++
        ) {
          const current = state.doc.line(n);
          line(current.from, 'note-quote');
          const marker = /^\s*>\s?/.exec(current.text);
          if (marker)
            hide(
              current.from,
              current.from + marker[0].length,
              editing(current.from, current.to),
            );
        }
      }
      if (node.type === 'code') {
        const first = state.doc.lineAt(from);
        const last = state.doc.lineAt(to);
        if (!active && /^\s*(`{3,}|~{3,})/.test(first.text)) {
          hide(first.from, first.to, false);
          if (
            last.number > first.number &&
            /^\s*(`{3,}|~{3,})\s*$/.test(last.text)
          )
            hide(last.from, last.to, false);
        }
        for (
          let n = state.doc.lineAt(from).number;
          n <= state.doc.lineAt(to).number;
          n++
        )
          line(state.doc.line(n).from, 'note-code-line');
        return SKIP;
      }
    });
    return Decoration.set(ranges, true);
  }
  const preview = StateField.define<DecorationSet>({
    create: decorations,
    update(value, transaction) {
      const effect = transaction.effects.find((e) => e.is(refreshPreview));
      if (effect) focused = effect.value;
      if (transaction.docChanged)
        tree = parsePersonalMarkdown(transaction.state.doc.toString());
      return transaction.docChanged || transaction.selection || effect
        ? decorations(transaction.state)
        : value;
    },
    provide: (field) => EditorView.decorations.from(field),
  });
  function enterPreview(direction: 'up' | 'down', extend = false) {
    return (view: EditorView) => {
      const current = view.state.selection.main;
      const next = view.moveVertically(current, direction === 'down');
      let target: RootContent | undefined;
      visit(tree, (node) => {
        if (!['math', 'table', 'thematicBreak'].includes(node.type)) return;
        const from = node.position!.start.offset!;
        const to = node.position!.end.offset!;
        const crossed =
          direction === 'up'
            ? current.head > to && next.head <= to
            : current.head < from && next.head >= from;
        if (
          crossed &&
          (!target ||
            (direction === 'up'
              ? from > target.position!.start.offset!
              : from < target.position!.start.offset!))
        )
          target = node as RootContent;
      });
      if (!target) return false;
      const node = target as RootContent;
      const bounds = sourceBounds(view.state, node);
      const head = direction === 'down' ? bounds.from : bounds.to;
      view.dispatch({
        selection: EditorSelection.single(extend ? current.anchor : head, head),
        scrollIntoView: true,
      });
      return true;
    };
  }
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: options.markdown,
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: false,
        }),
        syntaxHighlighting(codeHighlightStyle),
        indentUnit.of('  '),
        bracketMatching(),
        history(),
        keymap.of([
          {
            key: 'ArrowUp',
            run: enterPreview('up'),
            shift: enterPreview('up', true),
          },
          {
            key: 'ArrowDown',
            run: enterPreview('down'),
            shift: enterPreview('down', true),
          },
          { key: 'Tab', run: indentMarkdownList, shift: outdentMarkdownList },
          {
            key: 'Home',
            run: moveToListBoundary('start'),
            shift: moveToListBoundary('start', true),
          },
          {
            mac: 'Cmd-ArrowLeft',
            run: moveToListBoundary('start'),
            shift: moveToListBoundary('start', true),
          },
          {
            key: 'End',
            run: moveToListBoundary('end'),
            shift: moveToListBoundary('end', true),
          },
          {
            mac: 'Cmd-ArrowRight',
            run: moveToListBoundary('end'),
            shift: moveToListBoundary('end', true),
          },
          { key: 'Escape', run: temporarilySetTabFocusMode },
          { key: 'Enter', run: exitMarkdownList },
          {
            key: 'Enter',
            run: continueMarkdownList,
          },
          ...markdownKeymap.filter((binding) => binding.key !== 'Enter'),
          ...defaultKeymap,
          ...historyKeymap,
        ]),
        EditorView.lineWrapping,
        preview,
        placeholder('Escreve aqui…'),
        EditorView.contentAttributes.of({
          'aria-label': 'Texto do apontamento',
          'aria-multiline': 'true',
          spellcheck: 'true',
        }),
        EditorView.domEventHandlers({
          focus: () => {
            view.dispatch({ effects: refreshPreview.of(true) });
          },
          blur: () => {
            view.dispatch({ effects: refreshPreview.of(false) });
          },
          click: (event) => {
            const link = (event.target as Element).closest<HTMLAnchorElement>(
              'a.note-link',
            );
            if (!link) return false;
            event.preventDefault();
            if (event.metaKey || event.ctrlKey)
              window.open(link.href, '_blank', 'noopener,noreferrer');
            return false;
          },
          paste: (event) => {
            const files = Array.from(event.clipboardData?.files || []);
            if (!files.length) return false;
            event.preventDefault();
            options.attach(files);
            return true;
          },
          dragover: (event) => {
            if (!event.dataTransfer?.types.includes('Files')) return false;
            event.preventDefault();
            return true;
          },
          drop: (event) => {
            const files = Array.from(event.dataTransfer?.files || []);
            if (!files.length) return false;
            event.preventDefault();
            const pos = view.posAtCoords({
              x: event.clientX,
              y: event.clientY,
            });
            if (pos !== null) view.dispatch({ selection: { anchor: pos } });
            options.attach(files);
            return true;
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) options.change(update.state.doc.toString());
        }),
      ],
    }),
  });
  function blockInsertionPoint() {
    const head = view.state.selection.main.head;
    const block = tree.children.find(
      (node) =>
        node.position!.start.offset! <= head &&
        node.position!.end.offset! >= head,
    );
    return block?.position?.end.offset ?? head;
  }
  return {
    destroy: () => view.destroy(),
    focus: () => view.focus(),
    insertFormula() {
      const from = blockInsertionPoint();
      const insert = '\n\n$$\n\n$$\n\n';
      view.dispatch({
        changes: { from, insert },
        selection: { anchor: from + 5 },
        scrollIntoView: true,
        userEvent: 'input',
      });
      view.focus();
    },
    insertBlock(markdown: string) {
      const from = blockInsertionPoint();
      view.dispatch({
        changes: { from, insert: markdown },
        selection: { anchor: from + markdown.length },
        userEvent: 'input',
      });
    },
    refresh: () => view.dispatch({ effects: refreshPreview.of(focused) }),
  };
}
