import { execFileSync } from 'node:child_process';
import {
  parse,
  serialize,
  serializeOuter,
  type DefaultTreeAdapterMap,
} from 'parse5';

type Element = DefaultTreeAdapterMap['element'];

// Only repository-authored content reaches the compiler. HTML export needs Typst 0.15+.
export function renderTypst(source: string, format: 'html' | 'svg' = 'html') {
  const output = execFileSync(
    'typst',
    [
      'compile',
      '--features',
      'html',
      '--ignore-system-fonts',
      '--root',
      process.cwd(),
      '--format',
      format,
      '-',
      '-',
    ],
    { input: source, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
  );
  if (format === 'svg') return output;

  const document = parse(output);
  const html = document.childNodes.find(
    (node): node is Element => 'tagName' in node && node.tagName === 'html',
  )!;
  const head = html.childNodes.find(
    (node): node is Element => 'tagName' in node && node.tagName === 'head',
  )!;
  const body = html.childNodes.find(
    (node): node is Element => 'tagName' in node && node.tagName === 'body',
  )!;
  // Preserve compiler-generated MathML styles while the site owns the document shell.
  const styles = head.childNodes
    .filter((node) => 'tagName' in node && node.tagName === 'style')
    .map((node) => serializeOuter(node))
    .join('');
  return styles + serialize(body);
}
