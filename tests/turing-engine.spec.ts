import { expect, test } from '@playwright/test';
import { execute, start, step, validate } from '../src/lib/turing/machine';
import { presets } from '../src/lib/turing/presets';

test('marking decides balanced ordered blocks, including empty input', () => {
  for (const [input, result] of [
    ['', 'accepted'],
    ['ab', 'accepted'],
    ['aabb', 'accepted'],
    ['aab', 'rejected'],
    ['abab', 'rejected'],
    ['ba', 'rejected'],
  ] as const)
    expect(execute(presets.blocks.machine, input).status).toBe(result);
  const run = execute(presets.blocks.machine, 'aabb');
  expect(run.steps).toBe(13);
  expect([...run.tape.values()].join('')).toBe('XXYY');
});

test('increment writes into the blank left of the input and moves after writing', () => {
  const run = execute(presets.increment.machine, '111');
  expect(run.status).toBe('accepted');
  expect(run.tape.get(-1)).toBe('1');
  expect([0, 1, 2].map((i) => run.tape.get(i)).join('')).toBe('000');
  expect(run.head).toBe(0);
  const first = step(
    presets.blocks.machine,
    start(presets.blocks.machine, 'ab'),
  );
  expect([first.state, first.head, first.tape.get(0)]).toEqual(['q1', 1, 'X']);
});

test('resource limits are inconclusive, while stopping without a rule rejects', () => {
  expect(
    execute(presets.loop.machine, '', { steps: 4, head: 100 }).status,
  ).toBe('inconclusive');
  expect(execute(presets.loop.machine, '', { steps: 10, head: 2 }).status).toBe(
    'inconclusive',
  );
  expect(execute(presets.blocks.machine, 'b').status).toBe('rejected');
  expect(
    execute(presets.increment.machine, '0', { steps: 3, head: 10 }).status,
  ).toBe('accepted');
});

test('nondeterministic rules and invalid inputs cannot masquerade as rejection', () => {
  const machine = structuredClone(presets.blocks.machine);
  machine.transitions.push({ ...machine.transitions[0] });
  expect(validate(machine).join(' ')).toContain('repetida');
  expect(() => execute(machine, 'ab')).toThrow();
  expect(() => execute(presets.blocks.machine, 'X')).toThrow('entrada');
});

test('an initial final accepts without moving, and halting is stable under step', () => {
  const machine = structuredClone(presets.blank.machine);
  machine.initial = 'qf';
  const initial = start(machine, '10');
  expect(initial.status).toBe('accepted');
  expect(initial.steps).toBe(0);
  expect(initial.head).toBe(0);
  expect([...step(machine, initial).tape.values()]).toEqual(['1', '0']);
});
