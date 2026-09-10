import { setupDisclosure } from '../lib/disclosure';

const header = document.querySelector<HTMLElement>('.site-header');
const menu = document.querySelector<HTMLDetailsElement>('.header-menu');
if (menu) setupDisclosure(menu);
if (header) {
  const mobile = matchMedia('(max-width: 700px)');
  let previous = scrollY;
  let distance = 0;
  let frame = 0;
  function show(hidden: boolean) {
    header!.classList.toggle('header-hidden', hidden);
    const offset = hidden ? '0px' : `${header!.offsetHeight}px`;
    if (
      document.documentElement.style.getPropertyValue('--header-offset') !==
      offset
    )
      document.documentElement.style.setProperty('--header-offset', offset);
  }
  function update() {
    frame = 0;
    const delta = scrollY - previous;
    previous = scrollY;
    if (
      !mobile.matches ||
      scrollY < 100 ||
      header!.matches(':focus-within') ||
      menu?.open ||
      document.querySelector('dialog[open], #scratchpad:not([hidden])')
    ) {
      distance = 0;
      show(false);
      return;
    }
    distance =
      Math.sign(delta) === Math.sign(distance) ? distance + delta : delta;
    if (Math.abs(distance) > 12) show(distance > 0);
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => show(false));
  new ResizeObserver(() => show(false)).observe(header);
  mobile.addEventListener('change', () => {
    previous = scrollY;
    show(false);
  });
}
