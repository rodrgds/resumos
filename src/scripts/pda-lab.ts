import { mountFormalEditor } from '../lib/formal-editor';
import {
  parsePda,
  PdaSearch,
  type Acceptance,
  type Configuration,
  type PdaMachine,
  type PdaSnapshot,
} from '../lib/pda/machine';
import { pdaPresets, blankPda, type PdaPresetId } from '../lib/pda/presets';

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );
function renderGraph(
  root: HTMLElement,
  machine: PdaMachine,
  current?: Configuration,
) {
  const groups = new Map<
    string,
    { from: string; to: string; labels: string[]; active: boolean }
  >();
  machine.transitions.forEach((edge, index) => {
    const key = JSON.stringify([edge.from, edge.to]);
    const group = groups.get(key) ?? {
      from: edge.from,
      to: edge.to,
      labels: [],
      active: false,
    };
    group.labels.push(`${edge.input || 'ε'},${edge.pop}/${edge.push || 'ε'}`);
    group.active ||= current?.transition === index;
    groups.set(key, group);
  });
  const loopLines = Math.max(
    1,
    ...[...groups.values()]
      .filter((e) => e.from === e.to)
      .map((e) => e.labels.length),
  );
  const radius = Math.max(
    30,
    ...machine.states.map((state) => state.length * 4 + 8),
  );
  const spacing = Math.max(160, radius * 2 + 80);
  const y = radius + 50 + loopLines * 17,
    width = Math.max(220, machine.states.length * spacing + 20),
    height =
      y +
      Math.max(
        160,
        ...[...groups.values()].map(
          (edge) => edge.labels.length * 17 + 30 * machine.states.length,
        ),
      );
  const marker = `pda-arrow-${crypto.randomUUID()}`;
  const x = (state: string) =>
    radius + 60 + machine.states.indexOf(state) * spacing;
  const edges = [...groups.values()]
    .map((edge) => {
      const a = x(edge.from),
        b = x(edge.to),
        loop = edge.from === edge.to;
      const bend =
        50 *
        Math.abs(
          machine.states.indexOf(edge.to) - machine.states.indexOf(edge.from),
        );
      const path = loop
        ? `M ${a - radius * 0.6} ${y - radius * 0.8} C ${a - radius - 40} ${y - radius - 60}, ${a + radius + 40} ${y - radius - 60}, ${a + radius * 0.6} ${y - radius * 0.8}`
        : `M ${a + (b > a ? radius + 1 : -radius - 1)} ${y} Q ${(a + b) / 2} ${y + bend} ${b + (b > a ? -radius - 6 : radius + 6)} ${y}`;
      const labelX = loop ? a : (a + b) / 2,
        labelY = loop ? 22 : y + bend / 2 + 18;
      return `<g class="${edge.active ? 'is-active' : ''}"><path d="${path}" marker-end="url(#${marker})"/><text x="${labelX}" y="${labelY}" text-anchor="middle">${edge.labels.map((label, index) => `<tspan x="${labelX}" dy="${index ? 17 : 0}">${escape(label)}</tspan>`).join('')}</text></g>`;
    })
    .join('');
  const nodes = machine.states
    .map((state) => {
      const center = x(state),
        final =
          machine.finals.includes(state) && machine.acceptance === 'final';
      return `<g data-pda-state="${escape(state)}" role="button" tabindex="0" aria-label="Editar estado ${escape(state)}" class="pda-node ${state === (current?.state ?? machine.initial) ? 'is-active' : ''}"><circle cx="${center}" cy="${y}" r="${radius}"/>${final ? `<circle cx="${center}" cy="${y}" r="${radius - 5}"/>` : ''}<text x="${center}" y="${y + 5}" text-anchor="middle">${escape(state)}</text>${state === machine.initial ? `<path d="M ${center - radius - 35} ${y} L ${center - radius - 5} ${y}" marker-end="url(#${marker})"/><text x="${center - radius - 40}" y="${y - 10}">início</text>` : ''}</g>`;
    })
    .join('');
  root.innerHTML = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="group" aria-label="Diagrama do PDA. Entrada, topo e substituição identificam cada transição."><defs><marker id="${marker}" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z"/></marker></defs>${edges}${nodes}</svg>`;
}

function setup(root: HTMLElement) {
  if (root.dataset.ready) return;
  root.dataset.ready = 'true';
  const get = <T extends HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  const select = get<HTMLSelectElement>('[data-preset]'),
    word = get<HTMLInputElement>('[data-word]'),
    criterion = get<HTMLSelectElement>('[data-acceptance]'),
    branch = get<HTMLSelectElement>('[data-branch]');
  let preset: PdaPresetId | null = root.dataset.preset as PdaPresetId;
  let search: PdaSearch | null = null,
    machine: PdaMachine | null = null,
    shownWord = '';
  const status = get('[data-status]');
  const button = (action: string) =>
    get<HTMLButtonElement>(`[data-action="${action}"]`);
  function stale() {
    search = null;
    machine = null;
    try {
      renderGraph(
        get('[data-diagram]'),
        parsePda(editor.getValue(), criterion.value as Acceptance),
      );
    } catch {
      get('[data-diagram]').replaceChildren();
    }
    status.textContent =
      'Máquina ou entrada alterada. Executa para atualizar as configurações.';
    get('[data-frontier]').hidden = true;
    get('[data-current]').hidden = true;
    get('[data-trace]').replaceChildren();
    get('[data-trace-label]').hidden = true;
    get('[data-tests]').replaceChildren();
    get('[data-tests-status]').textContent = '';
    button('step').disabled = false;
  }
  const editor = mountFormalEditor(get('[data-formal-source]'), {
    onChange: stale,
    onRun: () => run(false),
  });
  const remaining = (row: Configuration) =>
    Array.from(shownWord).slice(row.position).join('') || 'ε';
  function renderTrace(trace: Configuration[], label: string) {
    get('[data-trace-label]').hidden = false;
    get('[data-trace-label]').textContent = label;
    get('[data-trace]').innerHTML =
      `<table><thead><tr><th>Passo</th><th>Transição</th><th>Estado</th><th>Por ler</th><th>Pilha, topo à esquerda</th></tr></thead><tbody>${trace
        .map((row, index) => {
          const transition =
            row.transition === null
              ? null
              : machine!.transitions[row.transition];
          const notation = transition
            ? `${transition.input || 'ε'},${transition.pop}/${transition.push || 'ε'}`
            : 'início';
          return `<tr><td>${index}</td><td>${escape(notation)}</td><td>${escape(row.state)}</td><td>${escape(remaining(row))}</td><td>${escape(row.stack) || 'ε'}</td></tr>`;
        })
        .join('')}</tbody></table>`;
    const current = trace[trace.length - 1];
    renderGraph(get('[data-diagram]'), machine!, current);
    get('[data-current]').hidden = false;
    get('[data-current-description]').textContent =
      `Estado ${current.state}. Por ler: ${remaining(current)}. ${current.stack ? 'Primeiro símbolo: topo.' : 'Pilha vazia.'}`;
    const stack = Array.from(current.stack);
    get('[data-stack]').innerHTML = stack.length
      ? stack
          .slice(0, 24)
          .map((symbol) => `<span>${escape(symbol)}</span>`)
          .join('') +
        (stack.length > 24
          ? `<p>Mais ${stack.length - 24} símbolos à direita, visíveis na tabela.</p>`
          : '')
      : '<p>ε</p>';
  }
  function render(snapshot: PdaSnapshot) {
    const total = `${snapshot.examined} ${snapshot.examined === 1 ? 'configuração explorada' : 'configurações exploradas'}, profundidade ${snapshot.depth}.`;
    status.textContent =
      snapshot.kind === 'accepted'
        ? `Palavra aceite. Existe um percurso com entrada consumida e ${machine!.acceptance === 'final' ? 'estado final' : 'pilha vazia'}. ${total}`
        : snapshot.kind === 'rejected'
          ? `Palavra rejeitada. Pesquisa esgotada sem configuração aceitante. ${total}`
          : snapshot.kind === 'undecided'
            ? `Resultado por decidir. A pesquisa atingiu um limite; isto não significa rejeição. ${total}`
            : `Pesquisa em curso. ${total}${snapshot.limited ? ' Já há ramos fora dos limites; ainda se procuram ramos aceitantes.' : ''}`;
    button('step').disabled = snapshot.kind !== 'running';
    get('[data-frontier]').hidden =
      snapshot.kind !== 'running' || !snapshot.frontier.length;
    const visible = snapshot.frontier.slice(0, 40);
    branch.innerHTML = visible
      .map(
        (row) =>
          `<option value="${row.id}">(${escape(row.state)}, ${escape(remaining(row))}, ${escape(row.stack) || 'ε'})</option>`,
      )
      .join('');
    get('[data-frontier-summary]').textContent =
      `${snapshot.frontier.length} configurações nesta fronteira.${snapshot.frontier.length > 40 ? ' O seletor mostra as primeiras 40; a pesquisa conserva todas.' : ''}`;
    renderTrace(
      snapshot.trace,
      snapshot.kind === 'accepted'
        ? 'Percurso aceitante'
        : snapshot.kind === 'running'
          ? 'Um ramo da fronteira'
          : 'Último ramo explorado, sem aceitação',
    );
  }
  function run(step: boolean) {
    try {
      if (!search) {
        machine = parsePda(editor.getValue(), criterion.value as Acceptance);
        shownWord = word.value;
        search = new PdaSearch(machine, shownWord);
      }
      render(step ? search.step() : search.run());
    } catch (error) {
      search = null;
      get('[data-trace]').replaceChildren();
      get('[data-trace-label]').hidden = true;
      get('[data-current]').hidden = true;
      get('[data-frontier]').hidden = true;
      status.textContent =
        error instanceof Error ? error.message : 'Não foi possível executar.';
    }
  }
  branch.addEventListener('change', () => {
    if (search)
      renderTrace(search.trace(Number(branch.value)), 'Um ramo da fronteira');
  });
  word.addEventListener('input', stale);
  criterion.addEventListener('change', stale);
  select.addEventListener('change', () => {
    preset = select.value in pdaPresets ? (select.value as PdaPresetId) : null;
    const data = preset ? pdaPresets[preset] : null;
    editor.setValue(data?.source ?? blankPda);
    word.value = data?.word ?? '';
    criterion.value = data?.acceptance ?? 'final';
    button('verify').disabled = !preset;
    stale();
    if (!preset) {
      get<HTMLDetailsElement>('[data-editor-details]').open = true;
      editor.focus();
    }
  });
  const openEditor = () => {
    get<HTMLDetailsElement>('[data-editor-details]').open = true;
    editor.focus();
  };
  get('[data-diagram]').addEventListener('keydown', (event) => {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      event.target instanceof Element &&
      event.target.matches('[data-pda-state]')
    ) {
      event.preventDefault();
      openEditor();
    }
  });
  root.addEventListener('click', (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest('[data-pda-state]')
    ) {
      openEditor();
      return;
    }
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('button[data-action]')
        : null;
    if (!target || target.disabled) return;
    if (target.dataset.action === 'run') run(false);
    if (target.dataset.action === 'step') run(true);
    if (target.dataset.action === 'reset') {
      stale();
      try {
        machine = parsePda(editor.getValue(), criterion.value as Acceptance);
        shownWord = word.value;
        search = new PdaSearch(machine, shownWord);
        render(search.snapshot());
      } catch (error) {
        status.textContent = (error as Error).message;
      }
    }
    if (target.dataset.action === 'restore') {
      const data = preset ? pdaPresets[preset] : null;
      editor.setValue(data?.source ?? blankPda);
      word.value = data?.word ?? '';
      criterion.value = data?.acceptance ?? 'final';
      stale();
    }
    if (target.dataset.action === 'verify' && preset) {
      try {
        const candidate = parsePda(
          editor.getValue(),
          criterion.value as Acceptance,
        );
        let passed = 0,
          undecided = 0;
        const rows = pdaPresets[preset].cases.map(
          ({ word: example, accepted }) => {
            const result = new PdaSearch(candidate, example).run();
            const match = result.kind === (accepted ? 'accepted' : 'rejected');
            if (match) passed++;
            if (result.kind === 'undecided') undecided++;
            return `<tr><td>${escape(example) || 'ε'}</td><td>${accepted ? 'Aceita' : 'Rejeita'}</td><td>${result.kind === 'accepted' ? 'Aceita' : result.kind === 'rejected' ? 'Rejeita' : 'Por decidir'}</td><td>${match ? 'Correto' : result.kind === 'undecided' ? 'Não decidido' : 'Difere'}</td></tr>`;
          },
        );
        get('[data-tests-status]').textContent =
          `${passed} de ${rows.length} exemplos passaram.${undecided ? ` ${undecided} ficaram por decidir.` : ''} Estes casos finitos não provam equivalência de linguagens.`;
        get('[data-tests]').innerHTML =
          `<table><thead><tr><th>Entrada</th><th>Esperado</th><th>Obtido</th><th>Resultado</th></tr></thead><tbody>${rows.join('')}</tbody></table>`;
      } catch (error) {
        get('[data-tests-status]').textContent = (error as Error).message;
      }
    }
  });
  root
    .querySelectorAll<HTMLButtonElement | HTMLSelectElement>(
      'button[disabled],select[disabled]',
    )
    .forEach((control) => {
      control.disabled = false;
    });
  machine = parsePda(editor.getValue(), criterion.value as Acceptance);
  shownWord = word.value;
  search = new PdaSearch(machine, shownWord);
  render(search.run());
}
function initialize() {
  document.querySelectorAll<HTMLElement>('[data-pda-lab]').forEach(setup);
}
initialize();
document.addEventListener('astro:page-load', initialize);
