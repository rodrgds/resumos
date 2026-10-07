import { readSemesterPins, SEMESTER_PIN_KEY } from '../lib/pinned-semesters';
import { readingHistory } from '../lib/reading-history';
import { CT_CHOICE_KEY, readCTChoices } from '../lib/ct-choices';
import { ctOptions, type CTGroupId } from '../data/ct-options';

const readingPages = document.querySelector('#reading-pages');
const publishedPaths = new Set(
  readingPages
    ? (JSON.parse(readingPages.textContent!) as { path: string }[]).map(
        (page) => page.path,
      )
    : [],
);
function resumeCourse(card: HTMLAnchorElement) {
  const root = card.dataset.courseRoot!;
  const latest = readingHistory().find(
    (visit) => publishedPaths.has(visit.path) && visit.path.startsWith(root),
  );
  if (latest) card.href = `${latest.path}?continuar=1`;
}
for (const card of document.querySelectorAll<HTMLAnchorElement>(
  'a[data-course][data-course-root]',
)) {
  resumeCourse(card);
}

const detail = document.querySelector<HTMLDialogElement>('#course-detail')!;
const officialLink = detail.querySelector<HTMLAnchorElement>(
  'a:has([data-official-label])',
)!;
const curriculumUrl = officialLink.href;
document.addEventListener('click', (event) => {
  const card = (event.target as Element).closest<HTMLButtonElement>(
    'button[data-course]',
  );
  if (!card) return;
  const slot = card.closest<HTMLElement>('[data-ct-slot]');
  const choice = slot?.querySelector<HTMLSelectElement>('[data-ct-choice]');
  if (choice && !choice.value) {
    slot!.querySelector<HTMLDetailsElement>('details')!.open = true;
    choice.focus();
    return;
  }
  document.querySelector('#course-title')!.textContent = card.dataset.title!;
  document.querySelector('#detail-acronym')!.textContent =
    card.dataset.acronym!;
  document.querySelector('#course-meta')!.textContent = card.dataset.meta!;
  document.querySelector('#course-description')!.textContent =
    card.dataset.elective && !slot
      ? 'Este é um grupo de opções. Consulta as cadeiras disponíveis no plano de estudos.'
      : 'Tens apontamentos desta cadeira? Podes ajudar a começar.';
  officialLink.href = card.dataset.officialUrl || curriculumUrl;
  officialLink.querySelector('[data-official-label]')!.textContent = card
    .dataset.officialUrl
    ? 'Ver a ficha no SIGARRA'
    : 'Ver o plano no SIGARRA';
  const personalLink = document.querySelector<HTMLAnchorElement>(
    '#course-personal-notes',
  )!;
  personalLink.href = `/caderno/${encodeURIComponent(card.dataset.courseId!)}/`;
  personalLink.hidden = !!card.dataset.elective && !slot;
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

const originals = [
  ...document.querySelectorAll<HTMLElement>('.semester[data-semester]'),
];
const semesterIds = originals.map((section) => section.dataset.semester!);
const pins = readSemesterPins(semesterIds);
let ctChoices = readCTChoices();
const pinnedRoot = document.querySelector<HTMLElement>(
  '[data-pinned-semesters]',
);

function renderCTChoices() {
  for (const slot of document.querySelectorAll<HTMLElement>(
    '#cadeiras [data-ct-slot]',
  )) {
    const group = slot.dataset.ctSlot as CTGroupId;
    const id = ctChoices.get(group) || '';
    const template = [
      ...slot.querySelectorAll<HTMLTemplateElement>('[data-ct-template]'),
    ].find((candidate) => candidate.dataset.ctTemplate === id)!;
    const content = template.content.cloneNode(true) as DocumentFragment;
    const card = content.querySelector<HTMLElement>('[data-course]')!;
    card.id = `cadeira-${group}`;
    card.querySelector('h4')!.id = `resumo-${group}`;
    if (card instanceof HTMLAnchorElement) resumeCourse(card);
    slot.querySelector('[data-ct-card]')!.replaceChildren(content);
    slot.querySelector<HTMLSelectElement>('[data-ct-choice]')!.value = id;
  }
}

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
    for (const template of copy.querySelectorAll('template')) template.remove();
    for (const select of copy.querySelectorAll<HTMLSelectElement>(
      '[data-ct-choice]',
    )) {
      select.value = ctChoices.get(select.dataset.ctChoice as CTGroupId) || '';
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

document.addEventListener('change', (event) => {
  const select = event.target;
  if (!(select instanceof HTMLSelectElement) || !select.dataset.ctChoice)
    return;
  const group = select.dataset.ctChoice as CTGroupId;
  const option = ctOptions.find(
    (candidate) =>
      candidate.id === select.value && candidate.groups.includes(group),
  );
  if (select.value && !option) return;
  if (option) ctChoices.set(group, option.id);
  else ctChoices.delete(group);
  try {
    localStorage.setItem(
      CT_CHOICE_KEY,
      JSON.stringify(Object.fromEntries(ctChoices)),
    );
  } catch {
    /* Choices still work during this visit. */
  }
  const fromPinned = !!select.closest('[data-pinned-semesters]');
  if (fromPinned) {
    const original = document.querySelector<HTMLDetailsElement>(
      `#cadeiras [data-ct-slot="${group}"] details`,
    );
    if (original) original.open = true;
  }
  renderCTChoices();
  renderPins();
  if (fromPinned)
    pinnedRoot
      ?.querySelector<HTMLSelectElement>(`[data-ct-choice="${group}"]`)
      ?.focus({ preventScroll: true });
});
window.addEventListener('storage', (event) => {
  if (
    event.key !== SEMESTER_PIN_KEY &&
    event.key !== CT_CHOICE_KEY &&
    event.key !== null
  )
    return;
  pins.clear();
  readSemesterPins(semesterIds).forEach((id) => pins.add(id));
  ctChoices = readCTChoices();
  renderCTChoices();
  renderPins();
});
renderCTChoices();
renderPins();
focusCourse();
