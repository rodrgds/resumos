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
