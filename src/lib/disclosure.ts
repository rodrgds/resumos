/** Keep small non-modal menus dismissible without moving the document. */
export function setupDisclosure(
  details: HTMLDetailsElement,
  options: { persistent?: () => boolean } = {},
) {
  const summary = details.querySelector('summary')!;
  details.addEventListener('keydown', (event) => {
    if (options.persistent?.()) return;
    if (event.key !== 'Escape' || !details.open) return;
    event.preventDefault();
    event.stopPropagation();
    details.open = false;
    summary.focus();
  });
  document.addEventListener('pointerdown', (event) => {
    if (options.persistent?.()) return;
    if (document.querySelector('dialog:modal')) return;
    if (event.target instanceof Node && !details.contains(event.target))
      details.open = false;
  });
  details.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    if (!options.persistent?.()) details.open = false;
    const target = document.getElementById(
      decodeURIComponent(link.hash.slice(1)),
    );
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });
}
