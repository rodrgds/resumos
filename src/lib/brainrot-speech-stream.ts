const START_BUFFER_SECONDS = 1.2;
export type SoproDelivery = 'complete' | 'stream';

export class SpeechStream extends EventTarget {
  readonly sampleRate = 24_000;
  #chunks: Float32Array<ArrayBuffer>[] = [];
  readonly ready: Promise<void>;
  readonly estimatedDuration: number;
  #resolve!: () => void;
  #reject!: (error: Error) => void;
  #samples = 0;
  #finished = false;
  #error?: Error;
  #delivery: SoproDelivery;

  constructor(text: string, options: { delivery?: SoproDelivery } = {}) {
    super();
    this.#delivery = options.delivery ?? 'complete';
    this.estimatedDuration = Math.max(2, text.split(/\s+/).length / 2.7);
    this.ready = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
  }

  get bufferedDuration() {
    return this.#samples / this.sampleRate;
  }

  get chunks(): readonly Float32Array<ArrayBuffer>[] {
    return this.#chunks;
  }
  get finished() {
    return this.#finished;
  }
  get error() {
    return this.#error;
  }

  append(samples: Float32Array<ArrayBuffer>) {
    if (this.finished || this.error || !samples.length) return;
    this.#chunks.push(samples);
    this.#samples += samples.length;
    if (
      this.#delivery === 'stream' &&
      this.bufferedDuration >= START_BUFFER_SECONDS
    )
      this.#resolve();
    this.dispatchEvent(new Event('change'));
  }

  finish() {
    if (this.error) return;
    if (!this.#samples) {
      this.fail(new Error('A voz não produziu áudio.'));
      return;
    }
    this.#finished = true;
    this.#resolve();
    this.dispatchEvent(new Event('change'));
  }

  fail(error: Error) {
    this.#error = error;
    this.#reject(error);
    this.dispatchEvent(new Event('change'));
  }
}

export type SpeechSource = Blob | SpeechStream;
