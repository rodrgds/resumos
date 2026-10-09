import { expect, test } from '@playwright/test';
import { presets, repairMachine } from '../src/lib/automata/presets';
import {
  execute,
  validate,
  compare,
  type Machine,
} from '../src/lib/automata/machine';

const nfa: Machine = {
  model: 'nfa',
  alphabet: ['0', '1'],
  initial: 'p',
  states: ['p', 'q', 'r'].map((id) => ({
    id,
    name: id,
    final: id === 'r',
    output: '',
  })),
  transitions: [
    ['p', '0', 'p'],
    ['p', '1', 'p'],
    ['p', '0', 'q'],
    ['q', '1', 'r'],
  ].map(([from, symbol, to]) => ({ from, symbol, to, output: '' })),
};
const epsilon: Machine = {
  model: 'epsilon-nfa',
  alphabet: ['a', 'b'],
  initial: 'p',
  states: ['p', 'q', 'r'].map((id) => ({
    id,
    name: id,
    final: id === 'r',
    output: '',
  })),
  transitions: [
    ['p', 'ε', 'q'],
    ['q', 'ε', 'p'],
    ['q', 'a', 'q'],
    ['q', 'b', 'r'],
    ['r', 'ε', 'q'],
  ].map(([from, symbol, to]) => ({ from, symbol, to, output: '' })),
};

test('NFA preserves simultaneous branches and accepts only after consuming the whole word', () => {
  expect(validate(nfa)).toEqual([]);
  expect(execute(nfa, '001').rows.map((row) => row.states)).toEqual([
    ['p'],
    ['p', 'q'],
    ['p', 'q'],
    ['p', 'r'],
  ]);
  for (const [word, accepted] of [
    ['', false],
    ['001', true],
    ['0010', false],
    ['101', true],
  ] as const)
    expect(execute(nfa, word).accepted).toBe(accepted);
  const blocked = structuredClone(nfa);
  blocked.transitions = [{ from: 'p', symbol: '0', to: 'r', output: '' }];
  expect(execute(blocked, '010').rows.map((row) => row.states)).toEqual([
    ['p'],
    ['r'],
    [],
    [],
  ]);
  expect(execute(blocked, '010').accepted).toBe(false);
});

test('epsilon closure terminates through cycles, runs before and after symbols, and retains raw destinations', () => {
  const result = execute(epsilon, 'bab');
  expect(result.rows.map((row) => row.states)).toEqual([
    ['p', 'q'],
    ['p', 'q', 'r'],
    ['p', 'q'],
    ['p', 'q', 'r'],
  ]);
  expect(result.rows.map((row) => row.destinations)).toEqual([
    ['p'],
    ['r'],
    ['q'],
    ['r'],
  ]);
  expect(result.accepted).toBe(true);
  expect(execute(epsilon, '').accepted).toBe(false);
  const empty = structuredClone(epsilon);
  empty.states[1].final = true;
  expect(execute(empty, '').accepted).toBe(true);
  expect(() => execute(epsilon, 'ε')).toThrow('não pertence');
});

test('subset equivalence gives a shortest whole-word witness and accepts redundant branches', () => {
  const redundant = structuredClone(nfa);
  redundant.transitions.push({ ...redundant.transitions[0] });
  expect(compare(redundant, nfa).equivalent).toBe(true);
  const wrong = structuredClone(nfa);
  wrong.states[1].final = true;
  expect(compare(wrong, nfa)).toEqual({ equivalent: false, witness: '0' });
  expect(compare(epsilon, epsilon).equivalent).toBe(true);
  for (const id of [
    'nfa-suffix-01',
    'nfa-third-last',
    'epsilon-a-star-b-star',
    'epsilon-ends-b',
  ] as const) {
    const result = compare(repairMachine(id), presets[id].machine);
    expect(result.equivalent).toBe(false);
    if (!result.equivalent)
      expect(execute(repairMachine(id), result.witness).accepted).not.toBe(
        execute(presets[id].machine, result.witness).accepted,
      );
  }
});

test('NFA and epsilon editors expose all active states and apply edited edges at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto('/cadeiras/tc/automatos-nao-deterministas/');
  const nfa = page.locator('[data-automata-lab]').first();
  const epsilon = page.locator('[data-automata-lab]').nth(1);
  await nfa.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(nfa.locator('[data-result]')).toContainText(
    'Palavra aceite. Estados ativos {p, r}',
  );
  await expect(nfa.locator('.automata-node.is-current')).toHaveCount(2);
  await nfa.getByLabel('Entrada, vazia para ε').fill('0010');
  await nfa.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(nfa.locator('[data-result]')).toContainText(
    'Palavra rejeitada. Estados ativos {p, q}',
  );
  await epsilon.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(epsilon.locator('[data-result]')).toContainText(
    'Palavra aceite. Estados ativos {q}',
  );
  await expect(epsilon.locator('[data-trace] tbody tr').first()).toContainText(
    '{p, q}',
  );
  await epsilon
    .getByText('Editar estados e transições', { exact: true })
    .click();
  await epsilon
    .getByLabel('Símbolo da transição 2', { exact: true })
    .selectOption('a');
  await epsilon.getByLabel('Entrada, vazia para ε').fill('');
  await epsilon.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(epsilon.locator('[data-result]')).toContainText(
    'Palavra rejeitada. Estados ativos {p}',
  );
  await epsilon
    .getByLabel('Símbolo da transição 2', { exact: true })
    .selectOption('ε');
  await epsilon.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(epsilon.locator('[data-result]')).toContainText(
    'Palavra aceite. Estados ativos {p, q}',
  );
  await epsilon
    .getByRole('combobox', { name: 'Máquina', exact: true })
    .selectOption('blank-epsilon-nfa');
  await epsilon
    .getByRole('button', { name: 'Adicionar estado', exact: true })
    .click();
  await epsilon.getByLabel('q1 final', { exact: true }).check();
  await epsilon
    .getByRole('button', { name: 'Adicionar transição', exact: true })
    .click();
  await epsilon
    .getByLabel('Símbolo da transição 1', { exact: true })
    .selectOption('ε');
  await epsilon
    .getByLabel('Destino da transição 1', { exact: true })
    .selectOption('q1');
  await epsilon.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(epsilon.locator('[data-result]')).toContainText(
    'Palavra aceite. Estados ativos {q0, q1}',
  );
  await epsilon
    .getByRole('button', { name: 'Remover estado q1', exact: true })
    .click();
  await epsilon.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(epsilon.locator('[data-result]')).toContainText(
    'Palavra rejeitada. Estados ativos {q0}',
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
