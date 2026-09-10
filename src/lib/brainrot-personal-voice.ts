import { speechWav } from './brainrot-audio';

export const RECORDING_SECONDS = 20;
const MIN_SECONDS = 5;
const SAMPLE_RATE = 24_000;
const DATABASE = 'resumos-personal-voice';
const STORE = 'recordings';
const KEY = 'personal';

function recordingStore<T>(
  mode: IDBTransactionMode,
  request: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(DATABASE, 1);
    open.onupgradeneeded = () => open.result.createObjectStore(STORE);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const transaction = db.transaction(STORE, mode);
      const result = request(transaction.objectStore(STORE));
      transaction.oncomplete = () => {
        db.close();
        resolve(result.result);
      };
      transaction.onabort = transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    };
  });
}

export const readPersonalVoice = () =>
  recordingStore<Blob | undefined>('readonly', (store) => store.get(KEY));

export const savePersonalVoice = (audio: Blob) =>
  recordingStore('readwrite', (store) => store.put(audio, KEY));

export const deletePersonalVoice = () =>
  recordingStore('readwrite', (store) => store.delete(KEY));

export async function referenceSamples(recording: Blob): Promise<Float32Array> {
  const decoder = new OfflineAudioContext(1, 1, SAMPLE_RATE);
  const audio = await decoder.decodeAudioData(await recording.arrayBuffer());
  const length = Math.min(audio.length, RECORDING_SECONDS * SAMPLE_RATE);
  const mono = new Float32Array(length);
  for (let channel = 0; channel < audio.numberOfChannels; channel++) {
    const samples = audio.getChannelData(channel);
    for (let i = 0; i < length; i++)
      mono[i] += samples[i] / audio.numberOfChannels;
  }
  return mono;
}

export async function preparePersonalVoice(recording: Blob): Promise<Blob> {
  const samples = await referenceSamples(recording);
  if (samples.length < MIN_SECONDS * SAMPLE_RATE)
    throw new Error('Grava pelo menos 5 segundos. Lê o texto até ao fim.');
  const rms = Math.sqrt(
    samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length,
  );
  if (rms < 0.003)
    throw new Error(
      'Quase não se ouve a gravação. Aproxima-te do microfone e tenta de novo.',
    );
  return speechWav(samples, SAMPLE_RATE);
}
