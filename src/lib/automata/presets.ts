import type { Machine, Model } from './machine';
export type PresetId =
  | 'nfa-suffix-01'
  | 'epsilon-a-star-b-star'
  | 'nfa-third-last'
  | 'epsilon-ends-b'
  | 'suffix-ab'
  | 'modulo-three'
  | 'modulo-five'
  | 'overlap-eleven';
export interface Preset {
  title: string;
  input: string;
  task: string;
  cases: string[];
  machine: Machine;
}
const state = (id: string, final = false, output = '0') => ({
  id,
  name: id,
  final,
  output,
});
const transition = (
  from: string,
  symbol: string,
  to: string,
  output = '0',
) => ({ from, symbol, to, output });
export const presets: Record<PresetId, Preset> = {
  'nfa-suffix-01': {
    title: 'NFA: termina em 01',
    input: '001',
    task: 'Corrige o NFA para aceitar exatamente as palavras terminadas em 01.',
    cases: ['', '01', '001', '0010', '101', '011'],
    machine: {
      model: 'nfa',
      alphabet: ['0', '1'],
      initial: 'p',
      states: [state('p'), state('q'), state('r', true)],
      transitions: [
        transition('p', '0', 'p'),
        transition('p', '1', 'p'),
        transition('p', '0', 'q'),
        transition('q', '1', 'r'),
      ],
    },
  },
  'epsilon-a-star-b-star': {
    title: 'ε-NFA: a* b*',
    input: 'aab',
    task: 'Corrige o ε-NFA para aceitar zero ou mais a seguidos de zero ou mais b, incluindo ε.',
    cases: ['', 'a', 'b', 'aab', 'abba', 'ba'],
    machine: {
      model: 'epsilon-nfa',
      alphabet: ['a', 'b'],
      initial: 'p',
      states: [state('p'), state('q', true)],
      transitions: [
        transition('p', 'a', 'p'),
        transition('p', 'ε', 'q'),
        transition('q', 'b', 'q'),
      ],
    },
  },
  'nfa-third-last': {
    title: 'NFA: antepenúltimo bit 1',
    input: '1101',
    task: 'Corrige o NFA para aceitar exatamente as palavras cujo antepenúltimo símbolo é 1.',
    cases: ['', '1', '11', '100', '1101', '1100', '1000'],
    machine: {
      model: 'nfa',
      alphabet: ['0', '1'],
      initial: 'p',
      states: [state('p'), state('q'), state('r'), state('s', true)],
      transitions: [
        transition('p', '0', 'p'),
        transition('p', '1', 'p'),
        transition('p', '1', 'q'),
        transition('q', '0', 'r'),
        transition('q', '1', 'r'),
        transition('r', '0', 's'),
        transition('r', '1', 's'),
      ],
    },
  },
  'epsilon-ends-b': {
    title: 'ε-NFA: termina em b',
    input: 'bab',
    task: 'Corrige o ε-NFA para aceitar exatamente as palavras terminadas em b.',
    cases: ['', 'a', 'b', 'bab', 'ba', 'abb'],
    machine: {
      model: 'epsilon-nfa',
      alphabet: ['a', 'b'],
      initial: 'p',
      states: [state('p'), state('q'), state('r', true)],
      transitions: [
        transition('p', 'ε', 'q'),
        transition('q', 'a', 'q'),
        transition('q', 'b', 'r'),
        transition('r', 'ε', 'q'),
      ],
    },
  },
  'suffix-ab': {
    title: 'DFA: termina em ab',
    input: 'baab',
    task: 'Corrige a máquina para aceitar exatamente as palavras terminadas em ab.',
    cases: ['', 'ab', 'aba', 'aab', 'abb', 'abab'],
    machine: {
      model: 'dfa',
      alphabet: ['a', 'b'],
      initial: 'q0',
      states: [state('q0'), state('q1'), state('q2', true)],
      transitions: [
        transition('q0', 'a', 'q1'),
        transition('q0', 'b', 'q0'),
        transition('q1', 'a', 'q1'),
        transition('q1', 'b', 'q2'),
        transition('q2', 'a', 'q1'),
        transition('q2', 'b', 'q0'),
      ],
    },
  },
  'modulo-three': {
    title: 'Moore: resto módulo 3',
    input: '110',
    task: 'Corrige a Moore para produzir 1 exatamente quando o prefixo binário é múltiplo de 3. O prefixo vazio vale zero.',
    cases: ['', '0', '1', '11', '110', '101'],
    machine: {
      model: 'moore',
      alphabet: ['0', '1'],
      initial: 'R0',
      states: [state('R0', false, '1'), state('R1'), state('R2')],
      transitions: [
        transition('R0', '0', 'R0'),
        transition('R0', '1', 'R1'),
        transition('R1', '0', 'R2'),
        transition('R1', '1', 'R0'),
        transition('R2', '0', 'R1'),
        transition('R2', '1', 'R2'),
      ],
    },
  },
  'modulo-five': {
    title: 'Moore: resto módulo 5',
    input: '1010',
    task: 'Constrói ou corrige uma Moore que produz 1 exatamente quando o prefixo binário é múltiplo de 5. O prefixo vazio vale zero.',
    cases: ['', '0', '1', '101', '1010', '1001', '1111'],
    machine: {
      model: 'moore',
      alphabet: ['0', '1'],
      initial: 'R0',
      states: [
        state('R0', false, '1'),
        state('R1'),
        state('R2'),
        state('R3'),
        state('R4'),
      ],
      transitions: [
        transition('R0', '0', 'R0'),
        transition('R0', '1', 'R1'),
        transition('R1', '0', 'R2'),
        transition('R1', '1', 'R3'),
        transition('R2', '0', 'R4'),
        transition('R2', '1', 'R0'),
        transition('R3', '0', 'R1'),
        transition('R3', '1', 'R2'),
        transition('R4', '0', 'R3'),
        transition('R4', '1', 'R4'),
      ],
    },
  },
  'overlap-eleven': {
    title: 'Mealy: detetar 11',
    input: '111011',
    task: 'Corrige a Mealy para produzir 1 em cada bit que completa 11, incluindo ocorrências sobrepostas.',
    cases: ['', '0', '1', '11', '111', '11011'],
    machine: {
      model: 'mealy',
      alphabet: ['0', '1'],
      initial: 'A',
      states: [state('A'), state('B')],
      transitions: [
        transition('A', '0', 'A'),
        transition('A', '1', 'B'),
        transition('B', '0', 'A'),
        transition('B', '1', 'B', '1'),
      ],
    },
  },
};
export function blankMachine(model: Model): Machine {
  return {
    model,
    alphabet: ['0', '1'],
    initial: 'q0',
    states: [state('q0')],
    transitions: [],
  };
}
export function repairMachine(id: PresetId): Machine {
  const machine = structuredClone(presets[id].machine);
  machine.transitions[machine.transitions.length - 1].to = machine.states[0].id;
  if (id === 'epsilon-ends-b') machine.transitions[2].to = machine.states[0].id;
  if (machine.model === 'nfa' || machine.model === 'epsilon-nfa')
    return machine;
  if (machine.model === 'dfa') machine.transitions[3].to = machine.states[0].id;
  if (machine.model === 'mealy') machine.transitions[3].output = '0';
  return machine;
}
