import { expect, test } from '@playwright/test';

test('Markdown and MDX render LaTeX alongside semantic Typst and SVG', async ({
  page,
}) => {
  await page.goto('/_content-test');
  await expect(
    page.getByRole('heading', { name: 'Exemplo Markdown' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Exemplo MDX' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Exemplo Typst' }),
  ).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveText([
    'Primeiro ponto',
    'Segundo ponto',
  ]);
  await expect(page.locator('.katex')).toHaveCount(3);
  await expect(page.locator('.katex-display')).toHaveCount(1);
  await expect(page.locator('.typst-content math')).toHaveCount(1);
  await expect(
    page.getByRole('img', { name: 'Uma entrada transforma-se numa saída.' }),
  ).toBeVisible();
  await expect(page.locator('.typst-figure svg')).toHaveCount(1);
});
