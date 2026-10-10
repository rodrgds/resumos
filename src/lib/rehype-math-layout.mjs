import { visit } from 'unist-util-visit';

const hasClass = (node, name) => node.properties?.className?.includes(name);

/** Prefer the author's wide spaces between equations over KaTeX operator breaks. */
export default function rehypeMathLayout() {
  return (tree) => {
    visit(tree, 'element', (display) => {
      if (!hasClass(display, 'katex-display')) return;
      const math = display.children.find((node) => hasClass(node, 'katex'));
      const html = math?.children.find((node) => hasClass(node, 'katex-html'));
      // Preserve explicit line breaks, equation tags and other special layouts.
      if (!html || !html.children.every((node) => hasClass(node, 'katex-base')))
        return;
      const parts = [];
      let group = [];
      for (const base of html.children) {
        const strut = base.children.find((node) =>
          hasClass(node, 'katex-strut'),
        );
        let chunk = [];
        const flush = () => {
          if (chunk.length)
            group.push({
              ...base,
              children: [...(strut ? [strut] : []), ...chunk],
            });
          chunk = [];
        };
        for (const node of base.children) {
          if (node === strut) continue;
          const gap =
            hasClass(node, 'mspace') &&
            /margin-right:\s*([\d.]+)em/.exec(node.properties.style || '');
          if (gap && Number(gap[1]) >= 1) {
            flush();
            if (group.length) parts.push(group);
            group = [];
          } else {
            chunk.push(node);
          }
        }
        flush();
      }
      if (group.length) parts.push(group);
      if (parts.length < 2) return;
      html.properties.className.push('formula-parts');
      html.children = parts.map((children) => ({
        type: 'element',
        tagName: 'span',
        properties: { className: ['formula-part'] },
        children,
      }));
    });
  };
}
