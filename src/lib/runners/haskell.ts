import { runIsolated } from './isolated';
import type { RunMessage, RunRequest } from './types';

interface Connection {
  iframe: HTMLIFrameElement;
  supported: boolean;
}
let connection: Promise<Connection> | undefined;

function connect(): Promise<Connection> {
  if (connection) return connection;
  const local = ['localhost', '127.0.0.1'].includes(location.hostname);
  const url = new URL(
    '/worker.html',
    local ? 'http://127.0.0.1:4324' : 'https://resumos-code.pages.dev',
  );
  if (url.origin === location.origin)
    throw new Error('O motor precisa de uma origem separada.');
  const iframe = document.createElement('iframe');
  iframe.title = 'Motor haskell';
  iframe.hidden = true;
  iframe.sandbox.add('allow-scripts', 'allow-same-origin');
  iframe.src = url.href;
  connection = new Promise((resolve) => {
    iframe.onload = () => {
      const channel = new MessageChannel();
      // Older runner deployments ignore preparation. Keep ordinary execution
      // available while the reader and runner roll out independently.
      const timer = setTimeout(() => {
        channel.port1.close();
        resolve({ iframe, supported: false });
      }, 1500);
      channel.port1.onmessage = ({ data }) => {
        if (data.type === 'accepted') {
          clearTimeout(timer);
          resolve({ iframe, supported: true });
        } else if (data.type === 'ready' || data.type === 'error')
          channel.port1.close();
      };
      iframe.contentWindow?.postMessage(
        { language: 'haskell', type: 'prepare' },
        url.origin,
        [channel.port2],
      );
    };
    document.body.append(iframe);
  });
  window.addEventListener(
    'pagehide',
    () => {
      iframe.remove();
      connection = undefined;
    },
    { once: true },
  );
  return connection;
}

export function prepareHaskell(): void {
  void connect();
}

export function createHaskellVerification(parent: HTMLElement) {
  const channel = new MessageChannel();
  let disposed = false;
  let opened = false;
  let receive: ((message: RunMessage) => void) | undefined;
  let fallback: (() => void) | undefined;
  channel.port1.onmessage = ({ data }) => {
    if (data.type === 'accepted') return;
    receive?.(data);
  };
  return {
    run(
      request: RunRequest,
      callback: (message: RunMessage) => void,
    ): () => void {
      receive = callback;
      void connect().then(({ iframe, supported }) => {
        if (disposed || receive !== callback) return;
        if (!supported) {
          fallback = runIsolated(request, callback, parent);
          return;
        }
        if (!opened) {
          iframe.contentWindow?.postMessage(
            { language: 'haskell', type: 'session' },
            new URL(iframe.src).origin,
            [channel.port2],
          );
          opened = true;
        }
        channel.port1.postMessage({ code: request.code });
      });
      return () => {
        receive = undefined;
        fallback?.();
        fallback = undefined;
      };
    },
    dispose() {
      disposed = true;
      receive = undefined;
      fallback?.();
      channel.port1.postMessage({ type: 'cancel' });
      channel.port1.close();
    },
  };
}
