import { expect, test } from '@playwright/test';
import {
  compare,
  execute,
  validate,
  type Machine,
} from '../src/lib/automata/machine';
import { presets, repairMachine } from '../src/lib/automata/presets';

// Expectations are derived from suffix membership, integer remainder and overlapping pairs.
test('DFA consumes the whole word, including empty input', () => {
  const machine = presets['suffix-ab'].machine;
  for (const [word, accepted] of [
    ['', false],
    ['ab', true],
    ['aba', false],
    ['baab', true],
    ['abb', false],
  ] as const)
    expect(execute(machine, word).accepted).toBe(accepted);
  expect(execute(machine, 'aba').rows.map((row) => row.state)).toEqual([
    'q0',
    'q1',
    'q2',
    'q1',
  ]);
});

test('Moore emits the reset output before the output after each clock', () => {
  expect(execute(presets['modulo-three'].machine, '').outputs).toEqual(['1']);
  expect(execute(presets['modulo-three'].machine, '110').outputs).toEqual([
    '1',
    '0',
    '1',
    '1',
  ]);
  expect(execute(presets['modulo-three'].machine, '101').outputs).toEqual([
    '1',
    '0',
    '0',
    '0',
  ]);
});

test('Mealy emits on transitions and retains overlapping detections', () => {
  const machine = presets['overlap-eleven'].machine;
  expect(execute(machine, '').outputs).toEqual([]);
  expect(execute(machine, '111').outputs).toEqual(['0', '1', '1']);
  expect(execute(machine, '11011').outputs).toEqual(['0', '1', '0', '0', '1']);
});

test('invalid structure and input cannot be mistaken for a rejected word', () => {
  const machine = structuredClone(presets['suffix-ab'].machine);
  machine.transitions.pop();
  expect(validate(machine)).toContain('Falta a transição de q2 com b.');
  expect(() => execute(machine, 'ab')).toThrow('Falta a transição');
  machine.transitions.push(
    ...[
      presets['suffix-ab'].machine.transitions[5],
      presets['suffix-ab'].machine.transitions[5],
    ],
  );
  expect(() => execute(machine, 'ab')).toThrow('repetidas');
  expect(() => execute(presets['suffix-ab'].machine, 'ac')).toThrow(
    'não pertence ao alfabeto',
  );
});

function renamed(machine: Machine): Machine {
  const result = structuredClone(machine);
  const rename = (id: string) => `renamed-${id}`;
  result.states.forEach((state) => {
    state.id = rename(state.id);
    state.name = state.id;
  });
  result.initial = rename(result.initial);
  result.transitions.forEach((t) => {
    t.from = rename(t.from);
    t.to = rename(t.to);
  });
  result.alphabet.reverse();
  return result;
}

test('product comparison ignores graph labels and returns a real shortest witness', () => {
  for (const id of ['suffix-ab', 'modulo-three', 'overlap-eleven'] as const) {
    const reference = presets[id].machine;
    expect(compare(renamed(reference), reference).equivalent).toBe(true);
    const altered = repairMachine(id);
    const comparison = compare(altered, reference);
    expect(comparison.equivalent).toBe(false);
    if (!comparison.equivalent) {
      const a = execute(altered, comparison.witness),
        b = execute(reference, comparison.witness);
      expect({ acceptance: a.accepted, outputs: a.outputs }).not.toEqual({
        acceptance: b.accepted,
        outputs: b.outputs,
      });
    }
  }
  expect(
    compare(repairMachine('suffix-ab'), presets['suffix-ab'].machine),
  ).toEqual({ equivalent: false, witness: 'ab' });
  const unreachable = structuredClone(presets['suffix-ab'].machine);
  unreachable.states.push({
    id: 'extra',
    name: 'extra',
    final: true,
    output: '0',
  });
  unreachable.transitions.push(
    { from: 'extra', symbol: 'a', to: 'extra', output: '0' },
    { from: 'extra', symbol: 'b', to: 'extra', output: '0' },
  );
  expect(compare(unreachable, presets['suffix-ab'].machine).equivalent).toBe(
    true,
  );
  const altered = structuredClone(presets['modulo-three'].machine);
  altered.states[0].output = '0';
  expect(compare(altered, presets['modulo-three'].machine)).toEqual({
    equivalent: false,
    witness: '',
  });
});

test('build a DFA through native controls and run it on the keyboard', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/cadeiras/tc/automatos-finitos/');
  const lab = page.getByRole('group', {
    name: 'Laboratório de autómatos',
    exact: true,
  });
  const graph = lab.locator('svg');
  const graphWidth = (await graph.boundingBox())!.width;
  const canvasWidth = (await lab.locator('[data-diagram]').boundingBox())!
    .width;
  expect(graphWidth).toBeLessThanOrEqual(canvasWidth);
  await lab
    .getByRole('button', { name: 'Editar estado q1', exact: true })
    .focus();
  await page.keyboard.press('Enter');
  await expect(
    lab.getByLabel('Nome do estado 2', { exact: true }),
  ).toBeFocused();
  await lab.getByLabel('Nome do estado 2', { exact: true }).fill('prefixo');
  await page.keyboard.press('Tab');
  await expect(
    lab.getByLabel('prefixo final', { exact: true }),
  ).toBeFocused();
  await lab
    .getByRole('combobox', { name: 'Máquina', exact: true })
    .selectOption('blank-dfa');
  await lab
    .getByRole('button', { name: 'Adicionar estado', exact: true })
    .click();
  await lab.getByLabel('q1 final', { exact: true }).check();
  // q0 goes to q1 on 1; q1 stays final for either bit.
  for (let i = 0; i < 4; i++)
    await lab
      .getByRole('button', { name: 'Adicionar transição', exact: true })
      .click();
  for (const index of [2, 3, 4])
    await lab
      .getByLabel(`Destino da transição ${index}`, { exact: true })
      .selectOption('q1');
  await lab.getByLabel('Entrada, vazia para ε').fill('01');
  await lab.getByRole('button', { name: 'Passo', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(lab.locator('[data-result]')).toContainText('Passo 1 de 2');
  await page.keyboard.press('Enter');
  await expect(lab.locator('[data-result]')).toContainText('Palavra aceite');
  await expect(lab.locator('svg')).toHaveAccessibleName(/Estado atual: q1/);
  await expect(lab.locator('[data-trace] tbody tr')).toHaveCount(3);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await lab.getByLabel('Entrada, vazia para ε').fill('2');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText(
    'não pertence ao alfabeto',
  );
});

test('repair exercise checks equivalence and yields a witness before repair', async ({
  page,
}) => {
  await page.goto('/cadeiras/tc/automatos-finitos/');
  const lab = page.getByRole('group', {
    name: 'Laboratório de autómatos',
    exact: true,
  });
  await lab.getByRole('button', { name: 'Resolver exercício' }).click();
  await lab.getByRole('button', { name: 'Verificar máquina' }).click();
  await expect(lab.locator('[data-verification]')).toContainText(
    'difere da referência na entrada ab',
  );
  await lab.getByText('Editar estados e transições', { exact: true }).click();
  await lab
    .getByLabel('Destino da transição 4', { exact: true })
    .selectOption('q2');
  await lab.getByRole('button', { name: 'Verificar máquina' }).click();
  await expect(lab.locator('[data-verification]')).toContainText(
    'Equivalência confirmada para todas as entradas',
  );
});

test('FSC simulator keeps Moore initial output distinct from Mealy output', async ({
  page,
}) => {
  await page.goto('/cadeiras/fsc/maquinas-estados/');
  const lab = page.getByRole('group', {
    name: 'Laboratório de autómatos',
    exact: true,
  });
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText(
    'Saídas: 1 · 0 · 1 · 1',
  );
  await lab
    .getByRole('combobox', { name: 'Máquina', exact: true })
    .selectOption('overlap-eleven');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText('Saídas: 0 · 1 · 1');
});
