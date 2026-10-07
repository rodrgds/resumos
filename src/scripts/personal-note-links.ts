import {
  personalNoteUrl,
  readPersonalNotes,
  deletePersonalNote,
  savePersonalNote,
  type PersonalNote,
} from '../lib/personal-notes';

const sections = document.querySelectorAll<HTMLElement>('.personal-note-links');
const menu = document.querySelector<HTMLElement>('#note-page-menu')!;
let selected: PersonalNote | undefined;
let trigger: HTMLElement | undefined;
let removed: PersonalNote | undefined;
const channel =
  typeof BroadcastChannel === 'undefined'
    ? undefined
    : new BroadcastChannel('resumos-notebooks');
function currentCourse() {
  return document.querySelector<HTMLElement>(
    '[data-reading-page][data-course-id], [data-personal-course]',
  )?.dataset.courseId;
}
function openMenu(
  page: PersonalNote,
  anchor: HTMLElement,
  point?: { x: number; y: number },
) {
  selected = page;
  trigger = anchor;
  menu.showPopover();
  const rect = anchor.getBoundingClientRect();
  menu.style.left = `${Math.max(8, Math.min(point?.x ?? rect.right, innerWidth - menu.offsetWidth - 8))}px`;
  menu.style.top = `${Math.max(8, Math.min(point?.y ?? rect.bottom, innerHeight - menu.offsetHeight - 8))}px`;
  menu.querySelector('button')?.focus();
}
function render(pages: PersonalNote[], active?: string) {
  for (const section of sections) {
    const course = section.dataset.course || currentCourse();
    const list = section.querySelector('ul')!;
    list.replaceChildren();
    for (const page of pages.filter(
      (page) => !course || page.course === course,
    )) {
      const item = document.createElement('li');
      item.className = 'personal-page-row';
      const link = document.createElement('a');
      link.href = personalNoteUrl(page.course, page.id);
      link.textContent = page.title || 'Sem título';
      if (
        page.id === active ||
        (location.pathname === `/caderno/${page.course}/` &&
          location.hash === `#${page.id}`)
      )
        link.setAttribute('aria-current', 'page');
      const more = document.createElement('button');
      more.className = 'personal-page-more icon-button';
      more.type = 'button';
      more.setAttribute('aria-label', `Ações de ${page.title || 'Sem título'}`);
      more.setAttribute('aria-haspopup', 'menu');
      more.innerHTML =
        document.querySelector<HTMLTemplateElement>(
          '#note-menu-icon',
        )!.innerHTML;
      more.addEventListener('click', () => openMenu(page, more));
      item.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        openMenu(page, link, { x: event.clientX, y: event.clientY });
      });
      link.addEventListener('keydown', (event) => {
        if (
          event.key === 'ContextMenu' ||
          (event.shiftKey && event.key === 'F10')
        ) {
          event.preventDefault();
          openMenu(page, link);
        }
      });
      item.append(link, more);
      list.append(item);
    }
  }
}
async function refresh() {
  try {
    render(await readPersonalNotes());
  } catch {
    for (const section of sections) {
      const notice = section.querySelector('p')!;
      notice.hidden = false;
      notice.textContent =
        'Os apontamentos guardados não estão disponíveis neste navegador.';
    }
  }
}
function changed() {
  channel?.postMessage('changed');
  document.dispatchEvent(new Event('personal-notes-changed'));
  void refresh();
}
document.addEventListener('pointerdown', (event) => {
  if (menu.matches(':popover-open') && !menu.contains(event.target as Node))
    menu.hidePopover();
});
menu.addEventListener('focusout', (event) => {
  if (
    menu.matches(':popover-open') &&
    !menu.contains(event.relatedTarget as Node)
  )
    menu.hidePopover();
});
menu.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    menu.hidePopover();
    trigger?.focus();
    return;
  }
  const buttons = [...menu.querySelectorAll('button')];
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    buttons[
      (index + (event.key === 'ArrowDown' ? 1 : buttons.length - 1)) %
        buttons.length
    ].focus();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    menu.hidePopover();
    trigger?.focus();
  }
});
menu.addEventListener('click', async (event) => {
  const action = (event.target as Element).closest<HTMLElement>(
    '[data-note-action]',
  )?.dataset.noteAction;
  if (!action || !selected) return;
  const page = selected;
  menu.hidePopover();
  trigger?.focus();
  const request = new CustomEvent('personal-note-action', {
    detail: { id: page.id, action },
    cancelable: true,
  });
  if (!document.dispatchEvent(request)) return;
  try {
    if (action === 'export') {
      const { downloadPersonalNote } = await import('../lib/personal-markdown');
      await downloadPersonalNote(page);
    } else {
      await deletePersonalNote(page);
      removed = page;
      document.querySelector<HTMLElement>('#note-delete-notice')!.hidden =
        false;
      changed();
      document.querySelector<HTMLButtonElement>('#note-delete-undo')!.focus();
    }
  } catch (error) {
    const notice = sections[0]?.querySelector('p');
    if (notice) {
      notice.hidden = false;
      notice.textContent =
        error instanceof Error
          ? error.message
          : 'Não foi possível alterar o apontamento.';
    }
  }
});
document
  .querySelector('#note-delete-undo')
  ?.addEventListener('click', async () => {
    if (!removed) return;
    try {
      await savePersonalNote({ ...removed, revision: 0 });
      removed = undefined;
      document.querySelector<HTMLElement>('#note-delete-notice')!.hidden = true;
      changed();
    } catch {
      document.querySelector('#note-delete-notice [role=status]')!.textContent =
        'Não foi possível restaurar. Tenta novamente.';
    }
  });
document
  .querySelector('#note-delete-dismiss')
  ?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#note-delete-notice')!.hidden = true;
  });
document.addEventListener('personal-notes-render', (event) => {
  const { pages, active } = (
    event as CustomEvent<{ pages: PersonalNote[]; active?: string }>
  ).detail;
  render(pages, active);
});
channel?.addEventListener('message', () => void refresh());
window.addEventListener('pageshow', () => void refresh());
window.addEventListener('pagehide', (event) => {
  if (!event.persisted) channel?.close();
});
void refresh();
