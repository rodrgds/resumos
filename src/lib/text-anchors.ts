import type { TextAnchor } from './annotations';

const CONTEXT_LENGTH = 48;
const EXCLUDED =
  'script, style, svg, button, textarea, [data-pagefind-ignore], [data-annotation-ignore], [aria-hidden="true"]';
const MATH = '.katex, math';

export function textIndex(
  root: HTMLElement,
  options: { includeMath?: boolean } = {},
) {
  const nodes: { node: Text | Element; start: number; end: number }[] = [];
  let text = '';
  function append(node: Text | Element, value: string) {
    nodes.push({ node, start: text.length, end: text.length + value.length });
    text += value;
  }
  function visit(node: Node) {
    if (node instanceof Element) {
      if (node.matches(EXCLUDED)) return;
      if (node.matches(MATH)) {
        if (options.includeMath !== false) {
          const source = node.querySelector(
            'annotation[encoding="application/x-tex"]',
          )?.textContent;
          append(
            node,
            source
              ? `$${source}$`
              : (node.getAttribute('aria-label') || node.textContent || '')
                  .replace(/\s+/g, ' ')
                  .trim(),
          );
        }
        return;
      }
    }
    if (node.nodeType === Node.TEXT_NODE)
      append(node as Text, node.textContent || '');
    else node.childNodes.forEach(visit);
  }
  visit(root);
  return { root, text, nodes };
}
type TextIndex = ReturnType<typeof textIndex>;

export function anchorSelection(
  root: HTMLElement,
  range: Range,
): TextAnchor | null {
  if (
    !root.contains(range.startContainer) ||
    !root.contains(range.endContainer)
  )
    return null;
  const { nodes, text } = textIndex(root);
  const selected = nodes.filter(({ node }) => range.intersectsNode(node));
  if (!selected.length) return null;
  const first = selected[0];
  const last = selected[selected.length - 1];
  let start =
    first.start +
    (first.node.nodeType === Node.TEXT_NODE &&
    range.startContainer === first.node
      ? range.startOffset
      : 0);
  let end =
    last.node.nodeType === Node.TEXT_NODE && range.endContainer === last.node
      ? last.start + range.endOffset
      : last.end;
  while (start < end && /\s/.test(text[start])) start++;
  while (end > start && /\s/.test(text[end - 1])) end--;
  if (start === end) return null;
  return {
    version: 2,
    exact: text.slice(start, end),
    start,
    prefix: text.slice(Math.max(0, start - CONTEXT_LENGTH), start),
    suffix: text.slice(end, end + CONTEXT_LENGTH),
  };
}

export function mathElement(range: Range): Element | null {
  const node = range.startContainer.childNodes[range.startOffset];
  return node instanceof Element && node.matches(MATH) ? node : null;
}

export function resolveAnchor(index: TextIndex, anchor: TextAnchor): Range[] {
  // Old anchors excluded formulas. Keep their original text coordinate system.
  const { text, nodes } =
    anchor.version === 2
      ? index
      : textIndex(index.root, { includeMath: false });
  const matches: { start: number; score: number }[] = [];
  for (
    let start = text.indexOf(anchor.exact);
    start !== -1;
    start = text.indexOf(anchor.exact, start + 1)
  ) {
    const prefix = text.slice(Math.max(0, start - anchor.prefix.length), start);
    const suffix = text.slice(
      start + anchor.exact.length,
      start + anchor.exact.length + anchor.suffix.length,
    );
    matches.push({
      start,
      score:
        Number(prefix === anchor.prefix) + Number(suffix === anchor.suffix),
    });
  }
  matches.sort((a, b) => b.score - a.score);
  if (
    !matches.length ||
    (matches.length > 1 && matches[0].score === matches[1].score)
  )
    return [];
  const start = matches[0].start;
  const end = start + anchor.exact.length;
  return nodes
    .filter((item) => item.end > start && item.start < end)
    .map((item) => {
      const range = new Range();
      if (item.node instanceof Element) range.selectNode(item.node);
      else {
        range.setStart(item.node, Math.max(0, start - item.start));
        range.setEnd(item.node, Math.min(item.node.length, end - item.start));
      }
      return range;
    });
}
