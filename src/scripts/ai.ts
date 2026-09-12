const menu = document.querySelector<HTMLElement>('#ai-menu')!;
const promptField = document.querySelector<HTMLTextAreaElement>('#ai-prompt')!;
const aiStatus = document.querySelector<HTMLElement>('#ai-status')!;

const aiPrompt = promptField.value;

async function copyMessage(message: string, confirmation: string) {
  aiStatus.hidden = false;
  promptField.hidden = true;
  try {
    await navigator.clipboard.writeText(message);
    aiStatus.textContent = confirmation;
  } catch {
    promptField.value = message;
    promptField.hidden = false;
    promptField.focus();
    promptField.select();
    aiStatus.textContent = 'Copia a mensagem abaixo com Ctrl ou Cmd C.';
  }
}

function copyPrompt() {
  promptField.value = aiPrompt;
  return copyMessage(aiPrompt, 'Pergunta copiada. Cola-a na conversa.');
}

menu
  .querySelector<HTMLButtonElement>('[data-whatsapp]')!
  .addEventListener('click', (event) => {
    const message = (event.currentTarget as HTMLButtonElement).dataset.message!;
    promptField.value = message;
    void copyMessage(
      message,
      'Mensagem copiada. Cola-a no WhatsApp e completa a pergunta.',
    );
  });

menu
  .querySelector('[data-provider="gemini"]')!
  .addEventListener('click', copyPrompt);

const trigger = document.querySelector<HTMLElement>('[data-open-ai]')!;
let cleanup: (() => void) | undefined;
let toggleGeneration = 0;
menu.addEventListener('toggle', (event) => {
  const generation = ++toggleGeneration;
  trigger.setAttribute(
    'aria-expanded',
    String((event as ToggleEvent).newState === 'open'),
  );
  cleanup?.();
  if ((event as ToggleEvent).newState !== 'open') {
    delete menu.dataset.positioned;
    aiStatus.hidden = true;
    promptField.hidden = true;
    return;
  }
  void import('@floating-ui/dom').then(
    ({ autoUpdate, computePosition, offset, flip, shift, size }) => {
      if (generation !== toggleGeneration || !menu.matches(':popover-open'))
        return;
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
          if (generation !== toggleGeneration || !menu.matches(':popover-open'))
            return;
          Object.assign(menu.style, { left: `${x}px`, top: `${y}px` });
          menu.dataset.positioned = '';
        });
      });
    },
  );
});
