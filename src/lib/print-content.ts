import {
  parseFragment,
  serialize,
  serializeOuter,
  type DefaultTreeAdapterMap,
} from 'parse5';
type Node = DefaultTreeAdapterMap['childNode'];
type Element = DefaultTreeAdapterMap['element'];
const isElement = (node: Node): node is Element => 'tagName' in node;
const attr = (node: Element, name: string) =>
  node.attrs.find((item) => item.name === name)?.value;
const has = (node: Element, name: string) =>
  node.attrs.some((item) => item.name === name);
function find(
  node: Node,
  predicate: (element: Element) => boolean,
): Element | undefined {
  if (!isElement(node)) return;
  if (predicate(node)) return node;
  for (const child of node.childNodes) {
    const found = find(child, predicate);
    if (found) return found;
  }
}

// The input is authored, build-rendered content, never answers or browser storage.
export function preparePrintContent(html: string) {
  const fragment = parseFragment(html);
  const solutions: string[] = [];
  for (const entry of fragment.childNodes.filter(isElement)) {
    if (!has(entry, 'data-print-entry')) continue;
    const key = attr(entry, 'data-print-entry')!;
    const prefix = `print-${key.replaceAll('/', '-')}-`;
    const entrySolutions: string[] = [];
    function clean(parent: Element, namespace = prefix) {
      const children: Node[] = [];
      for (const child of parent.childNodes) {
        if (!isElement(child)) {
          children.push(child);
          continue;
        }
        if (
          [
            'script',
            'style',
            'template',
            'button',
            'textarea',
            'input',
          ].includes(child.tagName)
        )
          continue;
        if (has(child, 'data-exercise-controls')) {
          const prompt = find(child, (element) =>
            has(element, 'data-print-question'),
          );
          if (prompt) {
            const wrapper = parseFragment(
              `<div>${serializeOuter(prompt)}</div>`,
            ).childNodes.find(isElement)!;
            clean(wrapper, namespace);
            children.push(wrapper);
          }
          continue;
        }
        if (
          has(child, 'data-pagefind-ignore') &&
          !attr(child, 'class')?.split(' ').includes('editorial-note')
        )
          continue;
        if (has(child, 'data-exercise')) {
          const title = find(child, (element) => element.tagName === 'h3');
          const solution = find(child, (element) =>
            has(element, 'data-solution'),
          );
          if (title && solution) {
            // Copy the authored solution before removing its disclosure from the questions.
            const block = parseFragment(
              `<section class="print-solution">${serializeOuter(title)}${serialize(solution)}</section>`,
            );
            const wrapper = block.childNodes.find(isElement)!;
            clean(wrapper, `${prefix}solution-`);
            entrySolutions.push(serializeOuter(wrapper));
          }
        }
        if (has(child, 'data-help')) continue;
        if (has(child, 'data-playground')) {
          const source = find(child, (element) => has(element, 'data-source'));
          if (source) {
            clean(source);
            children.push(source);
          }
          continue;
        }
        const id = child.attrs.find((item) => item.name === 'id');
        if (id) id.value = namespace + id.value;
        const href = child.attrs.find((item) => item.name === 'href');
        if (href?.value.startsWith('#'))
          href.value = '#' + namespace + href.value.slice(1);
        for (const reference of child.attrs.filter((item) =>
          ['aria-labelledby', 'aria-describedby', 'for'].includes(item.name),
        )) {
          reference.value = reference.value
            .split(' ')
            .map((value) => namespace + value)
            .join(' ');
        }
        child.attrs = child.attrs.filter(
          (item) =>
            ![
              'data-exercise',
              'data-answer',
              'data-progress-key',
              'data-reading-page',
              'data-annotatable',
            ].includes(item.name),
        );
        if (child.tagName === 'details')
          child.attrs.push({ name: 'open', value: '' });
        clean(child, namespace);
        children.push(child);
      }
      parent.childNodes = children;
    }
    clean(entry);
    if (entrySolutions.length) {
      const section = parseFragment(
        '<section data-print-solutions></section>',
      ).childNodes.find(isElement)!;
      section.attrs.find(
        (item) => item.name === 'data-print-solutions',
      )!.value = key;
      const heading = entry.childNodes.find(
        (node) => isElement(node) && node.tagName === 'h2',
      );
      section.childNodes = parseFragment(
        `${heading ? serializeOuter(heading).replace(/ id="[^"]*"/, '') : ''}${entrySolutions.join('')}`,
      ).childNodes;
      solutions.push(serializeOuter(section));
    }
  }
  return { content: serialize(fragment), solutions: solutions.join('') };
}
