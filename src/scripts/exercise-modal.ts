const visibleExercises = () => [
  ...document.querySelectorAll<HTMLElement>(
    '[data-exercise-modal]:not([hidden])',
  ),
];

/** Moves an exercise's body into a modal; the details markup stays as the no-JavaScript fallback. */
export function upgradeExerciseModal(root: HTMLElement) {
  const summary = root.querySelector<HTMLElement>(
    '.exercise-disclosure > summary',
  )!;
  const body = root.querySelector<HTMLElement>('.exercise-body')!;
  const title = root.querySelector('[id$="-title"]')!.textContent ?? '';
  const template = document.querySelector<HTMLTemplateElement>(
    'template[data-modal-icons]',
  );
  // Pages without the exercise bank keep the native disclosure fallback.
  if (!template) return;
  const icons = template.content.querySelectorAll('svg');
  const dialog = document.createElement('dialog');
  dialog.className = 'exercise-modal';
  dialog.setAttribute('aria-labelledby', `${root.id}-modal-title`);
  dialog.dataset.pagefindIgnore = '';
  const header = document.createElement('header');
  header.className = 'dialog-header exercise-modal-header';
  const heading = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.id = `${root.id}-modal-title`;
  h2.textContent = title;
  heading.append(h2);
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'icon-button';
  close.setAttribute('aria-label', 'Fechar exercício');
  close.append(icons[0].cloneNode(true));
  header.append(heading, close);

  const footer = document.createElement('footer');
  footer.className = 'exercise-modal-footer';
  const position = document.createElement('span');
  position.setAttribute('aria-live', 'polite');
  const step = (label: string, icon: Element, offset: number) => {
    const button = document.createElement('button');
    button.type = 'button';
    const arrow = icon.cloneNode(true);
    button.append(...(offset < 0 ? [arrow, label] : [label, arrow]));
    button.addEventListener('click', () => {
      const list = visibleExercises();
      const next = list[list.indexOf(root) + offset];
      if (!next) return;
      dialog.close();
      next.dispatchEvent(new Event('exercise-modal-request'));
    });
    return button;
  };
  const previous = step('Anterior', icons[1], -1);
  const next = step('Seguinte', icons[2], 1);
  footer.append(previous, position, next);
  dialog.append(header, body, footer);
  root.append(dialog);
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-haspopup', 'dialog');

  const open = () => {
    if (dialog.open) return;
    const list = visibleExercises();
    const index = list.indexOf(root);
    previous.disabled = index <= 0;
    next.disabled = index < 0 || index === list.length - 1;
    position.textContent = index < 0 ? '' : `${index + 1} de ${list.length}`;
    dialog.showModal();
    dialog.scrollTop = 0;
    history.replaceState(null, '', `#${root.id}`);
    root.dispatchEvent(new Event('exercise-modal-open'));
  };
  dialog.addEventListener('close', () => {
    if (location.hash === `#${root.id}`)
      history.replaceState(null, '', location.pathname + location.search);
  });
  summary.addEventListener('click', (event) => {
    event.preventDefault();
    open();
  });
  root.addEventListener('exercise-modal-request', open);
  close.addEventListener('click', () => dialog.close());
  // Only a press that starts and ends on the backdrop dismisses; text selection drags must not.
  let pressedBackdrop = false;
  dialog.addEventListener('pointerdown', (event) => {
    pressedBackdrop = event.target === dialog;
  });
  dialog.addEventListener('click', (event) => {
    if (pressedBackdrop && event.target === dialog) dialog.close();
    pressedBackdrop = false;
  });
  window.addEventListener('hashchange', () => {
    if (location.hash === `#${root.id}`) open();
  });
  if (location.hash === `#${root.id}`) {
    // Wait for every exercise script, so code editors hear the opening.
    if (document.readyState === 'complete') open();
    else window.addEventListener('load', open, { once: true });
  }
}
