let toastTimer = 0;

export async function copyFormula(math: HTMLElement) {
  const source = math.querySelector(
    'annotation[encoding="application/x-tex"]',
  )?.textContent;
  if (!source) return;
  const value = math.closest('.katex-display')
    ? `$$\n${source}\n$$`
    : `$${source}$`;
  try {
    await navigator.clipboard.writeText(value);
    const status = document.querySelector('#formula-copy-status');
    if (status) {
      clearTimeout(toastTimer);
      status.textContent = 'Fórmula copiada';
      status.classList.add('is-visible');
      toastTimer = window.setTimeout(() => {
        status.classList.remove('is-visible');
        status.textContent = '';
      }, 2200);
    }
  } catch {
    const dialog = document.querySelector<HTMLDialogElement>(
      '#formula-copy-dialog',
    )!;
    const input = dialog.querySelector<HTMLTextAreaElement>('textarea')!;
    input.value = value;
    dialog.addEventListener(
      'close',
      () => math.focus({ preventScroll: true }),
      { once: true },
    );
    dialog.showModal();
    input.focus();
    input.select();
  }
}
