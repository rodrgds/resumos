import type { Machine, Model } from './machine';
export type PresetId =
  'suffix-ab' | 'modulo-three' | 'modulo-five' | 'overlap-eleven';
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
  if (machine.model === 'dfa') machine.transitions[3].to = machine.states[0].id;
  if (machine.model === 'mealy') machine.transitions[3].output = '0';
  return machine;
}
