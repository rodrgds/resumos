import { expect, test } from '@playwright/test';

test('Python playground highlights the selected theme and executes', async ({
  page,
}) => {
  await page.goto('/cadeiras/f1/centro-massa-momento/');
  const playground = page.getByRole('region', {
    name: 'Colisão elástica com números',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await expect(editor).toBeVisible();

  const tokenColors = await playground
    .locator('.cm-line span')
    .evaluateAll((tokens) => [
      ...new Set(tokens.map((token) => getComputedStyle(token).color)),
    ]);
  expect(tokenColors.length).toBeGreaterThan(1);

  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(playground.getByRole('status')).toHaveText('Concluído', {
    timeout: 20_000,
  });
  await expect(
    playground.getByLabel('Resultado', { exact: true }),
  ).toContainText('v1 = 1.00 m/s, v2 = 4.00 m/s');
});
