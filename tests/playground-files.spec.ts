import { expect, test } from '@playwright/test';

test('the authored NumPy CSV example reads its supplied data unchanged', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto('/cadeiras/ct-iadp/numpy/');
  const playground = page.getByRole('region', {
    name: 'Ler dados numéricos',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(playground.getByRole('status')).toHaveText('Concluído', {
    timeout: 45_000,
  });
  await expect(playground.getByLabel('Resultado', { exact: true })).toHaveText(
    '(2, 2)\n[6. 8.]\n',
  );
});

test('support files are editable tabs and the main file runs with imports', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Norma do vetor',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  const mainTab = playground.getByRole('radio', { name: 'main.py' });
  const apoioTab = playground.getByRole('radio', { name: 'apoio.py' });
  await expect(mainTab).toBeChecked();
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await expect(editor).toContainText('from apoio import norma');
  await expect(editor).not.toContainText('def norma');
  await apoioTab.click();
  const apoio = playground.getByRole('textbox', {
    name: 'Ficheiro apoio.py',
    exact: true,
  });
  await expect(apoio).toBeVisible();
  await expect(apoio).toContainText('def norma(vetor):');
  await expect(editor).not.toBeVisible();
  await mainTab.click();
  await expect(editor).toBeVisible();
  const run = playground.getByRole('button', { name: 'Executar', exact: true });
  const output = playground.getByLabel('Resultado', { exact: true });
  await run.click();
  await expect(output).toHaveText('5.0\n', { timeout: 60_000 });
  await editor.fill(
    'from apoio import norma\n\nx = 6\ny = 8\nprint(norma([x, y]))',
  );
  await run.click();
  await expect(output).toHaveText('10.0\n', { timeout: 45_000 });
  await apoioTab.click();
  await apoio.fill(
    'from numpy.linalg import norm\n\ndef norma(vetor):\n    return 2 * float(norm(vetor))',
  );
  await run.click();
  await expect(output).toHaveText('20.0\n', { timeout: 45_000 });
  await playground
    .getByRole('button', { name: 'Repor código', exact: true })
    .click();
  await expect(apoio).toContainText('return float(norm(vetor))');
  await mainTab.click();
  await run.click();
  await expect(output).toHaveText('5.0\n', { timeout: 45_000 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
});

test('files stay inspectable without scripts and public Markdown exports every file', async ({
  browser,
  request,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Norma do vetor',
    exact: true,
  });
  await expect(playground.locator('pre[data-source]')).toContainText(
    'from apoio import norma',
  );
  await expect(playground.locator('pre[data-support-source]')).toContainText(
    'def norma(vetor):',
  );
  const markdown = await request.get('/exemplo/codigo.md');
  expect(markdown.ok()).toBe(true);
  const body = await markdown.text();
  expect(body).toContain('**main.py**');
  expect(body).toContain('**apoio.py**');
  expect(body).toContain('from numpy.linalg import norm\n\ndef norma(vetor):');
  expect(body).toContain('from apoio import norma');
  await page.close();
});
