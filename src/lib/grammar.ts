export interface GrammarSymbol {
  value: string;
  terminal: boolean;
}
export interface Production {
  left: string;
  right: GrammarSymbol[];
}
export interface Grammar {
  start: string;
  productions: Production[];
}
export interface ParseTree {
  symbol: string;
  terminal: boolean;
  children: ParseTree[];
}
export type Recognition =
  | { kind: 'accepted'; tree: ParseTree }
  | { kind: 'rejected' }
  | { kind: 'limit'; message: string };

const EPSILON = /^(?:ε|ϵ|epsilon)$/;
const LIMIT_MESSAGE =
  'O cálculo atingiu o limite. Reduz a gramática ou a palavra e tenta novamente.';

/** Named variables are recognized longest first; quoted strings force terminals. */
export function parseGrammar(source: string): Grammar {
  if (source.length > 6000)
    throw new Error('Usa uma gramática com até 6000 caracteres.');
  const lines = source.split(/\r?\n/).flatMap((text, i) => {
    if (!text.trim() || text.trim().startsWith('//')) return [];
    const match = text.match(/^\s*([A-Z][A-Za-z0-9_]*)\s*(?:->|→|::=)\s*(.+)$/);
    if (!match)
      throw new Error(
        `Linha ${i + 1}: escreve uma produção como S -> a S b | ε.`,
      );
    return [{ left: match[1], right: match[2], line: i + 1 }];
  });
  if (!lines.length) throw new Error('Escreve pelo menos uma produção.');
  const variables = [...new Set(lines.map((line) => line.left))].sort(
    (a, b) => b.length - a.length,
  );
  if (variables.length > 32) throw new Error('Usa até 32 variáveis.');
  const productions: Production[] = [];
  for (const line of lines) {
    // Split alternatives without splitting a quoted terminal such as "|".
    const alternatives = line.right.match(/(?:"(?:\\.|[^"\\])*"|[^|"])+|\|/g);
    if (!alternatives || alternatives.join('') !== line.right)
      throw new Error(`Linha ${line.line}: fecha as aspas dos terminais.`);
    let expectAlternative = true;
    for (const part of alternatives) {
      if (part === '|') {
        if (expectAlternative)
          throw new Error(
            `Linha ${line.line}: usa ε para uma alternativa vazia.`,
          );
        expectAlternative = true;
        continue;
      }
      if (!part.trim())
        throw new Error(
          `Linha ${line.line}: usa ε para uma alternativa vazia.`,
        );
      expectAlternative = false;
      const right: GrammarSymbol[] = [];
      if (!EPSILON.test(part.trim())) {
        for (let i = 0; i < part.length;) {
          if (/\s/.test(part[i])) {
            i++;
            continue;
          }
          if (part[i] === '"') {
            const literal = part.slice(i).match(/^"(?:\\.|[^"\\])*"/)![0];
            let value: string;
            try {
              value = JSON.parse(literal);
            } catch {
              throw new Error(
                `Linha ${line.line}: sequência inválida entre aspas.`,
              );
            }
            for (const character of value)
              right.push({ value: character, terminal: true });
            i += literal.length;
            continue;
          }
          const variable = variables.find((name) => part.startsWith(name, i));
          if (variable) {
            right.push({ value: variable, terminal: false });
            i += variable.length;
            continue;
          }
          const character = String.fromCodePoint(part.codePointAt(i)!);
          if (/[A-Z]/.test(character))
            throw new Error(
              `Linha ${line.line}: falta uma produção para ${character}. Para um terminal maiúsculo, usa aspas.`,
            );
          if (EPSILON.test(character))
            throw new Error(
              `Linha ${line.line}: ε tem de ocupar toda a alternativa.`,
            );
          right.push({ value: character, terminal: true });
          i += character.length;
        }
      }
      if (right.length > 32)
        throw new Error(
          `Linha ${line.line}: usa até 32 símbolos por alternativa.`,
        );
      productions.push({ left: line.left, right });
      if (productions.length > 80) throw new Error('Usa até 80 alternativas.');
    }
    if (expectAlternative)
      throw new Error(`Linha ${line.line}: usa ε para uma alternativa vazia.`);
  }
  return { start: lines[0].left, productions };
}

interface Item {
  rule: number;
  dot: number;
  from: number;
  children: ParseTree[];
}

/** Earley recognition with one finite witness per item, including nullable cycles. */
export function recognize(grammar: Grammar, word: string): Recognition {
  const input = [...word];
  if (input.length > 80)
    return { kind: 'limit', message: 'Usa uma palavra com até 80 símbolos.' };
  const rules: Production[] = [
    { left: '$start', right: [{ value: grammar.start, terminal: false }] },
    ...grammar.productions,
  ];
  const chart = Array.from({ length: input.length + 1 }, () => ({
    items: [] as Item[],
    keys: new Set<string>(),
  }));
  let operations = 0;
  let count = 0;
  const budget = () => {
    if (++operations > 400_000) throw new Error(LIMIT_MESSAGE);
  };
  const add = (position: number, item: Item) => {
    budget();
    const key = `${item.rule}:${item.dot}:${item.from}`;
    if (chart[position].keys.has(key)) return;
    if (++count > 12_000) throw new Error(LIMIT_MESSAGE);
    chart[position].keys.add(key);
    chart[position].items.push(item);
  };
  const node = (item: Item): ParseTree => ({
    symbol: rules[item.rule].left,
    terminal: false,
    children: item.children,
  });
  try {
    add(0, { rule: 0, dot: 0, from: 0, children: [] });
    for (let position = 0; position < chart.length; position++) {
      const here = chart[position].items;
      for (let cursor = 0; cursor < here.length; cursor++) {
        const item = here[cursor];
        const next = rules[item.rule].right[item.dot];
        if (!next) {
          for (const parent of chart[item.from].items) {
            budget();
            const expected = rules[parent.rule].right[parent.dot];
            if (
              expected &&
              !expected.terminal &&
              expected.value === rules[item.rule].left
            )
              add(position, {
                ...parent,
                dot: parent.dot + 1,
                children: [...parent.children, node(item)],
              });
          }
        } else if (next.terminal) {
          if (input[position] === next.value)
            add(position + 1, {
              ...item,
              dot: item.dot + 1,
              children: [
                ...item.children,
                { symbol: next.value, terminal: true, children: [] },
              ],
            });
        } else {
          for (let rule = 1; rule < rules.length; rule++) {
            budget();
            if (rules[rule].left === next.value)
              add(position, { rule, dot: 0, from: position, children: [] });
          }
          // A nullable completion may have arrived before this waiting item.
          for (const complete of here) {
            budget();
            if (
              complete.from === position &&
              complete.dot === rules[complete.rule].right.length &&
              rules[complete.rule].left === next.value
            )
              add(position, {
                ...item,
                dot: item.dot + 1,
                children: [...item.children, node(complete)],
              });
          }
        }
      }
    }
    const end = chart[input.length].items.find(
      (item) => item.rule === 0 && item.dot === 1 && item.from === 0,
    );
    return end
      ? { kind: 'accepted', tree: end.children[0] }
      : { kind: 'rejected' };
  } catch (error) {
    if (error instanceof Error && error.message === LIMIT_MESSAGE)
      return { kind: 'limit', message: LIMIT_MESSAGE };
    throw error;
  }
}

export function leftmostDerivation(tree: ParseTree): string[] {
  const frontier = [tree];
  const steps = [tree.symbol];
  for (let i = 0; i < 500; i++) {
    const index = frontier.findIndex((node) => !node.terminal);
    if (index === -1) return steps;
    frontier.splice(index, 1, ...frontier[index].children);
    steps.push(frontier.map((node) => node.symbol).join('') || 'ε');
  }
  return steps;
}
