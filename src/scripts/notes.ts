import notebookStylesUrl from '../styles/notebook.css?url';
import { annotationMarks } from '../lib/annotation-marks';
import { readLocal, writeLocal } from '../lib/storage';
import {
  isAnnotationKey,
  LEGACY_NOTES_KEY,
  readAnnotations,
  removeAnnotation,
  saveAnnotation,
  type Annotation,
} from '../lib/annotations';
import { resolveAnchor, textIndex, mathElement } from '../lib/text-anchors';
import { setupSelection } from './selection-tools';

export function setupNotes() {
  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = notebookStylesUrl;
  document.head.append(styles);
  const element = <T extends HTMLElement = HTMLElement>(id: string) =>
    document.querySelector<T>(`#${id}`)!;
  const panel = element('scratchpad');
  const browse = element('notebook-browse');
  const editor = element('annotation-editor');
  const list = element('annotation-list');
  const input = element<HTMLTextAreaElement>('annotation-comment');
  const status = element('notes-status');
  const root = document.querySelector<HTMLElement>('[data-annotatable]');
  const loaded = readAnnotations();
  const notes = new Map(loaded.notes.map((note) => [note.id, note]));
  const unsaved = new Set<string>();
  const ranges = new Map<string, Range[]>();
  const canHighlight = typeof Highlight !== 'undefined' && 'highlights' in CSS;
  let active: string | null = null;
  let stopPositioning: (() => void) | undefined;
  const marks = root ? annotationMarks(root, edit) : null;
  let filter: 'page' | 'all' = root ? 'page' : 'all';
  let opener: HTMLElement | null = null;
  let undo: (() => void) | null = null;
  let feedbackNote: string | null = null;
  let legacy = readLocal(LEGACY_NOTES_KEY) || '';
  let legacyUnsaved = false;
  const storageError =
    'Não foi possível guardar. Descarrega as notas antes de sair.';
  function setStatus(message: string) {
    status.textContent = message;
    status.classList.toggle(
      'notebook-status-error',
      message !== 'Guardado neste navegador',
    );
  }
  if (!loaded.available) setStatus(storageError);

  function notify(
    message: string,
    options: { undo?: () => void; note?: string } = {},
  ) {
    element('annotation-feedback').hidden = false;
    element('annotation-message').textContent = message;
    undo = options.undo || null;
    feedbackNote = options.note || null;
    element('annotation-undo').hidden = !undo;
    element('annotation-open').hidden = !feedbackNote;
  }
  function persist(note: Annotation) {
    notes.set(note.id, note);
    const saved = saveAnnotation(note);
    if (saved) unsaved.delete(note.id);
    else unsaved.add(note.id);
    setStatus(
      unsaved.size || legacyUnsaved ? storageError : 'Guardado neste navegador',
    );
    return saved;
  }
  function paint() {
    ranges.clear();
    if (!root) return;
    root
      .querySelectorAll('[data-math-highlight]')
      .forEach((node) => node.removeAttribute('data-math-highlight'));
    const index = textIndex(root);
    for (const note of notes.values()) {
      if (note.path === location.pathname)
        ranges.set(note.id, resolveAnchor(index, note.anchor));
    }
    for (const [id, spans] of ranges)
      for (const span of spans) {
        const formula = mathElement(span);
        if (formula)
          formula.setAttribute(
            'data-math-highlight',
            id === active ? 'active' : 'saved',
          );
      }
    marks?.(ranges, active);
    if (!canHighlight) return;
    const all = [...ranges.values()]
      .flat()
      .filter((range) => !mathElement(range));
    CSS.highlights.set('notebook', new Highlight(...all));
    CSS.highlights.set(
      'notebook-active',
      new Highlight(
        ...(active ? ranges.get(active) || [] : []).filter(
          (range) => !mathElement(range),
        ),
      ),
    );
  }
  function renderList() {
    const all = [...notes.values()].sort((a, b) => b.created - a.created);
    const onPage = all.filter((note) => note.path === location.pathname);
    element('page-note-count').textContent = String(onPage.length);
    element('all-note-count').textContent = String(all.length);
    document
      .querySelectorAll<HTMLButtonElement>('[data-note-filter]')
      .forEach((button) => {
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.noteFilter === filter),
        );
      });
    const shown = filter === 'page' ? onPage : all;
    element('notebook-empty').hidden = !!shown.length;
    list.replaceChildren();
    for (const note of shown) {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'annotation-card';
      button.dataset.noteId = note.id;
      const title = document.createElement('span');
      title.className = 'annotation-page';
      title.textContent = note.title;
      const quote = document.createElement('span');
      quote.className = 'annotation-excerpt';
      quote.textContent = note.anchor.exact;
      const comment = document.createElement('span');
      comment.className = 'annotation-preview';
      comment.textContent = note.comment || 'Adicionar comentário';
      button.append(title, quote, comment);
      button.addEventListener('click', () => edit(note.id));
      item.append(button);
      list.append(item);
    }
    element('legacy-notes').hidden = !legacy;
  }
  function setExpanded(expanded: boolean) {
    document
      .querySelectorAll('[data-action="notes"]')
      .forEach((button) =>
        button.setAttribute('aria-expanded', String(expanded)),
      );
  }
  function open() {
    hideSelection();
    if (!panel.hidden) return;
    opener =
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
        ? document.activeElement
        : document.querySelector<HTMLElement>('.brand');
    panel.hidden = false;
    document.body.classList.add('notes-open');
    setExpanded(true);
  }
  function resetPosition() {
    stopPositioning?.();
    stopPositioning = undefined;
    panel.classList.remove('notebook-context');
    panel.style.removeProperty('left');
    panel.style.removeProperty('top');
    element('notes-title').textContent = 'O teu caderno';
  }
  async function positionNote(id: string) {
    resetPosition();
    const range = ranges.get(id)?.[0];
    if (!root || !range) return;
    panel.classList.add('notebook-context');
    element('notes-title').textContent = 'A tua nota';
    const { computePosition, autoUpdate, offset, flip, shift } =
      await import('@floating-ui/dom');
    if (active !== id || panel.hidden) return;
    const anchor = {
      getBoundingClientRect: () => {
        const text = range.getBoundingClientRect();
        const article = root.getBoundingClientRect();
        return new DOMRect(article.left, text.top, article.width, text.height);
      },
      contextElement: root,
    };
    const update = async () => {
      if (matchMedia('(max-width: 700px)').matches) {
        panel.style.removeProperty('left');
        panel.style.removeProperty('top');
        return;
      }
      const { x, y } = await computePosition(anchor, panel, {
        strategy: 'fixed',
        placement: 'right-start',
        middleware: [
          offset(44),
          flip({ crossAxis: false }),
          shift({ padding: 12, crossAxis: true }),
        ],
      });
      if (active !== id || panel.hidden) return;
      panel.style.left = `${x}px`;
      panel.style.top = `${y}px`;
    };
    stopPositioning = autoUpdate(anchor, panel, update);
  }
  function showList() {
    resetPosition();
    active = null;
    editor.hidden = true;
    browse.hidden = false;
    paint();
    renderList();
  }
  function close() {
    resetPosition();
    panel.hidden = true;
    document.body.classList.remove('notes-open');
    setExpanded(false);
    active = null;
    paint();
    if (opener?.matches('.annotation-pin')) {
      const noteId = opener.dataset.noteId;
      requestAnimationFrame(() => {
        const focused = document.activeElement;
        if (
          focused !== document.body &&
          focused !== root &&
          !panel.contains(focused)
        )
          return;
        [...document.querySelectorAll<HTMLButtonElement>('.annotation-pin')]
          .find((pin) => pin.dataset.noteId === noteId)
          ?.focus({ preventScroll: true });
      });
    } else if (opener?.checkVisibility()) opener.focus({ preventScroll: true });
    else if (root) {
      root.tabIndex = -1;
      root.focus({ preventScroll: true });
    }
  }
  function edit(id: string) {
    const note = notes.get(id);
    if (!note) return;
    open();
    active = id;
    browse.hidden = true;
    editor.hidden = false;
    element('annotation-page').textContent = note.title;
    element('annotation-quote').textContent = note.anchor.exact;
    input.value = note.comment;
    paint();
    const missing = note.path === location.pathname && !ranges.get(id)?.length;
    element('annotation-missing').hidden = !missing;
    element('locate-annotation').hidden = missing;
    void positionNote(id);
    input.focus({ preventScroll: true });
    input.scrollIntoView({ block: 'nearest' });
  }
  function locate() {
    const note = active && notes.get(active);
    if (!note) return;
    if (note.path !== location.pathname) {
      location.assign(`${note.path}#nota-${note.id}`);
      return;
    }
    const range = ranges.get(note.id)?.[0];
    if (!range) return;
    const target = range.startContainer.parentElement!;
    if (matchMedia('(max-width: 1000px)').matches) close();
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      const top = range.getBoundingClientRect().top + scrollY - 150;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    });
  }
  function remove(id: string) {
    const note = notes.get(id);
    if (!note) return;
    if (!removeAnnotation(id)) {
      setStatus(storageError);
      return;
    }
    notes.delete(id);
    unsaved.delete(id);
    showList();
    element('close-notes').focus();
    notify('Destaque removido.', {
      undo: () => {
        persist(note);
        paint();
        renderList();
        notify('Destaque reposto.', { note: id });
      },
    });
  }
  const hideSelection = setupSelection(root, (anchor, action) => {
    const existing = [...notes.values()].find(
      (note) =>
        note.path === location.pathname &&
        note.anchor.exact === anchor.exact &&
        note.anchor.prefix === anchor.prefix &&
        note.anchor.suffix === anchor.suffix,
    );
    const note: Annotation = existing || {
      id: crypto.randomUUID(),
      path: location.pathname,
      title: document.querySelector('h1')?.textContent || document.title,
      anchor,
      comment: '',
      created: Date.now(),
    };
    const saved = existing ? !unsaved.has(note.id) : persist(note);
    paint();
    renderList();
    if (action === 'comment' || existing) edit(note.id);
    else notify(saved ? 'Destaque guardado.' : storageError, { note: note.id });
  });
  input.addEventListener('input', () => {
    const note = active && notes.get(active);
    if (note) persist({ ...note, comment: input.value });
  });
  element('close-notes').addEventListener('click', close);
  document.addEventListener('pointerdown', (event) => {
    if (!panel.hidden && !panel.contains(event.target as Node)) close();
  });
  element('notes-back').addEventListener('click', () => {
    const previous = active;
    showList();
    list
      .querySelector<HTMLButtonElement>(`[data-note-id="${previous}"]`)
      ?.focus();
  });
  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });
  element('remove-annotation').addEventListener('click', () => {
    if (active) remove(active);
  });
  element('locate-annotation').addEventListener('click', locate);
  element('annotation-undo').addEventListener('click', () => undo?.());
  element('annotation-open').addEventListener('click', () => {
    if (feedbackNote) edit(feedbackNote);
    element('annotation-feedback').hidden = true;
  });
  element('annotation-dismiss').addEventListener('click', () => {
    element('annotation-feedback').hidden = true;
  });
  document
    .querySelectorAll<HTMLButtonElement>('[data-note-filter]')
    .forEach((button) =>
      button.addEventListener('click', () => {
        filter = button.dataset.noteFilter as 'page' | 'all';
        renderList();
      }),
    );
  const legacyInput = element<HTMLTextAreaElement>('legacy-notes-input');
  legacyInput.value = legacy;
  legacyInput.addEventListener('input', () => {
    legacy = legacyInput.value;
    legacyUnsaved = !writeLocal(LEGACY_NOTES_KEY, legacy);
    setStatus(
      legacyUnsaved || unsaved.size ? storageError : 'Guardado neste navegador',
    );
  });
  element('download-notes').addEventListener('click', () => {
    const text = [
      '# O meu caderno',
      ...[...notes.values()]
        .sort((a, b) => a.created - b.created)
        .map(
          (note) =>
            `## ${note.title}\n\n${new URL(note.path, location.origin).href}\n\n${note.anchor.exact
              .split('\n')
              .map((line) => '> ' + line)
              .join('\n')}\n\n${note.comment}`,
        ),
      ...(legacy ? ['## Notas anteriores\n\n' + legacy] : []),
    ].join('\n\n');
    const url = URL.createObjectURL(
      new Blob([text], { type: 'text/markdown;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'caderno-resumos.md';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  root?.addEventListener('click', (event) => {
    if (
      !window.getSelection()?.isCollapsed ||
      (event.target as Element).closest('a, button')
    )
      return;
    for (const [id, spans] of ranges) {
      if (
        spans.some((range) =>
          [...range.getClientRects()].some(
            (rect) =>
              event.clientX >= rect.left &&
              event.clientX <= rect.right &&
              event.clientY >= rect.top &&
              event.clientY <= rect.bottom,
          ),
        )
      ) {
        edit(id);
        return;
      }
    }
  });
  window.addEventListener('beforeunload', (event) => {
    if (unsaved.size || legacyUnsaved) event.preventDefault();
  });
  window.addEventListener('storage', (event) => {
    if (!isAnnotationKey(event.key)) return;
    const fresh = readAnnotations();
    if (!fresh.available) return;
    for (const id of notes.keys()) if (!unsaved.has(id)) notes.delete(id);
    for (const note of fresh.notes)
      if (!unsaved.has(note.id)) notes.set(note.id, note);
    paint();
    renderList();
    if (active && !notes.has(active)) showList();
    else if (active && document.activeElement !== input)
      input.value = notes.get(active)!.comment;
  });
  function openLinkedNote() {
    const id = location.hash.startsWith('#nota-')
      ? location.hash.slice(6)
      : null;
    if (id && notes.get(id)?.path === location.pathname) {
      edit(id);
      locate();
    }
  }
  function fitViewport() {
    const viewport = window.visualViewport;
    panel.style.setProperty(
      '--visual-height',
      `${viewport?.height || innerHeight}px`,
    );
    document.documentElement.style.setProperty(
      '--keyboard-inset',
      `${Math.max(0, innerHeight - (viewport?.height || innerHeight) - (viewport?.offsetTop || 0))}px`,
    );
  }
  window.visualViewport?.addEventListener('resize', () => {
    fitViewport();
    if (!panel.hidden && document.activeElement === input) {
      requestAnimationFrame(() => input.scrollIntoView({ block: 'nearest' }));
    }
  });
  window.visualViewport?.addEventListener('scroll', fitViewport);
  fitViewport();
  paint();
  renderList();
  if (!canHighlight && root)
    setStatus(
      'Podes guardar notas. Este navegador não mostra os destaques no texto.',
    );
  window.addEventListener('hashchange', openLinkedNote);
  openLinkedNote();
  return () => {
    if (!panel.hidden) {
      close();
      return;
    }
    open();
    showList();
    element('close-notes').focus();
  };
}
