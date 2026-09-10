import { classHighlighter, highlightCode } from '@lezer/highlight';
import type { Language } from '@codemirror/language';

async function codeLanguage(name: string): Promise<Language | undefined> {
  switch (name) {
    case 'c':
    case 'cpp':
      return (await import('@codemirror/lang-cpp')).cpp().language;
    case 'python':
      return (await import('@codemirror/lang-python')).python().language;
    case 'javascript':
    case 'typescript':
      return (await import('@codemirror/lang-javascript')).javascript({
        typescript: name === 'typescript',
      }).language;
    case 'java':
      return (await import('@codemirror/lang-java')).java().language;
    case 'html':
      return (await import('@codemirror/lang-html')).html().language;
    case 'css':
      return (await import('@codemirror/lang-css')).css().language;
    case 'sql':
      return (await import('@codemirror/lang-sql')).sql().language;
    case 'php':
      return (await import('@codemirror/lang-php')).php().language;
    case 'prolog':
      return (await import('codemirror-lang-prolog')).prolog().language;
    case 'riscv':
      return (await import('@codincod/codemirror-lang-assembly')).assembly()
        .language;
    case 'haskell': {
      const { StreamLanguage } = await import('@codemirror/language');
      return StreamLanguage.define(
        (await import('@codemirror/legacy-modes/mode/haskell')).haskell,
      );
    }
  }
}

export async function highlightPublishedCode(root: Element) {
  const blocks = root.matches('pre')
    ? [root]
    : [...root.querySelectorAll('pre')];
  for (const pre of blocks) {
    pre.removeAttribute('hidden');
    if (pre.querySelector('.line')) continue;
    const code = pre.querySelector('code') || pre;
    const name = /language-([\w]+)/.exec(code.className)?.[1];
    const source = code.textContent || '';
    const fragment = document.createDocumentFragment();
    let line = document.createElement('span');
    line.className = 'line';
    fragment.append(line);
    const language = name ? await codeLanguage(name) : undefined;
    if (language) {
      highlightCode(
        source,
        language.parser.parse(source),
        classHighlighter,
        (text, classes) => {
          const token = document.createElement('span');
          token.className = classes;
          token.textContent = text;
          line.append(token);
        },
        () => {
          fragment.append('\n');
          line = document.createElement('span');
          line.className = 'line';
          fragment.append(line);
        },
      );
    } else {
      fragment.replaceChildren(
        ...source.split('\n').flatMap((text, index) => {
          const row = document.createElement('span');
          row.className = 'line';
          row.textContent = text;
          return index ? ['\n', row] : [row];
        }),
      );
    }
    code.replaceChildren(fragment);
  }
}
