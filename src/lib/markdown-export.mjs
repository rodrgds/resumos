import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, parseFragment, serialize, serializeOuter } from 'parse5';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes || []) {
    const found = find(child, predicate);
    if (found) return found;
  }
}
const attr = (node, name) =>
  node?.attrs?.find((item) => item.name === name)?.value;
const hasClass = (node, name) => attr(node, 'class')?.split(' ').includes(name);
function text(node) {
  return node.nodeName === '#text'
    ? node.value
    : (node.childNodes || []).map(text).join('');
}

export default function markdownExport() {
  return {
    name: 'public-markdown',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const root = fileURLToPath(dir);
        const index = [
          '# Resumos FEUP',
          '',
          'Apontamentos de LEIC e MEIC da FEUP. As páginas abaixo têm versões Markdown com fórmulas, código e ligações aos diagramas.',
          '',
          '## Páginas',
          '',
        ];
        for (const page of pages) {
          if (page.pathname.startsWith('_')) continue;
          const path = page.pathname.replace(/^\/|\/$/g, '');
          const document = parse(
            await readFile(join(root, path, 'index.html'), 'utf8'),
          );
          const main = find(document, (node) => node.tagName === 'main');
          if (!main) continue;
          const lesson = find(main, (node) => hasClass(node, 'lesson-body'));
          const practice = find(main, (node) =>
            hasClass(node, 'lesson-practice'),
          );
          const body =
            lesson && practice
              ? parseFragment(serializeOuter(lesson) + serializeOuter(practice))
              : lesson || main;
          const heading = find(main, (node) => node.tagName === 'h1');
          const title = heading ? text(heading).trim() : 'Resumos FEUP';
          const canonical = find(
            document,
            (node) =>
              node.tagName === 'link' && attr(node, 'rel') === 'canonical',
          );
          const pageURL = attr(canonical, 'href');
          const description =
            attr(
              find(
                document,
                (node) =>
                  node.tagName === 'meta' &&
                  attr(node, 'name') === 'description',
              ) || {},
              'content',
            ) || '';
          const markdownPath = path ? `${path}.md` : 'index.md';
          const markdownURL = new URL(`/${markdownPath}`, pageURL).href;
          const converter = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
          });
          converter.use(gfm);
          converter.remove([
            'script',
            'style',
            'button',
            'textarea',
            'noscript',
            'h1',
          ]);
          converter.addRule('tools', {
            filter: (node) => node.hasAttribute('data-pagefind-ignore'),
            replacement: () => '',
          });
          converter.addRule('katex', {
            filter: (node) => node.classList?.contains('katex'),
            replacement: (_content, node) => {
              const source =
                node.querySelector('annotation[encoding="application/x-tex"]')
                  ?.textContent || '';
              return node.parentElement?.classList.contains('katex-display')
                ? `\n\n$$\n${source}\n$$\n\n`
                : `$${source}$`;
            },
          });
          converter.addRule('mathml', {
            filter: 'math',
            replacement: (_content, node) =>
              node.getAttribute('display') === 'block'
                ? `\n\n${node.outerHTML}\n\n`
                : node.outerHTML,
          });
          converter.addRule('web-code', {
            filter: (node) => node.hasAttribute('data-web-playground'),
            replacement: (_content, node) =>
              ['html', 'css', 'js']
                .map(
                  (language) =>
                    `\n\n\`\`\`${language}\n${node.querySelector(`[data-${language}]`)?.textContent || ''}\n\`\`\`\n\n`,
                )
                .join(''),
          });
          converter.addRule('video', {
            filter: (node) => node.hasAttribute('data-video'),
            replacement: (_content, node) =>
              `\n\n[Vídeo: ${node.getAttribute('data-title')}](https://www.youtube.com/watch?v=${node.getAttribute('data-video')})\n\n`,
          });
          converter.addRule('manim', {
            filter: (node) => node.hasAttribute('data-manim'),
            replacement: (content, node) =>
              `\n\n[Animação: ${node.getAttribute('data-title')}](${new URL(`${node.getAttribute('data-base')}/feup-light-red.mp4`, pageURL).href})\n\n${content.trim()}\n\n`,
          });
          converter.addRule('links', {
            filter: 'a',
            replacement: (content, node) => {
              const href = node.getAttribute('href');
              if (!href) return content;
              return `[${content}](${new URL(href, pageURL).href})`;
            },
          });
          converter.addRule('images', {
            filter: 'img',
            replacement: (_content, node) =>
              `![${node.getAttribute('alt') || ''}](${new URL(node.getAttribute('src'), pageURL).href})`,
          });
          let number = 0;
          const diagrams = [];
          function extract(node) {
            if (
              attr(node, 'role') === 'img' &&
              (hasClass(node, 'typst-figure') ||
                hasClass(node, 'diagram-figure'))
            ) {
              const svg = find(node, (child) => child.tagName === 'svg');
              if (svg) {
                const name = `figura-${++number}.svg`;
                const svgText = serializeOuter(svg).replace(
                  /(<svg[^>]*>)/,
                  '$1<style>:root{--text:#292a30;--surface:#fff;--accent:#8c2d3b;--accent-soft:#f3e9e9;--diagram-secondary:#28716c}</style>',
                );
                diagrams.push(writeFile(join(root, path, name), svgText));
                node.attrs.push({
                  name: 'data-markdown-figure',
                  value: new URL(name, pageURL).href,
                });
                node.childNodes = [
                  {
                    nodeName: '#text',
                    value: attr(node, 'aria-label') || 'Diagrama',
                    parentNode: node,
                  },
                ];
              }
            }
            for (const child of node.childNodes || []) extract(child);
          }
          extract(body);
          await Promise.all(diagrams);
          converter.addRule('diagrams', {
            filter: (node) => node.hasAttribute('data-markdown-figure'),
            replacement: (_content, node) =>
              `\n\n![${node.getAttribute('aria-label') || 'Diagrama'}](${node.getAttribute('data-markdown-figure')})\n\n`,
          });
          const markdown = `# ${title}\n\n${description}\n\nPágina: ${pageURL}\n\n${converter.turndown(serialize(body))}\n`;
          await writeFile(join(root, markdownPath), markdown);
          index.push(`- [${title}](${markdownURL}): ${description}`);
        }
        await writeFile(join(root, 'llms.txt'), index.join('\n') + '\n');
      },
    },
  };
}
