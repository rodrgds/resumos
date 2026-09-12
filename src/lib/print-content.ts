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
        if (has(child, 'data-pagefind-ignore')) continue;
        if (has(child, 'data-exercise')) {
          const title = find(child, (element) => element.tagName === 'summary');
          const solution = find(child, (element) =>
            has(element, 'data-solution'),
          );
          if (title && solution) {
            // Copy the authored solution before removing its disclosure from the questions.
            const block = parseFragment(
              `<section class="print-solution"><h3>${serialize(title)}</h3>${serialize(solution)}</section>`,
            );
            const wrapper = block.childNodes.find(isElement)!;
            clean(wrapper, `${prefix}solution-`);
            entrySolutions.push(serializeOuter(wrapper));
          }
        }
        if (has(child, 'data-help')) continue;
        if (attr(child, 'class')?.split(' ').includes('exercise-explanation'))
          continue;
        if (has(child, 'data-manim')) {
          const video = find(child, (element) => element.tagName === 'video');
          const caption = child.childNodes.find(
            (element) => isElement(element) && element.tagName === 'figcaption',
          );
          if (video && caption) {
            const poster = parseFragment(
              '<img class="manim-print-poster">',
            ).childNodes.find(isElement)!;
            poster.attrs.push(
              { name: 'src', value: attr(video, 'poster')! },
              { name: 'alt', value: attr(child, 'data-title')! },
              { name: 'loading', value: 'eager' },
            );
            child.childNodes = [poster, caption];
          }
        }
        if (has(child, 'data-tabs')) {
          const tablist = child.childNodes.find(
            (element) =>
              isElement(element) && attr(element, 'role') === 'tablist',
          );
          const panels = child.childNodes
            .filter(isElement)
            .filter((element) => attr(element, 'role') === 'tabpanel');
          for (const panel of panels) {
            const label =
              tablist &&
              find(
                tablist,
                (element) =>
                  attr(element, 'id') === attr(panel, 'aria-labelledby'),
              );
            if (label) {
              const heading = parseFragment(
                `<h3>${serialize(label)}</h3>`,
              ).childNodes.find(isElement)!;
              panel.childNodes.unshift(heading);
            }
            panel.attrs = panel.attrs.filter(
              (item) =>
                !['hidden', 'role', 'aria-labelledby', 'tabindex'].includes(
                  item.name,
                ),
            );
          }
          child.childNodes = panels;
        }
        if (has(child, 'data-video')) {
          const thumbnail = find(
            child,
            (element) =>
              element.tagName === 'img' &&
              attr(element, 'class')?.split(' ').includes('video-thumbnail') ===
                true,
          );
          if (thumbnail) {
            thumbnail.attrs = thumbnail.attrs.filter(
              (item) => !['alt', 'loading', 'decoding'].includes(item.name),
            );
            thumbnail.attrs.push(
              {
                name: 'alt',
                value: attr(child, 'data-title') || 'Vídeo do YouTube',
              },
              { name: 'loading', value: 'eager' },
            );
            child.childNodes = [thumbnail];
          }
        }
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
        if (child.tagName === 'summary') {
          child.tagName = 'h3';
          child.nodeName = 'h3';
        }
        if (child.tagName === 'details') {
          child.tagName = 'div';
          child.nodeName = 'div';
          child.attrs = child.attrs.filter((item) => item.name !== 'open');
        }
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
      section.childNodes = parseFragment(entrySolutions.join('')).childNodes;
      solutions.push(serializeOuter(section));
    }
  }
  return { content: serialize(fragment), solutions: solutions.join('') };
}
