const progress = document.querySelector<HTMLElement>('.section-progress');
const content = document.querySelector<HTMLElement>('.lesson-body');
if (progress && content) {
  const sections = [...progress.querySelectorAll<HTMLAnchorElement>('a')]
    .map((link) => ({
      link,
      target: document.getElementById(decodeURIComponent(link.hash.slice(1))),
    }))
    .filter((section) => section.target);
  let frame = 0;
  function update() {
    frame = 0;
    const header = document.querySelector<HTMLElement>('.site-header');
    const offset =
      Math.max(
        progress!.getBoundingClientRect().bottom + 24,
        (header?.offsetHeight || 0) + 80,
      ) + 2;
    const bottom = content!.getBoundingClientRect().bottom;
    const finished = bottom <= innerHeight;
    let current = 0;
    sections.forEach(({ link, target }, index) => {
      const start = target!.getBoundingClientRect().top;
      const end =
        sections[index + 1]?.target!.getBoundingClientRect().top ?? bottom;
      const fraction = finished
        ? 1
        : Math.min(1, Math.max(0, (offset - start) / Math.max(1, end - start)));
      link.style.setProperty('--section-progress', String(fraction));
      if (start <= offset) current = index;
    });
    sections.forEach(({ link }, index) => {
      if (index === (finished ? sections.length - 1 : current))
        link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(content);
  document.fonts.ready.then(schedule);
  sections.forEach(({ link, target }) =>
    link.addEventListener('click', () => {
      target!.tabIndex = -1;
      target!.focus({ preventScroll: true });
    }),
  );
  schedule();
}
