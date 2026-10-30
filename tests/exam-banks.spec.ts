import { expect, test } from '@playwright/test';

test('an old-exam bank renders its questions and worked solution', async ({
  page,
}) => {
  await page.goto('/cadeiras/alga/exercicios-mt1/');
  await expect(
    page.getByRole('heading', { name: 'Exercícios MT1', exact: true }),
  ).toBeVisible();
  await expect(page.locator('[data-exercise]')).toHaveCount(13);
  const first = page.locator('[data-exercise]').first();
  await first.locator('.exercise-disclosure > summary').click();
  const modal = first.locator('dialog.exercise-modal');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading', { level: 2 })).toHaveText(
    'Quadrado de uma matriz igual a menos a identidade',
  );
  await expect(modal.locator('.exercise-prompt')).toContainText(
    'Indique os valores de',
  );
  await modal.locator('[data-response]').fill('a = -6, b = -1');
  await modal.getByRole('button', { name: 'Comparar com a solução' }).click();
  await expect(
    modal.locator('[data-help="solution"]').first(),
  ).toHaveJSProperty('open', true);
  await expect(modal.locator('.exercise-checklist')).toContainText(
    'A resposta indica',
  );
});
