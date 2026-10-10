import { formulaMarkdown } from './formula-copy';

// Native copying omits user-select:none formulas. Serialize a detached copy
// instead, leaving the visible selection and annotation anchors untouched.
export function copySelectionWithMath(
  event: ClipboardEvent,
  formulas: HTMLElement[],
) {
  const selection = window.getSelection();
  if (
    event.defaultPrevented ||
    !event.clipboardData ||
    !selection ||
    selection.isCollapsed ||
    document.activeElement?.closest(
      'input, textarea, [contenteditable], .cm-editor',
    )
  )
    return;
  const ranges = Array.from({ length: selection.rangeCount }, (_, i) =>
    selection.getRangeAt(i).cloneRange(),
  );
  if (
    !formulas.some((math) => ranges.some((range) => range.intersectsNode(math)))
  )
    return;

  const content = document.createElement('div');
  for (const range of ranges) {
    // A selection endpoint inside a formula still copies that whole formula.
    for (const edge of ['start', 'end'] as const) {
      const node = edge === 'start' ? range.startContainer : range.endContainer;
      const element = node instanceof Element ? node : node.parentElement;
      const math = element?.closest('.katex');
      if (math) {
        const block = math.closest('.katex-display') || math;
        if (edge === 'start') range.setStartBefore(block);
        else range.setEndAfter(block);
      }
    }
    content.append(range.cloneContents());
  }
  for (const math of content.querySelectorAll('.katex')) {
    math.replaceWith(document.createTextNode(formulaMarkdown(math)));
  }
  content
    .querySelectorAll(
      'script, style, template, dialog:not([open]), [hidden], [aria-hidden="true"], button, input, textarea, select',
    )
    .forEach((element) => element.remove());
  event.clipboardData.setData(
    'text/plain',
    plainText(content)
      .replace(/\n{3,}/g, '\n\n')
      .trim(),
  );
  event.clipboardData.setData('text/html', content.innerHTML);
  event.preventDefault();
}

function plainText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
  if (!(node instanceof Element)) return '';
  if (node.tagName === 'BR') return '\n';
  const text = Array.from(node.childNodes, plainText).join('');
  if (
    /^(P|H[1-6]|BLOCKQUOTE|PRE|DIV|SECTION|ARTICLE|UL|OL|TABLE)$/.test(
      node.tagName,
    )
  )
    return `\n\n${text}\n\n`;
  if (/^(LI|TR)$/.test(node.tagName)) return `${text}\n`;
  if (/^(TD|TH)$/.test(node.tagName)) return `${text}\t`;
  return text;
}
