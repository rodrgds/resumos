import type { RunRequest, RunMessage } from './types';

export function runIsolated(
  request: RunRequest,
  receive: (message: RunMessage) => void,
  parent: HTMLElement,
): () => void {
  // CheerpJ needs browser storage. A different site keeps it away from private notes.
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  const url = new URL(
    request.language === 'java' ? '/java.html' : '/worker.html',
    local ? 'http://127.0.0.1:4324' : 'https://resumos-code.pages.dev',
  );
  if (url.origin === location.origin)
    throw new Error('O motor precisa de uma origem separada.');
  const iframe = document.createElement('iframe');
  iframe.title = `Motor ${request.language}`;
  iframe.hidden = true;
  iframe.sandbox.add('allow-scripts', 'allow-same-origin');
  iframe.src = url.href;
  const channel = new MessageChannel();
  channel.port1.onmessage = (event) => receive(event.data);
  iframe.onload = () =>
    iframe.contentWindow?.postMessage(request, url.origin, [channel.port2]);
  parent.append(iframe);
  return () => {
    channel.port1.close();
    iframe.remove();
  };
}
