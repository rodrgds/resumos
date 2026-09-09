import { readLocal, writeLocal } from '../lib/storage';
const NOTES_KEY = 'resumos-notes';
export function setupNotes() {
  const panel = document.querySelector<HTMLElement>('#scratchpad')!;
  const input = document.querySelector<HTMLTextAreaElement>('#notes-input')!;
  const status = document.querySelector<HTMLElement>('#notes-status')!;
  let opener: HTMLElement | null = null;
  input.value = readLocal(NOTES_KEY) || '';
  input.addEventListener('input', () => {
    status.textContent = writeLocal(NOTES_KEY, input.value)
      ? 'Guardado neste navegador'
      : 'Não foi possível guardar. Descarrega uma cópia.';
  });
  function close() {
    panel.hidden = true;
    document.body.classList.remove('notes-open');
    document
      .querySelectorAll('[data-action="notes"]')
      .forEach((button) => button.setAttribute('aria-expanded', 'false'));
    opener?.focus({ preventScroll: true });
  }
  document.querySelector('#close-notes')!.addEventListener('click', close);
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });
  document.querySelector('#download-notes')!.addEventListener('click', () => {
    const url = URL.createObjectURL(
      new Blob([input.value], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notas-resumos.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  return () => {
    if (!panel.hidden) {
      close();
      return;
    }
    opener =
      document.activeElement === document.body
        ? document.querySelector<HTMLElement>('.brand')
        : (document.activeElement as HTMLElement);
    panel.hidden = false;
    document.body.classList.add('notes-open');
    document
      .querySelectorAll('[data-action="notes"]')
      .forEach((button) => button.setAttribute('aria-expanded', 'true'));
    input.focus();
  };
}
