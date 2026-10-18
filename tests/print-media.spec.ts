import { expect, test } from '@playwright/test';
import { readingThemes } from '../src/data/reading-themes';
import { expectDiagramArrows } from './helpers/diagram-arrows';

test('printed Mermaid diagrams retain their arrowheads', async ({ page }) => {
  await page.goto('/exemplo/diagramas/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  const figure = page.locator('[data-print-page] .mermaid-figure');
  await expect(figure).toBeVisible();
  await expectDiagramArrows(figure, 2);
});

test('printed lessons retain video thumbnails after they load', async ({
  page,
}) => {
  await page.route('https://i.ytimg.com/**', (route) =>
    route.fulfill({
      path: 'public/examples/pontos.svg',
      contentType: 'image/svg+xml',
    }),
  );
  await page.goto('/exemplo/diagramas/');
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printCalled = 'true';
      const image = document.querySelector<HTMLImageElement>(
        '[data-print-page] .video-thumbnail',
      );
      document.documentElement.dataset.printImageReady = String(
        image?.complete && image.naturalWidth > 0,
      );
    };
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-print-called',
    'true',
  );
  await expect(page.locator('html')).toHaveAttribute(
    'data-print-image-ready',
    'true',
  );
  await page.emulateMedia({ media: 'print' });
  const printed = page.locator('[data-print-page]');
  const thumbnail = printed.locator('.video-embed img');
  await expect(thumbnail).toBeVisible();
  await expect(thumbnail).toHaveAttribute('alt', /Vetores/);
  await expect
    .poll(() =>
      thumbnail.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
});

test('printed animations include their local poster images', async ({
  page,
}) => {
  await page.goto('/exemplo/animacoes/');
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printCalled = 'true';
    };
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-print-called',
    'true',
  );
  await page.emulateMedia({ media: 'print' });
  const figures = page.locator('[data-print-page] .manim-figure');
  await expect(figures).toHaveCount(2);
  const poster = figures.first().locator('img');
  await expect(poster).toBeVisible();
  await expect(poster).toHaveAttribute(
    'alt',
    'Um deslocamento a seguir ao outro',
  );
  await expect
    .poll(() =>
      poster.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(figures.first().locator('figcaption')).toContainText(
    'O vetor v',
  );
});

test('print expands disclosures and shows every tab with readable code colours', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'resumos-preferences',
      JSON.stringify({ theme: 'dark', palette: 'catppuccin' }),
    ),
  );
  await page.goto('/exemplo/formatacao/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  const printed = page.locator('[data-print-page]');
  const tabs = printed.locator('.content-tabs');
  await expect(tabs.getByRole('heading', { name: 'Python' })).toBeVisible();
  await expect(tabs.getByRole('heading', { name: 'C++' })).toBeVisible();
  await expect(
    tabs.locator('pre').filter({ hasText: 'std::cout' }),
  ).toBeVisible();
  await expect(
    printed.getByRole('heading', { name: 'Ver a resolução de um exercício' }),
  ).toBeVisible();
  await expect(
    printed.getByText(/O cálculo direto chega ao mesmo resultado/),
  ).toBeVisible();
  const code = tabs.locator('pre.astro-code').filter({ hasText: 'int n = 4;' });
  const typeColor = await code
    .getByText('int', { exact: true })
    .evaluate((token) => getComputedStyle(token).color);
  const colours = await code.evaluate((pre) => {
    return {
      plain: getComputedStyle(pre).color,
      printColor: getComputedStyle(pre).printColorAdjust,
    };
  });
  expect(typeColor).not.toBe(colours.plain);
  const channels = typeColor.match(/\d+/g)!.map((channel) => {
    const value = Number(channel) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance =
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  expect(1.05 / (luminance + 0.05)).toBeGreaterThanOrEqual(4.5);
  expect(colours.printColor).toBe('exact');
});

test('printed pages and diagram notes stay light and legible from every reading palette and mode', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.goto('/exemplo/diagram-notes/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  const luminance = (colour: string) => {
    const channels = colour
      .match(/\d+/g)!
      .slice(0, 3)
      .map((channel) => {
        const value = Number(channel) / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const screen = page.locator('.lesson-body .mermaid-figure');
  const screenColours = () =>
    screen.evaluate((root) => ({
      background: getComputedStyle(root.querySelector('.pele-note rect')!).fill,
      foreground: getComputedStyle(root.querySelector('.pele-note text')!).fill,
      scheme: getComputedStyle(document.documentElement).colorScheme,
    }));
  for (const palette of readingThemes) {
    for (const mode of ['light', 'dark', 'system']) {
      await page.emulateMedia({
        colorScheme: mode === 'light' ? 'light' : 'dark',
      });
      await page.evaluate(
        ({ palette, mode }) => {
          document.documentElement.dataset.palette = palette;
          if (mode === 'system') delete document.documentElement.dataset.theme;
          else document.documentElement.dataset.theme = mode;
        },
        { palette: palette.id, mode },
      );
      const before = await screenColours();
      await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
      const options = page.getByRole('dialog', {
        name: 'Imprimir esta página',
      });
      await expect(options).toBeVisible();
      await options
        .getByRole('button', { name: 'Imprimir', exact: true })
        .click();
      await page.emulateMedia({ media: 'print' });
      expect(
        await page.evaluate(() =>
          [document.documentElement, document.body].map((node) => {
            const style = getComputedStyle(node);
            return {
              background: style.backgroundColor,
              scheme: style.colorScheme,
            };
          }),
        ),
        `${palette.id}/${mode}: the page canvas must print in light mode`,
      ).toEqual([
        { background: 'rgb(255, 255, 255)', scheme: 'light' },
        { background: 'rgb(255, 255, 255)', scheme: 'light' },
      ]);
      const printed = page.locator('[data-print-page] .mermaid-figure');
      await expect(printed).toBeVisible();
      expect(await expectDiagramArrows(printed, 2)).toBeGreaterThan(0);
      const notes = await printed.locator('.pele-note').evaluateAll((nodes) =>
        nodes.map((note) => ({
          background: getComputedStyle(note.querySelector('rect')!).fill,
          foreground: getComputedStyle(note.querySelector('text')!).fill,
        })),
      );
      expect(notes.length).toBeGreaterThan(0);
      for (const note of notes) {
        const background = luminance(note.background);
        const foreground = luminance(note.foreground);
        expect(
          (Math.max(background, foreground) + 0.05) /
            (Math.min(background, foreground) + 0.05),
          `${palette.id}/${mode}: ${JSON.stringify(note)}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
      expect(
        await printed.evaluate(
          (node) => node.scrollWidth <= node.clientWidth + 1,
        ),
      ).toBe(true);
      await printed.screenshot({
        path: info.outputPath(`print-${palette.id}-${mode}.png`),
      });
      await page.emulateMedia({ media: 'screen' });
      await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
      expect(await screenColours()).toEqual(before);
    }
  }
});
