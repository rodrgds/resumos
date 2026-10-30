// A pristine compiler may be shared. Once claimed, it belongs to one
// verification and is terminated when that verification finishes or stops.
let standby;
const entries = new Set();
function discard(entry) {
  entry.worker.terminate();
  entries.delete(entry);
  if (standby === entry) standby = undefined;
}
function prepare() {
  if (standby) return standby;
  const worker = new Worker('./haskell.worker.js', { type: 'module' });
  const entry = { worker, receive: undefined, ready: false };
  entries.add(entry);
  entry.preparation = new Promise((resolve, reject) => {
    entry.cancel = () => reject(new Error('Preparação interrompida.'));
    worker.onmessage = ({ data }) => {
      if (data.type === 'ready') {
        entry.ready = true;
        resolve();
      } else if (entry.receive) entry.receive(data);
      else if (data.type === 'error') reject(new Error(data.text));
    };
    worker.onerror = () => {
      const text =
        'Não foi possível carregar GHC. Verifica a ligação e tenta novamente.';
      if (entry.receive) entry.receive({ type: 'error', text });
      else reject(new Error(text));
    };
  });
  entry.preparation.catch(() => discard(entry));
  standby = entry;
  return entry;
}
export function handleHaskellSession(type, port) {
  port.postMessage({ type: 'accepted' });
  const entry = prepare();
  if (type === 'prepare') {
    entry.preparation.then(
      () => port.postMessage({ type: 'ready' }),
      (error) => port.postMessage({ type: 'error', text: error.message }),
    );
    return;
  }
  standby = undefined;
  let closed = false;
  let busy = false;
  const close = () => {
    if (closed) return;
    closed = true;
    entry.cancel();
    discard(entry);
    port.close();
  };
  port.onmessage = ({ data }) => {
    if (data?.type === 'cancel') {
      close();
      return;
    }
    if (closed || busy || typeof data?.code !== 'string') return;
    busy = true;
    entry.preparation.then(
      () => {
        if (!closed) entry.worker.postMessage({ code: data.code });
      },
      (error) => {
        if (!closed) port.postMessage({ type: 'error', text: error.message });
      },
    );
  };
  entry.receive = (data) => {
    if (closed) return;
    if (data.type === 'done' || data.type === 'error') busy = false;
    port.postMessage(data);
  };
  if (!entry.ready)
    port.postMessage({ type: 'status', text: 'A preparar GHC…' });
  // Build the next untouched compiler while this verification runs.
  prepare();
}
export function disposeHaskellSessions() {
  for (const entry of entries) {
    entry.cancel();
    discard(entry);
  }
}
