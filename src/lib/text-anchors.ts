import type { TextAnchor } from './annotations';

const CONTEXT_LENGTH = 48;
const EXCLUDED =
  'script, style, svg, math, .katex, button, textarea, [data-pagefind-ignore], [aria-hidden="true"]';

export function textIndex(root: HTMLElement) {
  const nodes: { node: Text; start: number; end: number }[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let text = '';
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentElement?.closest(EXCLUDED)) continue;
    const value = node.textContent || '';
    nodes.push({
      node: node as Text,
      start: text.length,
      end: text.length + value.length,
    });
    text += value;
  }
  return { text, nodes };
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
    first.start + (range.startContainer === first.node ? range.startOffset : 0);
  let end =
    last.start +
    (range.endContainer === last.node ? range.endOffset : last.node.length);
  while (start < end && /\s/.test(text[start])) start++;
  while (end > start && /\s/.test(text[end - 1])) end--;
  if (start === end) return null;
  return {
    exact: text.slice(start, end),
    start,
    prefix: text.slice(Math.max(0, start - CONTEXT_LENGTH), start),
    suffix: text.slice(end, end + CONTEXT_LENGTH),
  };
}

export function resolveAnchor(index: TextIndex, anchor: TextAnchor): Range[] {
  const { text, nodes } = index;
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
    const score =
      Number(prefix === anchor.prefix) + Number(suffix === anchor.suffix);
    matches.push({ start, score });
  }
  matches.sort((a, b) => b.score - a.score);
  // A changed or ambiguous passage stays in the notebook instead of moving to unrelated text.
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
      range.setStart(item.node, Math.max(0, start - item.start));
      range.setEnd(item.node, Math.min(item.node.length, end - item.start));
      return range;
    });
}
