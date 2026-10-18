import { expect, type Locator } from '@playwright/test';

// Count authored arrowheads, then inspect their painted geometry. Pele emits
// inline shapes; SVG references, when present, must still resolve in this SVG.
export async function expectDiagramArrows(figure: Locator, expected: number) {
  const state = await figure.locator('svg').evaluate((svg) => {
    const arrows = [
      ...svg.querySelectorAll<SVGGraphicsElement>('.pele-marker'),
    ];
    const visible = arrows.map((arrow) => {
      const box = arrow.getBoundingClientRect();
      const style = getComputedStyle(arrow);
      return (
        box.width > 1 &&
        box.height > 1 &&
        arrow.checkVisibility({
          opacityProperty: true,
          visibilityProperty: true,
        }) &&
        (style.fill !== 'none' || style.stroke !== 'none')
      );
    });
    const references = [...svg.querySelectorAll('*'), svg].flatMap((node) =>
      [...node.attributes].flatMap((attribute) => {
        const ids = ['aria-labelledby', 'aria-describedby'].includes(
          attribute.name,
        )
          ? attribute.value.split(/\s+/)
          : [
              ...attribute.value.matchAll(
                /url\(\s*['"]?#([^)'"\s]+)['"]?\s*\)/g,
              ),
            ].map((match) => match[1]);
        return ids.map((id) => {
          const matches = [...document.querySelectorAll('[id]')].filter(
            (target) => target.id === id,
          );
          return matches.length === 1 && svg.contains(matches[0]);
        });
      }),
    );
    return { visible, references };
  });
  expect(state.visible).toHaveLength(expected);
  expect(state.visible.every(Boolean)).toBe(true);
  expect(state.references.every(Boolean)).toBe(true);
  return state.references.length;
}
