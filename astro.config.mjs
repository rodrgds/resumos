import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import { unified } from '@astrojs/markdown-remark';
import remarkDirective from 'remark-directive';
import remarkContainers from './src/lib/remark-containers.mjs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const content = {
  remarkPlugins: [remarkMath, remarkDirective, remarkContainers],
  rehypePlugins: [rehypeKatex],
  remarkRehype: {
    footnoteLabel: 'Notas de rodapé',
    footnoteBackLabel: 'Voltar à referência',
  },
};
export default defineConfig({
  site: 'https://resumos.rgo.pt',
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
    processor: unified(content),
    shikiConfig: { theme: 'github-dark-high-contrast' },
  },
  devToolbar: { enabled: false },
});
