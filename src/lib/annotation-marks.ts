import { annotate } from 'rough-notation';
import type { RoughAnnotation } from 'rough-notation/lib/model';
import { mathElement } from './text-anchors';

/** Browser ranges split at syntax tokens and inline markup, not only line breaks. */
function lineBoxes(ranges: Range[]) {
  const boxes = ranges
    .filter((range) => !mathElement(range))
    .flatMap((range) => [...range.getClientRects()])
    .filter((box) => box.width > 0 && box.height > 0)
    .sort((a, b) => a.top - b.top || a.left - b.left);
  const lines: DOMRect[] = [];
  for (const box of boxes) {
    const line = lines.find(
      (line) =>
        Math.abs((line.top + line.bottom) / 2 - (box.top + box.bottom) / 2) <
          Math.min(line.height, box.height) * 0.35 &&
        box.left <= line.right + 3 &&
        box.right >= line.left - 3,
    );
    if (!line) {
      lines.push(new DOMRect(box.x, box.y, box.width, box.height));
      continue;
    }
    const right = Math.max(line.right, box.right);
    const bottom = Math.max(line.bottom, box.bottom);
    line.x = Math.min(line.left, box.left);
    line.y = Math.min(line.top, box.top);
    line.width = right - line.x;
    line.height = bottom - line.y;
  }
  return lines;
}

/** Draw outside lesson content so decoration never changes passage anchoring. */
export function annotationMarks(root: HTMLElement, edit: (id: string) => void) {
  const layer = document.createElement('div');
  layer.className = 'annotation-marks';
  layer.dataset.pagefindIgnore = '';
  document.body.append(layer);
  let drawings: RoughAnnotation[] = [];
  let current = new Map<string, Range[]>();
  let active: string | null = null;
  let frame = 0;

  function draw() {
    const focused = document.activeElement;
    const focusedId =
      focused instanceof HTMLElement && focused.matches('.annotation-pin')
        ? focused.dataset.noteId
        : undefined;
    drawings.forEach((drawing) => drawing.remove());
    drawings = [];
    layer.replaceChildren();
    const page = root.getBoundingClientRect();
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--annotation-ink')
      .trim();
    const ordered = [...current]
      .map(([id, ranges]) => ({
        id,
        ranges,
        rect: ranges[0]?.getBoundingClientRect(),
      }))
      .filter((item) => item.rect?.height)
      .sort((a, b) => a.rect!.top - b.rect!.top);
    let lastPin = -Infinity;
    for (const { id, ranges, rect } of ordered) {
      for (const box of lineBoxes(ranges)) {
        const target = document.createElement('span');
        target.className = 'annotation-stroke';
        target.setAttribute('aria-hidden', 'true');
        Object.assign(target.style, {
          left: `${box.left + scrollX}px`,
          top: `${box.top + scrollY}px`,
          width: `${box.width}px`,
          height: `${box.height}px`,
        });
        layer.append(target);
        const drawing = annotate(target, {
          type: 'highlight',
          color,
          padding: 0,
          animate: false,
          iterations: 1,
        });
        target.previousElementSibling?.setAttribute('aria-hidden', 'true');
        drawing.show();
        drawings.push(drawing);
      }
      const pin = document.createElement('button');
      pin.className = 'annotation-pin';
      pin.dataset.noteId = id;
      pin.setAttribute(
        'aria-label',
        `Abrir nota: ${ranges
          .map((range) => range.toString())
          .join(' ')
          .slice(0, 90)}`,
      );
      pin.setAttribute('aria-pressed', String(id === active));
      const icon = document.querySelector<HTMLTemplateElement>(
        '#annotation-pin-icon',
      );
      if (icon) pin.append(icon.content.cloneNode(true));
      const top = Math.max(rect!.top + scrollY, lastPin + 34);
      lastPin = top;
      pin.style.top = `${top}px`;
      pin.style.left = `${Math.min(page.right + scrollX + 8, innerWidth + scrollX - 32)}px`;
      pin.addEventListener('click', () => edit(id));
      layer.append(pin);
    }
    root.classList.add('rough-highlights');
    if (focusedId) {
      [...layer.querySelectorAll<HTMLButtonElement>('.annotation-pin')]
        .find((pin) => pin.dataset.noteId === focusedId)
        ?.focus({ preventScroll: true });
    }
  }
  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  }
  new ResizeObserver(schedule).observe(root);
  new MutationObserver(schedule).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'data-palette', 'style'],
  });
  root.addEventListener('toggle', schedule, true);
  root.addEventListener('load', schedule, true);
  document.fonts.ready.then(schedule);
  window.addEventListener('resize', schedule);
  return (ranges: Map<string, Range[]>, selected: string | null) => {
    current = new Map(ranges);
    active = selected;
    schedule();
  };
}
