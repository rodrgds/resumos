import '../styles/vim-reading.css';

const MAX_COUNT = 999;
const excluded =
  '[data-pagefind-ignore], [hidden], [aria-hidden="true"], .sr-only, input, textarea, select, button, [contenteditable], .cm-editor, svg, math, script, style';
type Passage = { node: Text; start: number; block: Element };

/** A read-only Range cursor. Nothing is inserted into the lesson or saved. */
export function setupVimReading() {
  const article = document.querySelector<HTMLElement>('[data-annotatable]');
  const dialog = document.querySelector<HTMLDialogElement>('#vim-search')!;
  const input = document.querySelector<HTMLInputElement>('#vim-search-input')!;
  const status = document.querySelector<HTMLElement>('#vim-search-status')!;
  const cursor = document.createElement('div');
  cursor.dataset.vimCursor = '';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.hidden = true;
  document.body.append(cursor);
  const feedback = document.createElement('p');
  feedback.dataset.vimStatus = '';
  feedback.setAttribute('role', 'status');
  document.body.append(feedback);
  let enabled = false;
  let passages: Passage[] = [];
  let text = '';
  let position = 0;
  let active = false;
  let count = '';
  let pendingG = false;
  let selectionMode: 'character' | 'line' | null = null;
  let selectionAnchor = 0;
  let query = '';
  let matches: number[] = [];
  let frame = 0;
  let opener: HTMLElement | null = null;

  function index() {
    if (!article) return;
    passages = [];
    text = '';
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const parent = node.parentElement!;
      const block = parent.closest(
        'p, li, h1, h2, h3, h4, h5, h6, pre, td, th, blockquote, summary',
      );
      if (
        !node.data ||
        (!node.data.trim() && !block) ||
        parent.closest(excluded) ||
        !parent.checkVisibility()
      )
        continue;
      if (!node.data.trim() && block?.tagName !== 'PRE') {
        const whitespace = document.createRange();
        whitespace.selectNodeContents(node);
        if (!whitespace.getBoundingClientRect().width) continue;
      }
      const readingBlock = block || parent;
      if (passages.length && passages.at(-1)!.block !== readingBlock)
        text += '\n';
      passages.push({ node, start: text.length, block: readingBlock });
      text += node.data;
    }
    text = text.trimEnd();
  }

  function point(offset: number) {
    const passage =
      passages.findLast((entry) => entry.start <= offset) || passages[0];
    if (!passage) return null;
    return {
      node: passage.node,
      offset: Math.min(offset - passage.start, passage.node.length - 1),
    };
  }

  function range() {
    const at = point(position);
    if (!at) return null;
    const result = document.createRange();
    result.setStart(at.node, Math.max(0, at.offset));
    const characterLength =
      (at.node.data.codePointAt(at.offset) ?? 0) > 0xffff ? 2 : 1;
    result.setEnd(
      at.node,
      Math.min(at.node.length, at.offset + characterLength),
    );
    return result;
  }

  function draw() {
    frame = 0;
    const rect = active && enabled ? range()?.getBoundingClientRect() : null;
    cursor.hidden = !rect || !rect.height;
    if (!rect) return;
    Object.assign(cursor.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${Math.max(2, rect.width)}px`,
      height: `${rect.height}px`,
    });
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function move(to: number) {
    position = Math.max(0, Math.min(text.length - 1, to));
    active = true;
    if (!selectionMode) feedback.textContent = '';
    // A reading motion owns the cursor; leave focused controls to Tab again.
    if (!document.querySelector('dialog[open]'))
      (document.activeElement as HTMLElement | null)?.blur?.();
    if (selectionMode) selectRange();
    const rect = range()?.getBoundingClientRect();
    if (rect && (rect.top < 100 || rect.bottom > innerHeight - 40)) {
      window.scrollBy({ top: rect.top - innerHeight / 3, behavior: 'instant' });
    }
    draw();
  }

  function selectRange() {
    const selection = window.getSelection();
    const start = point(Math.min(selectionAnchor, position));
    const end = point(Math.max(selectionAnchor, position));
    if (!selection || !start || !end) return;
    let startNode: Node = start.node;
    let startOffset = start.offset;
    let endNode: Node = end.node;
    let endOffset = Math.min(
      end.node.length,
      end.offset +
        ((end.node.data.codePointAt(end.offset) ?? 0) > 0xffff ? 2 : 1),
    );
    if (selectionMode === 'line' && selection.modify) {
      selection.collapse(start.node, start.offset);
      selection.modify('move', 'backward', 'lineboundary');
      if (selection.focusNode && article?.contains(selection.focusNode)) {
        startNode = selection.focusNode;
        startOffset = selection.focusOffset;
      }
      selection.collapse(end.node, end.offset);
      selection.modify('move', 'forward', 'lineboundary');
      if (selection.focusNode && article?.contains(selection.focusNode)) {
        endNode = selection.focusNode;
        endOffset = selection.focusOffset;
      }
    }
    if (position < selectionAnchor)
      selection.setBaseAndExtent(endNode, endOffset, startNode, startOffset);
    else selection.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
  }

  function mousePlacement(event: PointerEvent) {
    if (
      !enabled ||
      event.button !== 0 ||
      event.pointerType !== 'mouse' ||
      document.querySelector('dialog[open]')
    )
      return;
    const target = event.target as Element;
    if (target.closest(`${excluded}, [role="button"], [role="tab"]`)) return;
    index();
    const selection = window.getSelection();
    if (target.closest('a[href]') && (!selection || selection.isCollapsed))
      return;
    let node: Node | null = null;
    let offset = 0;
    selectionMode = null;
    if (
      selection &&
      !selection.isCollapsed &&
      article?.contains(selection.anchorNode) &&
      article.contains(selection.focusNode)
    ) {
      const selected = selection.getRangeAt(0);
      node = selection.focusNode;
      const forward =
        node === selected.endContainer &&
        selection.focusOffset === selected.endOffset;
      offset = selection.focusOffset - (forward ? 1 : 0);
      const anchor = passages.find(
        (entry) => entry.node === selection.anchorNode,
      );
      if (anchor) {
        selectionAnchor = characterStart(
          anchor.start + selection.anchorOffset - (forward ? 0 : 1),
        );
        selectionMode = 'character';
      }
    } else {
      const caret = document.caretPositionFromPoint?.(
        event.clientX,
        event.clientY,
      );
      // Older Safari exposes only the legacy caret hit-test API.
      const legacy = document as {
        caretRangeFromPoint?: (x: number, y: number) => Range | null;
      };
      const fallback = !caret
        ? legacy.caretRangeFromPoint?.(event.clientX, event.clientY)
        : null;
      node = caret?.offsetNode ?? fallback?.startContainer ?? null;
      offset = caret?.offset ?? fallback?.startOffset ?? 0;
    }
    const at = passages.find((entry) => entry.node === node);
    if (!at) return;
    count = '';
    pendingG = false;
    // Keep the native drag selection exactly as made, including its direction.
    position = characterStart(at.start + Math.min(offset, at.node.length - 1));
    active = true;
    feedback.textContent = '';
    draw();
  }

  function characterStart(offset: number) {
    const start = Math.max(0, Math.min(offset, text.length - 1));
    return /[\uDC00-\uDFFF]/.test(text[start] || '')
      ? Math.max(0, start - 1)
      : start;
  }

  async function yank() {
    const selection = window.getSelection();
    if (
      !selection ||
      selection.isCollapsed ||
      !article?.contains(selection.anchorNode) ||
      !article.contains(selection.focusNode)
    ) {
      feedback.textContent = 'Seleciona texto para copiar.';
      return;
    }
    try {
      await navigator.clipboard.writeText(selection.toString());
      if (enabled) feedback.textContent = 'Texto copiado.';
    } catch {
      if (enabled)
        feedback.textContent = 'Não foi possível copiar. Usa Ctrl/Cmd+C.';
    }
    selectionMode = null;
  }

  function selectionChanged() {
    if (selectionMode && window.getSelection()?.isCollapsed) {
      selectionMode = null;
      feedback.textContent = '';
    }
  }

  // Let the browser resolve visual lines, then restore the reader's selection.
  function visual(
    direction: 'forward' | 'backward',
    granularity: 'line' | 'lineboundary',
  ) {
    const selection = window.getSelection();
    const at = point(position);
    if (!selection || !at || !selection.modify) return;
    const saved = Array.from({ length: selection.rangeCount }, (_, i) =>
      selection.getRangeAt(i).cloneRange(),
    );
    const anchor = selection.anchorNode;
    const anchorOffset = selection.anchorOffset;
    const focus = selection.focusNode;
    const focusOffset = selection.focusOffset;
    try {
      selection.collapse(at.node, at.offset);
      selection.modify('move', direction, granularity);
      const destination = passages.find(
        (entry) => entry.node === selection.focusNode,
      );
      if (destination)
        position =
          destination.start +
          Math.min(selection.focusOffset, destination.node.length - 1);
      else if (selection.focusNode) {
        // Skip controls, hidden maths fallbacks and other non-reading nodes.
        const boundary = document.createRange();
        boundary.setStart(selection.focusNode, selection.focusOffset);
        boundary.collapse(true);
        const next =
          direction === 'forward'
            ? passages.find((entry) => boundary.comparePoint(entry.node, 0) > 0)
            : passages.findLast(
                (entry) =>
                  boundary.comparePoint(entry.node, entry.node.length) < 0,
              );
        if (next)
          position =
            next.start + (direction === 'forward' ? 0 : next.node.length - 1);
      }
    } finally {
      selection.removeAllRanges();
      if (anchor && focus && saved.length === 1)
        selection.setBaseAndExtent(anchor, anchorOffset, focus, focusOffset);
      else for (const item of saved) selection.addRange(item);
    }
  }

  function findMatches(value: string) {
    matches = [];
    const needle = value.toLocaleLowerCase();
    if (needle) {
      const haystack = text.toLocaleLowerCase();
      let at = haystack.indexOf(needle);
      while (at !== -1) {
        matches.push(at);
        at = haystack.indexOf(needle, at + Math.max(1, needle.length));
      }
    }
    status.textContent = !value
      ? 'Escreve para pesquisar nesta página.'
      : !matches.length
        ? 'Sem resultados nesta página.'
        : `${matches.length} ${matches.length === 1 ? 'resultado' : 'resultados'} nesta página. Enter para avançar.`;
  }

  function nextMatch(backward: boolean) {
    if (!matches.length) return;
    const next = backward
      ? (matches.findLast((at) => at < position) ?? matches.at(-1)!)
      : (matches.find((at) => at > position) ?? matches[0]);
    move(next);
  }

  input.addEventListener('input', () => findMatches(input.value));
  dialog.querySelector('form')!.addEventListener('submit', (event) => {
    event.preventDefault();
    query = input.value;
    findMatches(query);
    if (!matches.length) return;
    dialog.close('match');
    nextMatch(false);
  });
  dialog.addEventListener('cancel', () => {
    query = '';
    matches = [];
    count = '';
    pendingG = false;
  });
  dialog.addEventListener('close', () => {
    input.value = '';
    if (dialog.returnValue === 'match') return;
    query = '';
    matches = [];
    if (
      document.activeElement === document.body ||
      dialog.contains(document.activeElement)
    )
      opener?.focus({ preventScroll: true });
  });

  function handle({
    key,
    repeat: repeatEvent,
    target,
  }: Pick<KeyboardEvent, 'key' | 'repeat' | 'target'>) {
    if (!enabled || !article) return false;
    if (
      repeatEvent &&
      !['h', 'j', 'k', 'l', 'w', 'b', 'e', '0', '^', '$', '{', '}'].includes(
        key,
      )
    )
      return false;
    if (key === 'Escape') {
      if (selectionMode) window.getSelection()?.removeAllRanges();
      selectionMode = null;
      feedback.textContent = '';
      count = '';
      pendingG = false;
      query = '';
      matches = [];
      return false;
    }
    if (key === 'v' || key === 'V') {
      index();
      const mode = key === 'V' ? 'line' : 'character';
      if (selectionMode === mode) {
        selectionMode = null;
        feedback.textContent = '';
        window.getSelection()?.removeAllRanges();
      } else {
        if (!selectionMode) selectionAnchor = position;
        selectionMode = mode;
        feedback.textContent = `${mode === 'line' ? 'Seleção de linhas' : 'Seleção de caracteres'}. y copia; Tab destaca ou comenta.`;
        move(position);
      }
      return true;
    }
    if (key === 'y') {
      count = '';
      pendingG = false;
      void yank();
      return true;
    }
    if (key === 'Enter' || key === ' ') {
      if (
        selectionMode ||
        (target as Element)
          ?.closest(
            'a, button, input, select, textarea, summary, [role="button"], [role="tab"]',
          )
          ?.checkVisibility()
      )
        return false;
      const at = point(position);
      if (!at) return false;
      const control =
        at.node.parentElement?.closest<HTMLElement>('summary, a[href]');
      if (!control || (key === ' ' && control.tagName !== 'SUMMARY'))
        return false;
      control.click();
      index();
      const next = passages.find((entry) => entry.node === at.node);
      if (next) move(next.start + at.offset);
      return true;
    }
    if (key === '/') {
      index();
      count = '';
      pendingG = false;
      input.value = query;
      findMatches(query);
      dialog.returnValue = '';
      opener =
        document.activeElement instanceof HTMLElement &&
        document.activeElement !== document.body
          ? document.activeElement
          : document.querySelector<HTMLElement>('.brand');
      dialog.showModal();
      input.focus();
      return true;
    }
    if ((key === 'n' || key === 'N') && query) {
      const repeat = Number(count) || 1;
      count = '';
      pendingG = false;
      for (let i = 0; i < repeat; i++) nextMatch(key === 'N');
      return true;
    }
    if (/^[1-9]$/.test(key) || (key === '0' && count)) {
      count = String(Math.min(MAX_COUNT, Number(count + key)));
      return true;
    }
    if (
      ![
        'h',
        'j',
        'k',
        'l',
        'w',
        'b',
        'e',
        '0',
        '^',
        '$',
        'g',
        'G',
        '{',
        '}',
      ].includes(key)
    ) {
      count = '';
      pendingG = false;
      return false;
    }
    index();
    if (!text) return false;
    if (key === 'g' && !pendingG) {
      pendingG = true;
      return true;
    }
    const repeat = Number(count) || 1;
    count = '';
    pendingG = false;
    const words = ['w', 'b', 'e'].includes(key)
      ? Array.from(
          new Intl.Segmenter(undefined, { granularity: 'word' }).segment(text),
        ).filter((word) => word.isWordLike)
      : [];
    for (let i = 0; i < repeat; i++) {
      if (key === 'g') position = 0;
      else if (key === 'G') position = text.length - 1;
      else if (key === 'h' || key === 'l') {
        if (key === 'l')
          position += (text.codePointAt(position) ?? 0) > 0xffff ? 2 : 1;
        else {
          position = Math.max(0, position - 1);
          if (/[\uDC00-\uDFFF]/.test(text[position] || ''))
            position = Math.max(0, position - 1);
        }
      } else if (key === 'w')
        position =
          words.find((word) => word.index > position)?.index ?? text.length - 1;
      else if (key === 'b')
        position = words.findLast((word) => word.index < position)?.index ?? 0;
      else if (key === 'e') {
        const word = words.find(
          (word) => word.index + word.segment.length - 1 > position,
        );
        position = word
          ? word.index + word.segment.length - 1
          : text.length - 1;
      } else if (key === '{' || key === '}') {
        const starts = passages
          .filter(
            (entry, at) => at === 0 || passages[at - 1].block !== entry.block,
          )
          .map((entry) => entry.start);
        position =
          key === '{'
            ? (starts.findLast((at) => at < position) ?? 0)
            : (starts.find((at) => at > position) ?? text.length - 1);
      } else {
        visual(
          key === 'k' || key === '0' || key === '^' ? 'backward' : 'forward',
          key === 'j' || key === 'k' ? 'line' : 'lineboundary',
        );
        if (key === '^')
          while (/\s/.test(text[position] || '') && position < text.length - 1)
            position++;
      }
    }
    move(position);
    return true;
  }

  window.addEventListener('scroll', schedule, { passive: true, capture: true });
  article?.addEventListener('pointerup', mousePlacement);
  document.addEventListener('selectionchange', selectionChanged);
  window.addEventListener('resize', schedule);
  const resize = new ResizeObserver(schedule);
  if (article) resize.observe(article);
  document.fonts.addEventListener('loadingdone', schedule);
  window.addEventListener('pagehide', () => {
    cursor.hidden = true;
    cancelAnimationFrame(frame);
  });
  window.addEventListener('pageshow', schedule);
  document.addEventListener(
    'astro:before-swap',
    () => {
      resize.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      document.fonts.removeEventListener('loadingdone', schedule);
      cancelAnimationFrame(frame);
      cursor.remove();
      feedback.remove();
      article?.removeEventListener('pointerup', mousePlacement);
      document.removeEventListener('selectionchange', selectionChanged);
    },
    { once: true },
  );
  return {
    handle,
    setEnabled(value: boolean) {
      enabled = value;
      count = '';
      pendingG = false;
      selectionMode = null;
      if (enabled && article) {
        index();
        active = true;
      }
      if (!enabled) {
        active = false;
        feedback.textContent = '';
        query = '';
        matches = [];
        text = '';
        passages = [];
        if (dialog.open) dialog.close();
      }
      draw();
    },
  };
}
