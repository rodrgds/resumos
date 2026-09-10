import { normalizeSpeech, speechWav } from './brainrot-audio';
import { brainrotVoices, soproModel } from '../data/brainrot-voices';
import {
  cachedSpeech,
  cacheSpeech,
  speechHash,
  SPEECH_CACHE_REVISION,
} from './brainrot-speech-cache';
import { readPersonalVoice, referenceSamples } from './brainrot-personal-voice';
import {
  SpeechStream,
  type SpeechSource,
  type SoproDelivery,
} from './brainrot-speech-stream';

type PendingAudio = {
  resolve: (source: SpeechSource) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
  stream?: SpeechStream;
  text: string;
  delivery: SoproDelivery;
  cacheKey?: string;
  model: string;
  status?: (status: VoiceStatus) => void;
};

export type VoiceStatus = { phase: string; loaded?: number };

export class LocalVoice {
  #worker?: Worker;
  #nextId = 0;
  #pending = new Map<number, PendingAudio>();
  #reference?: Promise<Float32Array>;
  #generation = 0;

  async synthesize(
    text: string,
    model: string,
    options: {
      delivery?: SoproDelivery;
      status?: (status: VoiceStatus) => void;
    } = {},
  ): Promise<SpeechSource> {
    options.status?.({ phase: 'cache' });
    const selected = brainrotVoices.find((voice) => voice.id === model);
    const sopro = selected?.engine === 'sopro' || model === 'personal';
    const generation = this.#generation;
    let recording: Blob | undefined;
    if (model === 'personal') {
      recording = await readPersonalVoice();
      if (!recording) throw new Error('Grava primeiro a tua voz.');
    }
    const cacheKey = await (async () => {
      const identity = recording
        ? await speechHash(recording)
        : selected?.engine === 'sopro'
          ? selected.reference
          : selected?.file;
      return speechHash(
        JSON.stringify([
          SPEECH_CACHE_REVISION,
          model,
          selected?.engine === 'piper'
            ? selected.revision
            : soproModel.revision,
          identity,
          sopro ? (options.delivery ?? 'complete') : '',
          text,
        ]),
      );
    })().catch(() => undefined);
    const cached = cacheKey ? await cachedSpeech(cacheKey) : undefined;
    if (generation !== this.#generation)
      throw new Error('A voz local foi interrompida.');
    if (cached) {
      options.status?.({ phase: 'cached' });
      return cached;
    }
    if (!this.#worker) {
      options.status?.({ phase: 'opening' });
      this.#worker = sopro
        ? new Worker(new URL('./brainrot-sopro.worker.ts', import.meta.url), {
            type: 'module',
          })
        : new Worker(new URL('./brainrot-voice.worker.ts', import.meta.url), {
            type: 'module',
          });
      this.#worker.addEventListener('message', ({ data }) => {
        const pending = this.#pending.get(data.id);
        if (!pending) return;
        if (data.type === 'phase') {
          pending.status?.({ phase: data.phase });
          return;
        }
        if (data.type === 'progress') {
          pending.status?.({ phase: 'download', loaded: data.loaded });
          return;
        }
        if (data.type === 'chunk') {
          if (!pending.stream) {
            const stream = new SpeechStream(pending.text, {
              delivery: pending.delivery,
            });
            pending.stream = stream;
            void stream.ready.then(
              () => pending.resolve(stream),
              pending.reject,
            );
          }
          pending.stream.append(data.samples);
          return;
        }
        const complete = async (audio: Blob, source: SpeechSource) => {
          pending.status?.({ phase: 'saving' });
          if (pending.cacheKey)
            await cacheSpeech(pending.cacheKey, pending.model, audio);
          if (!this.#pending.delete(data.id)) return;
          clearTimeout(pending.timeout);
          if (source instanceof SpeechStream) source.finish();
          else pending.resolve(source);
        };
        if (data.type === 'end' && pending.stream) {
          const chunks = pending.stream.chunks;
          const samples = new Float32Array(
            chunks.reduce((sum, chunk) => sum + chunk.length, 0),
          );
          let offset = 0;
          for (const chunk of chunks) {
            samples.set(chunk, offset);
            offset += chunk.length;
          }
          void complete(
            speechWav(samples, pending.stream.sampleRate),
            pending.stream,
          );
        } else if (data.type === 'audio') {
          void normalizeSpeech(data.wav).then(
            (audio) => complete(audio, audio),
            () => this.dispose(),
          );
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
        delivery: options.delivery ?? 'complete',
        cacheKey,
        model,
        status: options.status,
      });
      const worker = this.#worker;
      if (!sopro) {
        worker!.postMessage({ id, text, model });
        return;
      }
      const first = !this.#reference;
      this.#reference ??= (async () => {
        if (model === 'personal') {
          return referenceSamples(recording!);
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
              delivery: options.delivery ?? 'complete',
              reference: first ? reference : undefined,
            });
        })
        .catch(() => {
          if (this.#worker === worker) this.dispose();
        });
    });
  }

  cancelPending() {
    this.#generation++;
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
