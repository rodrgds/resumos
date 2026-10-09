import { EditorView, keymap } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { editorSetup } from './editor-setup';

/** The same editing and Vim shortcuts as runnable code, without a runtime. */
export function mountFormalEditor(
  root: HTMLElement,
  options: {
    onChange?: (value: string) => void;
    onRun?: () => void;
  } = {},
) {
  const fallback = root.querySelector<HTMLTextAreaElement>('textarea')!;
  const view = new EditorView({
    doc: fallback.value,
    parent: root.querySelector<HTMLElement>('[data-formal-editor]')!,
    extensions: [
      editorSetup(root),
      EditorView.contentAttributes.of({
        'aria-label':
          root.dataset.label || fallback.getAttribute('aria-label')!,
        spellcheck: 'false',
      }),
      Prec.highest(
        keymap.of([
          {
            key: 'Mod-Enter',
            run: () => {
              options.onRun?.();
              return true;
            },
          },
        ]),
      ),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) options.onChange?.(update.state.doc.toString());
      }),
    ],
  });
  fallback.hidden = true;
  return {
    getValue: () => view.state.doc.toString(),
    setValue(value: string) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    },
    focus: () => view.focus(),
    destroy: () => view.destroy(),
  };
}
