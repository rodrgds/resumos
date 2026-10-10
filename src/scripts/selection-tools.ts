import { anchorSelection } from '../lib/text-anchors';
import type { TextAnchor } from '../lib/annotations';
import { copyFormula } from '../lib/formula-copy';
import { copySelectionWithMath } from '../lib/selection-copy';

export function setupSelection(
  root: HTMLElement | null,
  onSelect: (anchor: TextAnchor, action: 'highlight' | 'comment') => void,
) {
  const toolbar = document.querySelector<HTMLElement>('#selection-actions')!;
  const copy = toolbar.querySelector<HTMLButtonElement>(
    '#copy-formula-selection',
  )!;
  const formulas = [
    ...document.querySelectorAll<HTMLElement>(
      '.lesson-body .katex, .lesson-practice .katex',
    ),
  ];
  let activeFormula: HTMLElement | null = null;
  let pending: TextAnchor | null = null;
  let range: Range | null = null;
  let pointerDown = false;
  let pointerStart = { x: 0, y: 0 };
  // An outside press dismisses the popup at once. Until a selection update
  // arrives, the old selection may still look intact (its collapse can land
  // after pointerup), so showing from it would resurrect the popup until
  // the debounced selectionchange hides it again: the visible flicker.
  let dismissedByPress = false;
  let timer = 0;
  const hide = () => {
    toolbar.hidden = true;
    pending = null;
    range = null;
    activeFormula = null;
    copy.hidden = true;
    paintFormulas();
  };
  if (!root) return hide;

  document.addEventListener('copy', (event) =>
    copySelectionWithMath(event, formulas),
  );

  function formulaBlock(formula: HTMLElement) {
    return formula.closest<HTMLElement>('.katex-display') || formula;
  }

  // Keep the DOM and text anchors intact. Only the formula's box is painted,
  // including when a native selection starts or ends outside the article.
  function paintFormulas() {
    const selection = window.getSelection();
    for (const formula of formulas) {
      let selected = formula === activeFormula;
      if (selection && !selection.isCollapsed) {
        for (let i = 0; i < selection.rangeCount; i++)
          selected ||= selection.getRangeAt(i).intersectsNode(formula);
      }
      formula.toggleAttribute('data-formula-selected', selected);
    }
  }

  function activateFormula(formula: HTMLElement) {
    clearTimeout(timer);
    window.getSelection()?.removeAllRanges();
    activeFormula = formula;
    range = new Range();
    range.selectNode(formula);
    pending = anchorSelection(root!, range);
    for (const action of ['highlight', 'comment'])
      toolbar.querySelector<HTMLElement>(`#${action}-selection`)!.hidden =
        !pending;
    copy.hidden = false;
    toolbar.hidden = false;
    paintFormulas();
    position();
  }
  for (const formula of formulas) {
    formula.tabIndex = 0;
    formula.setAttribute('role', 'button');
    formula.setAttribute(
      'aria-label',
      `Ações da fórmula: ${formula.querySelector('annotation')?.textContent || ''}`,
    );
    formulaBlock(formula).addEventListener('click', (event) => {
      // A drag across the formula belongs to the surrounding text selection.
      if (
        event.detail &&
        Math.hypot(
          event.clientX - pointerStart.x,
          event.clientY - pointerStart.y,
        ) > 5
      )
        return;
      event.stopPropagation();
      activateFormula(formula);
    });
    formula.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activateFormula(formula);
    });
  }
  copy.addEventListener('click', () => {
    if (!activeFormula) return;
    const formula = activeFormula;
    hide();
    formula.focus({ preventScroll: true });
    void copyFormula(formula);
  });

  function position() {
    if (!range || toolbar.hidden) return;
    const rect = activeFormula
      ? formulaBlock(activeFormula).getBoundingClientRect()
      : range.getBoundingClientRect();
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
    if (activeFormula && selection?.isCollapsed) return;
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
    const selectedFormula = formulas.find(
      (formula) =>
        candidate.intersectsNode(formula) &&
        anchor.exact ===
          `$${formula.querySelector('annotation[encoding="application/x-tex"]')?.textContent}$`,
    );
    if (selectedFormula) {
      activateFormula(selectedFormula);
      return;
    }
    pending = anchor;
    activeFormula = null;
    copy.hidden = true;
    for (const action of ['highlight', 'comment'])
      toolbar.querySelector<HTMLElement>(`#${action}-selection`)!.hidden =
        false;
    range = candidate.cloneRange();
    toolbar.hidden = false;
    position();
  }
  document.addEventListener('selectionchange', () => {
    clearTimeout(timer);
    paintFormulas();
    // A genuine selection update re-arms showing; the debounce decides.
    dismissedByPress = false;
    timer = window.setTimeout(capture, 180);
  });
  document.addEventListener('pointerdown', (event) => {
    if (toolbar.contains(event.target as Node)) return;
    pointerDown = true;
    pointerStart = { x: event.clientX, y: event.clientY };
    dismissedByPress = true;
    hide();
  });
  document.addEventListener('pointerup', () => {
    pointerDown = false;
    if (dismissedByPress) return;
    capture();
  });
  document.addEventListener('pointercancel', () => {
    pointerDown = false;
    dismissedByPress = false;
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
    if (
      event.key === 'Tab' &&
      !event.shiftKey &&
      !(event.target as Element).closest(
        'input, textarea, select, [contenteditable], .cm-editor',
      )
    ) {
      // Keyboard selection actions must not wait for the selectionchange debounce.
      clearTimeout(timer);
      capture();
    }
    if (toolbar.hidden) return;
    if (event.key === 'Escape') {
      const hadFocus = toolbar.contains(document.activeElement);
      const formula = activeFormula;
      hide();
      if (formula) formula.focus({ preventScroll: true });
      else if (hadFocus) {
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
        .querySelector<HTMLButtonElement>(
          '#selection-actions button:not([hidden])',
        )!
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
