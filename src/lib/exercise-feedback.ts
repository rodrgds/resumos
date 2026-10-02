import confetti from 'canvas-confetti';

const BURST_WIDTH = 220;
const BURST_HEIGHT = 160;
const COLOUR_TOKENS = ['--accent', '--diagram-secondary'];

interface FeedbackOptions {
  correct: boolean;
  trigger?: HTMLElement | null;
  response?: HTMLElement | null;
}

function themeColours(root: HTMLElement): string[] {
  const probe = document.createElement('span');
  probe.hidden = true;
  root.append(probe);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d');
  if (!context) {
    probe.remove();
    return [];
  }
  const colours = COLOUR_TOKENS.map((token) => {
    probe.style.color = `var(${token})`;
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = getComputedStyle(probe).color;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
    return `#${[red, green, blue].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  });
  probe.remove();
  return colours;
}

/** Effects belong to fresh validation only, never restored progress. */
export function createExerciseFeedback(root: HTMLElement) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let canvas: HTMLCanvasElement | undefined;
  let burst: ReturnType<typeof confetti.create> | undefined;
  let nudge: Animation | undefined;

  const stop = () => {
    burst?.reset();
    burst = undefined;
    canvas?.remove();
    canvas = undefined;
    nudge?.cancel();
    nudge = undefined;
  };
  const onVisibility = () => {
    if (document.hidden) stop();
  };
  const onDisclosure = (event: Event) => {
    if (event.target instanceof HTMLDetailsElement && !event.target.open)
      stop();
  };
  const dispose = () => {
    stop();
    reducedMotion.removeEventListener('change', stop);
    document.removeEventListener('visibilitychange', onVisibility);
    document.removeEventListener('astro:before-swap', dispose);
    window.removeEventListener('pagehide', stop);
    window.removeEventListener('scroll', stop, true);
    window.removeEventListener('resize', stop);
    root.removeEventListener('toggle', onDisclosure, true);
  };
  reducedMotion.addEventListener('change', stop);
  document.addEventListener('visibilitychange', onVisibility);
  document.addEventListener('astro:before-swap', dispose);
  window.addEventListener('pagehide', stop);
  window.addEventListener('scroll', stop, true);
  window.addEventListener('resize', stop);
  root.addEventListener('toggle', onDisclosure, true);

  return {
    dispose,
    reset: stop,
    play({ correct, trigger, response }: FeedbackOptions) {
      stop();
      if (reducedMotion.matches || document.hidden || !root.isConnected) return;
      if (!correct) {
        if (!response) return;
        nudge = response.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-3px)' },
            { transform: 'translateX(2px)' },
            { transform: 'translateX(0)' },
          ],
          { duration: 180, easing: 'ease-out' },
        );
        return;
      }
      if (!trigger) return;
      const colours = themeColours(root);
      if (!colours.length) return;
      const bounds = trigger.getBoundingClientRect();
      const centre = bounds.left + bounds.width / 2;
      const left = Math.max(
        0,
        Math.min(innerWidth - BURST_WIDTH, centre - BURST_WIDTH / 2),
      );
      const top = Math.max(0, bounds.top - BURST_HEIGHT * 0.7);
      const currentCanvas = document.createElement('canvas');
      currentCanvas.className = 'exercise-confetti';
      currentCanvas.setAttribute('aria-hidden', 'true');
      currentCanvas.width = BURST_WIDTH;
      currentCanvas.height = BURST_HEIGHT;
      currentCanvas.style.left = `${left}px`;
      currentCanvas.style.top = `${top}px`;
      document.body.append(currentCanvas);
      canvas = currentCanvas;
      burst = confetti.create(currentCanvas, {
        resize: false,
        useWorker: false,
      });
      void burst({
        particleCount: 18,
        spread: 65,
        startVelocity: 13,
        gravity: 0.8,
        ticks: 45,
        scalar: 0.55,
        colors: colours,
        origin: {
          x: (centre - left) / BURST_WIDTH,
          y: (bounds.top - top) / BURST_HEIGHT,
        },
        disableForReducedMotion: true,
      })?.then(() => {
        currentCanvas.remove();
        if (canvas === currentCanvas) {
          canvas = undefined;
          burst = undefined;
        }
      });
    },
  };
}
