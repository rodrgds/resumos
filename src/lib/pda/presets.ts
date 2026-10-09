import type { Acceptance } from './machine';
export interface PdaPreset {
  title: string;
  source: string;
  word: string;
  acceptance: Acceptance;
  cases: { word: string; accepted: boolean }[];
}
const countSource = `estados q0 q1 qf
alfabeto a b
pilha Z A
inicial q0 Z
finais qf
q0 a Z -> q0 AZ
q0 a A -> q0 AA
q0 b A -> q1 ε
q1 b A -> q1 ε
q0 ε Z -> qf Z
q1 ε Z -> qf Z`;
export const pdaPresets = {
  'equal-count': {
    title: 'PDA: aⁿbⁿ',
    source: countSource,
    word: 'aabb',
    acceptance: 'final',
    cases: [
      { word: '', accepted: true },
      { word: 'ab', accepted: true },
      { word: 'aabb', accepted: true },
      { word: 'aab', accepted: false },
      { word: 'abb', accepted: false },
      { word: 'aba', accepted: false },
    ],
  },
  'double-count': {
    title: 'PDA: aⁿb²ⁿ',
    source: countSource
      .replace('q0 AZ', 'q0 AAZ')
      .replace('q0 AA\n', 'q0 AAA\n'),
    word: 'abb',
    acceptance: 'final',
    cases: [
      { word: '', accepted: true },
      { word: 'abb', accepted: true },
      { word: 'aabbbb', accepted: true },
      { word: 'ab', accepted: false },
      { word: 'aabb', accepted: false },
      { word: 'abba', accepted: false },
    ],
  },
  'even-palindrome': {
    title: 'PDA: palíndromos pares',
    source: `estados empilha compara fim
alfabeto 0 1
pilha Z 0 1
inicial empilha Z
finais fim
${['Z', '0', '1'].flatMap((top) => [`empilha 0 ${top} -> empilha 0${top}`, `empilha 1 ${top} -> empilha 1${top}`, `empilha ε ${top} -> compara ${top}`]).join('\n')}
compara 0 0 -> compara ε
compara 1 1 -> compara ε
compara ε Z -> fim Z`,
    word: '0110',
    acceptance: 'final',
    cases: [
      { word: '', accepted: true },
      { word: '00', accepted: true },
      { word: '0110', accepted: true },
      { word: '1001', accepted: true },
      { word: '010', accepted: false },
      { word: '0101', accepted: false },
    ],
  },
} satisfies Record<string, PdaPreset>;
export type PdaPresetId = keyof typeof pdaPresets;
export const blankPda = `estados q0
alfabeto a b
pilha Z A
inicial q0 Z
finais`;
