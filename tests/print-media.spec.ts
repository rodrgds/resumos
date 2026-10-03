import { expect, test } from '@playwright/test';

test('printed Mermaid diagrams retain their arrowheads', async ({ page }) => {
  await page.goto('/exemplo/diagramas/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  const figure = page.locator('[data-print-page] .mermaid-figure');
  await expect(figure).toBeVisible();
  const references = await figure.evaluate((element) => {
    const arrows = Array.from(element.querySelectorAll('[marker-end]'));
    return arrows.map((arrow) => {
      const id = arrow.getAttribute('marker-end')!.match(/url\(#([^)]*)\)/)![1];
      const marker = element.querySelector(`[id="${id}"]`);
      return {
        resolves: marker?.tagName === 'marker',
        visible: !!marker?.querySelector('path'),
      };
    });
  });
  expect(references).toHaveLength(2);
  expect(references.every(({ resolves, visible }) => resolves && visible)).toBe(
    true,
  );
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

test('printed diagrams keep dark note backgrounds legible', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'resumos-preferences',
      JSON.stringify({ theme: 'dark' }),
    ),
  );
  await page.goto('/exemplo/diagramas/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  const printed = page.locator('[data-print-page]');
  const note = printed.locator('svg [fill*="accent-soft"]').first();
  expect(await note.count()).toBeGreaterThan(0);
  const colours = await printed.evaluate((root) => {
    const shape = root.querySelector(
      'svg [fill*="accent-soft"]',
    ) as SVGGraphicsElement;
    const ink = root.querySelector('svg text') as SVGTextElement;
    return {
      background: getComputedStyle(shape).fill,
      foreground: getComputedStyle(ink).fill,
    };
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
  const light = luminance(colours.background);
  const dark = luminance(colours.foreground);
  expect(
    (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05),
  ).toBeGreaterThanOrEqual(4.5);
});
