/** Keep small non-modal menus dismissible without moving the document. */
export function setupDisclosure(details: HTMLDetailsElement) {
  const summary = details.querySelector('summary')!;
  details.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !details.open) return;
    event.preventDefault();
    event.stopPropagation();
    details.open = false;
    summary.focus();
  });
  document.addEventListener('pointerdown', (event) => {
    if (document.querySelector('dialog:modal')) return;
    if (event.target instanceof Node && !details.contains(event.target))
      details.open = false;
  });
  details.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    details.open = false;
    const target = document.getElementById(
      decodeURIComponent(link.hash.slice(1)),
    );
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });
}
