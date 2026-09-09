import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const math = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};
export default defineConfig({
  site: 'https://resumos-feup.pages.dev',
  integrations: [
    mdx(),
    pagefind({
      indexConfig: {
        forceLanguage: 'pt',
        excludeSelectors: ['[data-pagefind-ignore]', 'svg', 'math', '.katex'],
      },
    }),
    ...(process.env.RESUMOS_TEST_CONTENT === '1'
      ? [
          {
            name: 'content-test-fixture',
            hooks: {
              'astro:config:setup': ({ injectRoute }) =>
                injectRoute({
                  pattern: '/_content-test',
                  entrypoint: './tests/fixtures/ContentFixture.astro',
                }),
            },
          },
        ]
      : []),
  ],
  markdown: {
    processor: unified(math),
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  devToolbar: { enabled: false },
});
