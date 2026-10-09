export type Acceptance = 'final' | 'empty';
export interface PdaTransition {
  from: string;
  input: string;
  pop: string;
  to: string;
  push: string;
}
export interface PdaMachine {
  states: string[];
  alphabet: string[];
  stackAlphabet: string[];
  initial: string;
  initialStack: string;
  finals: string[];
  acceptance: Acceptance;
  transitions: PdaTransition[];
}
export interface Configuration {
  id: number;
  state: string;
  position: number;
  stack: string;
  transition: number | null;
}
export type SearchKind = 'running' | 'accepted' | 'rejected' | 'undecided';
export interface PdaSnapshot {
  kind: SearchKind;
  depth: number;
  examined: number;
  frontier: Configuration[];
  trace: Configuration[];
  limited: boolean;
}
export const pdaLimits = {
  states: 12,
  transitions: 96,
  input: 80,
  depth: 128,
  stack: 96,
  configurations: 5000,
};
const chars = (value: string) => Array.from(value);
const epsilon = (value: string) => (value === 'ε' ? '' : value);

/** Text declarations make states and transition edits part of one reviewable machine. */
export function parsePda(source: string, acceptance: Acceptance): PdaMachine {
  if (source.length > 16000)
    throw new Error('A descrição excede 16 000 caracteres.');
  const declarations = new Map<string, string[]>();
  const transitions: PdaTransition[] = [];
  for (const [index, raw] of source.split('\n').entries()) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const tokens = line.split(/\s+/u);
    if (
      ['estados', 'alfabeto', 'pilha', 'inicial', 'finais'].includes(tokens[0])
    ) {
      if (declarations.has(tokens[0]))
        throw new Error(`Linha ${index + 1}: declaração repetida.`);
      declarations.set(tokens[0], tokens.slice(1));
      continue;
    }
    if (tokens.length !== 6 || tokens[3] !== '->')
      throw new Error(
        `Linha ${index + 1}: usa origem entrada topo -> destino substituição.`,
      );
    transitions.push({
      from: tokens[0],
      input: epsilon(tokens[1]),
      pop: tokens[2],
      to: tokens[4],
      push: epsilon(tokens[5]),
    });
  }
  const get = (name: string) => {
    const values = declarations.get(name);
    if (!values) throw new Error(`Falta a declaração ${name}.`);
    return values;
  };
  const states = get('estados'),
    alphabet = get('alfabeto'),
    stackAlphabet = get('pilha'),
    initial = get('inicial'),
    finals = get('finais');
  if (
    !states.length ||
    states.length > pdaLimits.states ||
    new Set(states).size !== states.length ||
    states.some((s) => s.length > 16 || !/^[\p{L}\p{N}_]+$/u.test(s))
  )
    throw new Error(
      'Usa 1 a 12 estados distintos, com nomes de até 16 letras, números ou _.',
    );
  for (const [name, symbols] of [
    ['alfabeto', alphabet],
    ['pilha', stackAlphabet],
  ] as const)
    if (
      !symbols.length ||
      symbols.length > 12 ||
      new Set(symbols).size !== symbols.length ||
      symbols.some((s) => chars(s).length !== 1 || s === 'ε')
    )
      throw new Error(
        `O ${name} precisa de 1 a 12 símbolos distintos de um carácter, sem ε.`,
      );
  if (
    initial.length !== 2 ||
    !states.includes(initial[0]) ||
    !stackAlphabet.includes(initial[1])
  )
    throw new Error(
      'Usa inicial estado símbolo-da-pilha, com valores declarados.',
    );
  if (finals.some((s) => !states.includes(s)))
    throw new Error('Há um estado final não declarado.');
  if (acceptance !== 'final' && acceptance !== 'empty')
    throw new Error('Critério de aceitação desconhecido.');
  if (transitions.length > pdaLimits.transitions)
    throw new Error('Usa até 96 transições.');
  for (const t of transitions) {
    if (!states.includes(t.from) || !states.includes(t.to))
      throw new Error('Há uma transição com estado não declarado.');
    if (t.input !== '' && !alphabet.includes(t.input))
      throw new Error('A entrada de uma transição não pertence ao alfabeto.');
    if (
      !stackAlphabet.includes(t.pop) ||
      chars(t.push).some((s) => !stackAlphabet.includes(s))
    )
      throw new Error(
        'O topo ou a substituição de uma transição não pertence ao alfabeto da pilha.',
      );
    if (chars(t.push).length > 16)
      throw new Error('Uma substituição admite até 16 símbolos.');
  }
  return {
    states,
    alphabet,
    stackAlphabet,
    initial: initial[0],
    initialStack: initial[1],
    finals,
    acceptance,
    transitions,
  };
}

/** BFS keeps alternative configurations, not just alternative control states. */
export class PdaSearch {
  private machine: PdaMachine;
  private input: string[];
  private nodes: (Configuration & { parent: number | null })[];
  private frontier: number[] = [0];
  private visited = new Set<string>();
  private kind: SearchKind = 'running';
  private depth = 0;
  private examined = 0;
  private limited = false;
  private selected = 0;
  constructor(machine: PdaMachine, word: string) {
    this.machine = structuredClone(machine);
    this.input = chars(word);
    if (this.input.length > pdaLimits.input)
      throw new Error('Usa até 80 símbolos de entrada.');
    const unknown = this.input.find((s) => !machine.alphabet.includes(s));
    if (unknown !== undefined)
      throw new Error(`O símbolo ${unknown} não pertence ao alfabeto.`);
    this.nodes = [
      {
        id: 0,
        state: machine.initial,
        position: 0,
        stack: machine.initialStack,
        transition: null,
        parent: null,
      },
    ];
    this.visited.add(this.key(this.nodes[0]));
    if (this.accepts(this.nodes[0])) this.kind = 'accepted';
  }
  private key(row: Configuration) {
    return JSON.stringify([row.state, row.position, row.stack]);
  }
  private accepts(row: Configuration) {
    return (
      row.position === this.input.length &&
      (this.machine.acceptance === 'empty'
        ? row.stack === ''
        : this.machine.finals.includes(row.state))
    );
  }
  trace(id: number): Configuration[] {
    const trace: Configuration[] = [];
    let row = this.nodes[id];
    if (!row) throw new Error('Configuração desconhecida.');
    while (row) {
      const { parent, ...configuration } = row;
      trace.push(configuration);
      if (parent === null) break;
      row = this.nodes[parent];
    }
    return trace.reverse();
  }
  snapshot(): PdaSnapshot {
    return {
      kind: this.kind,
      depth: this.depth,
      examined: this.examined,
      limited: this.limited,
      frontier: this.frontier.map((id) => {
        const { parent, ...row } = this.nodes[id];
        return row;
      }),
      trace: this.trace(this.selected),
    };
  }
  step(): PdaSnapshot {
    if (this.kind !== 'running') return this.snapshot();
    const next: number[] = [];
    for (const id of this.frontier) {
      const row = this.nodes[id];
      this.selected = id;
      this.examined++;
      for (const [index, t] of this.machine.transitions.entries()) {
        const stack = chars(row.stack);
        if (
          t.from !== row.state ||
          t.pop !== stack[0] ||
          (t.input !== '' && t.input !== this.input[row.position])
        )
          continue;
        const candidate: Configuration = {
          id: this.nodes.length,
          state: t.to,
          position: row.position + (t.input === '' ? 0 : 1),
          stack: t.push + stack.slice(1).join(''),
          transition: index,
        };
        const key = this.key(candidate);
        if (this.visited.has(key)) continue;
        if (
          this.depth >= pdaLimits.depth ||
          chars(candidate.stack).length > pdaLimits.stack ||
          this.nodes.length >= pdaLimits.configurations
        ) {
          this.limited = true;
          continue;
        }
        this.visited.add(key);
        this.nodes.push({ ...candidate, parent: id });
        next.push(candidate.id);
        if (this.accepts(candidate)) {
          this.kind = 'accepted';
          this.selected = candidate.id;
          this.frontier = next;
          this.depth++;
          return this.snapshot();
        }
      }
    }
    this.frontier = next;
    this.depth++;
    if (!next.length) this.kind = this.limited ? 'undecided' : 'rejected';
    else this.selected = next[0];
    return this.snapshot();
  }
  run(): PdaSnapshot {
    while (this.kind === 'running') this.step();
    return this.snapshot();
  }
}
