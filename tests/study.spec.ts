import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('reading help preserves an earlier result and does not invent an attempt', async ({
  page,
}) => {
  await page.goto('/exemplo/praticar-somas/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.getByText('Primeira pista', { exact: true }).click();
  await expect(question.getByRole('status')).toContainText(
    'Ainda não registaste uma resposta',
  );
  await question.getByLabel('A tua resposta').fill('210');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await question.getByText('Ver solução', { exact: true }).click();
  await expect(question.getByRole('status')).toContainText(
    'Resposta correta, com pistas',
  );
  await page.reload();
  await expect(question.getByRole('status')).toContainText(
    'Resposta correta, com pistas',
  );
  await question.getByLabel('A tua resposta').fill('210');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText(
    'após consultar a solução',
  );
});

test('zero tolerance requires the exact numerical answer', async ({ page }) => {
  await page.goto('/exemplo/praticar-somas/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.getByLabel('A tua resposta').fill('210.00000000000003');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText('Ainda não');
});

test('a lesson leads to practice while revision stays outside its reading sequence', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page
    .getByRole('complementary', { name: 'Estudar e praticar' })
    .getByRole('link', { name: 'Praticar somas e ciclos' })
    .click();
  await expect(page).toHaveURL(/\/exemplo\/praticar-somas\/$/);
  await expect(
    page
      .getByRole('navigation', { name: 'Percurso da cadeira' })
      .getByRole('link', { name: /somas/ }),
  ).toHaveCount(0);
  await page.goto('/exemplo/folha-consulta/');
  await expect(
    page
      .getByRole('navigation', { name: 'Continuar a leitura' })
      .getByRole('link'),
  ).toHaveCount(0);
  await expect(
    page
      .getByRole('navigation', { name: 'Percurso da cadeira' })
      .getByRole('link', { name: /consulta/ }),
  ).toHaveCount(0);
});

test('numeric answers enforce tolerance and retain help attribution across clearing and reload', async ({
  page,
}) => {
  await page.goto('/exemplo/praticar-somas/');
  const question = page.getByRole('region', {
    name: '3. Interpretar uma média',
  });
  await question.getByLabel('A tua resposta').fill('3,52');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText('Ainda não');
  await question.getByLabel('A tua resposta').fill('3,51');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText(
    'correta, sem ajuda',
  );
  await question.getByText('Primeira pista', { exact: true }).click();
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText(
    'correta, com pistas',
  );
  await question.getByText('Ver solução', { exact: true }).click();
  await question.getByRole('button', { name: 'Limpar resposta' }).click();
  await question.getByLabel('A tua resposta').fill('3.5');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText(
    'correta, após consultar a solução',
  );
  await page.reload();
  await expect(question.getByLabel('A tua resposta')).toHaveValue('');
  await expect(question.getByRole('status')).toContainText(
    'após consultar a solução',
  );
});

test('choice explanations and self assessment stay distinct from automatic correctness', async ({
  page,
}) => {
  await page.goto('/exemplo/praticar-somas/');
  const choice = page.getByRole('region', {
    name: '5. Escolher o estado certo',
  });
  await choice.getByLabel('Sempre zero').check();
  await choice.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(choice.getByRole('status')).toContainText(
    'Só é zero antes da primeira iteração',
  );
  await choice.getByLabel('A soma de 1 até k − 1', { exact: true }).check();
  await choice.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(choice.getByRole('status')).toContainText('Resposta correta');
  const open = page.getByRole('region', { name: '1. Justificar a fórmula' });
  await open
    .getByLabel('A tua resposta')
    .fill('A minha resposta privada: somar duas linhas.');
  await open.getByRole('button', { name: 'Registar tentativa' }).click();
  await expect(open.getByRole('status')).toContainText('Tentativa registada');
  await open.getByText('Ver solução', { exact: true }).click();
  await open.getByRole('button', { name: 'Conferi a minha resposta' }).click();
  await expect(open.getByRole('status')).toContainText(
    'Resposta conferida por ti, após consultar a solução',
  );
  const saved = await page.evaluate(() =>
    localStorage.getItem('resumos-exercise-progress'),
  );
  expect(saved).not.toContain('A minha resposta privada');
  const markdown = await page.request.get('/exemplo/praticar-somas.md');
  expect(await markdown.text()).not.toContain('A minha resposta privada');
  expect(await markdown.text()).toContain('Justificar a fórmula');
});

test('a print pack selects pages and places optional solutions after all questions', async ({
  page,
}) => {
  await page.goto('/exemplo/imprimir/');
  const appendix = page.locator('.print-appendix');
  await expect(appendix).toBeHidden();
  await page.getByLabel('Incluir soluções no fim').check();
  await expect(appendix).toBeVisible();
  await expect(
    appendix.getByRole('heading', { name: '1. Justificar a fórmula' }),
  ).toBeVisible();
  await expect(
    page.locator('[data-print-entry="exemplo/praticar-somas"] [data-solution]'),
  ).toHaveCount(0);
  const duplicates = await page
    .locator('[id]')
    .evaluateAll((elements) =>
      elements
        .map((element) => element.id)
        .filter((id, index, ids) => ids.indexOf(id) !== index),
    );
  expect(duplicates).toEqual([]);
  await page
    .getByLabel('Folha de consulta de somas', { exact: true })
    .uncheck();
  await expect(
    page.locator('[data-print-entry="exemplo/folha-consulta"]'),
  ).toBeHidden();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.skip-link')).toBeHidden();
  const printedQuestions = page.locator(
    '[data-print-entry="exemplo/praticar-somas"]',
  );
  await expect(
    printedQuestions.getByText('A soma de 1 até k − 1', { exact: true }),
  ).toBeVisible();
  await expect(
    printedQuestions.getByText('Sempre zero', { exact: true }),
  ).toBeVisible();
  await expect(
    printedQuestions.getByText(/Tolerância absoluta: ±0,01/),
  ).toBeVisible();
  await expect(appendix).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Imprimir ou guardar PDF' }),
  ).toBeHidden();
  await expect(
    page.getByText('def soma_naturais(n):', { exact: false }).first(),
  ).toBeVisible();
  await page.emulateMedia({ media: 'screen' });
  await page.getByLabel('Praticar somas e ciclos', { exact: true }).uncheck();
  await expect(
    page.getByRole('button', { name: 'Imprimir ou guardar PDF' }),
  ).toBeDisabled();
  await expect(page.getByRole('status')).toContainText(
    'Escolhe pelo menos uma página',
  );
});

test('the statistics sheet keeps long formulas within a narrow reading page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/me/folha-consulta/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('practice and print remain readable without JavaScript or storage', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: 'http://127.0.0.1:4322',
  });
  const page = await context.newPage();
  await page.goto('/exemplo/praticar-somas/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.getByText('Ver solução', { exact: true }).click();
  await expect(
    question.getByText('20 × 21 / 2 = 210.', { exact: false }),
  ).toBeVisible();
  await page.goto('/exemplo/imprimir/');
  await expect(page.locator('.print-appendix')).toBeVisible();
  await context.close();
});

test('editorial scope does not imply a review of the current edition', async ({
  page,
}) => {
  await page.goto('/cadeiras/da/');
  await expect(page.locator('.editorial-note')).toContainText(
    'Baseado em 2025/26. Por verificar para 2026/27.',
  );
  await expect(page.locator('.coverage-statement')).toContainText(
    'Faltam guiões dos projetos',
  );
  await page.locator('.editorial-note summary').click();
  await expect(
    page.getByRole('link', { name: 'Programa de DA, SIGARRA 2025/26' }),
  ).toBeVisible();
  await expect(page.locator('.editorial-note')).not.toContainText(
    'Revisto para',
  );
  await page.goto('/cadeiras/fp/segundo/');
  await expect(page.locator('.editorial-note summary')).toContainText(
    'Revisto para 2026/27.',
  );
  await page.locator('.editorial-note summary').click();
  await expect(page.locator('.editorial-note')).toContainText(
    'Revisor fictício de teste',
  );
  await page.goto('/cadeiras/fp/primeiro/');
  await expect(page.locator('.editorial-note')).not.toContainText(
    'Revisto para',
  );
});

test('practice controls work at narrow widths and expose accessible names', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/exemplo/praticar-somas/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page }).include('main').analyze();
  expect(results.violations).toEqual([]);
});

test('the coding exercise exposes a failing test and accepts the repaired loop', async ({
  page,
}) => {
  await page.goto('/exemplo/praticar-somas/');
  const playground = page.getByRole('region', {
    name: 'Corrigir soma_naturais',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await expect(editor).toBeVisible();
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(
    playground.getByLabel('Resultado', { exact: true }),
  ).toContainText('n=1: esperado 1, obtido 0', { timeout: 25_000 });
  const code = (await playground
    .locator('[data-source]')
    .textContent())!.replace('range(1, n):', 'range(1, n + 1):');
  await editor.fill(code);
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(
    playground.getByLabel('Resultado', { exact: true }),
  ).toContainText('Os quatro testes passaram.', { timeout: 25_000 });
});

test('blocked storage does not prevent answering or opening a solution', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Blocked', 'SecurityError');
    };
    Storage.prototype.getItem = () => {
      throw new DOMException('Blocked', 'SecurityError');
    };
  });
  await page.goto('/exemplo/praticar-somas/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.getByText('Ver solução', { exact: true }).click();
  await question.getByLabel('A tua resposta').fill('210');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText(
    'correta, após consultar a solução',
  );
});
