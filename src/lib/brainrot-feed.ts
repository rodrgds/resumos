import type { BrainrotClip } from '../data/brainrot-clips';

const SETTLE_DELAY_MS = 140;
type ClipSlot = {
  clip: BrainrotClip;
  video: HTMLVideoElement;
  item: HTMLElement;
};

export class ClipFeed {
  #element: HTMLElement;
  #clips: BrainrotClip[];
  #sequences = new Map<string, BrainrotClip[]>();
  #slots: ClipSlot[] = [];
  #onChange: (label: string) => void;
  #onError: () => void;
  #timer?: ReturnType<typeof setTimeout>;
  #playing = false;
  #resetting = false;
  #touching = false;
  #resize: ResizeObserver;
  #motion = matchMedia('(prefers-reduced-motion: reduce)');
  #wheelTime = 0;
  #wheelDistance = 0;
  #wheelMoved = false;
  #waitingForClip?: ClipSlot;
  #manual?: ClipSlot;
  #sequential?: ClipSlot;
  #manualScrolling = false;
  #naturalEnded = false;
  #failedClips = new Set<string>();

  constructor(
    element: HTMLElement,
    clips: BrainrotClip[],
    onChange: (label: string) => void,
    onError: () => void,
    gestureSurface: HTMLElement = element,
  ) {
    this.#element = element;
    this.#clips = [];
    this.setClips(clips);
    this.#onChange = onChange;
    this.#onError = onError;
    gestureSurface.addEventListener(
      'wheel',
      (event) => {
        if (
          event.ctrlKey ||
          event.shiftKey ||
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
        )
          return;
        if (this.#scrollableVisual(event.target)) return;
        event.preventDefault();
        if (event.timeStamp - this.#wheelTime > 180) {
          this.#wheelDistance = 0;
          this.#wheelMoved = false;
        }
        this.#wheelTime = event.timeStamp;
        if (this.#wheelMoved) return;
        const unit =
          event.deltaMode === WheelEvent.DOM_DELTA_LINE
            ? 16
            : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
              ? element.clientHeight
              : 1;
        this.#wheelDistance += event.deltaY * unit;
        if (Math.abs(this.#wheelDistance) < 40) return;
        this.#wheelMoved = true;
        this.move(Math.sign(this.#wheelDistance));
      },
      { passive: false },
    );
    let touch: { id: number; x: number; y: number } | undefined;
    let swipedCard = false;
    gestureSurface.addEventListener('pointerdown', (event) => {
      swipedCard = false;
      if (
        event.pointerType !== 'touch' ||
        !(event.target as Element).closest('.brainrot-visual, .brainrot-play')
      )
        return;
      if (this.#scrollableVisual(event.target)) return;
      touch = { id: event.pointerId, x: event.clientX, y: event.clientY };
    });
    gestureSurface.addEventListener('pointerup', (event) => {
      if (touch?.id !== event.pointerId) return;
      const dx = event.clientX - touch.x;
      const dy = event.clientY - touch.y;
      touch = undefined;
      if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx)) {
        swipedCard = true;
        this.move(-Math.sign(dy));
      }
    });
    gestureSurface.addEventListener(
      'click',
      (event) => {
        if (!swipedCard) return;
        swipedCard = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      { capture: true },
    );
    gestureSurface.addEventListener('pointercancel', () => {
      touch = undefined;
    });
    gestureSurface.addEventListener(
      'touchstart',
      () => {
        this.#touching = true;
        clearTimeout(this.#timer);
      },
      { passive: true },
    );
    const endTouch = (event: TouchEvent) => {
      this.#touching = event.touches.length > 0;
      clearTimeout(this.#timer);
      // scrollend can arrive while a finger is still down and defer settling.
      if (!this.#touching)
        this.#timer = setTimeout(() => this.#settle(), SETTLE_DELAY_MS);
    };
    gestureSurface.addEventListener('touchend', endTouch, { passive: true });
    gestureSurface.addEventListener('touchcancel', endTouch, { passive: true });
    element.addEventListener('scroll', () => {
      if (this.#resetting) return;
      clearTimeout(this.#timer);
      const target = Math.round(element.scrollTop / element.clientHeight);
      if (element.scrollTop !== element.clientHeight) {
        this.#manualScrolling = true;
        this.#align(element.scrollTop > element.clientHeight ? 1 : -1);
      }
      if (target !== 1) this.#load(this.#slots[target]);
      if (!this.#touching)
        this.#timer = setTimeout(() => this.#settle(), SETTLE_DELAY_MS);
    });
    element.addEventListener('scrollend', () => this.#settle());
    element.addEventListener('keydown', (event) => {
      if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(event.key))
        return;
      event.preventDefault();
      this.move(event.key.endsWith('Up') ? -1 : 1);
    });
    this.#resize = new ResizeObserver(() => this.#centre());
    this.#resize.observe(element);
  }

  #scrollableVisual(target: EventTarget | null): boolean {
    if (target instanceof Element && target.closest('.brainrot-video-preview'))
      return false;
    const visual =
      target instanceof Element && target.closest('.brainrot-visual');
    return Boolean(visual && visual.scrollHeight > visual.clientHeight + 1);
  }

  #adjacent(clip: BrainrotClip, direction: number): BrainrotClip {
    const sequence = this.#sequences.get(clip.series)!;
    const position = sequence.indexOf(clip);
    return sequence[(position + direction + sequence.length) % sequence.length];
  }

  #slot(clip: BrainrotClip, offset = 0) {
    const item = document.createElement('div');
    item.className = 'brainrot-clip';
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    if (offset > 0)
      video.addEventListener(
        'loadedmetadata',
        () => {
          if (
            video.getAttribute('src') === clip.src &&
            Number.isFinite(video.duration)
          )
            video.currentTime = video.duration * offset;
        },
        { once: true },
      );
    video.addEventListener('ended', () => {
      if (this.#slots[1]?.video !== video) return;
      this.#naturalEnded = true;
      // An explicit scroll takes precedence over automatic sequential playback.
      if (
        this.#touching ||
        this.#manualScrolling ||
        this.#waitingForClip === this.#manual
      )
        return;
      this.#transition(this.#sequential);
    });
    video.addEventListener('error', () => {
      if (this.#manual?.video === video) {
        this.#replaceFailedManual(this.#manual);
        return;
      }
      if (
        this.#slots[1]?.video === video ||
        this.#waitingForClip?.video === video
      ) {
        this.#waitingForClip = undefined;
        this.#onError();
      }
    });
    const ready = () => {
      if (this.#slots[1]?.video === video) this.#preview();
      if (
        this.#waitingForClip?.video === video &&
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        !video.seeking
      )
        this.#transition(this.#waitingForClip);
    };
    video.addEventListener('loadeddata', ready);
    video.addEventListener('seeked', ready);
    item.append(video);
    return { clip, video, item };
  }

  #load(slot?: { clip: BrainrotClip; video: HTMLVideoElement }) {
    if (!slot || slot.video.hasAttribute('src')) return;
    slot.video.src = slot.clip.src;
    slot.video.preload = 'auto';
    slot.video.load();
  }

  #release(video: HTMLVideoElement) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  #centre() {
    this.#resetting = true;
    clearTimeout(this.#timer);
    this.#element.scrollTop = this.#element.clientHeight;
    requestAnimationFrame(() => {
      this.#resetting = false;
    });
  }

  #settle() {
    if (
      this.#touching ||
      !this.#element.clientHeight ||
      this.#slots.length !== 3
    )
      return;
    const position = Math.round(
      this.#element.scrollTop / this.#element.clientHeight,
    );
    this.#manualScrolling = false;
    if (position === 1) {
      if (this.#naturalEnded && this.#waitingForClip !== this.#manual)
        this.#transition(this.#sequential);
      return;
    }
    this.#transition(this.#manual);
  }

  #transition(prepared?: ClipSlot) {
    if (!prepared || this.#slots.length !== 3) return;
    if (prepared.video.error) {
      if (prepared === this.#manual) {
        this.#waitingForClip = prepared;
        this.#replaceFailedManual(prepared);
        return;
      }
      this.#waitingForClip = undefined;
      this.#centre();
      this.#onError();
      return;
    }
    if (
      prepared.video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      prepared.video.seeking
    ) {
      // Keep the decoded current frame visible until the target is ready.
      this.#waitingForClip = prepared;
      this.#centre();
      return;
    }
    this.#waitingForClip = undefined;
    this.#show(prepared);
  }

  #align(direction: number) {
    if (!this.#manual || this.#slots[direction > 0 ? 2 : 0] === this.#manual)
      return;
    // Both gesture directions reveal the same prepared random recording.
    const top = this.#element.scrollTop;
    this.#slots = [this.#slots[2], this.#slots[1], this.#slots[0]];
    this.#resetting = true;
    this.#element.replaceChildren(...this.#slots.map((slot) => slot.item));
    this.#element.scrollTop = top;
    requestAnimationFrame(() => {
      this.#resetting = false;
    });
  }

  #show(prepared: ClipSlot) {
    const current = this.#slots[1];
    const unused = this.#slots[prepared === this.#slots[0] ? 2 : 0];
    this.#slots = [current, prepared, unused];
    this.#element.replaceChildren(...this.#slots.map((slot) => slot.item));
    this.#centre();
    this.#activate();
  }

  #replaceFailedManual(failed: ClipSlot) {
    const requested = this.#waitingForClip === failed;
    this.#failedClips.add(failed.clip.src);
    this.#waitingForClip = undefined;
    if (!this.#prepareManual()) {
      this.#centre();
      this.#onError();
      return;
    }
    if (requested) this.#transition(this.#manual);
  }

  #prepareManual() {
    const current = this.#slots[1].clip;
    const sequences = [...this.#sequences.values()]
      .map((sequence) =>
        sequence.filter((clip) => !this.#failedClips.has(clip.src)),
      )
      .filter((sequence) => sequence.length > 0);
    if (!sequences.length) {
      this.#manual = undefined;
      return false;
    }
    const other = sequences.filter(
      (sequence) => sequence[0].series !== current.series,
    );
    const candidates = other.length ? other : sequences;
    const sequence = candidates[Math.floor(Math.random() * candidates.length)];
    const parts =
      sequence.length > 1
        ? sequence.filter((clip) => clip !== current)
        : sequence;
    const clip = parts[Math.floor(Math.random() * parts.length)];
    const offset = Math.random();
    const position = this.#slots[0] === this.#manual ? 0 : 2;
    const previous = this.#slots[position];
    this.#release(previous.video);
    const prepared = this.#slot(clip, offset);
    previous.item.replaceWith(prepared.item);
    this.#slots[position] = prepared;
    this.#manual = prepared;
    this.#preview();
    this.#load(prepared);
    return true;
  }

  #preview() {
    const current = this.#slots[1]?.video;
    const prepared = this.#manual?.video;
    if (
      !current ||
      !prepared ||
      !current.videoWidth ||
      current.seeking ||
      current.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
    )
      return;
    // Keep a still frame behind the upcoming card while its random seek buffers.
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(320, current.videoWidth);
    canvas.height = Math.round(
      (canvas.width * current.videoHeight) / current.videoWidth,
    );
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(current, 0, 0, canvas.width, canvas.height);
    prepared.poster = canvas.toDataURL('image/jpeg');
  }

  #activate() {
    this.#waitingForClip = undefined;
    this.#manualScrolling = false;
    this.#naturalEnded = false;
    const current = this.#slots[1];
    if (!current) return;
    for (const slot of this.#slots) slot.video.pause();
    this.#load(current);
    const previous = this.#slots[0];
    this.#release(previous.video);
    const sequential = this.#slot(this.#adjacent(current.clip, 1));
    previous.item.replaceWith(sequential.item);
    this.#slots[0] = sequential;
    this.#sequential = sequential;
    this.#load(sequential);
    // One random seek for gestures, one sequential successor for natural playback.
    this.#prepareManual();
    this.#onChange(current.clip.label);
    if (this.#playing && !this.#motion.matches)
      void current.video.play().catch(this.#onError);
  }

  open() {
    this.close();
    if (!this.#clips.length) return;
    const sequences = [...this.#sequences.values()];
    const current = sequences[Math.floor(Math.random() * sequences.length)][0];
    this.#slots = [
      this.#adjacent(current, -1),
      current,
      this.#adjacent(current, 1),
    ].map((clip) => this.#slot(clip));
    this.#element.replaceChildren(...this.#slots.map((slot) => slot.item));
    this.#centre();
    this.#activate();
  }

  setClips(clips: BrainrotClip[]) {
    this.#clips = clips;
    this.#sequences.clear();
    for (const clip of clips) {
      const sequence = this.#sequences.get(clip.series) || [];
      sequence.push(clip);
      this.#sequences.set(clip.series, sequence);
    }
    for (const sequence of this.#sequences.values())
      sequence.sort((a, b) => a.part - b.part);
  }

  move(direction: number) {
    const prepared = this.#manual?.video;
    if (!prepared) return;
    if (
      prepared.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      prepared.seeking
    ) {
      this.#transition(this.#manual);
      return;
    }
    this.#manualScrolling = true;
    this.#align(direction);
    this.#element.scrollTo({
      top: this.#element.clientHeight * (direction > 0 ? 2 : 0),
      behavior: this.#motion.matches ? 'instant' : 'smooth',
    });
  }

  setPlaying(playing: boolean) {
    this.#playing = playing;
    for (const slot of this.#slots) slot.video.pause();
    if (playing && !this.#motion.matches)
      void this.#slots[1]?.video.play().catch(this.#onError);
  }

  close() {
    clearTimeout(this.#timer);
    this.#touching = false;
    this.#waitingForClip = undefined;
    this.#manual = undefined;
    this.#sequential = undefined;
    this.#manualScrolling = false;
    this.#naturalEnded = false;
    this.#failedClips.clear();
    for (const { video } of this.#slots) this.#release(video);
    this.#slots = [];
    this.#element.replaceChildren();
  }
}
