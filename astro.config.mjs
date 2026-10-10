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
import { readingThemeStyles } from './src/lib/reading-theme-styles';

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
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: {
    cacheDir: './.astro/vite/',
    build: {
      rolldownOptions: {
        experimental: {
          // Merging a shared helper into personal-markdown makes code lessons
          // download the entire Markdown renderer to initialize their grammar.
          chunkOptimization: { mergeCommonChunks: false },
        },
      },
    },
    plugins: [
      {
        name: 'reading-theme-styles',
        resolveId(id) {
          if (id === 'virtual:reading-themes.css')
            return '\0reading-themes.css';
        },
        load(id) {
          if (id === '\0reading-themes.css') return readingThemeStyles();
        },
      },
    ],
  },
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
