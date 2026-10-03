import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { parseFragment, serialize } from 'parse5';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const processor = createMarkdownProcessor({
  syntaxHighlight: false,
  smartypants: false,
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
});

export async function renderExerciseText(text: string) {
  const rendered = await (await processor).render(text);
  const fragment = parseFragment(rendered.code);
  const nodes = fragment.childNodes.filter(
    (node) =>
      node.nodeName !== '#text' || ('value' in node && node.value.trim()),
  );
  if (!nodes.length) return '';
  const paragraph = nodes[0];
  if (nodes.length === 1 && 'tagName' in paragraph && paragraph.tagName === 'p')
    return serialize(paragraph);
  throw new Error(
    'Exercise text fields accept inline Markdown. Use slots for blocks.',
  );
}
