import type { ReadingCue } from './brainrot-content';

export class ReadingTimeline {
  #cues: ReadingCue[];
  #speech: (number | undefined)[];
  #offsets: number[] = [];
  #mode: 'voice' | 'silent' = 'voice';

  constructor(cues: ReadingCue[]) {
    this.#cues = cues;
    this.#speech = Array(cues.length).fill(undefined);
    this.#update();
  }

  #update() {
    this.#offsets = [0];
    for (const [index, cue] of this.#cues.entries()) {
      const captionTime = Math.max(2, cue.text.split(/\s+/).length / 2.5);
      const duration = Math.max(
        cue.minimumSeconds,
        this.#mode === 'voice'
          ? (this.#speech[index] ?? captionTime)
          : captionTime,
      );
      this.#offsets.push(this.#offsets[index] + duration);
    }
  }

  setMode(mode: 'voice' | 'silent') {
    this.#mode = mode;
    this.#speech.fill(undefined);
    this.#update();
  }

  setSpeechDuration(index: number, seconds: number) {
    if (!Number.isFinite(seconds) || seconds <= 0) return;
    this.#speech[index] = seconds;
    this.#update();
  }

  get duration() {
    return this.#offsets.at(-1) || 0;
  }
  get estimated() {
    return (
      this.#mode === 'voice' &&
      this.#speech.some((value) => value === undefined)
    );
  }
  position(index: number, elapsed: number) {
    return Math.min(this.#offsets[index + 1], this.#offsets[index] + elapsed);
  }
  locate(seconds: number) {
    const position = Math.max(0, Math.min(this.duration, seconds));
    const next = this.#offsets.findIndex((offset) => offset > position);
    const index = next < 0 ? this.#cues.length - 1 : Math.max(0, next - 1);
    return { index, offset: position - this.#offsets[index] };
  }
}

export function readingTime(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
}
