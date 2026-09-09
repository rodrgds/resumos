import { expect, test } from '@playwright/test';

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
