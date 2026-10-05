import katex from 'katex';
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
  exportPersonalMarkdown,
  importPersonalMarkdown,
} from '../lib/personal-markdown';

export async function setupPersonalNotebook() {
  const element = <T extends HTMLElement = HTMLElement>(id: string) =>
    document.getElementById(id) as T;
  const course = element<HTMLSelectElement>('personal-course');
  const title = element<HTMLInputElement>('personal-title');
  const status = element('personal-save-status');
  const listStatus = element('personal-list-status');
  const list = element('personal-page-list');
  const content = element('personal-note');
  const formulaDialog = element<HTMLDialogElement>('note-formula-dialog');
  const formulaInput = element<HTMLTextAreaElement>('note-formula-source');
  const formulaError = element('note-formula-error');
  const formulaPreview = element('note-formula-preview');
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
  let applyFormula: ((source: string) => void) | undefined;
  const channel =
    typeof BroadcastChannel === 'undefined'
      ? undefined
      : new BroadcastChannel('resumos-notebooks');
  const savingError =
    'Não foi possível guardar. Exporta o apontamento antes de sair.';
  const requestedCourse = new URLSearchParams(location.search).get('cadeira');
  if ([...course.options].some((option) => option.value === requestedCourse))
    course.value = requestedCourse!;

  function courseLink() {
    const option = course.selectedOptions[0];
    const link = element<HTMLAnchorElement>('personal-course-link');
    link.href =
      option.dataset.path ||
      `/${course.value.startsWith('meic-') ? 'meic/' : ''}#cadeira-${course.value}`;
  }
  function renderList() {
    list.replaceChildren();
    for (const page of [...pages.values()]
      .filter((page) => page.course === course.value)
      .sort((a, b) => a.created - b.created)) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = personalNoteUrl(page.course, page.id);
      link.textContent = page.title || 'Sem título';
      if (page.id === active?.id) link.setAttribute('aria-current', 'page');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        void show(page);
      });
      item.append(link);
      list.append(item);
    }
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
    renderList();
  }
  async function show(page?: PersonalNote) {
    await persist();
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
      loadImages(page);
      editor = liveMarkdown(element('personal-editor'), {
        markdown: page.markdown,
        images,
        change: (markdown) => {
          page.markdown = markdown;
          changed();
        },
        editFormula: (formula, apply) => {
          applyFormula = apply;
          formulaInput.value = formula.source;
          formulaPreview.dataset.display = String(formula.display);
          formulaDialog.showModal();
          previewFormula();
          formulaInput.focus();
        },
        attach: (files) => void attach(files),
      });
      status.textContent = page.revision
        ? 'Guardado neste navegador'
        : 'A guardar…';
      history.replaceState(null, '', personalNoteUrl(course.value, page.id));
    } else history.replaceState(null, '', personalNoteUrl(course.value));
    renderList();
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
      course: course.value,
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
        editor.insert(`\n\n![${alt}](resumos-image:${id})\n\n`);
      }
      await persist();
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : savingError;
    }
  }
  function previewFormula() {
    try {
      formulaPreview.innerHTML = katex.renderToString(formulaInput.value, {
        displayMode: formulaPreview.dataset.display === 'true',
        throwOnError: true,
        trust: false,
        strict: 'ignore',
      });
      formulaError.textContent = '';
    } catch {
      formulaPreview.textContent = '';
      formulaError.textContent =
        'A fórmula está incompleta ou contém um comando não suportado. Podes continuar a editar.';
    }
  }
  formulaInput.addEventListener('input', previewFormula);
  element<HTMLFormElement>('note-formula-form').addEventListener(
    'submit',
    (event) => {
      event.preventDefault();
      applyFormula?.(formulaInput.value);
      formulaDialog.close();
      applyFormula = undefined;
      title.focus();
    },
  );
  formulaDialog.addEventListener('close', () => {
    applyFormula = undefined;
  });
  title.addEventListener('input', () => {
    if (active) {
      active.title = title.value;
      changed();
    }
  });
  element('new-personal-note').addEventListener('click', () => void create());
  course.addEventListener('change', async () => {
    const previous = active?.course;
    await persist();
    if (dirty && previous) {
      course.value = previous;
      listStatus.textContent =
        'Exporta o apontamento aberto antes de mudar de cadeira.';
      return;
    }
    courseLink();
    await show(
      [...pages.values()].find((page) => page.course === course.value),
    );
  });
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
    applyFormula = (source) => editor?.insert(` $${source}$ `);
    formulaInput.value = '';
    formulaPreview.dataset.display = 'false';
    previewFormula();
    formulaDialog.showModal();
    formulaInput.focus();
  });
  element('export-personal-note').addEventListener('click', async () => {
    if (!active) return;
    await persist();
    try {
      const version = editVersion;
      const page = active;
      const markdown = await exportPersonalMarkdown(structuredClone(page));
      const url = URL.createObjectURL(
        new Blob([markdown], { type: 'text/markdown;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(active.title || 'apontamento').replace(/[^\p{L}\p{N}_-]/gu, '-').slice(0, 80)}.md`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
      await show(
        [...pages.values()].find((page) => page.course === course.value),
      );
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : savingError;
    }
  });
  element('undo-personal-delete').addEventListener('click', async () => {
    if (!removed) return;
    await persist();
    if (dirty) return;
    const page = removed;
    page.revision = 0;
    pages.set(page.id, page);
    await show(page);
    changed();
    await persist();
    if (!dirty) {
      removed = undefined;
      element('personal-undo').hidden = true;
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
    if (page?.course === course.value) void show(page);
  });
  channel?.addEventListener('message', async () => {
    if (dirty || pendingWrites || formulaDialog.open) {
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
  courseLink();
  const newPage = location.hash === '#novo';
  const linked = pages.get(location.hash.slice(1));
  await show(
    linked?.course === course.value
      ? linked
      : [...pages.values()].find((page) => page.course === course.value),
  );
  if (newPage) await create();
}
