import { expect, test } from '@playwright/test';

test('JavaScript function exercises check outputs and preserve the input contract', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/cadeiras/ltw/javascript-dom-eventos/');
  const exercise = page.locator('#ltw-total-precos');
  await exercise.locator('.exercise-disclosure > summary').click();
  const fold = exercise
    .locator('.cm-foldGutter .cm-gutterElement:visible')
    .filter({ has: page.locator('svg') })
    .first();
  await fold.click();
  await expect(exercise.locator('.cm-foldPlaceholder')).toBeVisible();
  await fold.click();
  await expect(exercise.locator('.cm-foldPlaceholder')).toHaveCount(0);
  const editor = exercise.getByRole('textbox', {
    name: 'Código javascript',
    exact: true,
  });
  const check = exercise.getByRole('button', {
    name: 'Verificar código',
    exact: true,
  });
  await editor.fill(
    'function totalAte(precos, limite) { return precos.filter(p => p <= limite).reduce((a, b) => a + b, 0); }',
  );
  await exercise
    .getByRole('button', { name: 'Expandir editor', exact: true })
    .click();
  const burstBounds = await check.evaluate((button) => {
    const anchor = button.getBoundingClientRect().toJSON();
    return new Promise<{ anchor: typeof anchor; burst: typeof anchor }>(
      (resolve) => {
        const observer = new MutationObserver(() => {
          const canvas = document.querySelector('.exercise-confetti');
          if (!canvas) return;
          observer.disconnect();
          resolve({ anchor, burst: canvas.getBoundingClientRect().toJSON() });
        });
        observer.observe(document.body, { childList: true });
        (button as HTMLButtonElement).click();
      },
    );
  });
  const centre = burstBounds.anchor.x + burstBounds.anchor.width / 2;
  expect(centre).toBeGreaterThanOrEqual(burstBounds.burst.x);
  expect(centre).toBeLessThanOrEqual(
    burstBounds.burst.x + burstBounds.burst.width,
  );
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    /^([1-9]\d*)\/\1 testes passaram\.$/,
    { timeout: 60_000 },
  );
  await exercise
    .getByRole('button', { name: 'Fechar editor expandido', exact: true })
    .click();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    /^([1-9]\d*)\/\1 testes passaram\.$/,
  );
  await editor.fill(
    'function totalAte(precos, limite) { precos.splice(0); return 30; }',
  );
  await check.click();
  await expect(exercise.getByLabel('Diagnóstico dos testes')).toContainText(
    'Obtido:',
    { timeout: 45_000 },
  );
  await expect(exercise.locator('[data-feedback]')).toContainText(
    'Resposta incorreta',
  );
});

test.describe('exercise feedback when an uncached engine fails', () => {
  // This case deliberately blocks an engine download after earlier submissions.
  // A cached engine should keep working through that network failure.
  test.use({ serviceWorkers: 'block' });

  test('code exercises accept different correct implementations and reject wrong behavior', async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await page.goto('/exemplo/apontamentos/');
    const exercise = page.locator('#soma-corrigir');
    await exercise.locator('.exercise-disclosure > summary').click();
    const editor = exercise.getByRole('textbox', {
      name: 'Código python',
      exact: true,
    });
    const check = exercise.getByRole('button', {
      name: 'Verificar código',
      exact: true,
    });
    await editor.fill('def soma_naturais(n):\n    return 10');
    await check.click();
    await expect(exercise.getByLabel('Diagnóstico dos testes')).toContainText(
      'print(soma_naturais(0))',
      { timeout: 60_000 },
    );
    const diagnostic = exercise.getByLabel('Diagnóstico dos testes');
    await expect(
      diagnostic.getByText('Esperado:', { exact: true }),
    ).toBeVisible();
    await expect(diagnostic.locator('[data-code-obtained]')).toHaveText('10');
    const colors = await diagnostic
      .locator('.code-test-source pre code *')
      .evaluateAll(
        (tokens) =>
          new Set(tokens.map((token) => getComputedStyle(token).color)).size,
      );
    expect(colors).toBeGreaterThan(1);
    await expect(exercise.locator('[data-code-status]')).toContainText(
      'Teste 1/4',
    );
    await expect(exercise.locator('[data-feedback]')).toContainText(
      'Resposta incorreta',
    );
    await editor.fill('def soma_naturais(n):\n    return sum(range(1, n + 1))');
    await check.click();
    await expect(exercise.locator('[data-code-status]')).toHaveText(
      '4/4 testes passaram.',
      { timeout: 90_000 },
    );
    await expect(exercise.locator('[data-feedback]')).toContainText('correta');
    const progressBeforeEngineError = await page.evaluate(() =>
      localStorage.getItem('resumos-exercise-progress'),
    );
    await page.route('**/python.worker.js', (route) => route.abort('failed'));
    await check.click();
    await expect(diagnostic.locator('[data-code-error]')).toBeVisible({
      timeout: 60_000,
    });
    await expect(diagnostic).toContainText(/print\(soma_naturais\(\d+\)\)/);
    await expect(exercise.locator('[data-feedback]')).toBeEmpty();
    expect(
      await page.evaluate(() =>
        localStorage.getItem('resumos-exercise-progress'),
      ),
    ).toBe(progressBeforeEngineError);
    await page.unroute('**/python.worker.js');
    await editor.fill(
      '# private-reader-code\ndef soma_naturais(n):\n    return n * (n + 1) // 2',
    );
    await check.click();
    await expect(exercise.locator('[data-code-status]')).toHaveText(
      '4/4 testes passaram.',
      { timeout: 90_000 },
    );
    const print = await page
      .locator('#print-template')
      .evaluate(
        (template) => (template as HTMLTemplateElement).content.textContent,
      );
    expect(print).toContain('print(soma_naturais(20))');
    expect(print).not.toContain('private-reader-code');
    await page.reload();
    await exercise.locator('.exercise-disclosure > summary').click();
    await expect(editor).not.toContainText('n * (n + 1)');
    await expect(exercise.locator('[data-feedback]')).toContainText('correta');
  });
});

test('stopping or editing a running program cancels validation without recording success', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/exemplo/apontamentos/');
  const exercise = page.locator('#soma-corrigir');
  await exercise.locator('.exercise-disclosure > summary').click();
  const editor = exercise.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  const check = exercise.getByRole('button', {
    name: 'Verificar código',
    exact: true,
  });
  const reset = exercise.getByRole('button', {
    name: 'Repor código',
    exact: true,
  });
  await expect(reset).toBeHidden();
  const initialCode = await editor.innerText();
  await expect(check).toHaveText('');
  await editor.fill('while True:\n    pass');
  await expect(reset).toBeVisible();
  await check.press('Enter');
  const stop = exercise.getByRole('button', { name: 'Parar', exact: true });
  await expect(stop).toBeVisible();
  await expect(stop).toBeFocused();
  await expect(check).toBeHidden();
  await expect(reset).toBeHidden();
  await expect(stop).toHaveText('');
  await stop.press('Enter');
  await expect(check).toBeEnabled();
  await expect(check).toBeFocused();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    'Verificação interrompida.',
  );
  await check.click();
  await editor.fill('def soma_naturais(n):\n    return 0');
  await expect(check).toBeEnabled();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    'Código alterado. Verifica novamente.',
  );
  await expect(exercise.locator('[data-feedback]')).toBeEmpty();
  await reset.press('Enter');
  await expect(editor).toBeFocused();
  await expect(editor).toHaveText(initialCode);
  await expect(reset).toBeHidden();
  await page.reload();
  await expect(exercise.locator('[data-feedback]')).toBeEmpty();
});

test('public exports and no-script exercises include authored code and test cases only', async ({
  browser,
  request,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto('/exemplo/apontamentos/');
  const exercise = page.locator('#soma-corrigir');
  await exercise.locator('.exercise-disclosure > summary').click();
  await expect(exercise.locator('[data-code-source]')).toContainText(
    'def soma_naturais(n):',
  );
  await exercise.getByText('Testes', { exact: true }).click();
  await expect(exercise.locator('[data-code-tests]')).toContainText(
    'print(soma_naturais(20))',
  );
  const markdown = await request.get('/exemplo/apontamentos.md');
  expect(await markdown.text()).toContain('print(soma_naturais(20))');
  await page.close();
});
