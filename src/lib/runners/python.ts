import type { RunMessage, RunRequest } from './types';

let connection: Promise<HTMLIFrameElement> | undefined;
let preparation: Promise<void> | undefined;

function connect(): Promise<HTMLIFrameElement> {
  if (connection) return connection;
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  const url = new URL(
    '/worker.html',
    local ? 'http://127.0.0.1:4324' : 'https://resumos-code.pages.dev',
  );
  if (url.origin === location.origin)
    throw new Error('O motor precisa de uma origem separada.');
  const iframe = document.createElement('iframe');
  iframe.title = 'Motor python';
  iframe.hidden = true;
  iframe.sandbox.add('allow-scripts', 'allow-same-origin');
  iframe.src = url.href;
  connection = new Promise((resolve) => {
    iframe.onload = () => resolve(iframe);
    document.body.append(iframe);
  });
  window.addEventListener(
    'pagehide',
    () => {
      iframe.remove();
      connection = undefined;
      preparation = undefined;
    },
    { once: true },
  );
  return connection;
}

export function preparePython(): void {
  if (preparation) return;
  preparation = connect().then(
    (iframe) =>
      new Promise<void>((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = () => {
          channel.port1.close();
          preparation = undefined;
          resolve();
        };
        iframe.contentWindow?.postMessage(
          { language: 'python', type: 'prepare' },
          new URL(iframe.src).origin,
          [channel.port2],
        );
      }),
  );
}

export function runPython(
  request: RunRequest,
  receive: (message: RunMessage) => void,
): () => void {
  const channel = new MessageChannel();
  let cancelled = false;
  channel.port1.onmessage = ({ data }) => receive(data);
  void connect().then((iframe) => {
    if (cancelled) return;
    iframe.contentWindow?.postMessage(request, new URL(iframe.src).origin, [
      channel.port2,
    ]);
  });
  return () => {
    cancelled = true;
    channel.port1.postMessage({ type: 'cancel' });
    channel.port1.close();
  };
}
