import { expect, test } from '@playwright/test';

test('support functions stay out of the editable example and run after edits and reset', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Comprimento de um vetor',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  const show = playground.getByRole('button', {
    name: 'Mostrar funções de apoio',
    exact: true,
  });
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await expect(show).toHaveAttribute('aria-expanded', 'false');
  await expect(editor).toContainText('print(norma([x, y]))');
  await expect(editor).not.toContainText('def norma');
  await show.click();
  const support = playground.getByRole('region', {
    name: 'Funções de apoio',
    exact: true,
  });
  await expect(support).toBeVisible();
  await expect(support).toContainText('from numpy.linalg import norm');
  await playground
    .getByRole('button', { name: 'Ocultar funções de apoio', exact: true })
    .click();
  await expect(support).not.toBeVisible();
  const run = playground.getByRole('button', { name: 'Executar', exact: true });
  const output = playground.getByLabel('Resultado', { exact: true });
  await run.click();
  await expect(output).toHaveText('5.0\n', { timeout: 60_000 });
  await editor.fill('x = 6\ny = 8\nprint(norma([x, y]))');
  await run.click();
  await expect(output).toHaveText('10.0\n', { timeout: 45_000 });
  await playground
    .getByRole('button', { name: 'Repor código', exact: true })
    .click();
  await run.click();
  await expect(output).toHaveText('5.0\n', { timeout: 45_000 });
  await show.click();
  await expect(support).toContainText('def norma(vetor):');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test('support remains inspectable without scripts and public Markdown exports the complete program', async ({
  browser,
  request,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Comprimento de um vetor',
    exact: true,
  });
  await playground.getByText('Funções de apoio', { exact: true }).click();
  await expect(
    playground.getByLabel('Funções de apoio', { exact: true }),
  ).toContainText('def norma(vetor):');
  const markdown = await request.get('/exemplo/codigo.md');
  expect(markdown.ok()).toBe(true);
  const body = await markdown.text();
  expect(body).toContain('from numpy.linalg import norm\n\ndef norma(vetor):');
  expect(body).toContain('x = 3\ny = 4\nprint(norma([x, y]))');
  await page.close();
});
