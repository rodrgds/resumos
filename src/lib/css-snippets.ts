import { readLocal, writeLocal } from './storage';

export interface CssSnippet {
  id: string;
  name: string;
  css: string;
  enabled: boolean;
}
export const SNIPPETS_KEY = 'resumos-css-snippets';
const legacyHideAiCss =
  '[data-open-ai], #ai-menu, #copy-prompt { display: none; }';

export const defaultSnippets: readonly CssSnippet[] = [
  {
    id: 'simple-header',
    name: 'Simplificar cabeçalho',
    enabled: false,
    css: '.site-header :is([data-nav="nucleos"], [data-nav="contribute"], [data-action="notes"], [data-action="appearance"]) { display: none; }',
  },
  {
    id: 'hide-history',
    name: 'Ocultar continuar a ler',
    enabled: false,
    css: '[data-reading-history] { display: none; }',
  },
  {
    id: 'hide-ai',
    name: 'Ocultar ações de IA e copiar',
    enabled: false,
    css: '[data-open-ai], #ai-menu, #copy-prompt { display: none !important; }',
  },
  {
    id: 'hide-brainrot',
    name: 'Ocultar Brain rot',
    enabled: false,
    css: '[data-open-brainrot] { display: none !important; }',
  },
  {
    id: 'static-header',
    name: 'Cabeçalho sem seguir o scroll',
    enabled: false,
    css: '.site-header { position: static; }',
  },
  {
    id: 'underline-links',
    name: 'Sublinhar links dos apontamentos',
    enabled: false,
    css: '.prose a { text-decoration: underline; text-underline-offset: 0.2em; }',
  },
  {
    id: 'wrap-code',
    name: 'Quebrar linhas de código estático',
    enabled: false,
    css: '.prose pre.astro-code, .prose pre.astro-code code { white-space: pre-wrap; overflow-wrap: anywhere; }',
  },
  {
    id: 'striped-tables',
    name: 'Alternar o fundo das linhas de tabelas',
    enabled: false,
    css: '.prose tbody tr:nth-child(even) { background: var(--soft); }',
  },
];

export function readSnippets(): CssSnippet[] {
  try {
    const saved: unknown = JSON.parse(readLocal(SNIPPETS_KEY) || 'null');
    if (Array.isArray(saved)) {
      const seen = new Set<string>();
      const snippets = saved.filter((item): item is CssSnippet => {
        if (
          !item ||
          typeof item.id !== 'string' ||
          !item.id ||
          seen.has(item.id) ||
          typeof item.name !== 'string' ||
          typeof item.css !== 'string' ||
          typeof item.enabled !== 'boolean'
        )
          return false;
        seen.add(item.id);
        return true;
      });
      // Upgrade only untouched preset CSS, preserving edits, names and toggles.
      return snippets.map((snippet) =>
        snippet.id === 'hide-ai' && snippet.css === legacyHideAiCss
          ? {
              ...snippet,
              css: defaultSnippets.find((item) => item.id === 'hide-ai')!.css,
            }
          : snippet,
      );
    }
  } catch {
    /* Invalid storage falls back to the disabled presets. */
  }
  return defaultSnippets.map((snippet) => ({ ...snippet }));
}

export function saveSnippets(snippets: CssSnippet[]) {
  return writeLocal(SNIPPETS_KEY, JSON.stringify(snippets));
}

export function applySnippets(snippets = readSnippets()) {
  document
    .querySelectorAll('style[data-css-snippet]')
    .forEach((style) => style.remove());
  if (new URLSearchParams(location.search).has('sem-css')) return;
  for (const snippet of snippets) {
    if (!snippet.enabled) continue;
    const style = document.createElement('style');
    style.dataset.cssSnippet = snippet.id;
    // Text assignment keeps CSS, including </style>, out of the HTML parser.
    style.textContent = snippet.css;
    document.head.append(style);
  }
}
