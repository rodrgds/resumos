import { normalizeSpeech } from './brainrot-audio';
import { brainrotVoices } from '../data/brainrot-voices';
import { readPersonalVoice, referenceSamples } from './brainrot-personal-voice';
import { SpeechStream, type SpeechSource } from './brainrot-speech-stream';

type PendingAudio = {
  resolve: (source: SpeechSource) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
  stream?: SpeechStream;
  text: string;
};

export class LocalVoice {
  #worker?: Worker;
  #nextId = 0;
  #pending = new Map<number, PendingAudio>();
  #progress: (loaded: number, total: number) => void;
  #reference?: Promise<Float32Array>;
  #phase: (phase: string) => void;

  constructor(callbacks: {
    progress: (loaded: number, total: number) => void;
    phase: (phase: string) => void;
  }) {
    this.#progress = callbacks.progress;
    this.#phase = callbacks.phase;
  }

  synthesize(text: string, model: string): Promise<SpeechSource> {
    const selected = brainrotVoices.find((voice) => voice.id === model);
    const sopro = selected?.engine === 'sopro' || model === 'personal';
    if (!this.#worker) {
      this.#worker = sopro
        ? new Worker(new URL('./brainrot-sopro.worker.ts', import.meta.url), {
            type: 'module',
          })
        : new Worker(new URL('./brainrot-voice.worker.ts', import.meta.url), {
            type: 'module',
          });
      this.#worker.addEventListener('message', ({ data }) => {
        if (data.type === 'phase') {
          this.#phase(data.phase);
          return;
        }
        if (data.type === 'progress') {
          this.#progress(data.loaded, data.total);
          return;
        }
        const pending = this.#pending.get(data.id);
        if (!pending) return;
        if (data.type === 'chunk') {
          if (!pending.stream) {
            const stream = new SpeechStream(pending.text);
            pending.stream = stream;
            void stream.ready.then(
              () => pending.resolve(stream),
              pending.reject,
            );
          }
          pending.stream.append(data.samples);
          return;
        }
        clearTimeout(pending.timeout);
        this.#pending.delete(data.id);
        if (data.type === 'end' && pending.stream) {
          pending.stream.finish();
        } else if (data.type === 'audio') {
          normalizeSpeech(data.wav).then(pending.resolve, pending.reject);
        } else {
          pending.stream?.fail(new Error('Não foi possível preparar a voz.'));
          pending.reject(new Error('Não foi possível preparar a voz.'));
          this.dispose();
        }
      });
      this.#worker.addEventListener('error', () => this.dispose());
    }
    const id = ++this.#nextId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => this.dispose(), 180_000);
      this.#pending.set(id, {
        resolve,
        reject,
        timeout,
        text,
      });
      const worker = this.#worker;
      if (!sopro) {
        worker!.postMessage({ id, text, model });
        return;
      }
      const first = !this.#reference;
      this.#reference ??= (async () => {
        if (model === 'personal') {
          const recording = await readPersonalVoice();
          if (!recording) throw new Error('Grava primeiro a tua voz.');
          return referenceSamples(recording);
        }
        if (selected?.engine !== 'sopro') throw new Error('Voz desconhecida.');
        const response = await fetch(selected.reference);
        if (!response.ok)
          throw new Error('Não foi possível carregar a referência de voz.');
        return referenceSamples(await response.blob());
      })();
      this.#reference
        .then((reference) => {
          if (this.#worker === worker)
            worker!.postMessage({
              id,
              text,
              model,
              reference: first ? reference : undefined,
            });
        })
        .catch(() => {
          if (this.#worker === worker) this.dispose();
        });
    });
  }

  cancelPending() {
    this.#reference = undefined;
    this.#worker?.postMessage({ cancel: [...this.#pending.keys()] });
    for (const pending of this.#pending.values()) {
      clearTimeout(pending.timeout);
      const error = new Error('A voz local foi interrompida.');
      pending.stream?.fail(error);
      pending.reject(error);
    }
    this.#pending.clear();
  }

  dispose() {
    this.#worker?.terminate();
    this.#worker = undefined;
    this.cancelPending();
  }
}
