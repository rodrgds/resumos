import { expect, test } from '@playwright/test';
import { checkProof } from '../src/lib/logic/proof';

const cases =
  '1 p ∨ q; premissa\n2 p → r; premissa\n3 q → r; premissa\n4 | p; hipótese\n5 | r; →E, 2, 4\n| ---\n6 | q; hipótese\n7 | r; →E, 3, 6\n8 r; ∨E, 1, 4 a 5, 6 a 7';

test.describe('propositional kernel', () => {
  test('checks complete case proofs and nested discharge with teacher base rules', () => {
    expect(checkProof(cases, ['p ∨ q', 'p → r', 'q → r'], 'r').valid).toBe(
      true,
    );
    const nested =
      '1 ¬q → ¬p; premissa\n2 | p; hipótese\n3 | | ¬q; hipótese\n4 | | ¬p; →E, 1, 3\n5 | | F; FI, 2, 4\n6 | ¬¬q; ¬I, 3 a 5\n7 | q; ¬E, 6\n8 p → q; →I, 2 a 7';
    expect(checkProof(nested, ['¬q → ¬p'], 'p → q').valid).toBe(true);
    const ascii = '1 p & q; premissa\n2 p; &E, 1\n3 p \\/ r; ∨I, 2';
    expect(checkProof(ascii, ['p ∧ q'], 'p ∨ r').valid).toBe(true);
  });

  test('rejects inaccessible siblings, closed lines and incomplete boxes', () => {
    const sibling = cases.replace('7 | r; →E, 3, 6', '7 | r; R, 5');
    expect(
      checkProof(sibling, ['p ∨ q', 'p → r', 'q → r'], 'r').diagnostics,
    ).toContainEqual(
      expect.objectContaining({
        line: 7,
        message: expect.stringContaining('irmã'),
      }),
    );
    const closed =
      '1 | p; hipótese\n2 | p; R, 1\n3 p → p; →I, 1 a 2\n4 p; R, 2';
    expect(checkProof(closed, [], 'p').diagnostics).toContainEqual(
      expect.objectContaining({
        line: 4,
        message: expect.stringContaining('fechada'),
      }),
    );
    const partial =
      '1 | p; hipótese\n2 | p; R, 1\n3 | p; R, 2\n4 p → p; →I, 1 a 2';
    expect(checkProof(partial, [], 'p → p').valid).toBe(false);
    expect(
      checkProof(cases.replace('| ---\n', ''), ['p ∨ q', 'p → r', 'q → r'], 'r')
        .diagnostics,
    ).toContainEqual(
      expect.objectContaining({
        line: 6,
        message: expect.stringContaining('caixa irmã'),
      }),
    );
  });

  test('rejects false inference, invented premises, wrong conclusions and oversized source', () => {
    const wrong = '1 p → q; premissa\n2 q; premissa\n3 p; →E, 1, 2';
    expect(checkProof(wrong, ['p → q', 'q'], 'p').diagnostics).toContainEqual(
      expect.objectContaining({
        line: 3,
        message: expect.stringContaining('não resulta'),
      }),
    );
    expect(checkProof('1 q; premissa', ['p'], 'q').valid).toBe(false);
    expect(checkProof('1 p; premissa', ['p'], 'q').valid).toBe(false);
    expect(checkProof('x'.repeat(30001), [], 'p').valid).toBe(false);
  });

  test('checks all remaining base rules without accepting a malformed rule', () => {
    const proof =
      '1 p; premissa\n2 ¬p; premissa\n3 p ∧ ¬p; ∧I, 1, 2\n4 F; FI, 1, 2\n5 q; FE, 4';
    expect(checkProof(proof, ['p', '¬p'], 'q').valid).toBe(true);
    expect(
      checkProof(proof.replace('∧I, 1, 2', '∧I, 2, 1'), ['p', '¬p'], 'q').valid,
    ).toBe(false);
    expect(checkProof('1 ¬p; premissa\n2 p; ¬E, 1', ['¬p'], 'p').valid).toBe(
      false,
    );
    expect(
      checkProof(
        cases.replace('6 a 7', '4 a 5'),
        ['p ∨ q', 'p → r', 'q → r'],
        'r',
      ).valid,
    ).toBe(false);
  });
});

test('proof editor verifies reader edits and an exercise at mobile width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/md/provas-proposicionais/');
  const lab = page.getByRole('group', {
    name: 'Laboratório de dedução proposicional',
  });
  await lab.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(lab.getByRole('status')).toContainText('Prova válida');
  await lab.getByLabel('Escolher dedução').selectOption('2');
  const editor = lab
    .getByRole('textbox', { name: 'Prova em notação de Fitch' })
    .filter({ visible: true });
  await editor.fill(
    '1 p → q; premissa\n2 ¬q; premissa\n3 | p ∧ r; hipótese\n4 | p; ∧E, 3\n5 | q; →E, 1, 4\n6 | F; FI, 2, 5\n7 ¬(p ∧ r); ¬I, 3 a 6',
  );
  await lab.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(lab.getByRole('status')).toContainText('Prova válida');
  await editor.fill('1 p; premissa');
  await expect(lab.getByRole('status')).toContainText('Prova alterada');
  await expect(lab.getByRole('status')).not.toContainText('Prova válida');
  await lab.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(lab.getByRole('status')).toContainText(
    'Linha 1: Só podes usar premissas',
  );
  await lab.getByRole('button', { name: 'Repor prova', exact: true }).click();
  await expect(editor).toContainText('p ∧ r');
  expect(await lab.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(
    true,
  );
});

test('free proof checks the reader assignment and rejects an undeclared premise', async ({
  page,
}) => {
  await page.goto('/cadeiras/md/provas-proposicionais/');
  const lab = page.getByRole('group', {
    name: 'Laboratório de dedução proposicional',
  });
  await lab
    .getByLabel('Escolher dedução')
    .selectOption({ label: 'Prova livre' });
  const premises = lab.getByLabel('Premissas da prova livre');
  await premises.fill('a & b');
  await lab.getByLabel('Conclusão da prova livre').fill('b');
  await lab
    .getByRole('textbox', { name: 'Prova em notação de Fitch' })
    .filter({ visible: true })
    .fill('1 a & b; premissa\n2 b; ∧E, 1');
  await lab.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(lab.getByRole('status')).toContainText('Prova válida');
  await premises.fill('a');
  await expect(lab.getByRole('status')).toContainText('Prova alterada');
  await lab.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(lab.getByRole('status')).toContainText(
    'Linha 1: Só podes usar premissas do enunciado',
  );
});
