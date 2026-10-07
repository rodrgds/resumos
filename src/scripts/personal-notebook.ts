import { liveMarkdown } from '../lib/live-markdown';
import {
  readPersonalNotes,
  savePersonalNote,
  deletePersonalNote,
  personalNoteUrl,
  validateNoteImage,
  type PersonalNote,
} from '../lib/personal-notes';
import {
  downloadPersonalNote,
  importPersonalMarkdown,
} from '../lib/personal-markdown';

export async function setupPersonalNotebook() {
  const element = <T extends HTMLElement = HTMLElement>(id: string) =>
    document.getElementById(id) as T;
  const course = document.querySelector<HTMLElement>('[data-personal-course]')!
    .dataset.personalCourse!;
  const title = element<HTMLTextAreaElement>('personal-title');
  const status = element('personal-save-status');
  const listStatus = element('personal-list-status');
  new MutationObserver(() => {
    status.toggleAttribute(
      'data-saved',
      status.textContent === 'Guardado neste navegador' ||
        status.textContent === 'A guardar…',
    );
  }).observe(status, { childList: true });
  const content = element('personal-note');
  const images = new Map<string, string>();
  const pages = new Map<string, PersonalNote>();
  let active: PersonalNote | undefined;
  let editor: ReturnType<typeof liveMarkdown> | undefined;
  let removed: PersonalNote | undefined;
  let dirty = false;
  let pendingWrites = 0;
  let editVersion = 0;
  let timer = 0;
  let queue = Promise.resolve();
  const channel =
    typeof BroadcastChannel === 'undefined'
      ? undefined
      : new BroadcastChannel('resumos-notebooks');
  const savingError =
    'Não foi possível guardar. Exporta o apontamento antes de sair.';
  function renderList() {
    document.dispatchEvent(
      new CustomEvent('personal-notes-render', {
        detail: { pages: [...pages.values()], active: active?.id },
      }),
    );
  }
  function releaseImages() {
    images.forEach((url) => URL.revokeObjectURL(url));
    images.clear();
  }
  function loadImages(page: PersonalNote) {
    releaseImages();
    for (const image of page.images)
      images.set(`resumos-image:${image.id}`, URL.createObjectURL(image.blob));
  }
  function persist() {
    clearTimeout(timer);
    if (!active || !dirty) return queue;
    const page = active;
    dirty = false;
    pendingWrites++;
    // Serialize writes so each snapshot uses the revision acknowledged by the last one.
    queue = queue.then(async () => {
      try {
        const snapshot = {
          ...page,
          images: page.images.filter((image) =>
            page.markdown.includes(`resumos-image:${image.id}`),
          ),
        };
        page.revision = await savePersonalNote(snapshot);
        channel?.postMessage(page.id);
        if (active === page && !dirty)
          status.textContent = 'Guardado neste navegador';
        renderList();
      } catch (error) {
        if (active === page) {
          dirty = true;
          status.textContent =
            error instanceof Error && error.message.includes('separador')
              ? error.message
              : savingError;
        }
      } finally {
        pendingWrites--;
      }
    });
    return queue;
  }
  function changed() {
    if (!active) return;
    dirty = true;
    editVersion++;
    status.textContent = 'A guardar…';
    clearTimeout(timer);
    timer = window.setTimeout(() => void persist(), 300);
  }
  async function show(page?: PersonalNote) {
    content.inert = true;
    await persist();
    content.inert = false;
    if (dirty && active && page !== active) {
      listStatus.textContent =
        'Exporta o apontamento aberto antes de mudar de página.';
      return;
    }
    editor?.destroy();
    editor = undefined;
    active = page;
    content.hidden = !page;
    element('personal-empty').hidden = !!page;
    releaseImages();
    if (page) {
      title.value = page.title;
      resizeTitle();
      loadImages(page);
      editor = liveMarkdown(element('personal-editor'), {
        markdown: page.markdown,
        images,
        change: (markdown) => {
          page.markdown = markdown;
          changed();
        },
        attach: (files) => void attach(files),
      });
      status.textContent = page.revision
        ? 'Guardado neste navegador'
        : 'A guardar…';
      history.replaceState(null, '', personalNoteUrl(course, page.id));
    } else history.replaceState(null, '', personalNoteUrl(course));
    renderList();
    if (matchMedia('(max-width: 1199px)').matches)
      document.querySelector<HTMLDetailsElement>('.course-sidebar')!.open =
        false;
  }
  async function create(
    note?: Pick<PersonalNote, 'title' | 'markdown' | 'images'>,
  ) {
    await persist();
    if (dirty) {
      listStatus.textContent =
        'Exporta o apontamento aberto antes de criar outro.';
      return;
    }
    const page: PersonalNote = {
      id: crypto.randomUUID(),
      course: course,
      title: '',
      markdown: '',
      images: [],
      created: Date.now(),
      revision: 0,
      ...note,
    };
    pages.set(page.id, page);
    await show(page);
    changed();
    title.focus();
  }
  async function attach(files: File[]) {
    const page = active;
    if (!page || !editor) return;
    try {
      for (const file of files) {
        await validateNoteImage(file);
        if (active !== page) {
          listStatus.textContent =
            'A imagem não foi anexada porque mudaste de apontamento.';
          return;
        }
        const id = crypto.randomUUID();
        page.images.push({ id, name: file.name, blob: file });
        images.set(`resumos-image:${id}`, URL.createObjectURL(file));
        const alt = file.name.replace(/[\[\]\\\n]/g, '');
        editor.insertBlock(`\n\n![${alt}](resumos-image:${id})\n\n`);
      }
      await persist();
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : savingError;
    }
  }
  title.addEventListener('input', () => {
    if (active) {
      active.title = title.value;
      changed();
      resizeTitle();
      renderList();
    }
  });
  function resizeTitle() {
    title.style.height = 'auto';
    title.style.height = `${title.scrollHeight}px`;
  }
  title.addEventListener('keydown', (event) => {
    if (
      event.key === 'Enter' ||
      (event.key === 'ArrowDown' && title.selectionStart === title.value.length)
    ) {
      event.preventDefault();
      editor?.focus();
    }
  });
  window.addEventListener('resize', resizeTitle);
  document.addEventListener('personal-note-action', (event) => {
    const action = event as CustomEvent<{ id: string; action: string }>;
    if (action.detail.id !== active?.id) return;
    event.preventDefault();
    element(`${action.detail.action}-personal-note`).click();
  });
  document.addEventListener('personal-notes-changed', () => {
    void readPersonalNotes().then((fresh) => {
      for (const page of fresh)
        if (page.id !== active?.id) pages.set(page.id, page);
      const ids = new Set(fresh.map((page) => page.id));
      for (const id of pages.keys())
        if (id !== active?.id && !ids.has(id)) pages.delete(id);
      renderList();
    });
  });
  element('import-empty-note').addEventListener('click', () =>
    element<HTMLInputElement>('import-note-file').click(),
  );
  const menu = element('personal-actions-menu');
  menu.addEventListener('click', (event) => {
    if ((event.target as Element).closest('button')) menu.hidePopover();
  });
  menu.addEventListener('toggle', () => {
    if (!menu.matches(':popover-open')) return;
    const rect = element('personal-actions').getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(rect.right - menu.offsetWidth, innerWidth - menu.offsetWidth - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(rect.bottom + 4, innerHeight - menu.offsetHeight - 8))}px`;
  });
  element('new-personal-note').addEventListener('click', () => void create());
  element('add-note-image').addEventListener('click', () =>
    element<HTMLInputElement>('attach-note-image').click(),
  );
  element<HTMLInputElement>('attach-note-image').addEventListener(
    'change',
    async (event) => {
      const input = event.target as HTMLInputElement;
      await attach(Array.from(input.files || []));
      input.value = '';
    },
  );
  element('add-note-formula').addEventListener('click', () => {
    editor?.insertFormula();
  });
  element('export-personal-note').addEventListener('click', async () => {
    if (!active) return;
    await persist();
    try {
      const version = editVersion;
      const page = active;
      await downloadPersonalNote(structuredClone(page));
      // Export is the recovery path when the browser refuses persistent storage.
      if (active === page && version === editVersion) dirty = false;
    } catch {
      status.textContent =
        'Não foi possível exportar. Tenta novamente antes de sair.';
    }
  });
  element('delete-personal-note').addEventListener('click', async () => {
    await persist();
    if (!active || dirty) return;
    try {
      await deletePersonalNote(active);
      removed = active;
      pages.delete(active.id);
      channel?.postMessage(active.id);
      element('personal-undo').hidden = false;
      await show([...pages.values()].find((page) => page.course === course));
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : savingError;
    }
  });
  element('undo-personal-delete').addEventListener('click', async () => {
    if (!removed) return;
    await persist();
    if (dirty) return;
    const page = { ...removed, revision: 0 };
    pendingWrites++;
    try {
      // A restored page must be durable before navigation offers it again.
      page.revision = await savePersonalNote(page);
      pages.set(page.id, page);
      removed = undefined;
      channel?.postMessage(page.id);
      await show(page);
      element('personal-undo').hidden = true;
      title.focus();
    } catch {
      listStatus.textContent = 'Não foi possível restaurar. Tenta novamente.';
    } finally {
      pendingWrites--;
    }
  });
  element('import-personal-note').addEventListener('click', () =>
    element<HTMLInputElement>('import-note-file').click(),
  );
  element<HTMLInputElement>('import-note-file').addEventListener(
    'change',
    async (event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
      try {
        if (file.size > 50 * 1024 * 1024)
          throw new Error(
            'O ficheiro excede 50 MB. Importa um apontamento mais pequeno.',
          );
        await create(await importPersonalMarkdown(await file.text()));
      } catch (error) {
        listStatus.textContent =
          error instanceof Error
            ? error.message
            : 'Não foi possível importar este ficheiro.';
      }
      input.value = '';
    },
  );
  window.addEventListener('beforeunload', (event) => {
    if (dirty || pendingWrites) event.preventDefault();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void persist();
  });
  window.addEventListener('hashchange', () => {
    const page = pages.get(location.hash.slice(1));
    if (location.hash === '#novo') void create();
    else if (page?.course === course) void show(page);
  });
  channel?.addEventListener('message', async () => {
    if (dirty || pendingWrites) {
      listStatus.textContent =
        'O caderno mudou noutro separador. Exporta alterações por guardar antes de recarregar.';
      return;
    }
    try {
      const fresh = await readPersonalNotes();
      pages.clear();
      fresh.forEach((page) => pages.set(page.id, page));
      const current = active && pages.get(active.id);
      if (active && (!current || current.revision !== active.revision))
        await show(current);
      else renderList();
    } catch {
      listStatus.textContent = savingError;
    }
  });
  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) releaseImages();
  });
  try {
    (await readPersonalNotes()).forEach((page) => pages.set(page.id, page));
  } catch {
    listStatus.textContent =
      'O navegador não permite guardar. Podes escrever e exportar o apontamento.';
  }
  const newPage = location.hash === '#novo';
  const linked = pages.get(location.hash.slice(1));
  await show(
    linked?.course === course
      ? linked
      : [...pages.values()].find((page) => page.course === course),
  );
  if (newPage) await create();
}
