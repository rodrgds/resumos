import { OUTPUT_LIMIT } from './runners/types';
export const WEB_CONSOLE_MESSAGE = 'resumos-web-console';

// The bridge runs only inside the opaque-origin preview. Its messages are
// accepted by the parent only from the current iframe, never by origin alone.
function consoleBridge(limit: number, messageType: string) {
  const MAX_MESSAGES = 200;
  let count = 0;
  const format = (value: unknown) => {
    if (typeof value === 'string') return value;
    if (value instanceof Error) return value.message;
    try {
      return JSON.stringify(value) ?? String(value);
    } catch {
      return String(value);
    }
  };
  const send = (level: string, values: unknown[]) => {
    if (count++ >= MAX_MESSAGES) return;
    parent.postMessage(
      {
        type: messageType,
        level,
        text: values.map(format).join(' ').slice(0, limit),
      },
      '*',
    );
  };
  for (const level of ['log', 'info', 'warn', 'error', 'debug'] as const) {
    const original = console[level].bind(console);
    console[level] = (...values) => {
      original(...values);
      send(level, values);
    };
  }
  addEventListener('error', (event) => send('error', [event.message]));
  addEventListener('unhandledrejection', (event) =>
    send('error', [event.reason]),
  );
}

export function webPreviewDocument(
  html: string,
  css: string,
  javascript: string,
) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'"><script>(${consoleBridge.toString()})(${OUTPUT_LIMIT}, ${JSON.stringify(WEB_CONSOLE_MESSAGE)})<\/script><style>body{font-family:system-ui;padding:16px}${css}</style></head><body>${html}<script>${javascript}<\/script></body></html>`;
}
