import {
  autoUpdate,
  computePosition,
  offset,
  flip,
  shift,
  size,
} from '@floating-ui/dom';
const menu = document.querySelector<HTMLElement>('#ai-menu')!;
const promptField = document.querySelector<HTMLTextAreaElement>('#ai-prompt')!;
const aiStatus = document.querySelector('#ai-status')!;

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(promptField.value);
    aiStatus.textContent = 'Pergunta copiada. Cola-a na conversa.';
  } catch {
    menu.querySelector('details')!.open = true;
    promptField.focus();
    promptField.select();
    aiStatus.textContent = 'Copia a pergunta abaixo com Ctrl ou ⌘ C.';
  }
}

document.querySelector('#copy-prompt')!.addEventListener('click', copyPrompt);
menu
  .querySelector('[data-provider="gemini"]')!
  .addEventListener('click', copyPrompt);

const trigger = document.querySelector<HTMLElement>('[data-open-ai]')!;
let cleanup: (() => void) | undefined;
menu.addEventListener('toggle', (event) => {
  cleanup?.();
  if ((event as ToggleEvent).newState !== 'open') {
    delete menu.dataset.positioned;
    return;
  }
  cleanup = autoUpdate(trigger, menu, () => {
    void computePosition(trigger, menu, {
      placement: 'bottom-start',
      strategy: 'fixed',
      middleware: [
        offset(6),
        flip(),
        shift({ padding: 12 }),
        size({
          padding: 12,
          apply({ availableHeight, elements }) {
            elements.floating.style.maxHeight = `${Math.max(0, availableHeight)}px`;
          },
        }),
      ],
    }).then(({ x, y }) => {
      Object.assign(menu.style, { left: `${x}px`, top: `${y}px` });
      menu.dataset.positioned = '';
    });
  });
});
