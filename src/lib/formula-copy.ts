let toastTimer = 0;

export function formulaMarkdown(math: Element) {
  const source = math.querySelector(
    'annotation[encoding="application/x-tex"]',
  )?.textContent;
  if (!source) return '';
  return math.closest('.katex-display') ? `$$\n${source}\n$$` : `$${source}$`;
}

export async function copyFormula(math: HTMLElement) {
  const value = formulaMarkdown(math);
  if (!value) return;
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
