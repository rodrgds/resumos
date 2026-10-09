import type { GrammarPreset } from '../../lib/grammar-lab-types';

/** Casos públicos de exploração, sem pretender provar equivalência de CFG. */
export const expressionGrouping = [
  {
    name: 'Soma à esquerda',
    source: 'E -> E + T | T\nT -> T * F | F\nF -> a | ( E )',
    word: 'a+a+a',
    tests:
      'a -> aceita\na+a*a -> aceita\n(a+a)*a -> aceita\na+a+a -> aceita\na+ -> rejeita\n*a -> rejeita\nε -> rejeita',
  },
  {
    name: 'Soma à direita',
    source: 'E -> T + E | T\nT -> T * F | F\nF -> a | ( E )',
    word: 'a+a+a',
    tests:
      'a -> aceita\na+a*a -> aceita\n(a+a)*a -> aceita\na+a+a -> aceita\na+ -> rejeita\n*a -> rejeita\nε -> rejeita',
  },
] satisfies GrammarPreset[];

export const strictExcess = [
  {
    name: 'Excedente de a',
    source: 'S -> a S b | A\nA -> a A | ε',
    word: 'ab',
    tests:
      'a -> aceita\naaa -> aceita\naab -> aceita\naaab -> aceita\naaabb -> aceita\nε -> rejeita\nab -> rejeita\naabb -> rejeita\nb -> rejeita\nbaa -> rejeita',
    task: 'A gramática inicial permite n = m. Altera apenas a base de A para gerar aⁿbᵐ com n > m ≥ 0. Mantém a produção recursiva de S.',
  },
] satisfies GrammarPreset[];
