import { expect, test } from '@playwright/test';

test('the MT1 exercise bank has its own course page outside the lesson sequence', async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/cadeiras/pfl/');
  const navigation = page.getByRole('navigation', {
    name: 'Conteúdos da cadeira',
  });
  await navigation
    .getByRole('link', { name: 'Exercícios MT1', exact: true })
    .click();
  await expect(page).toHaveURL(/\/cadeiras\/pfl\/exercicios-mt1\/$/);
  await expect(
    page.getByRole('heading', { name: 'Exercícios MT1', exact: true }),
  ).toBeVisible();
  await expect(
    navigation.getByRole('link', { name: 'Exercícios MT1', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  const catalog = await (await request.get('/lesson-catalog.json')).json();
  expect(
    catalog.lessons.some(
      (entry: { id: string }) => entry.id === 'pfl/exercicios-mt1',
    ),
  ).toBe(false);
  await expect(page.locator('[data-exercise]').first()).toBeVisible();
});

test('an IO exercise checks the reader function with captured input and output', async ({
  page,
}) => {
  test.setTimeout(240_000);
  await page.goto('/cadeiras/pfl/exercicios-mt1/');
  const exercise = page.locator('#mt1-2018-q4');
  await exercise.locator('.exercise-disclosure > summary').click();
  const starter = await exercise.evaluate(
    (node) =>
      JSON.parse((node as HTMLElement).dataset.answer!).starter as string,
  );
  const implementation =
    'maximo = loop 0\n  where\n    loop :: Int -> IO ()\n    loop m = do\n      n <- readLn\n      if n == 0 then print m else loop (max m n)';
  await exercise
    .getByRole('textbox', { name: 'Código haskell', exact: true })
    .fill(starter.replace('maximo = undefined', implementation));
  await exercise
    .getByRole('button', { name: 'Verificar código', exact: true })
    .click();
  const status = exercise.locator('[data-code-status]');
  await expect(status).toHaveText(/testes passaram|Erro no teste|falhou/, {
    timeout: 120_000,
  });
  await expect(status).toHaveText('2/2 testes passaram.');
  await expect(exercise.locator('[data-summary-status]')).toHaveAttribute(
    'aria-label',
    'Resposta correta',
  );
  await exercise
    .getByRole('textbox', { name: 'Código haskell', exact: true })
    .fill(starter.replace('maximo = undefined', 'maximo = print (0 :: Int)'));
  await exercise
    .getByRole('button', { name: 'Verificar código', exact: true })
    .click();
  await expect(status).toContainText('falhou', { timeout: 120_000 });
  await expect(exercise.locator('[data-summary-status]')).toHaveAttribute(
    'aria-label',
    'Resposta incorreta',
  );
});

test('the exercise bank opens exercises in a modal, picks a random unsolved one and clears solved ones after confirming', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/cadeiras/pfl/exercicios-mt1/');
  const total = await page.locator('[data-exercise]').count();
  const count = page.locator('[data-bank-count]');
  await expect(count).toHaveText(`0 de ${total} resolvidos`);

  const first = page.locator('[data-exercise]').first();
  await first.locator('.exercise-disclosure > summary').click();
  const modal = first.locator('dialog');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading', { level: 2 })).toHaveText(
    (await first.locator('.exercise-title').innerText()).trim(),
  );
  await expect(page).toHaveURL(
    new RegExp(`#${await first.getAttribute('id')}$`),
  );
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(page).not.toHaveURL(/#/);

  await page.getByRole('button', { name: /Exercício aleatório/ }).click();
  await expect(page.locator('dialog.exercise-modal[open]')).toHaveCount(1);
  await page.keyboard.press('Escape');

  await page.evaluate(() => {
    const key =
      document.querySelector<HTMLElement>('[data-exercise]')!.dataset
        .progressKey!;
    localStorage.setItem(
      'resumos-exercise-progress',
      JSON.stringify({ [key]: { assistance: 'none', result: 'correct' } }),
    );
  });
  await page.reload();
  await expect(count).toHaveText(`1 de ${total} resolvidos`);
  await page.getByRole('button', { name: 'Por resolver', exact: true }).click();
  await expect(page.locator('[data-exercise]:not([hidden])')).toHaveCount(
    total - 1,
  );

  await page.getByRole('button', { name: 'Limpar resolvidos' }).click();
  const confirm = page.locator('[data-bank-confirm]');
  await confirm.getByRole('button', { name: 'Cancelar' }).click();
  await expect(count).toHaveText(`1 de ${total} resolvidos`);
  await page.getByRole('button', { name: 'Limpar resolvidos' }).click();
  await confirm.getByRole('button', { name: 'Limpar tudo' }).click();
  await expect(count).toHaveText(`0 de ${total} resolvidos`);
  await expect(
    page.getByRole('button', { name: 'Limpar resolvidos' }),
  ).toBeDisabled();
});

test('an answered exercise offers a next random exercise', async ({ page }) => {
  await page.goto('/cadeiras/pfl/exercicios-mt1/');
  const first = page.locator('[data-exercise]').first();
  await first.locator('.exercise-disclosure > summary').click();
  const modal = first.locator('dialog.exercise-modal');
  const random = modal.getByRole('button', {
    name: 'Abrir outro exercício aleatório',
  });
  await expect(random).toBeHidden();
  await modal.locator('input[type=radio]').nth(0).check();
  await modal.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(modal.locator('[data-feedback]')).toHaveAttribute(
    'data-result',
    'attempted',
  );
  await expect(random).toBeHidden();
  await modal.locator('input[type=radio]').nth(3).check();
  await modal.getByRole('button', { name: 'Verificar resposta' }).click();
  await expect(modal.locator('[data-feedback]')).toHaveAttribute(
    'data-result',
    'correct',
  );
  await expect(random).toBeVisible();
  const opened = await modal.getAttribute('aria-labelledby');
  await random.click();
  const next = page.locator('dialog.exercise-modal[open]');
  await expect(next).toHaveCount(1);
  await expect(next).not.toHaveAttribute('aria-labelledby', opened!);
});

test('PFL exercises keep the original exam restrictions visible', async ({
  page,
}) => {
  await page.goto('/cadeiras/pfl/exercicios-mt1/');
  const mt1 = page.locator('#mt1-2024-part2-q1');
  await mt1.locator('.exercise-disclosure > summary').click();
  await expect(
    mt1.locator('dialog.exercise-modal .exercise-restriction'),
  ).toContainText('library functions');

  await page.goto('/cadeiras/pfl/exercicios-mt2/');
  const mt2 = page.locator('#mt2-books-rotate');
  await mt2.locator('.exercise-disclosure > summary').click();
  await expect(
    mt2.locator('dialog.exercise-modal .exercise-restriction'),
  ).toContainText('CLPFD');
});

test('a correct Haskell answer is not rejected by a compiler warning', async ({
  page,
}) => {
  test.setTimeout(240_000);
  await page.goto('/cadeiras/pfl/exercicios-mt1/');
  const exercise = page.locator('#mt1-2024-part2-q3');
  await exercise.locator('.exercise-disclosure > summary').click();
  const starter = await exercise.evaluate(
    (node) =>
      JSON.parse((node as HTMLElement).dataset.answer!).starter as string,
  );
  const solution = `unique [] = []
unique (x:xs) = x : unique [y | y <- xs, y /= x]
ranking l = sortByCond [(t,leagueScore t l) | t <- unique [t | d <- l, ((h,a),_) <- d, t <- [h,a]]] cmp
  where cmp (a,x) (b,y) = x > y || (x == y && a < b)`;
  await exercise
    .getByRole('textbox', { name: 'Código haskell', exact: true })
    .fill(starter.replace('ranking = undefined', solution));
  await exercise
    .getByRole('button', { name: 'Verificar código', exact: true })
    .click();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    '3/3 testes passaram.',
    { timeout: 180_000 },
  );
});
