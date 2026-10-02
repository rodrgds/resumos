import { setupSearch } from './search';
import { setupNotes } from './notes';
import { setupShortcuts } from './shortcuts';
function openDialog(id: string) {
  const dialog = document.querySelector<HTMLDialogElement>(id)!;
  const focused = document.activeElement as HTMLElement;
  const opener =
    focused === document.body
      ? document.querySelector<HTMLElement>('.brand')!
      : focused;
  const restoreFocus = () => {
    // Native focus restoration can run before the asynchronous close event.
    if (
      document.activeElement === document.body ||
      dialog.contains(document.activeElement)
    )
      opener.focus({ preventScroll: true });
  };
  dialog.addEventListener('close', restoreFocus, { once: true });
  dialog.showModal();
}
const actions = {
  search: setupSearch(),
  notes: setupNotes(),
  appearance: () => openDialog('#appearance'),
  shortcuts: () => openDialog('#shortcuts'),
  ai: () => {
    const trigger = document.querySelector<HTMLButtonElement>('[data-open-ai]');
    const menu = document.querySelector<HTMLElement>('#ai-menu');
    if (!trigger || !menu) return;
    trigger.focus({ preventScroll: true });
    if (!menu.matches(':popover-open')) menu.showPopover({ source: trigger });
  },
};
for (const button of document.querySelectorAll<HTMLButtonElement>(
  '[data-action]',
)) {
  const action = button.dataset.action as keyof typeof actions;
  button.addEventListener('click', actions[action]);
}
for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog')) {
  dialog.addEventListener('keydown', (event) => {
    if (
      event.key !== 'Escape' ||
      event.isComposing ||
      event.defaultPrevented ||
      !(event.target as Element).closest('input[type="search"]')
    )
      return;
    // Search inputs otherwise consume Escape before the dialog can cancel.
    event.preventDefault();
    dialog.requestClose();
  });
  dialog
    .querySelector('[data-close]')
    ?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  });
}
setupShortcuts(actions);
