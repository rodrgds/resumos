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
