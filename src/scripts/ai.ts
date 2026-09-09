const menu = document.querySelector<HTMLElement>('#ai-menu')!;
const promptField = document.querySelector<HTMLTextAreaElement>('#ai-prompt')!;
const aiStatus = document.querySelector('#ai-status')!;
function pageText() {
  const content = document
    .querySelector('#conteudo')!
    .cloneNode(true) as HTMLElement;
  content
    .querySelectorAll('[data-pagefind-ignore], svg, .katex-mathml')
    .forEach((node) => node.remove());
  return content.textContent?.replace(/\n\s*\n/g, '\n\n').trim() || '';
}
function preparePrompt() {
  const url = new URL(location.href);
  url.hash = '';
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  promptField.value = local
    ? `Quero fazer perguntas sobre estes apontamentos. Responde em português de Portugal.\n\n${document.title}\n${pageText().slice(0, 12000)}`
    : `Pesquisa na web e lê esta página: ${url.href}\nQuero fazer perguntas sobre o seu conteúdo. Responde em português de Portugal. Se não conseguires ler a página, diz-me.`;
  const query = encodeURIComponent(promptField.value);
  const urls = {
    chatgpt: `https://chatgpt.com/?hints=search&q=${query}`,
    claude: `https://claude.ai/new?q=${query}`,
    perplexity: `https://www.perplexity.ai/search/new?q=${query}`,
    gemini: 'https://gemini.google.com/app',
  };
  for (const link of menu.querySelectorAll<HTMLAnchorElement>(
    '[data-provider]',
  )) {
    const provider = link.dataset.provider as keyof typeof urls;
    // Long local-page context travels through the clipboard instead of oversized URLs.
    link.href = local
      ? {
          chatgpt: 'https://chatgpt.com/',
          claude: 'https://claude.ai/new',
          perplexity: 'https://www.perplexity.ai/',
          gemini: urls.gemini,
        }[provider]
      : urls[provider];
  }
  aiStatus.textContent = local
    ? 'Esta página é local. Copia a pergunta e cola-a na conversa.'
    : 'Abre uma conversa com o endereço desta página. As tuas notas ficam aqui.';
}
menu.addEventListener('beforetoggle', (event) => {
  if ((event as ToggleEvent).newState === 'open') preparePrompt();
});
async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(promptField.value);
    aiStatus.textContent =
      'Pergunta copiada. Cola-a na conversa se for preciso.';
  } catch {
    menu.querySelector('details')!.open = true;
    promptField.focus();
    promptField.select();
    aiStatus.textContent = 'Copia a pergunta abaixo com Ctrl ou ⌘ C.';
  }
}
document.querySelector('#copy-prompt')!.addEventListener('click', copyPrompt);
for (const link of menu.querySelectorAll('[data-provider]'))
  link.addEventListener('click', copyPrompt);
for (const button of document.querySelectorAll<HTMLElement>(
  '[data-copy-page]',
)) {
  button.addEventListener('click', async () => {
    const feedback = button.parentElement!.querySelector('.copy-status')!;
    try {
      await navigator.clipboard.writeText(
        `# ${document.title}\n\n${location.href}\n\n${pageText()}`,
      );
      feedback.textContent = 'Página copiada';
    } catch {
      feedback.textContent =
        'Não foi possível copiar. Seleciona o texto da página.';
    }
  });
}
