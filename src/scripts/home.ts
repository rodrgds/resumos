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
