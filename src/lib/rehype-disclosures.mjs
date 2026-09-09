import { visit } from 'unist-util-visit';
import { fromHtml } from 'hast-util-from-html';
import heroicons from '@iconify-json/heroicons/icons.json' with { type: 'json' };

export default function rehypeDisclosures() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName !== 'details' ||
        !node.properties.className?.includes('admonition-details')
      )
        return;
      const summary = node.children.find(
        (child) => child.tagName === 'summary',
      );
      if (!summary) return;
      const icon = fromHtml(
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${heroicons.icons['chevron-right'].body}</svg>`,
        { fragment: true },
      ).children[0];
      summary.children.unshift(icon);
    });
  };
}
