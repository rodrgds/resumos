import { expect, test } from '@playwright/test';
import { renderMermaid } from '../src/lib/mermaid';

// The exported SVG is an independent document, including active authored input.
test('static diagrams disable navigation and external media and isolate repeated IDs', () => {
  const source = `flowchart LR
accTitle: Pedido
A["<script>alert(1)</script>"] --> B[Resposta]
click A "https://example.invalid/track"`;
  const first = renderMermaid(source);
  const second = renderMermaid(source);
  for (const svg of [first, second]) {
    expect(svg).not.toMatch(/<script|<foreignObject|<image|<a\s|\son\w+=/i);
    expect(svg).toContain('Resposta');
    expect(svg).toContain('var(--surface');
  }
  const ids = (svg: string) =>
    [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const svg of [first, second]) {
    for (const reference of [
      ...svg.matchAll(/aria-(?:labelledby|describedby)="([^"]+)"/g),
    ])
      for (const id of reference[1].split(/\s+/))
        expect(ids(svg)).toContain(id);
  }
  expect(ids(first).length).toBeGreaterThan(0);
  expect(ids(first).some((id) => ids(second).includes(id))).toBe(false);
});
