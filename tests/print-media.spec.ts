import { expect, test } from '@playwright/test';

test('printed lessons retain video thumbnails and readable code colours', async ({
  page,
}) => {
  await page.route('https://i.ytimg.com/**', (route) =>
    route.fulfill({
      path: 'public/examples/pontos.svg',
      contentType: 'image/svg+xml',
    }),
  );
  await page.goto('/cadeiras/fsi/programacao-defensiva/');
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
  await expect(thumbnail).toHaveAttribute('alt', /buffer overflow/);
  await expect
    .poll(() =>
      thumbnail.evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  const code = printed.locator('pre.astro-code').first();
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

test('print expands disclosures and shows every tab option', async ({
  page,
}) => {
  await page.goto('/cadeiras/rc/camada-de-rede/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  const printed = page.locator('[data-print-page]');
  const tabs = printed.locator('.content-tabs');
  await expect(
    tabs.getByRole('heading', { name: 'Em 4 sub-redes' }),
  ).toBeVisible();
  await expect(
    tabs.getByRole('heading', { name: 'Em 8 sub-redes' }),
  ).toBeVisible();
  await expect(tabs.getByText('blocos de 32 com 30 máquinas')).toBeVisible();
  await expect(
    printed.getByRole('heading', { name: 'Ver a regra de ouro da divisão' }),
  ).toBeVisible();
  await expect(
    printed.getByText('O erro típico é esquecer os dois endereços'),
  ).toBeVisible();
});
