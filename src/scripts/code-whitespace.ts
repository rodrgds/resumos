let marked = new Set<HTMLElement>();

document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();
  const next = new Set<HTMLElement>();
  if (selection && !selection.isCollapsed) {
    const markers = document.querySelectorAll<HTMLElement>(
      'pre.astro-code .space, pre.astro-code .tab',
    );
    for (let index = 0; index < selection.rangeCount; index++) {
      const range = selection.getRangeAt(index);
      for (const marker of markers) {
        const text = marker.firstChild;
        if (
          text instanceof Text &&
          range.isPointInRange(text, 0) &&
          range.isPointInRange(text, text.length)
        )
          next.add(marker);
      }
    }
  }
  for (const marker of marked) {
    if (!next.has(marker)) marker.removeAttribute('data-selected-whitespace');
  }
  for (const marker of next) {
    if (!marked.has(marker))
      marker.setAttribute('data-selected-whitespace', '');
  }
  marked = next;
});
