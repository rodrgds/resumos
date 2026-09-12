import { readSemesterPins, SEMESTER_PIN_KEY } from '../lib/pinned-semesters';
import { readingHistory } from '../lib/reading-history';

const readingPages = document.querySelector('#reading-pages');
if (readingPages) {
  const publishedPaths = new Set(
    (JSON.parse(readingPages.textContent!) as { path: string }[]).map(
      (page) => page.path,
    ),
  );
  for (const card of document.querySelectorAll<HTMLAnchorElement>(
    'a[data-course][data-course-root]',
  )) {
    const root = card.dataset.courseRoot!;
    const latest = readingHistory().find(
      (visit) => publishedPaths.has(visit.path) && visit.path.startsWith(root),
    );
    if (latest) card.href = `${latest.path}?continuar=1`;
  }
}

const detail = document.querySelector<HTMLDialogElement>('#course-detail')!;
const cards = document.querySelectorAll<HTMLButtonElement>(
  'button[data-course]',
);
for (const card of cards)
  card.addEventListener('click', () => {
    document.querySelector('#course-title')!.textContent = card.dataset.title!;
    document.querySelector('#detail-acronym')!.textContent =
      card.dataset.acronym!;
    document.querySelector('#course-meta')!.textContent = card.dataset.meta!;
    document.querySelector('#course-description')!.textContent = card.dataset
      .elective
      ? 'Este é um grupo de opções. Consulta as cadeiras disponíveis no plano de estudos.'
      : 'Tens apontamentos desta cadeira? Podes ajudar a começar.';
    detail.showModal();
  });
document
  .querySelector('#course-contribute')!
  .addEventListener('click', () => detail.close());

function focusCourse() {
  const target = document.getElementById(
    decodeURIComponent(location.hash.slice(1)),
  );
  const card = target?.closest<HTMLButtonElement>('[data-course]');
  const group = card?.closest('details');
  if (group) {
    group.open = true;
    card?.scrollIntoView({ block: 'center' });
  }
  card?.focus({ preventScroll: true });
}
window.addEventListener('hashchange', focusCourse);
focusCourse();

const originals = [
  ...document.querySelectorAll<HTMLElement>('.semester[data-semester]'),
];
const semesterIds = originals.map((section) => section.dataset.semester!);
const pins = readSemesterPins(semesterIds);
const pinnedRoot = document.querySelector<HTMLElement>(
  '[data-pinned-semesters]',
);

function renderPins() {
  if (!pinnedRoot) return;
  pinnedRoot.replaceChildren();
  for (const section of originals) {
    const id = section.dataset.semester!;
    const pinned = pins.has(id);
    if (pinned) section.dataset.pinned = 'true';
    else delete section.dataset.pinned;
    section
      .querySelector('.semester-pin')
      ?.setAttribute('aria-pressed', String(pinned));
    if (!pinned) continue;
    const copy = section.cloneNode(true) as HTMLElement;
    // Copies retain course links, but fragment links always target the original.
    for (const element of copy.querySelectorAll('[id]'))
      element.removeAttribute('id');
    copy.removeAttribute('aria-labelledby');
    const [year, semester] = id.split('-');
    const label = `${year}.º ano · ${semester}.º semestre`;
    copy.setAttribute('aria-label', label);
    copy.querySelector('h3')!.textContent = label;
    copy
      .querySelector('.semester-pin')!
      .setAttribute('aria-label', `Desafixar ${label}`);
    for (const card of copy.querySelectorAll<HTMLButtonElement>(
      'button[data-course]',
    )) {
      card.addEventListener('click', () => {
        const original = section.querySelector<HTMLButtonElement>(
          `[data-acronym="${card.dataset.acronym}"]`,
        );
        // Keep the dialog's native focus return on the card the reader clicked.
        original?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    }
    pinnedRoot.append(copy);
  }
  pinnedRoot.hidden = !pinnedRoot.childElementCount;
  document.documentElement.dataset.hasPins = String(!pinnedRoot.hidden);
}

document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>(
    '.semester-pin',
  );
  const id = button?.closest<HTMLElement>('[data-semester]')?.dataset.semester;
  if (!id) return;
  const removingFromTop = !!button!.closest('[data-pinned-semesters]');
  const wasPinned = pins.has(id);
  if (wasPinned) pins.delete(id);
  else pins.add(id);
  try {
    localStorage.setItem(SEMESTER_PIN_KEY, JSON.stringify([...pins]));
  } catch {
    /* Pins still work during this visit. */
  }
  renderPins();
  if (!wasPinned) {
    const topButton = pinnedRoot?.querySelector<HTMLButtonElement>(
      `[data-semester="${id}"] .semester-pin`,
    );
    topButton?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else if (removingFromTop) {
    originals
      .find((section) => section.dataset.semester === id)
      ?.querySelector<HTMLButtonElement>('.semester-pin')
      ?.focus();
  }
});
window.addEventListener('storage', (event) => {
  if (event.key !== SEMESTER_PIN_KEY && event.key !== null) return;
  pins.clear();
  readSemesterPins(semesterIds).forEach((id) => pins.add(id));
  renderPins();
});
renderPins();
