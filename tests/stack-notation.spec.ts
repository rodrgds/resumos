import { expect, test } from '@playwright/test';

test('the stack alphabet keeps its literal dollar marker readable', async ({
  page,
}) => {
  await page.goto('/cadeiras/tc/automatos-pilha/');
  await expect(page.locator('.lesson-body .katex-error')).toHaveCount(0);
  await expect(
    page.locator('.lesson-body').getByText('{0, $}', { exact: true }),
  ).toBeVisible();
});
