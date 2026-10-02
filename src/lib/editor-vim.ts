import { Compartment, EditorState } from '@codemirror/state';
import { ViewPlugin } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';

export function editorVim() {
  const mode = new Compartment();
  const extension = () =>
    document.documentElement.dataset.vim === 'true'
      ? vim({ status: true })
      : [];
  return [
    mode.of(extension()),
    ViewPlugin.define((view) => {
      const update = () => {
        if (view.state.facet(EditorState.readOnly)) return;
        view.dispatch({ effects: mode.reconfigure(extension()) });
      };
      window.addEventListener('resumos:vim', update);
      return {
        destroy() {
          window.removeEventListener('resumos:vim', update);
        },
      };
    }),
  ];
}
