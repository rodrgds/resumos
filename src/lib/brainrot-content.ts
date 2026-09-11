export interface ReadingToken {
  text: string;
  math?: Element;
}

export interface ReadingCue {
  text: string;
  visual?: Element;
  caption?: ReadingToken[];
  minimumSeconds: number;
}

const ignored =
  'script, style, template, button, input, textarea, select, iframe, .video-caption, [data-pagefind-ignore], [data-annotation-ignore], [data-footnote-backref], [data-footnote-ref]';
const symbols: Record<string, string> = {
  '+': 'mais',
  '−': 'menos',
  '-': 'menos',
  '=': 'igual a',
  '≠': 'diferente de',
  '×': 'vezes',
  '⋅': 'vezes',
  '/': 'a dividir por',
  '<': 'menor que',
  '>': 'maior que',
  '≤': 'menor ou igual a',
  '≥': 'maior ou igual a',
  '∞': 'infinito',
  '∑': 'somatório',
  '∫': 'integral',
  π: 'pi',
  α: 'alfa',
  β: 'beta',
  θ: 'teta',
  '∈': 'pertence a',
  '∉': 'não pertence a',
  '∪': 'união',
  '∩': 'interseção',
  '→': 'tende para',
  '⇒': 'implica',
  '∀': 'para todo',
  '∃': 'existe',
  ℝ: 'reais',
  ℕ: 'naturais',
};

function mathSpeech(node: Element): string {
  const children = Array.from(node.children).filter(
    (child) => child.localName !== 'annotation',
  );
  const parts = children.map(mathSpeech);
  switch (node.localName) {
    case 'mfrac':
      return `fração, ${parts[0]}, sobre ${parts[1]}, fim da fração`;
    case 'msup':
      return `${parts[0]} elevado a ${parts[1]}`;
    case 'msub':
      return `${parts[0]} índice ${parts[1]}`;
    case 'msubsup':
      return `${parts[0]} índice ${parts[1]} elevado a ${parts[2]}`;
    case 'msqrt':
      return `raiz quadrada de ${parts.join(' ')}, fim da raiz`;
    case 'mroot':
      return `raiz de índice ${parts[1]} de ${parts[0]}`;
    case 'munderover':
      return `${parts[0]}, de ${parts[1]} até ${parts[2]}`;
    case 'munder':
      return `${parts[0]}, com ${parts[1]}`;
    case 'mover':
      return `${parts[0]}, ${parts[1]}`;
    case 'mtable':
      return 'matriz apresentada no ecrã';
    case 'annotation':
      return '';
  }
  if (parts.length) return parts.join(' ');
  const value = node.textContent?.trim() || '';
  if (value === '(' || value === ')') return '';
  return symbols[value] || value;
}

function spokenText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
  if (!(node instanceof Element) || node.matches(ignored)) return '';
  if (node.matches('.katex, math')) {
    const math = node.matches('math') ? node : node.querySelector('math');
    return math ? ` ${mathSpeech(math)} ` : ' fórmula no ecrã ';
  }
  if (node.matches('img, svg')) return '';
  return Array.from(node.childNodes).map(spokenText).join('');
}

/** Clones only published presentation, never interactive editors or local notes. */
export function readingVisual(source: Element): Element {
  const clone = source.cloneNode(true) as Element;
  clone.removeAttribute('hidden');
  clone.querySelectorAll(ignored).forEach((element) => element.remove());
  const ids = new Map<string, string>();
  const elements = [clone, ...clone.querySelectorAll('*')];
  for (const element of elements) {
    if (element.id) ids.set(element.id, `brainrot-${element.id}`);
    for (const attribute of Array.from(element.attributes)) {
      if (
        attribute.name.startsWith('on') ||
        attribute.name.startsWith('data-') ||
        attribute.name === 'tabindex'
      ) {
        element.removeAttribute(attribute.name);
      }
    }
  }
  for (const element of elements) {
    if (element.id) element.id = ids.get(element.id)!;
    for (const attribute of Array.from(element.attributes)) {
      let value = attribute.value.replace(/url\(#([^)]+)\)/g, (match, id) =>
        ids.has(id) ? `url(#${ids.get(id)})` : match,
      );
      if (value.startsWith('#') && ids.has(value.slice(1)))
        value = `#${ids.get(value.slice(1))}`;
      element.setAttribute(attribute.name, value);
    }
    if (
      element.localName === 'a' &&
      !element.matches('.brainrot-video-preview')
    )
      element.removeAttribute('href');
  }
  void highlightPublishedCode(clone).catch(() => {});
  return clone;
}

function speechSentences(text: string): string[] {
  const sentences = new Intl.Segmenter('pt-PT', {
    granularity: 'sentence',
  }).segment(text);
  // Caption wrapping must never become an audible sentence boundary.
  return Array.from(sentences, ({ segment }) => segment.trim()).filter(Boolean);
}

function captionTokens(element: Element): ReadingToken[] {
  const tokens: ReadingToken[] = [];
  let text = '';
  const flush = () => {
    tokens.push(
      ...text
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((text) => ({ text })),
    );
    text = '';
  };
  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent || '';
      return;
    }
    if (!(node instanceof Element) || node.matches(ignored)) return;
    if (node.matches('.katex, math')) {
      flush();
      tokens.push({
        text: spokenText(node).replace(/\s+/g, ' ').trim(),
        math: node,
      });
      return;
    }
    if (node.matches('img, svg')) return;
    for (const child of node.childNodes) walk(child);
  }
  walk(element);
  flush();
  return tokens;
}

export function extractReadingCues(body: Element, title: string): ReadingCue[] {
  const cues: ReadingCue[] = [];
  function add(
    text: string,
    minimumSeconds = 0,
    visual?: Element,
    caption?: ReadingToken[],
  ) {
    const phrases = speechSentences(text.replace(/\s+/g, ' ').trim());
    let tokenIndex = 0;
    for (const phrase of phrases) {
      const parts: ReadingToken[] = [];
      let length = 0;
      while (caption && tokenIndex < caption.length && length < phrase.length) {
        const part = caption[tokenIndex++];
        length += part.text.length + (parts.length ? 1 : 0);
        parts.push(part);
      }
      if (phrase)
        cues.push({
          text: phrase,
          visual,
          caption: caption ? parts : undefined,
          minimumSeconds: minimumSeconds / phrases.length,
        });
    }
  }
  add(title);
  function addText(element: Element) {
    const caption = element.querySelector('.katex, math')
      ? captionTokens(element)
      : undefined;
    add(
      caption
        ? caption.map((token) => token.text).join(' ')
        : spokenText(element),
      0,
      undefined,
      caption,
    );
  }
  function walk(element: Element) {
    if (element.matches('[data-video]')) {
      const id = element.getAttribute('data-video') || '';
      if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
      const name = element.getAttribute('data-title') || 'Vídeo do YouTube';
      const link = document.createElement('a');
      link.className = 'brainrot-video-preview';
      link.href = `https://www.youtube.com/watch?v=${id}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const image = document.createElement('img');
      image.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      image.alt = name;
      image.referrerPolicy = 'no-referrer';
      const label = document.createElement('span');
      label.textContent = 'Clica para ver este vídeo agora';
      link.append(image, label);
      add(`${name}. Clica para ver este vídeo agora.`, 8, link);
      return;
    }
    // Read the published source of playgrounds, not the visitor's current editor contents.
    if (element.matches('[data-playground], [data-web-playground]')) {
      let source = element.querySelector('[data-source]');
      if (element.matches('[data-web-playground]')) {
        const original = document.createElement('div');
        for (const [attribute, language] of [
          ['data-html', 'html'],
          ['data-css', 'css'],
          ['data-js', 'javascript'],
        ]) {
          const text = element
            .querySelector<HTMLTextAreaElement>(`textarea[${attribute}]`)
            ?.defaultValue.trim();
          if (!text) continue;
          const pre = document.createElement('pre');
          const code = document.createElement('code');
          code.className = `language-${language}`;
          code.textContent = text;
          pre.append(code);
          original.append(pre);
        }
        if (original.children.length) source = original;
      }
      if (source) {
        add(
          'Exemplo de código no ecrã.',
          Math.min(
            30,
            Math.max(8, (source.textContent?.split('\n').length || 1) * 1.5),
          ),
          source,
        );
      }
      return;
    }
    if (element.matches(ignored) || element.matches('[hidden]')) return;
    if (element.matches('h1, h2, h3, h4, h5, h6')) {
      addText(element);
      return;
    }
    if (element.matches('.katex-display, math[display="block"]')) {
      add(spokenText(element), 8, element);
      return;
    }
    if (element.matches('img, [role="img"]')) {
      add(
        element.getAttribute('alt') ||
          element.getAttribute('aria-label') ||
          'Imagem no ecrã.',
        6,
        element,
      );
      return;
    }
    if (element.matches('pre, table')) {
      const lines = element.textContent?.split('\n').length || 1;
      add(
        element.matches('table')
          ? 'Tabela no ecrã.'
          : 'Exemplo de código no ecrã.',
        Math.min(30, Math.max(8, lines * 1.5)),
        element,
      );
      return;
    }
    if (
      element.matches('p, li, dt, dd, figcaption, summary') &&
      !element.querySelector(
        'p, ul, ol, .katex-display, img, [role="img"], table, pre',
      )
    ) {
      addText(element);
      return;
    }
    const inline = document.createElement('span');
    const flush = () => {
      if (inline.textContent?.trim()) addText(inline);
      inline.replaceChildren();
    };
    for (const child of element.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        inline.append(child.cloneNode(true));
      } else if (child instanceof Element) {
        if (
          child.matches('strong, em, b, i, code, a, span, br') &&
          !child.matches('.katex-display, [role="img"]') &&
          !child.querySelector('img, [role="img"], .katex-display')
        ) {
          inline.append(child.matches('br') ? ' ' : child.cloneNode(true));
        } else {
          flush();
          walk(child);
        }
      }
    }
    flush();
  }
  for (const child of body.children) walk(child);
  return cues;
}
import { highlightPublishedCode } from './brainrot-code';
