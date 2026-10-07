import {
  EditorState,
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
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown, markdownKeymap } from '@codemirror/lang-markdown';
import { visit, SKIP } from 'unist-util-visit';
import type { Root, RootContent } from 'mdast';
import {
  parsePersonalMarkdown,
  renderPersonalBlock,
} from './personal-markdown';
import { addFormulaCopy } from './formula-copy';

const refreshPreview = StateEffect.define<boolean>();
interface Formula {
  from: number;
  to: number;
  source: string;
  display: boolean;
}
interface LiveMarkdownOptions {
  markdown: string;
  images: Map<string, string>;
  change: (markdown: string) => void;
  editFormula: (formula: Formula, apply: (value: string) => void) => void;
  attach: (files: File[]) => void;
}

export function liveMarkdown(
  parent: HTMLElement,
  options: LiveMarkdownOptions,
) {
  let focused = false;
  let tree: Root = parsePersonalMarkdown(options.markdown);
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
      const from = this.node.position!.start.offset!;
      const to = this.node.position!.end.offset!;
      if (this.node.type === 'math' || this.node.type === 'inlineMath') {
        const formula: Formula = {
          from,
          to,
          source: this.node.value,
          display: this.node.type === 'math',
        };
        const math = block.querySelector<HTMLElement>('.katex, .katex-error');
        if (math) {
          addFormulaCopy(math);
          const edit = document.createElement('button');
          edit.type = 'button';
          edit.className = 'note-formula-edit';
          edit.setAttribute('aria-label', 'Editar fórmula');
          math.before(edit);
          edit.append(math);
          edit.addEventListener('pointerdown', (event) =>
            event.preventDefault(),
          );
          edit.addEventListener('click', () =>
            options.editFormula(formula, (value) => {
              const insert = formula.display
                ? `$$\n${value}\n$$`
                : `$${value}$`;
              view.dispatch({
                changes: { from, to, insert },
                selection: { anchor: from + insert.length },
              });
            }),
          );
        }
      } else {
        block.addEventListener('click', () => {
          view.dispatch({
            selection: { anchor: from },
            effects: refreshPreview.of(true),
          });
          view.focus();
        });
      }
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
      if (node.type === 'heading') {
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
        const marker = /^(\s*)([-+*]|\d+[.)])\s+(\[[ xX]\]\s+)?/.exec(
          first.text,
        );
        if (marker) {
          line(from, 'note-list-line');
          if (
            !editing(from, first.to) &&
            !marker[3] &&
            /^[-+*]$/.test(marker[2])
          ) {
            ranges.push(
              Decoration.replace({ widget: new ListMarker('• ') }).range(
                from,
                from + marker[0].length,
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
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: options.markdown,
      extensions: [
        markdown(),
        history(),
        keymap.of([...markdownKeymap, ...defaultKeymap, ...historyKeymap]),
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
  return {
    destroy: () => view.destroy(),
    focus: () => view.focus(),
    insert(markdown: string) {
      view.dispatch(view.state.replaceSelection(markdown));
    },
    refresh: () => view.dispatch({ effects: refreshPreview.of(focused) }),
  };
}
