import { SKIP, visit } from 'unist-util-visit';

export default function remarkDisplayMath() {
  return (tree, file) => {
    const source = file.toString();
    visit(tree, 'paragraph', (paragraph, index, parent) => {
      const formulas = paragraph.children.filter(
        (node) => node.type === 'inlineMath',
      );
      if (
        !formulas.length ||
        paragraph.children.some(
          (node) =>
            node.type !== 'inlineMath' &&
            (node.type !== 'text' || node.value.trim()),
        )
      )
        return;

      const lines = new Set();
      for (const formula of formulas) {
        const { start, end } = formula.position || {};
        if (!start || !end || start.line !== end.line || lines.has(start.line))
          return;
        const original = source.slice(start.offset, end.offset);
        if (!original.startsWith('$$') || !original.endsWith('$$')) return;
        lines.add(start.line);
      }

      // remark-math treats same-line $$…$$ as inline, even in its own paragraph.
      const blocks = formulas.map((formula) => ({
        type: 'math',
        meta: null,
        value: formula.value,
        position: formula.position,
        data: {
          hName: 'pre',
          hChildren: [
            {
              type: 'element',
              tagName: 'code',
              properties: { className: ['language-math', 'math-display'] },
              children: [{ type: 'text', value: formula.value }],
            },
          ],
        },
      }));
      parent.children.splice(index, 1, ...blocks);
      return [SKIP, index + blocks.length];
    });
  };
}
