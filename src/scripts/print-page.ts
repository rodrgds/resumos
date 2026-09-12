const button = document.querySelector<HTMLButtonElement>('[data-open-print]');
const dialog = document.querySelector<HTMLDialogElement>('#print-dialog');
const exercises = dialog?.querySelector<HTMLInputElement>(
  '[data-print-exercises]',
);
const solutions = dialog?.querySelector<HTMLInputElement>(
  '[data-print-solutions]',
);
const template = document.querySelector<HTMLTemplateElement>('#print-template');

function updatePrintOptions() {
  if (solutions) solutions.disabled = !exercises?.checked;
  const output = document.querySelector<HTMLElement>('[data-print-page]');
  if (output) {
    output.dataset.exercises = String(exercises?.checked ?? false);
    output.dataset.solutions = String(
      !!exercises?.checked && !!solutions?.checked,
    );
  }
}
function preparePrint() {
  if (!document.querySelector('[data-print-page]') && template)
    document.body.append(template.content.cloneNode(true));
  updatePrintOptions();
}
async function printPage() {
  preparePrint();
  await Promise.race([
    Promise.all(
      [
        ...document.querySelectorAll<HTMLImageElement>(
          '[data-print-page] .video-thumbnail, [data-print-page] .manim-print-poster',
        ),
      ].map((image) => image.decode().catch(() => {})),
    ),
    new Promise((resolve) => setTimeout(resolve, 5000)),
  ]);
  window.print();
}
if (button) {
  button.hidden = false;
  button.addEventListener('click', () => {
    if (dialog) dialog.showModal();
    else printPage();
  });
}
dialog?.querySelector('form')?.addEventListener('submit', (event) => {
  if (
    !(event.submitter instanceof HTMLButtonElement) ||
    event.submitter.value !== 'print'
  )
    return;
  event.preventDefault();
  updatePrintOptions();
  dialog.close();
  printPage();
});
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
exercises?.addEventListener('change', updatePrintOptions);
solutions?.addEventListener('change', updatePrintOptions);
updatePrintOptions();
window.addEventListener('beforeprint', preparePrint);
window.addEventListener('afterprint', () => {
  document.querySelector('[data-print-page]')?.remove();
});
