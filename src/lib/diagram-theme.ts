import { parseFragment, serialize } from 'parse5';

// Preserve data-series colours; adapt the neutral and shared example palette.
const colors: Record<string, string> = {
  '#000': 'var(--text)',
  '#000000': 'var(--text)',
  black: 'var(--text)',
  '#222': 'var(--text)',
  '#292a30': 'var(--text)',
  '#fff': 'var(--surface)',
  '#ffffff': 'var(--surface)',
  white: 'var(--surface)',
  '#8c2d3b': 'var(--accent)',
  '#f3e9e9': 'var(--accent-soft)',
  '#28716c': 'var(--diagram-secondary)',
};
export function themeDiagram(svg: string) {
  const fragment = parseFragment(svg);
  function visit(node: (typeof fragment.childNodes)[number]) {
    // SVG defaults to black when no ancestor declares a fill, including DOT labels.
    if (
      'tagName' in node &&
      node.tagName === 'svg' &&
      !node.attrs.some((attr) => attr.name === 'fill')
    )
      node.attrs.push({ name: 'fill', value: 'var(--text)' });
    if ('attrs' in node)
      for (const attribute of node.attrs) {
        if (attribute.name !== 'fill' && attribute.name !== 'stroke') continue;
        const value = attribute.value.toLowerCase();
        const rgba = /^(#[0-9a-f]{6})([0-9a-f]{2})$/.exec(value);
        const base = rgba && colors[rgba[1]];
        attribute.value = base
          ? `color-mix(in srgb, ${base} ${(Number.parseInt(rgba![2], 16) / 255) * 100}%, transparent)`
          : colors[value] || value;
      }
    if ('childNodes' in node) node.childNodes.forEach(visit);
  }
  fragment.childNodes.forEach(visit);
  return serialize(fragment);
}
