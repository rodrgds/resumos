import { expect, test } from '@playwright/test';

test('printed scale comparison retains both authored bar charts', async ({
  page,
}) => {
  await page.goto('/cadeiras/pup/comunicacao-visual/tldr/');
  await page.evaluate(() => {
    window.print = () => {};
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  const printed = page.locator('[data-print-page]');
  await expect(
    printed.getByRole('img', { name: /Barras com origem em 0,00 J/ }),
  ).toBeVisible();
  await expect(
    printed.getByRole('img', { name: /Barras com origem em 0,79 J/ }),
  ).toBeVisible();
  await expect(printed.getByRole('slider')).toHaveCount(0);
});
