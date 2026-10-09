const key = 'resumos-reading-variant';
const paths: Record<string, string> = JSON.parse(
  document.getElementById('tldr-paths')?.textContent || '{}',
);
const reverse = Object.fromEntries(
  Object.entries(paths).map(([full, short]) => [short, full]),
);
function preference() {
  try {
    return (
      (localStorage.getItem(key) ||
        (location.pathname.endsWith('/tldr/') ? 'tldr' : 'full')) === 'tldr'
    );
  } catch {
    return location.pathname.endsWith('/tldr/');
  }
}
function updateLink(link: HTMLAnchorElement) {
  if (
    link.hasAttribute('data-tldr-toggle') ||
    link.closest('.lesson-body, .lesson-practice, .page-sections') ||
    link.hash
  )
    return;
  const url = new URL(link.href);
  if (url.origin !== location.origin || url.search || url.hash) return;
  const full = reverse[url.pathname] || url.pathname;
  const target = preference() ? paths[full] : reverse[url.pathname];
  if (target) link.href = target;
}
function updateLinks() {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href]'))
    updateLink(link);
}
for (const name of ['pointerdown', 'click']) {
  document.addEventListener(
    name,
    (event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href]')
          : null;
      if (target) updateLink(target);
    },
    true,
  );
}
for (const toggle of document.querySelectorAll<HTMLAnchorElement>(
  '[data-tldr-toggle]',
)) {
  toggle.addEventListener('click', () => {
    try {
      localStorage.setItem(key, toggle.dataset.tldrToggle!);
    } catch {
      /* Links still work without storage. */
    }
  });
  toggle.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      toggle.click();
    }
  });
}
window.addEventListener('storage', (event) => {
  if (event.key === key) updateLinks();
});
updateLinks();
