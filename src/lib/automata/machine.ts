export type Model = 'dfa' | 'moore' | 'mealy' | 'nfa' | 'epsilon-nfa';
export interface State {
  id: string;
  name: string;
  final: boolean;
  output: string;
}
export interface Transition {
  from: string;
  symbol: string;
  to: string;
  output: string;
}
export interface Machine {
  model: Model;
  alphabet: string[];
  states: State[];
  initial: string;
  transitions: Transition[];
}
export interface TraceRow {
  state: string;
  states?: string[];
  destinations?: string[];
  transitions?: number[];
  symbol: string;
  output: string;
  transition: number | null;
}
export interface Execution {
  rows: TraceRow[];
  accepted: boolean | null;
  outputs: string[];
}
export const limits = { states: 12, alphabet: 8, transitions: 96, input: 128 };

export function validate(machine: Machine): string[] {
  const errors: string[] = [];
  if (!['dfa', 'moore', 'mealy', 'nfa', 'epsilon-nfa'].includes(machine.model))
    errors.push('Modelo desconhecido.');
  if (!machine.states.length || machine.states.length > limits.states)
    errors.push('Usa entre 1 e 12 estados.');
  if (
    !machine.alphabet.length ||
    machine.alphabet.length > limits.alphabet ||
    machine.alphabet.some(
      (s) => Array.from(s).length !== 1 || /\s/u.test(s) || s === 'ε',
    ) ||
    new Set(machine.alphabet).size !== machine.alphabet.length
  )
    errors.push(
      'O alfabeto precisa de 1 a 8 símbolos distintos, com um carácter cada e sem espaços.',
    );
  const ids = new Set(machine.states.map((s) => s.id));
  if (ids.size !== machine.states.length)
    errors.push('Há identificadores de estado repetidos.');
  if (!ids.has(machine.initial)) errors.push('Escolhe um estado inicial.');
  if (
    machine.states.some((s) => !s.name.trim() || s.name.length > 16) ||
    new Set(machine.states.map((s) => s.name)).size !== machine.states.length
  )
    errors.push(
      'Os nomes dos estados devem ser distintos e ter 1 a 16 caracteres.',
    );
  if (
    machine.model === 'moore' &&
    machine.states.some((s) => !s.output || s.output.length > 12)
  )
    errors.push('Cada estado Moore precisa de uma saída de 1 a 12 caracteres.');
  if (machine.transitions.length > limits.transitions)
    errors.push('O limite é 96 transições.');
  const counts = new Map<string, number>();
  for (const transition of machine.transitions) {
    if (
      !ids.has(transition.from) ||
      !ids.has(transition.to) ||
      (!machine.alphabet.includes(transition.symbol) &&
        !(machine.model === 'epsilon-nfa' && transition.symbol === 'ε'))
    )
      errors.push('Há uma transição com estado ou símbolo fora da máquina.');
    if (
      machine.model === 'mealy' &&
      (!transition.output || transition.output.length > 12)
    )
      errors.push(
        'Cada transição Mealy precisa de uma saída de 1 a 12 caracteres.',
      );
    const key = JSON.stringify([transition.from, transition.symbol]);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (!isNondeterministic(machine.model))
    for (const state of machine.states)
      for (const symbol of machine.alphabet) {
        const count = counts.get(JSON.stringify([state.id, symbol])) ?? 0;
        if (!count)
          errors.push(`Falta a transição de ${state.name} com ${symbol}.`);
        if (count > 1)
          errors.push(
            `Há transições repetidas de ${state.name} com ${symbol}.`,
          );
      }
  return [...new Set(errors)];
}

export const isNondeterministic = (model: Model) =>
  model === 'nfa' || model === 'epsilon-nfa';
export const isAcceptor = (model: Model) =>
  model === 'dfa' || isNondeterministic(model);

/** Canonical state order makes subset identity independent of edge ordering. */
function ordered(machine: Machine, ids: Iterable<string>): string[] {
  const selected = new Set(ids);
  return machine.states
    .filter((state) => selected.has(state.id))
    .map((state) => state.id);
}
function closure(machine: Machine, seeds: string[]) {
  const reached = new Set(seeds);
  const transitions: number[] = [];
  if (machine.model === 'epsilon-nfa') {
    const queue = [...seeds];
    for (let index = 0; index < queue.length; index++)
      machine.transitions.forEach((edge, edgeIndex) => {
        if (edge.from !== queue[index] || edge.symbol !== 'ε') return;
        transitions.push(edgeIndex);
        if (!reached.has(edge.to)) {
          reached.add(edge.to);
          queue.push(edge.to);
        }
      });
  }
  return { states: ordered(machine, reached), transitions };
}
function advance(machine: Machine, states: string[], symbol: string) {
  const transitions: number[] = [];
  const destinations = ordered(
    machine,
    machine.transitions
      .filter((edge, index) => {
        const active = states.includes(edge.from) && edge.symbol === symbol;
        if (active) transitions.push(index);
        return active;
      })
      .map((edge) => edge.to),
  );
  const closed = closure(machine, destinations);
  return {
    destinations,
    states: closed.states,
    transitions: [...transitions, ...closed.transitions],
  };
}
function accepts(machine: Machine, states: string[]) {
  return machine.states.some(
    (state) => state.final && states.includes(state.id),
  );
}

export function execute(machine: Machine, input: string): Execution {
  const errors = validate(machine);
  if (errors.length) throw new Error(errors.join(' '));
  const symbols = Array.from(input);
  if (symbols.length > limits.input)
    throw new Error('A entrada tem mais de 128 símbolos.');
  const unknown = symbols.find((symbol) => !machine.alphabet.includes(symbol));
  if (unknown !== undefined)
    throw new Error(`O símbolo ${unknown} não pertence ao alfabeto.`);
  if (isNondeterministic(machine.model)) {
    const initial = closure(machine, [machine.initial]);
    const rows: TraceRow[] = [
      {
        state: machine.initial,
        ...initial,
        destinations: [machine.initial],
        symbol: '',
        output: '',
        transition: null,
      },
    ];
    let states = initial.states;
    for (const symbol of symbols) {
      const next = advance(machine, states, symbol);
      states = next.states;
      rows.push({
        state: states[0] ?? '',
        ...next,
        symbol,
        output: '',
        transition: null,
      });
    }
    return { rows, outputs: [], accepted: accepts(machine, states) };
  }
  let state = machine.states.find((s) => s.id === machine.initial)!;
  const outputs = machine.model === 'moore' ? [state.output] : [];
  const rows: TraceRow[] = [
    { state: state.id, symbol: '', output: outputs[0] ?? '', transition: null },
  ];
  for (const symbol of symbols) {
    const index = machine.transitions.findIndex(
      (t) => t.from === state.id && t.symbol === symbol,
    );
    const transition = machine.transitions[index];
    state = machine.states.find((s) => s.id === transition.to)!;
    const output =
      machine.model === 'moore'
        ? state.output
        : machine.model === 'mealy'
          ? transition.output
          : '';
    if (machine.model !== 'dfa') outputs.push(output);
    rows.push({ state: state.id, symbol, output, transition: index });
  }
  return {
    rows,
    outputs,
    accepted: machine.model === 'dfa' ? state.final : null,
  };
}

export type Comparison =
  { equivalent: true; pairs: number } | { equivalent: false; witness: string };
/** Exhausts the reachable product of two complete deterministic machines. */
export function compare(left: Machine, right: Machine): Comparison {
  const errors = [...validate(left), ...validate(right)];
  if (errors.length) throw new Error(errors.join(' '));
  if (
    left.model !== right.model ||
    left.alphabet.length !== right.alphabet.length ||
    left.alphabet.some((s) => !right.alphabet.includes(s))
  )
    throw new Error('A comparação exige o mesmo modelo e o mesmo alfabeto.');
  if (isNondeterministic(left.model)) return compareSubsets(left, right);
  const queue = [{ a: left.initial, b: right.initial, word: '' }];
  const visited = new Set<string>();
  for (let index = 0; index < queue.length; index++) {
    const { a, b, word } = queue[index];
    const key = JSON.stringify([a, b]);
    if (visited.has(key)) continue;
    visited.add(key);
    const first = left.states.find((s) => s.id === a)!;
    const second = right.states.find((s) => s.id === b)!;
    if (
      (left.model === 'dfa' && first.final !== second.final) ||
      (left.model === 'moore' && first.output !== second.output)
    )
      return { equivalent: false, witness: word };
    for (const symbol of left.alphabet) {
      const x = left.transitions.find(
        (t) => t.from === a && t.symbol === symbol,
      )!;
      const y = right.transitions.find(
        (t) => t.from === b && t.symbol === symbol,
      )!;
      if (left.model === 'mealy' && x.output !== y.output)
        return { equivalent: false, witness: word + symbol };
      if (!visited.has(JSON.stringify([x.to, y.to])))
        queue.push({ a: x.to, b: y.to, word: word + symbol });
    }
  }
  return { equivalent: true, pairs: visited.size };
}

/** Breadth-first subset product, with an explicit limit rather than an unbounded UI task. */
function compareSubsets(left: Machine, right: Machine): Comparison {
  const queue = [
    {
      a: closure(left, [left.initial]).states,
      b: closure(right, [right.initial]).states,
      word: '',
    },
  ];
  const key = (a: string[], b: string[]) => JSON.stringify([a, b]);
  const visited = new Set([key(queue[0].a, queue[0].b)]);
  for (let index = 0; index < queue.length; index++) {
    const { a, b, word } = queue[index];
    if (accepts(left, a) !== accepts(right, b))
      return { equivalent: false, witness: word };
    for (const symbol of left.alphabet) {
      const nextA = advance(left, a, symbol).states,
        nextB = advance(right, b, symbol).states;
      const pair = key(nextA, nextB);
      if (visited.has(pair)) continue;
      if (visited.size >= 10000)
        throw new Error(
          'Limite de 10 000 pares de subconjuntos atingido. A equivalência não foi decidida.',
        );
      visited.add(pair);
      queue.push({ a: nextA, b: nextB, word: word + symbol });
    }
  }
  return { equivalent: true, pairs: visited.size };
}
