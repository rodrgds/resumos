import { expect, test } from '@playwright/test';
import { readingThemes } from '../src/data/reading-themes';

test.use({ javaScriptEnabled: false });

test('a small sequence fits its figure without clipping or enlarging its labels', async ({
  page,
}, info) => {
  await page.goto('/exemplo/diagramas/');
  const figure = page.locator('.mermaid-figure');
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
      }, theme);
      await figure.screenshot({
        path: info.outputPath(`sequence-${width}-${theme}.png`),
      });
      const size = await figure.evaluate((element) => {
        const svg = element.querySelector('svg')!;
        return {
          visible: element.clientWidth,
          content: element.scrollWidth,
          natural: svg.viewBox.baseVal.width,
          rendered: svg.getBoundingClientRect().width,
          labels: [...svg.querySelectorAll('text')].map((label) => {
            const matrix = label.getScreenCTM()!;
            return (
              parseFloat(getComputedStyle(label).fontSize) *
              Math.hypot(matrix.a, matrix.b)
            );
          }),
        };
      });
      expect(
        size.content,
        `${width}/${theme}: small sequence is clipped`,
      ).toBeLessThanOrEqual(size.visible + 1);
      expect(size.rendered).toBeLessThanOrEqual(size.natural);
      expect(Math.min(...size.labels)).toBeGreaterThanOrEqual(12);
    }
  }
});

test('Pele keeps static labels, themes, scrolling and print exports readable', async ({
  page,
}, info) => {
  await page.goto('/_content-test');
  const figures = page.locator('.mermaid-figure');
  await expect(figures).toHaveCount(4);
  await page.setViewportSize({ width: 320, height: 844 });
  for (const palette of readingThemes) {
    for (const mode of ['light', 'dark']) {
      await page.evaluate(
        ({ palette, mode }) => {
          document.documentElement.dataset.palette = palette;
          document.documentElement.dataset.theme = mode;
        },
        { palette: palette.id, mode },
      );
      const result = await figures.evaluateAll((nodes) =>
        nodes.flatMap((node) => {
          const figure = getComputedStyle(node);
          const svg = node.querySelector('svg')!;
          const box = svg.getBoundingClientRect();
          return [...svg.querySelectorAll('text')].map((label) => {
            const text = getComputedStyle(label);
            const rect = label.getBoundingClientRect();
            const matrix = label.getScreenCTM()!;
            return {
              foreground: figure.color,
              fill: text.fill,
              size: parseFloat(text.fontSize) * Math.hypot(matrix.a, matrix.b),
              contained:
                rect.left >= box.left - 1 &&
                rect.right <= box.right + 1 &&
                rect.top >= box.top - 1 &&
                rect.bottom <= box.bottom + 1,
            };
          });
        }),
      );
      expect(result.length).toBeGreaterThan(10);
      for (const label of result) {
        expect(label.fill, `${palette.id}/${mode}`).toBe(label.foreground);
        expect(label.size).toBeGreaterThanOrEqual(12);
        expect(label.contained, `${palette.id}/${mode}`).toBe(true);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await figures
        .first()
        .screenshot({ path: info.outputPath(`${palette.id}-${mode}.png`) });
    }
  }
  const long = figures.last();
  await long.focus();
  const start = await long.evaluate((el) => el.scrollLeft);
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => long.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(start);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ media: 'print' });
  for (const figure of await figures.all())
    expect(
      await figure.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
    ).toBe(true);
  await page.screenshot({ path: info.outputPath('print.png'), fullPage: true });
  await page.goto('/exemplo/diagramas/');
  const published = page.locator('.mermaid-figure');
  await expect(published).toHaveCount(1);
  expect(
    await published.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
  ).toBe(true);
  await page.screenshot({
    path: info.outputPath('published-print.png'),
    fullPage: true,
  });
  const markdown = await page.request.get('/exemplo/diagramas.md');
  const exported = await markdown.text();
  expect(exported).toContain('/exemplo/diagramas/figura-');
  const paths = [
    ...exported.matchAll(
      /https:\/\/resumos\.rgo\.pt(\/exemplo\/diagramas\/figura-\d+\.svg)/g,
    ),
  ];
  let pele = 0;
  for (const [, path] of paths) {
    const response = await page.request.get(path);
    expect(response.ok()).toBe(true);
    const source = await response.text();
    if (!source.includes('pele-sequence')) continue;
    pele++;
    await page.goto(path);
    await expect(page.locator('svg text').first()).toHaveCSS(
      'fill',
      'rgb(41, 42, 48)',
    );
    await page.screenshot({ path: info.outputPath('markdown-svg.png') });
  }
  expect(pele).toBe(1);
});
