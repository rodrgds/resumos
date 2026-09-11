const root = document.documentElement;
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function variant() {
  const palette = root.dataset.palette || 'feup';
  const theme = root.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
  return `${palette}-${theme}${palette === 'feup' ? `-${root.dataset.accent || 'red'}` : ''}`;
}

for (const figure of document.querySelectorAll<HTMLElement>('[data-manim]')) {
  const video = figure.querySelector('video')!;
  const toggle = figure.querySelector<HTMLButtonElement>('.manim-toggle')!;
  const indicator = figure.querySelector<HTMLElement>('.manim-paused')!;
  const error = figure.querySelector<HTMLElement>('.manim-error')!;
  const fallback = error.querySelector('a')!;
  fallback.href = video.src;
  let userPaused = reducedMotion.matches;
  let visible = false;
  let pending: { time: number; rate: number } | undefined;
  let restore: AbortController | undefined;

  const shouldPlay = () => !userPaused && visible && !document.hidden;

  function syncPlayback() {
    indicator.hidden = !userPaused;
    toggle.setAttribute(
      'aria-label',
      `${userPaused ? 'Reproduzir' : 'Pausar'}: ${figure.dataset.title}`,
    );
    if (!shouldPlay()) {
      video.pause();
      return;
    }
    if (pending || !video.paused) return;
    void video.play().catch((reason: unknown) => {
      // Browser autoplay policies can still require an explicit gesture.
      if (
        reason instanceof DOMException &&
        reason.name === 'NotAllowedError' &&
        shouldPlay()
      ) {
        userPaused = true;
        syncPlayback();
      }
    });
  }

  function update() {
    const next = variant();
    if (figure.dataset.variant === next) return;
    figure.dataset.variant = next;
    error.hidden = true;
    restore?.abort();
    // Keep the original position through several palette changes while loading.
    pending ??= { time: video.currentTime, rate: video.playbackRate };
    video.defaultPlaybackRate = pending.rate;
    video.poster = `${figure.dataset.base}/${next}.webp`;
    video.src = `${figure.dataset.base}/${next}.mp4`;
    fallback.href = video.src;
    if (pending.time === 0 && !shouldPlay()) {
      pending = undefined;
      video.preload = 'none';
      return;
    }
    restore = new AbortController();
    video.addEventListener(
      'loadedmetadata',
      () => {
        if (!pending) return;
        const state = pending;
        pending = undefined;
        video.preload = 'none';
        video.currentTime = Math.min(state.time, video.duration);
        video.playbackRate = state.rate;
        syncPlayback();
      },
      { once: true, signal: restore.signal },
    );
    video.preload = 'metadata';
    video.load();
  }

  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    syncPlayback();
  });
  video.addEventListener('error', () => {
    pending = undefined;
    error.hidden = false;
    userPaused = true;
    syncPlayback();
  });
  video.addEventListener('playing', () => {
    error.hidden = true;
    if (!shouldPlay()) video.pause();
  });
  // Scrolling away pauses work, but never clears an explicit reader pause.
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncPlayback();
  }).observe(video);
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) userPaused = true;
    syncPlayback();
  });
  new MutationObserver(update).observe(root, {
    attributes: true,
    attributeFilter: ['data-palette', 'data-theme', 'data-accent'],
  });
  systemTheme.addEventListener('change', update);
  update();
  syncPlayback();
  toggle.hidden = false;
}
