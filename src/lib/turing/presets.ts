import type { Machine } from './machine';
const transition = (
  from: string,
  read: string,
  to: string,
  write: string,
  move: 'L' | 'R',
) => ({ from, read, to, write, move });
export const presets: Record<
  string,
  { title: string; input: string; machine: Machine }
> = {
  blocks: {
    title: 'Comparar aⁿbⁿ',
    input: 'aabb',
    machine: {
      states: ['q0', 'q1', 'q2', 'q3', 'qf'],
      initial: 'q0',
      finals: ['qf'],
      inputAlphabet: ['a', 'b'],
      tapeAlphabet: ['a', 'b', 'X', 'Y', 'B'],
      transitions: [
        transition('q0', 'a', 'q1', 'X', 'R'),
        transition('q0', 'Y', 'q3', 'Y', 'R'),
        transition('q0', 'B', 'qf', 'B', 'R'),
        transition('q1', 'a', 'q1', 'a', 'R'),
        transition('q1', 'b', 'q2', 'Y', 'L'),
        transition('q1', 'Y', 'q1', 'Y', 'R'),
        transition('q2', 'a', 'q2', 'a', 'L'),
        transition('q2', 'X', 'q0', 'X', 'R'),
        transition('q2', 'Y', 'q2', 'Y', 'L'),
        transition('q3', 'Y', 'q3', 'Y', 'R'),
        transition('q3', 'B', 'qf', 'B', 'R'),
      ],
    },
  },
  increment: {
    title: 'Incrementar um binário',
    input: '111',
    machine: {
      states: ['q0', 'carry', 'qf'],
      initial: 'q0',
      finals: ['qf'],
      inputAlphabet: ['0', '1'],
      tapeAlphabet: ['0', '1', 'B'],
      transitions: [
        transition('q0', '0', 'q0', '0', 'R'),
        transition('q0', '1', 'q0', '1', 'R'),
        transition('q0', 'B', 'carry', 'B', 'L'),
        transition('carry', '1', 'carry', '0', 'L'),
        transition('carry', '0', 'qf', '1', 'R'),
        transition('carry', 'B', 'qf', '1', 'R'),
      ],
    },
  },
  loop: {
    title: 'Percorrer brancos sem parar',
    input: '',
    machine: {
      states: ['q0'],
      initial: 'q0',
      finals: [],
      inputAlphabet: ['0'],
      tapeAlphabet: ['0', 'B'],
      transitions: [
        transition('q0', '0', 'q0', '0', 'R'),
        transition('q0', 'B', 'q0', 'B', 'R'),
      ],
    },
  },
  blank: {
    title: 'Criar máquina',
    input: '',
    machine: {
      states: ['q0', 'qf'],
      initial: 'q0',
      finals: ['qf'],
      inputAlphabet: ['0', '1'],
      tapeAlphabet: ['0', '1', 'B'],
      transitions: [],
    },
  },
};
