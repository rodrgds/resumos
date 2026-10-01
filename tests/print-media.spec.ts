import { expect, test } from '@playwright/test';

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
  const colours = await code.evaluate((pre) => {
    const token = pre.querySelector<HTMLElement>(
      'span[style*="--code-token-keyword"]',
    )!;
    return {
      token: getComputedStyle(token).color,
      plain: getComputedStyle(pre).color,
      printColor: getComputedStyle(pre).printColorAdjust,
    };
  });
  expect(colours.token).not.toBe(colours.plain);
  expect(colours.printColor).toBe('exact');
});
