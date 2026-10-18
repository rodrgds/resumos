import { createHash } from 'node:crypto';
import { render } from 'pele';
import { optimize } from 'svgo';
import { themeDiagram } from './diagram-theme';

const cache = new Map<string, string>();
const occurrences = new Map<string, number>();

// Keep these aliases inside the SVG: Markdown exports open outside the page CSS.
const palette = [
  '--pele-bg:var(--surface,#fff)',
  '--pele-fg:currentColor',
  '--pele-muted:var(--muted,#666)',
  '--pele-line:currentColor',
  '--pele-surface:var(--surface,#fff)',
  '--pele-surface-alt:var(--soft,#f3e9e9)',
  '--pele-border:var(--accent,#8c2d3b)',
  '--pele-accent:var(--accent,#8c2d3b)',
  '--pele-critical:var(--accent,#8c2d3b)',
].join(';');

export function renderMermaid(source: string, id?: string) {
  let svg = cache.get(source);
  if (!svg) {
    // Only reviewed repository content reaches this build-time renderer.
    const fontSize = 16;
    const diagram = render(source, {
      idPrefix: 'diagram',
      links: false,
      images: false,
      responsive: false,
      autoDirection: false,
      fontFamily: 'Arial, sans-serif',
      fontSize,
      now: 0,
    });
    // Pele emits smaller label sizes as SVG font-size attributes. Allow only
    // enough scaling to keep the smallest glyphs at 12 CSS px; wider diagrams
    // still scroll. Round up so fractional layout cannot cross that floor.
    const smallestFont = Math.min(
      fontSize,
      ...Array.from(
        diagram.svg.matchAll(/\bfont-size="([\d.]+)(?:px)?"/g),
        (match) => Number(match[1]),
      ),
    );
    const minWidth = Math.ceil(diagram.width * Math.min(1, 12 / smallestFont));
    svg = diagram.svg.replace(
      'style="',
      `style="${palette};--diagram-width:${diagram.width}px;--diagram-min-width:${minWidth}px;`,
    );
    cache.set(source, svg);
  }
  const hash = createHash('sha256')
    .update(id ?? source)
    .digest('hex')
    .slice(0, 16);
  const ordinal = (occurrences.get(hash) ?? 0) + 1;
  occurrences.set(hash, ordinal);
  const prefix = `pele-${hash}-${ordinal}`;
  return themeDiagram(
    optimize(svg, {
      plugins: [
        {
          name: 'prefixIds',
          params: { prefix, delim: '-', prefixClassNames: false },
        },
        {
          name: 'prefix-accessibility-references',
          fn: () => ({
            element: {
              enter(node) {
                for (const key of ['aria-labelledby', 'aria-describedby']) {
                  if (node.attributes[key])
                    node.attributes[key] = node.attributes[key]
                      .split(/\s+/)
                      .map((id) => `${prefix}-${id}`)
                      .join(' ');
                }
              },
            },
          }),
        },
      ],
    }).data,
  );
}
