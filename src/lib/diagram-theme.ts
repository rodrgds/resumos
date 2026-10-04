import { parseFragment, serialize } from 'parse5';

// Preserve data-series colours; adapt the neutral and shared example palette.
// Light text-backing fills must resolve to theme tokens that are dark in dark
// mode, otherwise currentColor text turns light on a fill that stays light.
const colors: Record<string, string> = {
  '#000': 'currentColor',
  '#000000': 'currentColor',
  black: 'currentColor',
  '#222': 'currentColor',
  '#292a30': 'currentColor',
  '#fff': 'var(--surface)',
  '#ffffff': 'var(--surface)',
  white: 'var(--surface)',
  '#8c2d3b': 'var(--accent)',
  '#f3e9e9': 'var(--accent-soft)',
  // Accent tints produced by lighten(): sql-indices (92%) and triggers (80%).
  '#f6eeef': 'var(--accent-soft)',
  '#e8d5d8': 'var(--accent-soft)',
  '#e8dce1': 'var(--accent-soft)',
  '#28716c': 'var(--diagram-secondary)',
  '#287a70': 'var(--diagram-secondary)',
  // Teal-tinted text backing keeps its hue via a surface mix: light mint in
  // light mode, dark teal-grey in dark mode.
  '#e4efec': 'color-mix(in srgb, var(--diagram-secondary) 14%, var(--surface))',
  // Neutral light backings.
  '#e5e7eb': 'var(--soft)',
  '#fff1e9': 'var(--soft)',
  // Non-canonical node/edge brown follows the accent token.
  '#9c4825': 'var(--accent)',
  // Medium greys used for lines and bars follow the muted token.
  '#9aa0a6': 'var(--muted)',
  '#aaaaaa': 'var(--muted)',
  '#bfbfbf': 'var(--muted)',
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
      node.attrs.push({ name: 'fill', value: 'currentColor' });
    if ('attrs' in node)
      for (const attribute of node.attrs) {
        if (!['fill', 'stroke', 'color'].includes(attribute.name)) continue;
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
