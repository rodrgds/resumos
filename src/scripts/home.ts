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

const PIN_KEY = 'resumos-pinned-semesters';
function readPins(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(PIN_KEY) || '[]');
    return Array.isArray(saved)
      ? saved.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}
const pins = new Set(readPins());
for (const section of document.querySelectorAll<HTMLElement>(
  '.semester[data-semester]',
)) {
  const id = section.dataset.semester;
  const button = section.querySelector<HTMLButtonElement>('.semester-pin');
  if (!id || !button) continue;
  const apply = (pinned: boolean) => {
    if (pinned) section.dataset.pinned = 'true';
    else delete section.dataset.pinned;
    button.setAttribute('aria-pressed', String(pinned));
  };
  apply(pins.has(id));
  button.addEventListener('click', () => {
    const pinned = section.dataset.pinned !== 'true';
    apply(pinned);
    if (pinned) pins.add(id);
    else pins.delete(id);
    try {
      localStorage.setItem(PIN_KEY, JSON.stringify([...pins]));
    } catch {
      /* Private mode: the pin works for this visit only. */
    }
  });
}

try {
  const hero = document.querySelector('#page-hero');
  if (hero) {
    if (localStorage.getItem('resumos-visited'))
      hero.setAttribute('hidden', '');
    else localStorage.setItem('resumos-visited', '1');
  }
} catch {
  /* Private mode: keep the hero visible. */
}
