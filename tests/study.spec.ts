import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('continue reading returns to an open exercise in its lesson', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '1. Justificar a fórmula',
  });
  await question.locator(':scope > details > summary').click();
  await question
    .getByLabel('A tua resposta')
    .fill('Resposta privada sem persistência');
  await question.scrollIntoViewIfNeeded();
  await page.goto('/');
  await expect(page.locator('[data-resume]')).toHaveAttribute(
    'href',
    '/exemplo/apontamentos/?continuar=1',
  );
  await page.locator('[data-resume]').click();
  await expect(question.getByLabel('A tua resposta')).toBeVisible();
  await expect(question.getByLabel('A tua resposta')).toHaveValue('');
  await expect(question).toBeInViewport();
});

test('inline notation stays within its sentence on the example sheet', async ({
  page,
}) => {
  await page.goto('/exemplo/folha-consulta/');
  await expect(
    page.getByRole('cell', { name: 'range(1, n + 1)', exact: true }),
  ).toBeVisible();
  const sentence = page
    .locator('.lesson-body p')
    .filter({ hasText: /^Para/ })
    .first();
  const bounds = await sentence.evaluate((element) => {
    const formula = element.querySelector('.katex')!;
    const text = [...element.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE,
    )!;
    const range = document.createRange();
    range.selectNodeContents(text);
    return {
      text: range.getBoundingClientRect().y,
      formula: formula.getBoundingClientRect().y,
    };
  });
  expect(Math.abs(bounds.formula - bounds.text)).toBeLessThan(10);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/cadeiras/bd/algebra-relacional/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('reading help preserves an earlier result and does not invent an attempt', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.locator(':scope > details > summary').click();
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
  await question.locator(':scope > details > summary').click();
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
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.locator(':scope > details > summary').click();
  await question.getByLabel('A tua resposta').fill('210.00000000000003');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText('Ainda não');
});

test('practice opens in the lesson and the cheat sheet stays outside its sequence', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await expect(question.getByLabel('A tua resposta')).toBeHidden();
  await question.locator(':scope > details > summary').click();
  await expect(question.getByLabel('A tua resposta')).toBeVisible();
  await question.locator(':scope > details > summary').click();
  await expect(question.getByLabel('A tua resposta')).toBeHidden();
  await expect(page).toHaveURL(/\/exemplo\/apontamentos\/$/);
  await page
    .getByRole('navigation', { name: 'Conteúdos da cadeira' })
    .getByRole('link', { name: 'Cheat sheet', exact: true })
    .click();
  await expect(page).toHaveURL(/\/exemplo\/folha-consulta\/$/);
  await expect(
    page
      .getByRole('navigation', { name: 'Continuar a leitura' })
      .getByRole('link'),
  ).toHaveCount(0);
  await expect(
    page
      .getByRole('navigation', { name: 'Percurso da cadeira' })
      .getByRole('link', { name: /Cheat sheet/ }),
  ).toHaveCount(0);
});

test('numeric answers enforce tolerance and retain help attribution across clearing and reload', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '3. Interpretar uma média',
  });
  await question.locator(':scope > details > summary').click();
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
  await question.locator(':scope > details > summary').click();
  await expect(question.getByLabel('A tua resposta')).toHaveValue('');
  await expect(question.getByRole('status')).toContainText(
    'após consultar a solução',
  );
});

test('choice explanations and self assessment stay distinct from automatic correctness', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const choice = page.getByRole('region', {
    name: '5. Escolher o estado certo',
  });
  await choice.locator(':scope > details > summary').click();
  await choice.getByLabel('Sempre zero').check();
  await choice.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(choice.getByRole('status')).toContainText(
    'Só é zero antes da primeira iteração',
  );
  await choice.getByLabel('A soma de 1 até k − 1', { exact: true }).check();
  await choice.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(choice.getByRole('status')).toContainText('Resposta correta');
  const open = page.getByRole('region', { name: '1. Justificar a fórmula' });
  await open.locator(':scope > details > summary').click();
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
  const markdown = await page.request.get('/exemplo/apontamentos.md');
  expect(await markdown.text()).not.toContain('A minha resposta privada');
  expect(await markdown.text()).toContain('Justificar a fórmula');
});

test('page printing includes optional exercises and solutions without private answers', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printCalled = 'true';
    };
  });
  const question = page.getByRole('region', {
    name: '1. Justificar a fórmula',
  });
  await question.locator(':scope > details > summary').click();
  await question
    .getByLabel('A tua resposta')
    .fill('Resposta privada para não imprimir');
  const trigger = page.getByRole('button', { name: 'Imprimir', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Imprimir esta página' });
  await expect(dialog.getByLabel('Soluções no fim')).toBeDisabled();
  await dialog.getByLabel('Incluir exercícios').check();
  await dialog.getByLabel('Soluções no fim').check();
  await dialog.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute(
    'data-print-called',
    'true',
  );
  await page.emulateMedia({ media: 'print' });
  const output = page.locator('[data-print-page]');
  await expect(page.locator('.course-shell')).toBeHidden();
  await expect(output.locator('.print-appendix')).toBeVisible();
  await expect(output.getByText('Sempre zero', { exact: true })).toBeVisible();
  await expect(output.getByText(/Tolerância absoluta: ±0,01/)).toBeVisible();
  await expect(output).not.toContainText('Resposta privada para não imprimir');
  await expect(
    output.locator('input, textarea, button, [data-exercise]'),
  ).toHaveCount(0);
  await expect(
    output.locator('pre').filter({ hasText: 'def soma_naturais(n):' }).last(),
  ).toContainText('range(1, n):');
  expect(
    await output.locator('.print-appendix').evaluate((appendix) => {
      const questions = document.querySelector('[data-print-practice]')!;
      return !!(
        questions.compareDocumentPosition(appendix) &
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    }),
  ).toBe(true);
  const ids = await page
    .locator('[id]')
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  await page.emulateMedia({ media: 'screen' });
  await trigger.click();
  await dialog.getByLabel('Incluir exercícios').uncheck();
  await dialog.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  await expect(output.locator('[data-print-practice]')).toBeHidden();
  await expect(output.locator('.print-appendix')).toBeHidden();
});

test('the cheat sheet prints directly and the print options dismiss with Escape', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const trigger = page.getByRole('button', { name: 'Imprimir', exact: true });
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.goto('/exemplo/folha-consulta/');
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printCalled = 'true';
    };
  });
  await page.getByRole('button', { name: 'Imprimir', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-print-called',
    'true',
  );
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-print-page]')).toBeVisible();
  await expect(page.locator('[data-print-page] h1')).toHaveText('Cheat sheet');
  await expect(page.locator('[data-print-practice]')).toHaveCount(0);
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
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.locator(':scope > details > summary').click();
  await question.getByText('Ver solução', { exact: true }).click();
  await expect(
    question.getByText('20 × 21 / 2 = 210.', { exact: false }),
  ).toBeVisible();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.lesson-body')).toBeVisible();
  await expect(page.locator('.lesson-practice')).toBeHidden();
  await context.close();
});

test('practice controls work at narrow widths and expose accessible names', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/exemplo/apontamentos/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByText('5. Escolher o estado certo', { exact: true }).click();
  const results = await new AxeBuilder({ page }).include('main').analyze();
  expect(results.violations).toEqual([]);
});

test('the coding exercise exposes a failing test and accepts the repaired loop', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.getByText('6. Corrigir uma função', { exact: true }).click();
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
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.locator(':scope > details > summary').click();
  await question.getByText('Ver solução', { exact: true }).click();
  await question.getByLabel('A tua resposta').fill('210');
  await question.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(question.getByRole('status')).toContainText(
    'correta, após consultar a solução',
  );
});
