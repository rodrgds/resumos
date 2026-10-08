import { WidgetType, type EditorView } from '@codemirror/view';
import { taskStates, type TaskState } from './task-states';

export class TaskWidget extends WidgetType {
  constructor(
    private readonly state: TaskState,
    private readonly statusFrom: number,
    private readonly text: string,
    private readonly icon: Element | undefined,
  ) {
    super();
  }

  eq(other: TaskWidget) {
    return (
      this.state === other.state &&
      this.statusFrom === other.statusFrom &&
      this.text === other.text
    );
  }

  toDOM(view: EditorView) {
    const label = document.createElement('label');
    label.className = 'note-task-control';
    label.contentEditable = 'false';
    const input = document.createElement('input');
    input.type = 'checkbox';
    label.append(input, document.createElement('span'));
    this.updateDOM(label, view);
    return label;
  }

  updateDOM(dom: HTMLElement, view: EditorView) {
    dom.dataset.taskState = this.state;
    const input = dom.querySelector('input')!;
    input.checked = this.state === 'x';
    input.indeterminate = this.state === '/';
    input.setAttribute(
      'aria-label',
      `${taskStates[this.state].label}: ${this.text || 'Tarefa sem texto'}`,
    );
    const glyph = dom.querySelector('span')!;
    glyph.className = 'note-task-glyph';
    glyph.replaceChildren(...(this.icon ? [this.icon.cloneNode(true)] : []));
    input.onchange = () => {
      view.dispatch({
        changes: {
          from: this.statusFrom,
          to: this.statusFrom + 1,
          insert: input.checked ? 'x' : ' ',
        },
        userEvent: 'input',
      });
    };
    return true;
  }

  ignoreEvent() {
    return true;
  }
}
