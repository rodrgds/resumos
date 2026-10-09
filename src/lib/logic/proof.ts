/** A bounded propositional Fitch checker. Scope identities, not indentation alone,
 * determine whether references are accessible. No semantic shortcuts are rules. */
type Formula =
  | { kind: 'atom'; name: string }
  | { kind: 'false' }
  | { kind: 'not'; value: Formula }
  | { kind: 'and' | 'or' | 'implies'; left: Formula; right: Formula };
export interface ProofDiagnostic {
  line: number;
  message: string;
}
export interface ProofResult {
  valid: boolean;
  diagnostics: ProofDiagnostic[];
  lines: number;
}

export function parseFormula(source: string): Formula {
  if (source.length > 1000)
    throw new Error('A fórmula excede 1000 caracteres.');
  const normalized = source
    .replace(/->/g, '→')
    .replace(/\/\\/g, '∧')
    .replace(/\\\//g, '∨')
    .replace(/[~!]/g, '¬')
    .replace(/&/g, '∧');
  const tokens = normalized.match(/[A-Za-z][A-Za-z0-9_]*|[¬∧∨→()⊥]|\S/g) ?? [];
  if (tokens.length > 200) throw new Error('A fórmula excede 200 símbolos.');
  let at = 0;
  function primary(): Formula {
    const token = tokens[at++];
    if (token === '¬') return { kind: 'not', value: primary() };
    if (token === '(') {
      const value = implication();
      if (tokens[at++] !== ')') throw new Error('Falta fechar um parêntesis.');
      return value;
    }
    if (token === 'F' || token === '⊥') return { kind: 'false' };
    if (token && /^[A-Za-z][A-Za-z0-9_]*$/.test(token))
      return { kind: 'atom', name: token };
    throw new Error('Esperava uma proposição, F, uma negação ou parêntesis.');
  }
  function conjunction(): Formula {
    let left = primary();
    while (tokens[at] === '∧') {
      at++;
      left = { kind: 'and', left, right: primary() };
    }
    return left;
  }
  function disjunction(): Formula {
    let left = conjunction();
    while (tokens[at] === '∨') {
      at++;
      left = { kind: 'or', left, right: conjunction() };
    }
    return left;
  }
  function implication(): Formula {
    const left = disjunction();
    if (tokens[at] !== '→') return left;
    at++;
    return { kind: 'implies', left, right: implication() };
  }
  const value = implication();
  if (at !== tokens.length)
    throw new Error(`Símbolo inesperado: ${tokens[at]}.`);
  return value;
}
const equal = (a: Formula, b: Formula): boolean =>
  JSON.stringify(a) === JSON.stringify(b);
interface Scope {
  id: number;
  parent: number[];
  start: number;
  end: number;
  closed: boolean;
}
interface Line {
  n: number;
  formula: Formula;
  path: number[];
  valid: boolean;
}
const prefix = (a: number[], b: number[]) =>
  a.length <= b.length && a.every((id, i) => id === b[i]);

export function checkProof(
  source: string,
  premises: string[],
  goal: string,
): ProofResult {
  const diagnostics: ProofDiagnostic[] = [];
  const lines = new Map<number, Line>();
  const scopes: Scope[] = [];
  let path: number[] = [];
  const fail = (line: number, message: string) =>
    diagnostics.push({ line, message });
  if (source.length > 30000 || source.split('\n').length > 250)
    return {
      valid: false,
      lines: 0,
      diagnostics: [
        { line: 0, message: 'Usa até 250 linhas e 30 000 caracteres.' },
      ],
    };
  if (premises.length > 100 || premises.join('').length > 30000) {
    return {
      valid: false,
      lines: 0,
      diagnostics: [
        {
          line: 0,
          message: 'Usa até 100 premissas e 30 000 caracteres no enunciado.',
        },
      ],
    };
  }
  let allowed: Formula[], target: Formula;
  try {
    allowed = premises.map(parseFormula);
    target = parseFormula(goal);
  } catch (error) {
    return {
      valid: false,
      lines: 0,
      diagnostics: [
        { line: 0, message: `Enunciado inválido: ${(error as Error).message}` },
      ],
    };
  }
  const close = (depth: number) => {
    while (path.length > depth) {
      const scope = scopes[path.pop()!];
      scope.closed = true;
    }
  };
  for (const [index, raw] of source.split('\n').entries()) {
    if (!raw.trim()) continue;
    const separator = raw.trim().match(/^(\|(?:\s*\|)*)\s*---$/);
    if (separator) {
      const depth = (separator[1].match(/\|/g) ?? []).length;
      if (depth !== path.length || !depth)
        fail(
          index + 1,
          'O separador deve fechar a caixa mais interior aberta.',
        );
      else close(depth - 1);
      continue;
    }
    const match = raw
      .trim()
      .match(
        /^(\d+)\s+((?:\|\s*)*)(.+?)(?:\s*;\s*|\s{2,})(premissa|hipótese|hipotese|assumption|premise|[∧∨→¬]?[IE]|FI|FE|R|&[IE]|->[IE]|~[IE])\s*(?:,\s*(.*))?$/i,
      );
    if (!match) {
      fail(
        index + 1,
        'Usa número, barras, fórmula; regra, referências. Exemplo: 3 | q; →E, 1, 2.',
      );
      continue;
    }
    const n = Number(match[1]);
    const depth = (match[2].match(/\|/g) ?? []).length;
    const rule = match[4]
      .replace('->', '→')
      .replace('&', '∧')
      .replace('~', '¬');
    const before = diagnostics.length;
    if (n !== lines.size + 1) {
      fail(n, 'Numera as linhas consecutivamente, a partir de 1.');
      return { valid: false, lines: lines.size, diagnostics };
    }
    close(depth);
    let formula: Formula;
    try {
      formula = parseFormula(match[3]);
    } catch (error) {
      fail(n, (error as Error).message);
      return { valid: false, lines: lines.size, diagnostics };
    }
    const hypothesis = /^(hipótese|hipotese|assumption)$/i.test(rule);
    if (depth > path.length) {
      if (depth !== path.length + 1 || !hypothesis || depth > 20)
        fail(n, 'Abre uma caixa de cada vez, com hipótese, até 20 níveis.');
      else {
        const id = scopes.length;
        scopes.push({ id, parent: [...path], start: n, end: n, closed: false });
        path.push(id);
      }
    } else if (hypothesis)
      fail(
        n,
        'Uma hipótese abre uma nova caixa. Usa | --- antes de uma caixa irmã.',
      );
    const line: Line = { n, formula, path: [...path], valid: false };
    for (const id of path) scopes[id].end = n;
    const refs = match[5]?.split(',').map((value) => value.trim()) ?? [];
    const get = (ref: string): Formula => {
      if (!/^\d+$/.test(ref))
        throw new Error('Esta regra pede referências a linhas, não a caixas.');
      const previous = lines.get(Number(ref));
      if (!previous || !previous.valid)
        throw new Error(`A linha ${ref} não existe ou contém um erro.`);
      if (!prefix(previous.path, path))
        throw new Error(
          `A linha ${ref} pertence a uma caixa fechada ou irmã e não está acessível.`,
        );
      return previous.formula;
    };
    const box = (ref: string): [Formula, Formula, number] => {
      const range = ref.match(/^(\d+)\s*(?:a|-)\s*(\d+)$/);
      if (!range) throw new Error('Cita a caixa completa, por exemplo 2 a 4.');
      const scope = scopes.find(
        (s) => s.start === Number(range[1]) && s.end === Number(range[2]),
      );
      if (!scope || !scope.closed || !equalPath(scope.parent, path))
        throw new Error(
          'A referência deve ser uma caixa completa, fechada, diretamente dentro do âmbito atual.',
        );
      const start = lines.get(scope.start)!,
        end = lines.get(scope.end)!;
      if (
        !equalPath(end.path, [...scope.parent, scope.id]) ||
        [...lines.values()].some(
          (l) => l.n >= scope.start && l.n <= scope.end && !l.valid,
        )
      )
        throw new Error(
          'A caixa citada tem erros ou termina dentro de outra caixa.',
        );
      return [start.formula, end.formula, scope.id];
    };
    const count = (expected: number) => {
      if (refs.length !== expected)
        throw new Error(`Esta regra pede ${expected} referência(s).`);
    };
    try {
      let ok = false;
      if (/^(premissa|premise)$/i.test(rule)) {
        count(0);
        ok = depth === 0 && allowed.some((p) => equal(p, formula));
        if (!ok)
          throw new Error(
            'Só podes usar premissas do enunciado, fora das caixas.',
          );
      } else if (hypothesis) {
        count(0);
        ok = depth > 0 && scopes[path.at(-1)!]?.start === n;
      } else if (rule === 'R') {
        count(1);
        ok = equal(get(refs[0]), formula);
      } else if (rule === '∧I') {
        count(2);
        const a = get(refs[0]),
          b = get(refs[1]);
        ok =
          formula.kind === 'and' &&
          equal(formula.left, a) &&
          equal(formula.right, b);
      } else if (rule === '∧E') {
        count(1);
        const a = get(refs[0]);
        ok =
          a.kind === 'and' &&
          (equal(formula, a.left) || equal(formula, a.right));
      } else if (rule === '∨I') {
        count(1);
        const a = get(refs[0]);
        ok =
          formula.kind === 'or' &&
          (equal(a, formula.left) || equal(a, formula.right));
      } else if (rule === '→E') {
        count(2);
        const a = get(refs[0]),
          b = get(refs[1]);
        ok =
          (a.kind === 'implies' &&
            equal(a.left, b) &&
            equal(a.right, formula)) ||
          (b.kind === 'implies' && equal(b.left, a) && equal(b.right, formula));
      } else if (rule === 'FI') {
        count(2);
        const a = get(refs[0]),
          b = get(refs[1]);
        ok =
          formula.kind === 'false' &&
          ((a.kind === 'not' && equal(a.value, b)) ||
            (b.kind === 'not' && equal(b.value, a)));
      } else if (rule === 'FE') {
        count(1);
        ok = get(refs[0]).kind === 'false';
      } else if (rule === '¬E') {
        count(1);
        const a = get(refs[0]);
        ok =
          a.kind === 'not' &&
          a.value.kind === 'not' &&
          equal(a.value.value, formula);
      } else if (rule === '→I' || rule === '¬I') {
        count(1);
        const [a, b] = box(refs[0]);
        ok =
          rule === '→I'
            ? formula.kind === 'implies' &&
              equal(formula.left, a) &&
              equal(formula.right, b)
            : formula.kind === 'not' &&
              equal(formula.value, a) &&
              b.kind === 'false';
      } else if (rule === '∨E') {
        count(3);
        const a = get(refs[0]);
        const [b, c, id1] = box(refs[1]),
          [d, e, id2] = box(refs[2]);
        ok =
          a.kind === 'or' &&
          id1 !== id2 &&
          ((equal(a.left, b) && equal(a.right, d)) ||
            (equal(a.right, b) && equal(a.left, d))) &&
          equal(c, formula) &&
          equal(e, formula);
      } else
        throw new Error(
          'Regra desconhecida. Usa apenas as regras de base indicadas na ajuda.',
        );
      if (!ok)
        throw new Error(
          `A fórmula não resulta das referências pela regra ${rule}.`,
        );
    } catch (error) {
      fail(n, (error as Error).message);
    }
    line.valid = diagnostics.length === before;
    lines.set(n, line);
  }
  const last = [...lines.values()].at(-1);
  if (!last) fail(0, 'Escreve uma dedução.');
  else if (last.path.length)
    fail(
      last.n,
      'A prova termina com uma hipótese ainda aberta. Conclui fora de todas as caixas.',
    );
  else if (!equal(last.formula, target))
    fail(last.n, 'A última linha não é a conclusão pedida.');
  return { valid: diagnostics.length === 0, diagnostics, lines: lines.size };
}
function equalPath(a: number[], b: number[]) {
  return a.length === b.length && prefix(a, b);
}
