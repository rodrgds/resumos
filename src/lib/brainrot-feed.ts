import type { BrainrotClip } from '../data/brainrot-clips';

export class ClipFeed {
  #element: HTMLElement;
  #clips: BrainrotClip[];
  #slots: { clip: BrainrotClip; video: HTMLVideoElement; item: HTMLElement }[] =
    [];
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

  constructor(
    element: HTMLElement,
    clips: BrainrotClip[],
    onChange: (label: string) => void,
    onError: () => void,
    gestureSurface: HTMLElement = element,
  ) {
    this.#element = element;
    this.#clips = clips;
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
    const hasScrollEnd = 'onscrollend' in element;
    const endTouch = (event: TouchEvent) => {
      this.#touching = event.touches.length > 0;
      clearTimeout(this.#timer);
      if (!this.#touching && !hasScrollEnd)
        this.#timer = setTimeout(() => this.#settle(), 140);
    };
    gestureSurface.addEventListener('touchend', endTouch, { passive: true });
    gestureSurface.addEventListener('touchcancel', endTouch, { passive: true });
    element.addEventListener('scroll', () => {
      if (this.#resetting) return;
      clearTimeout(this.#timer);
      const target = Math.round(element.scrollTop / element.clientHeight);
      if (target !== 1) this.#load(this.#slots[target]);
      if (!hasScrollEnd) this.#timer = setTimeout(() => this.#settle(), 140);
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

  #pick(previous?: BrainrotClip): BrainrotClip {
    const alternatives = this.#clips.filter(
      (clip) => clip.kind !== previous?.kind,
    );
    const choices = alternatives.length ? alternatives : this.#clips;
    return choices[Math.floor(Math.random() * choices.length)];
  }

  #slot(clip: BrainrotClip) {
    const item = document.createElement('div');
    item.className = 'brainrot-clip';
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    video.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(video.duration))
        video.currentTime = Math.random() * Math.max(0, video.duration - 5);
    });
    video.addEventListener('error', () => {
      if (this.#slots[1]?.video === video) this.#onError();
    });
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
    if (position === 1) return;
    if (position === 2) {
      const old = this.#slots.shift()!;
      this.#release(old.video);
      old.item.remove();
      const next = this.#slot(this.#pick(this.#slots[1].clip));
      this.#slots.push(next);
      this.#element.append(next.item);
    } else {
      const old = this.#slots.pop()!;
      this.#release(old.video);
      old.item.remove();
      const previous = this.#slot(this.#pick(this.#slots[0].clip));
      this.#slots.unshift(previous);
      this.#element.prepend(previous.item);
    }
    this.#centre();
    this.#activate();
  }

  #activate() {
    const current = this.#slots[1];
    if (!current) return;
    for (const slot of this.#slots) slot.video.pause();
    // The previous clip relinquishes its decoder and buffer. Only current + next preload.
    this.#release(this.#slots[0].video);
    this.#load(current);
    this.#load(this.#slots[2]);
    this.#onChange(current.clip.label);
    if (this.#playing && !this.#motion.matches)
      void current.video.play().catch(this.#onError);
  }

  open() {
    this.close();
    if (!this.#clips.length) return;
    const current = this.#pick();
    this.#slots = [this.#pick(current), current, this.#pick(current)].map(
      (clip) => this.#slot(clip),
    );
    this.#element.replaceChildren(...this.#slots.map((slot) => slot.item));
    this.#centre();
    this.#activate();
  }

  setClips(clips: BrainrotClip[]) {
    this.#clips = clips;
  }

  move(direction: number) {
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
    for (const { video } of this.#slots) this.#release(video);
    this.#slots = [];
    this.#element.replaceChildren();
  }
}
