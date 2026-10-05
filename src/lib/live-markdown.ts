import { EditorState, StateEffect, StateField } from '@codemirror/state';
import {
  EditorView,
  Decoration,
  WidgetType,
  keymap,
  type DecorationSet,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { visit } from 'unist-util-visit';
import type { RootContent } from 'mdast';
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
      const block = document.createElement('div');
      block.className = 'note-preview prose';
      block.innerHTML = this.html;
      const formulas: Formula[] = [];
      visit(this.node, (node) => {
        if (node.type === 'math' || node.type === 'inlineMath')
          formulas.push({
            from: node.position!.start.offset!,
            to: node.position!.end.offset!,
            source: node.value,
            display: node.type === 'math',
          });
      });
      block.querySelectorAll<HTMLElement>('.katex').forEach((math, index) => {
        const formula = formulas[index];
        if (!formula) return;
        addFormulaCopy(math);
        const edit = document.createElement('button');
        edit.type = 'button';
        edit.className = 'note-formula-edit';
        edit.setAttribute('aria-label', 'Editar fórmula');
        edit.title = 'Editar fórmula';
        // The rendered expression is the editor's trigger; KaTeX keeps its MathML.
        math.before(edit);
        edit.append(math);
        edit.addEventListener('click', (event) => {
          event.stopPropagation();
          options.editFormula(formula, (value) => {
            const delimiter = formula.display ? '$$' : '$';
            const insert = formula.display
              ? `${delimiter}\n${value}\n${delimiter}`
              : `${delimiter}${value}${delimiter}`;
            view.dispatch({
              changes: { from: formula.from, to: formula.to, insert },
            });
          });
        });
      });
      block.addEventListener('click', (event) => {
        if ((event.target as Element).closest('button, a')) return;
        const from = this.node.position!.start.offset!;
        view.dispatch({
          selection: { anchor: from },
          effects: refreshPreview.of(true),
        });
        view.focus();
      });
      return block;
    }
    ignoreEvent() {
      return true;
    }
  }
  function decorations(state: EditorState) {
    const ranges = [];
    const tree = parsePersonalMarkdown(state.doc.toString());
    for (const node of tree.children) {
      const from = node.position?.start.offset;
      const to = node.position?.end.offset;
      if (
        from === undefined ||
        to === undefined ||
        from === to ||
        node.type === 'definition'
      )
        continue;
      const editing =
        focused &&
        state.selection.ranges.some(
          (range) => range.from <= to && range.to >= from,
        );
      if (editing) continue;
      ranges.push(
        Decoration.replace({
          block: true,
          widget: new Preview(node, renderPersonalBlock(node, options.images)),
        }).range(from, to),
      );
    }
    return Decoration.set(ranges, true);
  }
  const preview = StateField.define<DecorationSet>({
    create: decorations,
    update(value, transaction) {
      const effect = transaction.effects.find((candidate) =>
        candidate.is(refreshPreview),
      );
      if (effect) focused = effect.value;
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
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping,
        preview,
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
    insert(markdown: string) {
      view.dispatch(view.state.replaceSelection(markdown));
      view.dispatch({ effects: refreshPreview.of(false) });
    },
    refresh: () => view.dispatch({ effects: refreshPreview.of(focused) }),
  };
}
