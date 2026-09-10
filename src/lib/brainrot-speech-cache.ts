const DATABASE = 'resumos-speech-cache';
const STORE = 'audio';
const MAX_BYTES = 256 * 1024 * 1024;
const MAX_ENTRIES = 1000;
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
// Bump when reference assets, synthesis parameters or normalization change.
export const SPEECH_CACHE_REVISION = '1';
let persistenceRequested = false;

type Entry = { key: string; voice: string; audio: Blob; usedAt: number };

async function transaction<T>(
  run: (store: IDBObjectStore, result: (value: T) => void) => void,
): Promise<T> {
  if (!('indexedDB' in globalThis))
    throw new Error('O armazenamento local não está disponível.');
  return new Promise((resolve, reject) => {
    let db: IDBDatabase | undefined;
    let tx: IDBTransaction | undefined;
    let expired = false;
    let value: T;
    // Optional storage must never prevent speech, including blocked databases.
    const timer = setTimeout(() => {
      expired = true;
      tx?.abort();
      db?.close();
      reject(new Error('O armazenamento local não respondeu.'));
    }, 2000);
    const fail = () => {
      clearTimeout(timer);
      db?.close();
      reject(new Error('O armazenamento local não está disponível.'));
    };
    const open = indexedDB.open(DATABASE, 1);
    open.onupgradeneeded = () => {
      const store = open.result.createObjectStore(STORE, { keyPath: 'key' });
      store.createIndex('usedAt', 'usedAt');
      store.createIndex('voice', 'voice');
    };
    open.onerror = fail;
    open.onsuccess = () => {
      db = open.result;
      if (expired) {
        db.close();
        return;
      }
      db.onversionchange = () => db?.close();
      tx = db.transaction(STORE, 'readwrite');
      tx.oncomplete = () => {
        clearTimeout(timer);
        db?.close();
        resolve(value);
      };
      tx.onabort = tx.onerror = fail;
      try {
        run(tx.objectStore(STORE), (result) => {
          value = result;
        });
      } catch {
        tx.abort();
      }
    };
  });
}

export async function speechHash(value: string | Blob): Promise<string> {
  const bytes =
    typeof value === 'string'
      ? new TextEncoder().encode(value)
      : await value.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function cachedSpeech(key: string): Promise<Blob | undefined> {
  return transaction<Blob | undefined>((store, result) => {
    const request = store.get(key);
    request.onsuccess = () => {
      const entry = request.result as Entry | undefined;
      if (!entry) return;
      if (
        !(entry.audio instanceof Blob) ||
        entry.usedAt < Date.now() - MAX_AGE_MS
      ) {
        store.delete(key);
        return;
      }
      store.put({ ...entry, usedAt: Date.now() });
      result(entry.audio);
    };
  }).catch(() => undefined);
}

export async function cacheSpeech(
  key: string,
  voice: string,
  audio: Blob,
): Promise<void> {
  if (!audio.size || audio.size > MAX_BYTES) return;
  if (!persistenceRequested) {
    persistenceRequested = true;
    void navigator.storage?.persist?.().catch(() => {});
  }
  await transaction<void>((store) => {
    store.put({ key, voice, audio, usedAt: Date.now() } satisfies Entry);
    let bytes = 0;
    let count = 0;
    const oldest = Date.now() - MAX_AGE_MS;
    const cursor = store.index('usedAt').openCursor(null, 'prev');
    cursor.onsuccess = () => {
      const current = cursor.result;
      if (!current) return;
      const entry = current.value as Entry;
      bytes += entry.audio.size;
      count++;
      if (bytes > MAX_BYTES || count > MAX_ENTRIES || entry.usedAt < oldest)
        current.delete();
      current.continue();
    };
  }).catch(() => {});
}

export async function clearPersonalSpeech(): Promise<void> {
  await transaction<void>((store) => {
    const cursor = store.index('voice').openCursor('personal');
    cursor.onsuccess = () => {
      if (!cursor.result) return;
      cursor.result.delete();
      cursor.result.continue();
    };
  });
}
