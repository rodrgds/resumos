import { expect, test } from '@playwright/test';

for (const javaScriptEnabled of [false, true]) {
  test(`standalone lesson formulas stay centered with JavaScript ${javaScriptEnabled ? 'enabled' : 'disabled'}`, async ({
    browser,
  }) => {
    for (const width of [1280, 320]) {
      const context = await browser.newContext({
        baseURL: 'http://127.0.0.1:4322',
        javaScriptEnabled,
        viewport: { width, height: 844 },
        hasTouch: width === 320,
      });
      const page = await context.newPage();
      await page.goto('/cadeiras/rc/desempenho-e-filas/');
      await page.evaluate(() => document.fonts.ready);
      const formula = page.locator('.katex').filter({
        has: page.locator('annotation', { hasText: /^N=\\lambda T\.$/ }),
      });
      await expect(formula).toHaveCount(1);
      const block = page.locator('.katex-display').filter({ has: formula });
      await expect(block).toHaveCount(1);
      const outer = (await block.boundingBox())!;
      const inner = (await formula.locator('.katex-html').boundingBox())!;
      expect(
        Math.abs(inner.x + inner.width / 2 - outer.x - outer.width / 2),
      ).toBeLessThan(2);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await context.close();
    }
  });
}

test('diagrams are centered and use the reading theme', async ({ page }) => {
  await page.goto('/exemplo/diagramas/');
  const figure = page.locator('.typst-figure').first();
  const svg = figure.locator('svg').first();
  const outer = (await figure.boundingBox())!;
  const inner = (await svg.boundingBox())!;
  expect(
    Math.abs(inner.x + inner.width / 2 - outer.x - outer.width / 2),
  ).toBeLessThan(2);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(figure).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
});

test('a formula can be highlighted and restored without duplicate math text', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const formula = page.locator('.katex').first();
  await formula.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    getSelection()!.removeAllRanges();
    getSelection()!.addRange(range);
  });
  await expect(
    page.getByRole('group', { name: 'Anotar seleção' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await page.reload();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.querySelectorAll('[data-math-highlight]').length,
      ),
    )
    .toBe(1);
  await page.keyboard.press('n');
  await expect(page.locator('.annotation-card')).toHaveCount(1);
  await expect(
    page.locator('.annotation-card').getByText('$n$', { exact: true }),
  ).toBeVisible();
});
