import { anchorSelection } from '../lib/text-anchors';
import type { TextAnchor } from '../lib/annotations';

export function setupSelection(
  root: HTMLElement | null,
  onSelect: (anchor: TextAnchor, action: 'highlight' | 'comment') => void,
) {
  const toolbar = document.querySelector<HTMLElement>('#selection-actions')!;
  let pending: TextAnchor | null = null;
  let range: Range | null = null;
  let pointerDown = false;
  let timer = 0;
  const hide = () => {
    toolbar.hidden = true;
    pending = null;
    range = null;
  };
  if (!root) return hide;

  function position() {
    if (!range || toolbar.hidden) return;
    const rect = range.getBoundingClientRect();
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft || 0;
    const top = viewport?.offsetTop || 0;
    const width = viewport?.width || innerWidth;
    const height = viewport?.height || innerHeight;
    if (rect.bottom < top || rect.top > top + height) {
      hide();
      return;
    }
    const touch = matchMedia('(pointer: coarse)').matches;
    toolbar.classList.toggle('touch-selection', touch);
    toolbar.style.left = `${Math.max(left + 8, Math.min(rect.left + rect.width / 2 - toolbar.offsetWidth / 2, left + width - toolbar.offsetWidth - 8))}px`;
    const above = rect.top - toolbar.offsetHeight - 10;
    toolbar.style.top = `${touch ? top + height - toolbar.offsetHeight - 16 : Math.max(top + 8, Math.min(above > top + 8 ? above : rect.bottom + 10, top + height - toolbar.offsetHeight - 8))}px`;
  }
  function capture() {
    if (pointerDown || toolbar.contains(document.activeElement)) return;
    const selection = window.getSelection();
    if (
      !selection ||
      selection.isCollapsed ||
      !selection.rangeCount ||
      document.querySelector('dialog[open]')
    ) {
      hide();
      return;
    }
    const candidate = selection.getRangeAt(0);
    const anchor = anchorSelection(root!, candidate);
    if (!anchor) {
      hide();
      return;
    }
    pending = anchor;
    range = candidate.cloneRange();
    toolbar.hidden = false;
    position();
  }
  document.addEventListener('selectionchange', () => {
    clearTimeout(timer);
    timer = window.setTimeout(capture, 180);
  });
  document.addEventListener('pointerdown', (event) => {
    if (toolbar.contains(event.target as Node)) return;
    pointerDown = true;
    hide();
  });
  document.addEventListener('pointerup', () => {
    pointerDown = false;
    capture();
  });
  document.addEventListener('pointercancel', () => {
    pointerDown = false;
  });
  // Keep the native selection while a pointer activates its action.
  toolbar.addEventListener('pointerdown', (event) => event.preventDefault());
  for (const action of ['highlight', 'comment'] as const) {
    document
      .querySelector(`#${action}-selection`)!
      .addEventListener('click', () => {
        if (!pending) return;
        const anchor = pending;
        hide();
        window.getSelection()?.removeAllRanges();
        onSelect(anchor, action);
      });
  }
  document.addEventListener('keydown', (event) => {
    if (toolbar.hidden) return;
    if (event.key === 'Escape') {
      const hadFocus = toolbar.contains(document.activeElement);
      hide();
      if (hadFocus) {
        root!.tabIndex = -1;
        root!.focus({ preventScroll: true });
      }
      event.preventDefault();
    }
    if (
      event.key === 'Tab' &&
      !event.shiftKey &&
      !toolbar.contains(document.activeElement)
    ) {
      event.preventDefault();
      document
        .querySelector<HTMLButtonElement>('#highlight-selection')!
        .focus({ preventScroll: true });
    }
  });
  toolbar.addEventListener('focusout', (event) => {
    if (!toolbar.contains(event.relatedTarget as Node | null)) hide();
  });
  window.addEventListener('scroll', position, { passive: true });
  window.addEventListener('resize', position);
  window.visualViewport?.addEventListener('resize', position);
  window.visualViewport?.addEventListener('scroll', position);
  return hide;
}
