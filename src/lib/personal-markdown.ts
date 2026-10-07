import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';
import type { Root, RootContent } from 'mdast';
import type { PersonalNote, NoteImage } from './personal-notes';
import { validateNoteImage } from './personal-notes';

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
const renderer = unified()
  .use(remarkRehype)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      code: [
        ...(defaultSchema.attributes?.code || []),
        ['className', 'language-math', 'math-inline', 'math-display'],
      ],
    },
    protocols: { ...defaultSchema.protocols, src: ['blob'] },
  })
  .use(rehypeKatex, { trust: false, strict: 'ignore' })
  .use(rehypeStringify);

export function parsePersonalMarkdown(markdown: string) {
  return parser.parse(markdown) as Root;
}
export function renderPersonalBlock(
  node: RootContent,
  images: Map<string, string>,
) {
  const tree: Root = { type: 'root', children: [structuredClone(node)] };
  visit(tree, 'image', (image, index, parent) => {
    const url = images.get(image.url);
    if (url) image.url = url;
    else if (parent && index !== undefined)
      parent.children[index] = {
        type: 'text',
        value: image.alt || 'Imagem não anexada',
      };
  });
  const result = renderer.runSync(tree);
  return renderer.stringify(result);
}

function dataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () =>
      reject(new Error('Não foi possível exportar a imagem.'));
    reader.readAsDataURL(blob);
  });
}
export async function exportPersonalMarkdown(note: PersonalNote) {
  let markdown = note.markdown;
  for (const image of note.images)
    markdown = markdown.replaceAll(
      `resumos-image:${image.id}`,
      await dataUrl(image.blob),
    );
  return `# ${note.title.replaceAll('\n', ' ')}\n\n${markdown}`;
}

export async function importPersonalMarkdown(text: string) {
  const tree = parsePersonalMarkdown(text);
  const images: NoteImage[] = [];
  const replacements: { start: number; end: number; url: string }[] = [];
  visit(tree, 'image', (image) => {
    if (!image.url.startsWith('data:')) return;
    const match = /^data:(image\/[a-z]+);base64,([A-Za-z0-9+/=]+)$/.exec(
      image.url,
    );
    if (!match) throw new Error('A imagem no ficheiro não é válida.');
    const bytes = Uint8Array.from(atob(match[2]), (character) =>
      character.charCodeAt(0),
    );
    const blob = new Blob([bytes], { type: match[1] });

    const id = crypto.randomUUID();
    images.push({ id, name: image.alt || 'Imagem', blob });
    const start = image.position!.start.offset!;
    const end = image.position!.end.offset!;
    replacements.push({
      start,
      end,
      url: `![${(image.alt || 'Imagem').replace(/[\[\]\\]/g, '')}](resumos-image:${id})`,
    });
  });
  await Promise.all(images.map((image) => validateNoteImage(image.blob)));
  for (const replacement of replacements.reverse())
    text =
      text.slice(0, replacement.start) +
      replacement.url +
      text.slice(replacement.end);
  const heading = /^# ([^\n]+)\n(?:\n)?/.exec(text);
  return {
    title: heading?.[1] || 'Apontamento importado',
    markdown: heading ? text.slice(heading[0].length) : text,
    images,
  };
}

export async function downloadPersonalNote(note: PersonalNote) {
  const markdown = await exportPersonalMarkdown(note);
  const url = URL.createObjectURL(
    new Blob([markdown], { type: 'text/markdown;charset=utf-8' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(note.title || 'apontamento').replace(/[^\p{L}\p{N}_-]/gu, '-').slice(0, 80)}.md`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
