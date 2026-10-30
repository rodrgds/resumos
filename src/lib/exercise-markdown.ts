import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const processor = createMarkdownProcessor({
  syntaxHighlight: false,
  smartypants: false,
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
});

/** Renders a full Markdown block for an exercise prompt or solution. */
export async function renderMarkdown(text: string) {
  if (!text.trim()) return '';
  return (await (await processor).render(text)).code;
}
