export function addFormulaCopy(math: HTMLElement) {
  const source = math.querySelector(
    'annotation[encoding="application/x-tex"]',
  )?.textContent;
  if (!source) return;
  const display = !!math.closest('.katex-display');
  const delimiter = display ? '$$' : '$';
  const value = display
    ? `${delimiter}\n${source}\n${delimiter}`
    : `${delimiter}${source}${delimiter}`;
  const unit = document.createElement('span');
  unit.className = `formula-unit${display ? ' formula-display' : ''}`;
  math.before(unit);
  unit.append(math);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'formula-copy';
  button.setAttribute('aria-label', 'Copiar fórmula');
  button.title = 'Copiar fórmula';
  button.dataset.annotationIgnore = '';
  button.dataset.pagefindIgnore = '';
  button.innerHTML =
    document.querySelector<HTMLTemplateElement>('#formula-copy-icon')
      ?.innerHTML || 'Copiar';
  button.addEventListener('click', async (event) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      const status = document.querySelector('#formula-copy-status');
      if (status) status.textContent = 'Fórmula copiada';
      button.title = 'Copiado';
      window.setTimeout(() => {
        button.title = 'Copiar fórmula';
      }, 1800);
    } catch {
      const dialog = document.querySelector<HTMLDialogElement>(
        '#formula-copy-dialog',
      )!;
      const input = dialog.querySelector<HTMLTextAreaElement>('textarea')!;
      input.value = value;
      dialog.showModal();
      input.focus();
      input.select();
    }
  });
  unit.append(button);
}
