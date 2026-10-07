// Start only visible authored examples, one at a time. Heavy runtimes must not
// compete for memory on a phone or load just because a lesson has many blocks.
const pending = new Map<HTMLElement, (release: () => void) => void>();
const visible = new Set<Element>();
let running = false;
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) visible.add(entry.target);
    else visible.delete(entry.target);
  }
  startNext();
});

function startNext() {
  if (running || document.visibilityState === 'hidden') return;
  for (const [root, start] of pending) {
    if (!visible.has(root)) continue;
    pending.delete(root);
    visible.delete(root);
    observer.unobserve(root);
    running = true;
    start(() => {
      running = false;
      // Finish processing the current result before starting the next runtime.
      queueMicrotask(startNext);
    });
    return;
  }
}

export function observeExample(
  root: HTMLElement,
  start: (release: () => void) => void,
) {
  pending.set(root, start);
  observer.observe(root);
}

document.addEventListener('visibilitychange', startNext);
window.addEventListener('pagehide', () => {
  observer.disconnect();
  pending.clear();
  visible.clear();
});
