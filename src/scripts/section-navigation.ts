import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';

const sidebar = document.querySelector<HTMLElement>('.page-sections');
const content = document.querySelector<HTMLElement>('.lesson-body');
if (sidebar && content) {
  const desktop = matchMedia('(min-width: 1200px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [
    ...sidebar.querySelectorAll<HTMLAnchorElement>('.toc-links a'),
  ]
    .map((link) => ({
      link,
      target: document.getElementById(decodeURIComponent(link.hash.slice(1))),
    }))
    .filter((section) => section.target);
  const drawings = new Map<HTMLAnchorElement, RoughAnnotation>();
  const states = new Map<HTMLAnchorElement, string>();
  let frame = 0;
  function clear(link: HTMLAnchorElement) {
    drawings.get(link)?.remove();
    drawings.delete(link);
    delete link.dataset.drawn;
  }
  function update() {
    frame = 0;
    const line =
      (document.querySelector<HTMLElement>('.site-header')?.offsetHeight || 0) +
      26;
    const finished = content!.getBoundingClientRect().bottom <= innerHeight;
    let current = -1;
    sections.forEach(({ target }, index) => {
      if (target!.getBoundingClientRect().top <= line) current = index;
    });
    sections.forEach(({ link, target }, index) => {
      const next = sections
        .slice(index + 1)
        .find((section) => section.target!.tagName <= target!.tagName);
      const completed =
        finished ||
        (next ? next.target!.getBoundingClientRect().top <= line : false);
      const active = !finished && index === current;
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
      link.toggleAttribute('data-completed', completed);
      const type = desktop.matches
        ? completed
          ? 'strike-through'
          : active
            ? 'underline'
            : null
        : null;
      const changed = states.get(link) !== (type || '');
      states.set(link, type || '');
      if (!type) {
        clear(link);
        return;
      }
      if (drawings.has(link) && link.dataset.drawn === type) return;
      clear(link);
      const label = link.querySelector<HTMLElement>('.toc-label')!;
      const drawing = annotate(label, {
        type,
        color: 'var(--accent)',
        strokeWidth: 1,
        padding: 0,
        multiline: true,
        animate: changed && !reducedMotion.matches,
        animationDuration: 500,
        iterations: 1,
      });
      drawing.show();
      label.nextElementSibling?.setAttribute('aria-hidden', 'true');
      drawings.set(link, drawing);
      link.dataset.drawn = type;
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  function redraw() {
    sections.forEach(({ link }) => clear(link));
    schedule();
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', redraw);
  new ResizeObserver(redraw).observe(sidebar);
  new ResizeObserver(schedule).observe(content);
  document.fonts.ready.then(redraw);
  desktop.addEventListener('change', redraw);
  reducedMotion.addEventListener('change', redraw);
  sections.forEach(({ link, target }) =>
    link.addEventListener('click', () => {
      target!.tabIndex = -1;
      target!.focus({ preventScroll: true });
    }),
  );
  schedule();
}
