import { SpeechStream, type SpeechSource } from './brainrot-speech-stream';

const SCHEDULE_LEAD_SECONDS = 0.025;
const REBUFFER_SECONDS = 1.2;

type ScheduledChunk = {
  node: AudioBufferSourceNode;
  at: number;
  offset: number;
  duration: number;
  rate: number;
};

export class SpeechPlayer extends EventTarget {
  #audio = new Audio();
  #url?: string;
  #stream?: SpeechStream;
  #context?: AudioContext;
  #nodes: ScheduledChunk[] = [];
  #position = 0;
  #playing = false;
  #rate = 1;
  #loaded = false;
  #generation = 0;
  #changed = () => {
    if (this.#stream?.error) {
      this.pause();
      this.dispatchEvent(new Event('error'));
      return;
    }
    if (this.#stream?.finished) this.dispatchEvent(new Event('loadedmetadata'));
    this.#schedule();
  };

  constructor() {
    super();
    for (const type of ['loadedmetadata', 'error'])
      this.#audio.addEventListener(type, () =>
        this.dispatchEvent(new Event(type)),
      );
  }

  get loaded() {
    return this.#loaded;
  }
  get complete() {
    return !this.#stream || this.#stream.finished;
  }
  get duration() {
    if (!this.#stream) return this.#audio.duration;
    return this.#stream.finished
      ? this.#stream.bufferedDuration
      : Math.max(this.#stream.estimatedDuration, this.#stream.bufferedDuration);
  }
  get currentTime() {
    if (!this.#stream) return this.#audio.currentTime;
    const now = this.#context?.currentTime ?? 0;
    let position = this.#position;
    for (const chunk of this.#nodes) {
      if (now < chunk.at) break;
      position =
        chunk.offset + Math.min(chunk.duration, (now - chunk.at) * chunk.rate);
    }
    return position;
  }
  set currentTime(seconds: number) {
    if (!this.#stream) {
      this.#audio.currentTime = seconds;
      return;
    }
    const playing = this.#playing;
    this.pause();
    this.#position = Math.max(0, Math.min(seconds, this.duration));
    this.#playing = playing;
    this.#schedule();
  }
  get ended() {
    return (
      this.complete &&
      Number.isFinite(this.duration) &&
      (this.#stream
        ? this.currentTime >= this.duration - 0.005
        : this.#audio.ended || this.#audio.currentTime >= this.duration)
    );
  }
  get waiting() {
    return (
      !!this.#stream &&
      this.#playing &&
      !this.ended &&
      !this.#nodes.some(
        (chunk) =>
          chunk.at + chunk.duration / chunk.rate >
          (this.#context?.currentTime ?? 0),
      )
    );
  }
  set playbackRate(value: number) {
    const position = this.currentTime;
    const playing = this.#playing;
    if (this.#stream) this.pause();
    this.#rate = value;
    this.#audio.playbackRate = value;
    if (this.#stream) {
      this.#position = position;
      this.#playing = playing;
      this.#schedule();
    }
  }

  // Resume the context in the original tap, before awaiting model downloads.
  unlock() {
    this.#context ??= new AudioContext();
    void this.#context.resume().catch(() => {});
  }

  load(source: SpeechSource) {
    this.clear();
    this.#loaded = true;
    if (source instanceof Blob) {
      this.#url = URL.createObjectURL(source);
      this.#audio.src = this.#url;
      this.#audio.playbackRate = this.#rate;
      return;
    }
    this.#stream = source;
    source.addEventListener('change', this.#changed);
    this.#changed();
  }

  async play() {
    if (!this.#stream) return this.#audio.play();
    const generation = this.#generation;
    this.unlock();
    await this.#context!.resume();
    if (generation !== this.#generation || !this.#stream) return;
    if (this.#stream.error) throw this.#stream.error;
    this.#playing = true;
    this.#schedule();
  }

  pause() {
    this.#generation++;
    this.#position = this.currentTime;
    this.#playing = false;
    for (const { node } of this.#nodes) {
      node.stop();
      node.disconnect();
    }
    this.#nodes = [];
    this.#audio.pause();
  }

  #schedule() {
    const stream = this.#stream;
    const context = this.#context;
    if (!this.#playing || !stream || !context || stream.error) return;
    const previous = this.#nodes.at(-1);
    const scheduled = previous
      ? previous.offset + previous.duration
      : this.#position;
    const end = previous ? previous.at + previous.duration / previous.rate : 0;
    const starved = end <= context.currentTime;
    if (
      starved &&
      !stream.finished &&
      stream.bufferedDuration - scheduled < REBUFFER_SECONDS * this.#rate
    )
      return;
    let at = Math.max(context.currentTime + SCHEDULE_LEAD_SECONDS, end);
    let offset = 0;
    for (const samples of stream.chunks) {
      const duration = samples.length / stream.sampleRate;
      const skip = Math.max(0, scheduled - offset);
      if (skip < duration - 0.00001) {
        const buffer = context.createBuffer(
          1,
          samples.length,
          stream.sampleRate,
        );
        buffer.copyToChannel(samples, 0);
        const node = context.createBufferSource();
        node.buffer = buffer;
        node.playbackRate.value = this.#rate;
        node.connect(context.destination);
        node.start(at, skip);
        this.#nodes.push({
          node,
          at,
          offset: offset + skip,
          duration: duration - skip,
          rate: this.#rate,
        });
        at += (duration - skip) / this.#rate;
      }
      offset += duration;
    }
  }

  clear() {
    this.pause();
    this.#stream?.removeEventListener('change', this.#changed);
    this.#stream = undefined;
    this.#position = 0;
    this.#loaded = false;
    this.#audio.removeAttribute('src');
    this.#audio.load();
    if (this.#url) URL.revokeObjectURL(this.#url);
    this.#url = undefined;
  }

  dispose() {
    this.clear();
    void this.#context?.close().catch(() => {});
    this.#context = undefined;
  }
}
