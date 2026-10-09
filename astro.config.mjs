import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import { unified } from '@astrojs/markdown-remark';
import markdownExport from './src/lib/markdown-export.mjs';
import remarkDirective from 'remark-directive';
import remarkContainers from './src/lib/remark-containers.mjs';
import remarkMath from 'remark-math';
import remarkDisplayMath from './src/lib/remark-display-math.mjs';
import rehypeDisclosures from './src/lib/rehype-disclosures.mjs';
import rehypeKatex from 'rehype-katex';
import { codeShikiConfig } from './src/lib/code-theme.mjs';

const content = {
  remarkPlugins: [
    remarkMath,
    remarkDisplayMath,
    remarkDirective,
    remarkContainers,
  ],
  rehypePlugins: [rehypeKatex, rehypeDisclosures],
  remarkRehype: {
    footnoteLabel: 'Notas de rodapé',
    footnoteBackLabel: 'Voltar à referência',
    footnoteBackContent: 'Voltar',
  },
};
export default defineConfig({
  site: 'https://resumos.rgo.pt',
  cacheDir: './.astro/cache/',
  vite: { cacheDir: './.astro/vite/' },
  integrations: [
    mdx(),
    markdownExport(),
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
    shikiConfig: codeShikiConfig,
  },
  devToolbar: { enabled: false },
});
