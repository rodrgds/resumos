import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  parseGrammar,
  recognize,
  leftmostDerivation,
} from '../src/lib/grammar';

test('CFG recognition handles recursive rules, epsilon and unreachable cycles', () => {
  const grammar = parseGrammar('S -> aSb | ε');
  for (const word of ['', 'ab', 'aabb', 'aaabbb'])
    expect(recognize(grammar, word).kind).toBe('accepted');
  for (const word of ['a', 'abb', 'ba', 'abab', 'aaabb'])
    expect(recognize(grammar, word).kind).toBe('rejected');
  const result = recognize(grammar, 'aabb');
  expect(result.kind).toBe('accepted');
  if (result.kind === 'accepted')
    expect(leftmostDerivation(result.tree)).toEqual([
      'S',
      'aSb',
      'aaSbb',
      'aabb',
    ]);

  for (const source of ['S -> SS | a | ε', 'S -> A A\nA -> A | a | ε']) {
    const nullable = parseGrammar(source);
    expect(recognize(nullable, '').kind).toBe('accepted');
    expect(recognize(nullable, 'aa').kind).toBe('accepted');
    expect(recognize(nullable, 'b').kind).toBe('rejected');
  }
  expect(recognize(parseGrammar('S -> S'), '').kind).toBe('rejected');
  expect(recognize(parseGrammar('S -> A\nA -> B\nB -> A'), 'a').kind).toBe(
    'rejected',
  );
});

test('CFG witnesses preserve precedence and support quoted terminals and named variables', () => {
  const grammar = parseGrammar(
    'Expr -> Expr + Term | Term\nTerm -> Term * Atom | Atom\nAtom -> ( Expr ) | a',
  );
  const result = recognize(grammar, 'a+a*a');
  expect(result.kind).toBe('accepted');
  if (result.kind === 'accepted') {
    expect(result.tree.children.map((child) => child.symbol)).toEqual([
      'Expr',
      '+',
      'Term',
    ]);
    expect(
      result.tree.children[2].children.map((child) => child.symbol),
    ).toEqual(['Term', '*', 'Atom']);
    expect(leftmostDerivation(result.tree).at(-1)).toBe('a+a*a');
  }
  expect(recognize(grammar, 'a+*a').kind).toBe('rejected');
  expect(recognize(parseGrammar('S -> "A| B"'), 'A| B').kind).toBe('accepted');
  expect(() => parseGrammar('S -> A')).toThrow(/falta uma produção/);
  expect(() => parseGrammar('S -> a |')).toThrow(/alternativa vazia/);
  expect(() => parseGrammar('S -> a ε')).toThrow(/toda a alternativa/);
  expect(recognize(parseGrammar('S -> aS | ε'), 'a'.repeat(81)).kind).toBe(
    'limit',
  );
});

test('readers edit grammars, run their tests and see an actual derivation on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/cadeiras/tc/gramaticas-livres/');
  const lab = page.getByRole('group', { name: 'Laboratório de gramáticas' });
  await lab.scrollIntoViewIfNeeded();
  const source = lab.getByRole('textbox', { name: 'Produções da gramática' });
  await expect(
    lab.getByRole('button', { name: 'Testar palavra' }),
  ).toBeEnabled();
  await expect(lab.getByRole('status').first()).toHaveText('Palavra aceite.');
  await expect(lab.getByRole('img')).toBeVisible();
  await lab.getByLabel('Palavra', { exact: true }).fill('aab');
  await expect(lab.getByRole('img')).toBeHidden();
  await lab.getByRole('button', { name: 'Testar palavra' }).click();
  await expect(lab.getByRole('status').first()).toContainText(
    'Palavra rejeitada',
  );
  await lab
    .getByRole('combobox', { name: 'Escolher gramática' })
    .selectOption('3');
  await lab.getByText('Testes', { exact: true }).click();
  await lab.getByRole('button', { name: 'Executar testes' }).click();
  await expect(lab.locator('[data-test-status]')).toContainText(
    '2 de 6 testes passaram',
  );
  await source.fill('S -> a S b b | ε');
  await expect(lab.locator('[data-test-results]')).toBeEmpty();
  await lab.getByRole('button', { name: 'Executar testes' }).click();
  await expect(lab.locator('[data-test-status]')).toHaveText(
    '6 de 6 testes passaram.',
  );
  await lab.getByLabel('Palavra', { exact: true }).fill('aabbbb');
  await source.press('ControlOrMeta+Enter');
  await expect(lab.getByRole('status').first()).toHaveText('Palavra aceite.');
  await lab.getByText('Derivação mais à esquerda', { exact: true }).click();
  await expect(lab.locator('[data-steps] li').last()).toHaveText('aabbbb');
  await source.fill('S -> A');
  await source.press('ControlOrMeta+Enter');
  await expect(lab.getByRole('status').first()).toContainText(
    'falta uma produção',
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    (await new AxeBuilder({ page }).include('[data-grammar-lab]').analyze())
      .violations,
  ).toEqual([]);
});
