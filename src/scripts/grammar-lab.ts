import { mountFormalEditor } from '../lib/formal-editor';
import {
  parseGrammar,
  recognize,
  leftmostDerivation,
  type ParseTree,
} from '../lib/grammar';
import type { GrammarPreset } from '../lib/grammar-lab-types';

function renderTree(root: HTMLElement, tree: ParseTree) {
  const namespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(namespace, 'svg');
  svg.setAttribute('role', 'img');
  const nodes: { tree: ParseTree; x: number; y: number; parent?: number }[] =
    [];
  let leaves = 0;
  let maxDepth = 0;
  function layout(branch: ParseTree, depth: number, parent?: number): number {
    if (nodes.length >= 500 || depth > 100)
      throw new Error('Árvore demasiado grande para desenhar.');
    const index = nodes.length;
    nodes.push({ tree: branch, x: 0, y: 24 + depth * 48, parent });
    maxDepth = Math.max(depth, maxDepth);
    const children = branch.children.length
      ? branch.children
      : branch.terminal
        ? []
        : [{ symbol: 'ε', terminal: true, children: [] }];
    const positions = children.map((child) => layout(child, depth + 1, index));
    nodes[index].x = positions.length
      ? (positions[0] + positions[positions.length - 1]) / 2
      : 24 + leaves++ * 44;
    return nodes[index].x;
  }
  layout(tree, 0);
  const spacing = Math.max(
    44,
    ...nodes.map(({ tree }) => tree.symbol.length * 9 + 16),
  );
  for (const node of nodes)
    node.x = spacing / 2 + ((node.x - 24) / 44) * spacing;
  const width = Math.max(220, leaves * spacing + 4);
  const height = (maxDepth + 1) * 48;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute(
    'aria-label',
    'Árvore sintática. As folhas, da esquerda para a direita, formam a palavra; ε é vazio.',
  );
  for (const entry of nodes) {
    if (entry.parent !== undefined) {
      const parent = nodes[entry.parent];
      const edge = document.createElementNS(namespace, 'line');
      for (const [key, value] of Object.entries({
        x1: parent.x,
        y1: parent.y + 12,
        x2: entry.x,
        y2: entry.y - 12,
      }))
        edge.setAttribute(key, String(value));
      svg.append(edge);
    }
  }
  for (const entry of nodes) {
    const text = document.createElementNS(namespace, 'text');
    text.setAttribute('x', String(entry.x));
    text.setAttribute('y', String(entry.y));
    if (entry.tree.terminal) text.setAttribute('data-terminal', '');
    text.textContent = entry.tree.symbol;
    svg.append(text);
  }
  root.replaceChildren(svg);
}

export function setupGrammarLabs() {
  document
    .querySelectorAll<HTMLElement>('[data-grammar-lab]')
    .forEach((root) => {
      if (root.dataset.ready) return;
      root.dataset.ready = 'true';
      const get = <T extends HTMLElement>(selector: string) =>
        root.querySelector<T>(selector)!;
      const presets: GrammarPreset[] = JSON.parse(root.dataset.presets!);
      const selector = get<HTMLSelectElement>('[data-preset]');
      const word = get<HTMLInputElement>('[data-word]');
      const tests = get<HTMLTextAreaElement>('[data-tests]');
      const status = get('[data-status]');
      const tree = get('[data-tree]');
      const derivation = get<HTMLDetailsElement>('[data-derivation]');
      const testStatus = get('[data-test-status]');
      const results = get('[data-test-results]');
      const clearTests = () => {
        testStatus.textContent = '';
        results.replaceChildren();
      };
      const stale = () => {
        status.textContent =
          'Gramática ou palavra alterada. Testa para atualizar o resultado.';
        tree.hidden = true;
        derivation.hidden = true;
        clearTests();
      };
      const editor = mountFormalEditor(get('[data-formal-source]'), {
        onChange: stale,
        onRun: run,
      });
      const inputWord = () => (/^(ε|ϵ)$/.test(word.value) ? '' : word.value);
      function run() {
        tree.hidden = true;
        derivation.hidden = true;
        try {
          const grammar = parseGrammar(editor.getValue());
          const result = recognize(grammar, inputWord());
          word.removeAttribute('aria-invalid');
          if (result.kind === 'limit') {
            status.textContent = result.message;
            return;
          }
          if (result.kind === 'rejected') {
            status.textContent =
              'Palavra rejeitada. Não existe uma derivação nesta gramática.';
            return;
          }
          status.textContent = 'Palavra aceite.';
          const steps = get('[data-steps]');
          const trace = leftmostDerivation(result.tree);
          steps.replaceChildren(
            ...trace.steps.map((value) => {
              const item = document.createElement('li');
              item.textContent = value;
              return item;
            }),
          );
          get('[data-partial-derivation]').hidden = trace.complete;
          derivation.hidden = false;
          try {
            renderTree(tree, result.tree);
          } catch (error) {
            tree.textContent = (error as Error).message;
          }
          tree.hidden = false;
        } catch (error) {
          status.textContent = (error as Error).message;
        }
      }
      function runTests() {
        clearTests();
        try {
          const grammar = parseGrammar(editor.getValue());
          const lines = tests.value
            .split(/\r?\n/)
            .filter((line) => line.trim());
          if (!lines.length || lines.length > 16)
            throw new Error(
              'Escreve entre 1 e 16 testes, como aabb -> aceita.',
            );
          const cases = lines.map((line, index) => {
            const match = line.match(
              /^(.*?)\s*(?:->|→)\s*(aceita|rejeita)\s*$/,
            );
            if (!match)
              throw new Error(
                `Teste ${index + 1}: escreve a palavra, -> e aceita ou rejeita.`,
              );
            const value = match[1].trim();
            return {
              word: /^(ε|ϵ)$/.test(value) ? '' : value,
              expected: match[2] === 'aceita',
            };
          });
          const table = document.createElement('table');
          table.setAttribute(
            'aria-label',
            'Resultados dos testes da gramática',
          );
          const head = table.createTHead().insertRow();
          for (const name of ['Palavra', 'Esperado', 'Obtido']) {
            const cell = document.createElement('th');
            cell.scope = 'col';
            cell.textContent = name;
            head.append(cell);
          }
          const body = table.createTBody();
          let passed = 0;
          let limited = 0;
          for (const entry of cases) {
            const outcome = recognize(grammar, entry.word);
            const accepted = outcome.kind === 'accepted';
            const pass =
              outcome.kind !== 'limit' && accepted === entry.expected;
            if (pass) passed++;
            if (outcome.kind === 'limit') limited++;
            const row = body.insertRow();
            for (const text of [
              entry.word || 'ε',
              entry.expected ? 'Aceite' : 'Rejeitada',
              outcome.kind === 'limit'
                ? 'Limite atingido'
                : `${accepted ? 'Aceite' : 'Rejeitada'}${pass ? '' : '\nFalhou'}`,
            ])
              row.insertCell().textContent = text;
          }
          results.append(table);
          testStatus.textContent = `${passed} de ${cases.length} testes passaram.${limited ? ' Os casos que atingiram o limite ficaram por verificar.' : ''}`;
        } catch (error) {
          testStatus.textContent = (error as Error).message;
        }
      }
      function loadPreset() {
        const preset = presets[Number(selector.value)];
        editor.setValue(preset.source);
        word.value = preset.word;
        tests.value = preset.tests;
        const task = get('[data-task]');
        task.textContent = preset.task || '';
        task.hidden = !preset.task;
        const solution = get<HTMLDetailsElement>('[data-solution]');
        solution.hidden = !preset.solution;
        solution.open = false;
        get('[data-solution-source]').textContent = preset.solution || '';
        const explanation = get('[data-solution-explanation]');
        explanation.textContent = preset.solutionExplanation || '';
        explanation.hidden = !preset.solutionExplanation;
        clearTests();
        run();
      }
      selector.addEventListener('change', loadPreset);
      get('[data-reset]').addEventListener('click', loadPreset);
      get('[data-run]').addEventListener('click', run);
      get('[data-test]').addEventListener('click', runTests);
      word.addEventListener('input', stale);
      word.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') run();
      });
      tests.addEventListener('input', clearTests);
      root
        .querySelectorAll<HTMLButtonElement | HTMLSelectElement>(
          'button, select',
        )
        .forEach((element) => {
          element.disabled = false;
        });
      run();
    });
}
