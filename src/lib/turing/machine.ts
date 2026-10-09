export interface Machine {
  states: string[];
  initial: string;
  finals: string[];
  inputAlphabet: string[];
  tapeAlphabet: string[];
  transitions: {
    from: string;
    read: string;
    to: string;
    write: string;
    move: 'L' | 'R';
  }[];
}
export const limits = {
  states: 16,
  transitions: 128,
  input: 128,
  steps: 2000,
  head: 256,
};
export interface Configuration {
  state: string;
  head: number;
  tape: Map<number, string>;
  steps: number;
  status: 'running' | 'accepted' | 'rejected' | 'inconclusive';
  reason: string;
}
export function validate(m: Machine): string[] {
  const errors: string[] = [];
  if (
    !m.states.length ||
    m.states.length > limits.states ||
    new Set(m.states).size !== m.states.length ||
    m.states.some((s) => !s.trim() || s.length > 16)
  )
    errors.push('Usa 1 a 16 estados distintos, com nomes até 16 caracteres.');
  if (
    !m.states.includes(m.initial) ||
    m.finals.some((s) => !m.states.includes(s))
  )
    errors.push('Escolhe estados inicial e finais existentes.');
  for (const symbols of [m.inputAlphabet, m.tapeAlphabet]) {
    if (
      symbols.length > 16 ||
      new Set(symbols).size !== symbols.length ||
      symbols.some((s) => [...s].length !== 1 || /\s/u.test(s))
    )
      errors.push(
        'Cada alfabeto tem até 16 símbolos distintos de uma letra, sem espaços.',
      );
  }
  if (
    !m.tapeAlphabet.includes('B') ||
    m.inputAlphabet.includes('B') ||
    m.inputAlphabet.some((s) => !m.tapeAlphabet.includes(s))
  )
    errors.push(
      'B é branco, pertence à fita e não à entrada; a fita contém o alfabeto de entrada.',
    );
  if (m.transitions.length > limits.transitions)
    errors.push('Usa até 128 transições.');
  const keys = new Set<string>();
  for (const t of m.transitions) {
    if (
      !m.states.includes(t.from) ||
      !m.states.includes(t.to) ||
      !m.tapeAlphabet.includes(t.read) ||
      !m.tapeAlphabet.includes(t.write) ||
      !['L', 'R'].includes(t.move)
    )
      errors.push('Uma transição tem estado, símbolo ou movimento inválido.');
    if (m.finals.includes(t.from))
      errors.push('Estados finais não têm transições de saída.');
    const key = JSON.stringify([t.from, t.read]);
    if (keys.has(key))
      errors.push(
        'Transição repetida para o mesmo estado e símbolo: a máquina deve ser determinística.',
      );
    keys.add(key);
  }
  return [...new Set(errors)];
}
function halt(m: Machine, c: Configuration): Configuration {
  if (m.finals.includes(c.state))
    return { ...c, status: 'accepted', reason: 'Estado final.' };
  if (
    !m.transitions.some(
      (t) => t.from === c.state && t.read === (c.tape.get(c.head) ?? 'B'),
    )
  )
    return { ...c, status: 'rejected', reason: 'Não há transição definida.' };
  return c;
}
export function start(m: Machine, input: string): Configuration {
  const errors = validate(m);
  if (errors.length) throw new Error(errors.join(' '));
  const symbols = [...input];
  if (
    symbols.length > limits.input ||
    symbols.some((s) => !m.inputAlphabet.includes(s))
  )
    throw new Error('A entrada tem até 128 símbolos do alfabeto de entrada.');
  return halt(m, {
    state: m.initial,
    head: 0,
    tape: new Map(symbols.map((s, i) => [i, s])),
    steps: 0,
    status: 'running',
    reason: '',
  });
}
export function step(
  m: Machine,
  c: Configuration,
  budget = { steps: limits.steps, head: limits.head },
): Configuration {
  if (c.status !== 'running') return c;
  if (c.steps >= budget.steps)
    return {
      ...c,
      status: 'inconclusive',
      reason:
        'Limite de passos atingido. Não prova rejeição nem não terminação.',
    };
  const t = m.transitions.find(
    (t) => t.from === c.state && t.read === (c.tape.get(c.head) ?? 'B'),
  )!;
  const head = c.head + (t.move === 'L' ? -1 : 1);
  if (Math.abs(head) > budget.head)
    return {
      ...c,
      status: 'inconclusive',
      reason:
        'Limite de posição da cabeça atingido. Não prova rejeição nem não terminação.',
    };
  const tape = new Map(c.tape);
  if (t.write === 'B') tape.delete(c.head);
  else tape.set(c.head, t.write);
  return halt(m, {
    state: t.to,
    head,
    tape,
    steps: c.steps + 1,
    status: 'running',
    reason: '',
  });
}
export function execute(
  m: Machine,
  input: string,
  budget = { steps: limits.steps, head: limits.head },
): Configuration {
  let c = start(m, input);
  while (c.status === 'running') c = step(m, c, budget);
  return c;
}
