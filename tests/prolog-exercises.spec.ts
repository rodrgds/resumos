import { expect, test } from '@playwright/test';
import { questions as constraints } from '../src/content/pfl/mt2/constraint-models';
import { questions as graphs } from '../src/content/pfl/mt2/constraint-graphs';

test('Prolog grading runs queries and stdin, saves edits, and rejects wrong results', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto('/exemplo/exercise-help/');
  const exercise = page.locator('#prolog-increment');
  const summary = exercise.locator('.exercise-disclosure > summary');
  await summary.click();
  const editor = exercise.getByRole('textbox', {
    name: 'Código prolog',
    exact: true,
  });
  const check = exercise.getByRole('button', {
    name: 'Verificar código',
    exact: true,
  });
  await editor.fill('sucessor(X, Y) :- Y is 1 + X.');
  await check.click();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    '3/3 testes passaram.',
    { timeout: 60_000 },
  );
  await page.reload();
  await expect(exercise.locator('[data-summary-status]')).toHaveAttribute(
    'aria-label',
    'Resposta correta',
  );
  await summary.click();
  await expect(editor).toHaveText('sucessor(X, Y) :- Y is 1 + X.');
  await editor.fill('sucessor(X, Y) :- Y is X - 1.');
  await expect(exercise.locator('[data-summary-status]')).toBeHidden();
  await check.click();
  await expect(exercise.locator('[data-code-status]')).toContainText('falhou', {
    timeout: 60_000,
  });
  await expect(exercise.locator('[data-summary-status]')).toHaveAttribute(
    'aria-label',
    'Resposta incorreta',
  );
  await exercise
    .getByRole('button', { name: 'Repor código', exact: true })
    .click();
  await page.reload();
  await expect(exercise.locator('[data-summary-status]')).toBeHidden();
});

test('Prolog grading supports finite-domain constraints in the isolated runtime', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto('/exemplo/exercise-help/');
  const exercise = page.locator('#prolog-domain');
  await exercise.locator('.exercise-disclosure > summary').click();
  await exercise
    .getByRole('textbox', { name: 'Código prolog', exact: true })
    .fill(
      ':- use_module(library(clpfd)).\nvalor(X) :- X in 1..3, labeling([], [X]).',
    );
  await exercise
    .getByRole('button', { name: 'Verificar código', exact: true })
    .click();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    '2/2 testes passaram.',
    { timeout: 60_000 },
  );
});

test('the MT2 bank is a course page and grades an optimization exercise', async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/cadeiras/pfl/');
  await page
    .getByRole('navigation', { name: 'Conteúdos da cadeira' })
    .getByRole('link', { name: 'Exercícios MT2', exact: true })
    .click();
  await expect(page).toHaveURL(/\/cadeiras\/pfl\/exercicios-mt2\/$/);
  await expect(page.locator('[data-exercise]')).toHaveCount(119);
  const catalog = await (await request.get('/lesson-catalog.json')).json();
  expect(
    catalog.lessons.some(
      (entry: { id: string }) => entry.id === 'pfl/exercicios-mt2',
    ),
  ).toBe(false);
  const examples = [
    constraints.find((q) => q.id === 'mt2-constraints-recipes')!,
    graphs.find((q) => q.id === 'mt2-autocarros-otimos')!,
  ];
  for (const question of examples) {
    const exercise = page.locator('#' + question.id);
    await exercise.locator('.exercise-disclosure > summary').click();
    await exercise
      .getByRole('textbox', { name: 'Código prolog', exact: true })
      .fill(question.solution);
    await exercise
      .getByRole('button', { name: 'Verificar código', exact: true })
      .click();
    await expect(exercise.locator('[data-code-status]')).toHaveText(
      '3/3 testes passaram.',
      { timeout: 60_000 },
    );
    await expect(exercise.locator('[data-summary-status]')).toHaveAttribute(
      'aria-label',
      'Resposta correta',
    );
  }
});
