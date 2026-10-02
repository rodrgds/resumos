import { expect, test } from '@playwright/test';

test('the stack alphabet keeps its literal dollar marker readable', async ({
  page,
}) => {
  await page.goto('/_content-test');
  await expect(page.locator('.prose .katex-error')).toHaveCount(0);
  await expect(
    page.locator('.prose').getByText('{0, $}', { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('.prose').getByText('$', { exact: true }),
  ).toBeVisible();
});
