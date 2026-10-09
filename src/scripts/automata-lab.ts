import {
  compare,
  execute,
  limits,
  validate,
  type Model,
  type Execution,
} from '../lib/automata/machine';
import {
  blankMachine,
  presets,
  repairMachine,
  type PresetId,
} from '../lib/automata/presets';

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );
const modelNames = { dfa: 'DFA', moore: 'Moore', mealy: 'Mealy' };

function setup(root: HTMLElement) {
  if (root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  const element = <T extends HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  const input = element<HTMLInputElement>('[data-input]');
  const alphabet = element<HTMLInputElement>('[data-alphabet]');
  const select = element<HTMLSelectElement>('[data-preset-select]');
  let preset: PresetId | null = root.dataset.preset as PresetId;
  let machine = structuredClone(presets[preset].machine);
  let exercise = false;
  let position = 0;
  let execution: Execution | null = null;
  let serial = 0;
  input.value = presets[preset].input;
  const stateName = (id: string) =>
    machine.states.find((s) => s.id === id)?.name ?? id;
  const button = (action: string) =>
    element<HTMLButtonElement>(`[data-action="${action}"]`);
  const options = (selected: string) =>
    machine.states
      .map(
        (s) =>
          `<option value="${escape(s.id)}" ${s.id === selected ? 'selected' : ''}>${escape(s.name)}</option>`,
      )
      .join('');

  function diagram() {
    const states = machine.states;
    const nodeRadius = Math.max(
      31,
      ...states.map((s) =>
        Math.max(
          s.name.length * 4.5 + 9,
          machine.model === 'moore' ? s.output.length * 4.5 + 12 : 0,
        ),
      ),
    );
    const compact =
      states.length <= 3 &&
      nodeRadius <= 36 &&
      machine.alphabet.length <= 3 &&
      machine.transitions.every((t) => t.output.length <= 3);
    const radius = compact
      ? 70
      : Math.max(110, (states.length * nodeRadius) / 2);
    const center = compact
      ? 145
      : radius +
        (nodeRadius > 45 || machine.alphabet.length > 3
          ? nodeRadius + 150
          : 130);
    const size = center * 2;
    const positions = states.map((_, i) => {
      const angle =
        -Math.PI / 2 + (2 * Math.PI * i) / Math.max(states.length, 1);
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      };
    });
    const current = execution?.rows[position]?.state ?? machine.initial;
    const active = execution?.rows[position]?.transition;
    const edges = new Map<
      string,
      { from: string; to: string; labels: string[]; active: boolean }
    >();
    machine.transitions.forEach((t, index) => {
      const key = JSON.stringify([t.from, t.to]);
      const edge = edges.get(key) ?? {
        from: t.from,
        to: t.to,
        labels: [],
        active: false,
      };
      edge.labels.push(
        t.symbol + (machine.model === 'mealy' ? '/' + t.output : ''),
      );
      edge.active ||= index === active;
      edges.set(key, edge);
    });
    const paths = [...edges.values()]
      .map((edge) => {
        const a = positions[states.findIndex((s) => s.id === edge.from)];
        const b = positions[states.findIndex((s) => s.id === edge.to)];
        if (!a || !b) return '';
        let path: string;
        let lx: number;
        let ly: number;
        if (edge.from === edge.to) {
          const dx = (a.x - center) / radius || 0;
          const dy = (a.y - center) / radius || -1;
          const px = -dy,
            py = dx;
          const x1 = a.x + dx * (nodeRadius * 0.75) + px * 19,
            y1 = a.y + dy * (nodeRadius * 0.75) + py * 19;
          const x2 = a.x + dx * (nodeRadius * 0.75) - px * 19,
            y2 = a.y + dy * (nodeRadius * 0.75) - py * 19;
          path = `M ${x1} ${y1} C ${a.x + dx * (nodeRadius + (compact ? 26 : 60)) + px * (compact ? 35 : 55)} ${a.y + dy * (nodeRadius + (compact ? 26 : 60)) + py * (compact ? 35 : 55)}, ${a.x + dx * (nodeRadius + (compact ? 26 : 60)) - px * (compact ? 35 : 55)} ${a.y + dy * (nodeRadius + (compact ? 26 : 60)) - py * (compact ? 35 : 55)}, ${x2} ${y2}`;
          lx = a.x + dx * (nodeRadius + (compact ? 29 : 50));
          ly = a.y + dy * (nodeRadius + (compact ? 29 : 50));
        } else {
          const dx = b.x - a.x,
            dy = b.y - a.y,
            distance = Math.hypot(dx, dy);
          const bend = compact ? 18 : states.length <= 3 ? 45 : 24;
          const cx = (a.x + b.x) / 2 - (dy / distance) * bend;
          const cy = (a.y + b.y) / 2 + (dx / distance) * bend;
          const startLength = Math.hypot(cx - a.x, cy - a.y);
          const endLength = Math.hypot(b.x - cx, b.y - cy);
          path = `M ${a.x + ((cx - a.x) / startLength) * (nodeRadius + 1)} ${a.y + ((cy - a.y) / startLength) * (nodeRadius + 1)} Q ${cx} ${cy} ${b.x - ((b.x - cx) / endLength) * (nodeRadius + 5)} ${b.y - ((b.y - cy) / endLength) * (nodeRadius + 5)}`;
          lx = (a.x + b.x) / 2 - ((dy / distance) * bend) / 2;
          ly = (a.y + b.y) / 2 + ((dx / distance) * bend) / 2 - 6;
        }
        const labels =
          edge.labels.join(', ').length <= 18
            ? [edge.labels.join(', ')]
            : edge.labels;
        const labelMarkup = labels
          .map(
            (label, index) =>
              `<tspan x="${lx}" dy="${index ? 17 : -(labels.length - 1) * 8.5}">${escape(label)}</tspan>`,
          )
          .join('');
        return `<g class="automata-edge ${edge.active ? 'is-current' : ''}"><path d="${path}" marker-end="url(#${marker})"/><text x="${lx}" y="${ly}" text-anchor="middle">${labelMarkup}</text></g>`;
      })
      .join('');
    const nodes = states
      .map((state, i) => {
        const { x, y } = positions[i];
        return `<g data-diagram-state="${i}" tabindex="0" role="button" aria-label="Editar estado ${escape(state.name)}" class="automata-node ${state.id === current ? 'is-current' : ''}"><circle cx="${x}" cy="${y}" r="${nodeRadius}"/>${machine.model === 'dfa' && state.final ? `<circle cx="${x}" cy="${y}" r="${nodeRadius - 5}"/>` : ''}<text x="${x}" y="${y + (machine.model === 'moore' ? -3 : 5)}" text-anchor="middle">${escape(state.name)}</text>${machine.model === 'moore' ? `<text x="${x}" y="${y + 16}" text-anchor="middle">/${escape(state.output)}</text>` : ''}${state.id === machine.initial ? `<path d="M ${x - nodeRadius - 32} ${y} L ${x - nodeRadius - 5} ${y}" marker-end="url(#${marker})"/><text x="${x - nodeRadius - 32}" y="${y - 8}">início</text>` : ''}</g>`;
      })
      .join('');
    element('[data-diagram]').innerHTML =
      `<svg viewBox="0 0 ${size} ${size}" style="width:${size}px;min-width:${compact ? 0 : size}px;max-width:${compact ? '100%' : 'none'}" role="group" aria-label="Diagrama editável da máquina. Estado atual: ${escape(stateName(current))}."><defs><marker id="${marker}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z"/></marker></defs>${paths}${nodes}</svg>`;
  }
  const marker = `automata-arrow-${crypto.randomUUID()}`;

  function editor() {
    alphabet.value = machine.alphabet.join(' ');
    element('[data-editor]').innerHTML =
      `<div class="automata-table"><table><caption>Estados, ${modelNames[machine.model]}</caption><thead><tr><th>Nome</th><th>Inicial</th>${machine.model === 'dfa' ? '<th>Final</th>' : machine.model === 'moore' ? '<th>Saída</th>' : ''}<th>Remover</th></tr></thead><tbody>${machine.states.map((s, i) => `<tr><td><input data-state="${i}" data-field="name" aria-label="Nome do estado ${i + 1}" maxlength="16" value="${escape(s.name)}"/></td><td><input type="radio" name="initial-${marker}" data-state="${i}" data-field="initial" aria-label="${escape(s.name)} inicial" ${s.id === machine.initial ? 'checked' : ''}/></td>${machine.model === 'dfa' ? `<td><input type="checkbox" data-state="${i}" data-field="final" aria-label="${escape(s.name)} final" ${s.final ? 'checked' : ''}/></td>` : machine.model === 'moore' ? `<td><input data-state="${i}" data-field="output" aria-label="Saída de ${escape(s.name)}" maxlength="12" value="${escape(s.output)}"/></td>` : ''}<td><button type="button" data-action="remove-state" data-index="${i}" aria-label="Remover estado ${escape(s.name)}">Remover</button></td></tr>`).join('')}</tbody></table></div><button type="button" data-action="add-state" ${machine.states.length >= limits.states ? 'disabled' : ''}>Adicionar estado</button><div class="automata-table"><table><caption>Transições</caption><thead><tr><th>Origem</th><th>Símbolo</th><th>Destino</th>${machine.model === 'mealy' ? '<th>Saída</th>' : ''}<th>Remover</th></tr></thead><tbody>${machine.transitions.map((t, i) => `<tr><td><select data-transition="${i}" data-field="from" aria-label="Origem da transição ${i + 1}">${options(t.from)}</select></td><td><select data-transition="${i}" data-field="symbol" aria-label="Símbolo da transição ${i + 1}"><option value="" ${!machine.alphabet.includes(t.symbol) ? 'selected' : ''}>Escolher</option>${machine.alphabet.map((s) => `<option ${s === t.symbol ? 'selected' : ''} value="${escape(s)}">${escape(s)}</option>`).join('')}</select></td><td><select data-transition="${i}" data-field="to" aria-label="Destino da transição ${i + 1}">${options(t.to)}</select></td>${machine.model === 'mealy' ? `<td><input data-transition="${i}" data-field="output" aria-label="Saída da transição ${i + 1}" maxlength="12" value="${escape(t.output)}"/></td>` : ''}<td><button type="button" data-action="remove-transition" data-index="${i}" aria-label="Remover transição ${i + 1}">Remover</button></td></tr>`).join('')}</tbody></table></div><button type="button" data-action="add-transition" ${!machine.states.length || machine.transitions.length >= limits.transitions ? 'disabled' : ''}>Adicionar transição</button>`;
  }

  function renderExecution() {
    diagram();
    const rows = execution?.rows.slice(0, position + 1) ?? [];
    const complete = execution && position === execution.rows.length - 1;
    element('[data-result]').textContent = !execution
      ? 'Pronta para executar.'
      : `${complete ? (machine.model === 'dfa' ? (execution.accepted ? 'Palavra aceite.' : 'Palavra rejeitada.') : 'Entrada consumida.') : `Passo ${position} de ${execution.rows.length - 1}.`} Estado ${stateName(rows[rows.length - 1].state)}.${
          machine.model !== 'dfa'
            ? ` Saídas: ${
                rows
                  .map((r) => r.output)
                  .filter(Boolean)
                  .join(' · ') || 'nenhuma'
              }.`
            : ''
        }`;
    element('[data-trace]').innerHTML = rows.length
      ? `<table><caption>Percurso da execução</caption><thead><tr><th>Passo</th><th>Entrada</th><th>Estado</th>${machine.model !== 'dfa' ? '<th>Saída</th>' : ''}</tr></thead><tbody>${rows.map((row, i) => `<tr ${i === position ? 'aria-current="step"' : ''}><td>${i}</td><td>${i ? escape(row.symbol) : 'ε (início)'}</td><td>${escape(stateName(row.state))}</td>${machine.model !== 'dfa' ? `<td>${escape(row.output) || 'nenhuma'}</td>` : ''}</tr>`).join('')}</tbody></table>`
      : '';
    button('step').disabled = validate(machine).length > 0 || !!complete;
  }

  function refresh(edit = true) {
    execution = null;
    position = 0;
    if (edit) editor();
    const errors = validate(machine);
    element('[data-validation]').textContent = errors.length
      ? errors.slice(0, 6).join(' ') +
        (errors.length > 6 ? ` Mais ${errors.length - 6} erros.` : '')
      : 'Máquina determinista completa.';
    button('run').disabled = errors.length > 0;
    button('verify').disabled = errors.length > 0;
    button('exercise').disabled = !preset;
    button('restore').textContent = preset ? 'Repor exemplo' : 'Limpar máquina';
    element('[data-convention]').textContent =
      machine.model === 'moore'
        ? 'Moore: saída do estado inicial no passo 0 e do novo estado depois de cada flanco. n bits produzem n + 1 saídas.'
        : machine.model === 'mealy'
          ? 'Mealy: cada passo amostra um símbolo. A saída da transição usa o estado anterior e esse símbolo. n bits produzem n saídas.'
          : 'DFA: a palavra é aceite se o estado após consumir toda a entrada for final. Um círculo duplo marca um estado final.';
    element('[data-task]').hidden = !exercise;
    element('[data-task]').textContent =
      exercise && preset ? presets[preset].task : '';
    button('verify').hidden = !exercise;
    element('[data-solution]').hidden = !exercise;
    element('[data-verification]').hidden = true;
    renderExecution();
  }

  root.addEventListener('change', (event) => {
    const target = event.target;
    if (!(
      target instanceof HTMLInputElement || target instanceof HTMLSelectElement
    ))
      return;
    if (target === select) {
      preset = select.value in presets ? (select.value as PresetId) : null;
      machine = preset
        ? structuredClone(presets[preset].machine)
        : blankMachine(select.value.replace('blank-', '') as Model);
      input.value = preset ? presets[preset].input : '';
      exercise = false;
    } else if (target === alphabet)
      machine.alphabet = alphabet.value.trim().split(/\s+/u).filter(Boolean);
    else if (target.dataset.state !== undefined) {
      const state = machine.states[Number(target.dataset.state)];
      if (target.dataset.field === 'initial') machine.initial = state.id;
      else if (
        target.dataset.field === 'final' &&
        target instanceof HTMLInputElement
      )
        state.final = target.checked;
      else if (target.dataset.field === 'name') state.name = target.value;
      else if (target.dataset.field === 'output') state.output = target.value;
    } else if (target.dataset.transition !== undefined) {
      const transition = machine.transitions[Number(target.dataset.transition)];
      const field = target.dataset.field as keyof typeof transition;
      transition[field] = target.value;
    } else if (target === input) {
      refresh(false);
      return;
    } else return;
    const editingRow =
      target.dataset.state !== undefined ||
      target.dataset.transition !== undefined;
    refresh(!editingRow);
    if (editingRow) {
      root
        .querySelectorAll<HTMLOptionElement>('[data-transition] option')
        .forEach((option) => {
          const state = machine.states.find((s) => s.id === option.value);
          if (state) option.textContent = state.name;
        });
      machine.states.forEach((state, index) => {
        for (const field of ['initial', 'final', 'output']) {
          const control = root.querySelector<HTMLElement>(
            `[data-state="${index}"][data-field="${field}"]`,
          );
          control?.setAttribute(
            'aria-label',
            field === 'output'
              ? `Saída de ${state.name}`
              : `${state.name} ${field === 'initial' ? 'inicial' : 'final'}`,
          );
        }
      });
    }
  });
  input.addEventListener('input', () => refresh(false));

  function openState(target: Element) {
    const node = target.closest<SVGElement>('[data-diagram-state]');
    if (!node) return false;
    element<HTMLDetailsElement>('.automata-editor').open = true;
    root
      .querySelector<HTMLInputElement>(
        `[data-state="${node.dataset.diagramState}"][data-field="name"]`,
      )
      ?.focus();
    return true;
  }
  root.addEventListener('keydown', (event) => {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      event.target instanceof Element &&
      event.target.matches('[data-diagram-state]')
    ) {
      event.preventDefault();
      openState(event.target);
    }
  });
  root.addEventListener('click', (event) => {
    if (event.target instanceof Element && openState(event.target)) return;
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('button[data-action]')
        : null;
    if (!target || target.disabled) return;
    const action = target.dataset.action;
    if (action === 'run' || action === 'step') {
      try {
        execution ??= execute(machine, input.value);
        position =
          action === 'run'
            ? execution.rows.length - 1
            : Math.min(position + 1, execution.rows.length - 1);
        renderExecution();
      } catch (error) {
        element('[data-result]').textContent =
          error instanceof Error ? error.message : 'Não foi possível executar.';
      }
      return;
    }
    if (action === 'verify' && preset) {
      const message = element('[data-verification]');
      message.hidden = false;
      try {
        const reference = presets[preset].machine;
        const passed = presets[preset].cases.filter((word) => {
          const a = execute(machine, word),
            b = execute(reference, word);
          return (
            a.accepted === b.accepted &&
            JSON.stringify(a.outputs) === JSON.stringify(b.outputs)
          );
        }).length;
        const result = compare(machine, reference);
        message.textContent = `${passed} de ${presets[preset].cases.length} exemplos passaram. ${result.equivalent ? `Equivalência confirmada para todas as entradas, por exploração dos ${result.pairs} pares alcançáveis.` : `A máquina difere da referência na entrada ${result.witness || 'ε'}. Executa essa entrada para observar a diferença.`}`;
      } catch (error) {
        message.textContent =
          error instanceof Error
            ? error.message
            : 'Não foi possível verificar.';
      }
      return;
    }
    if (action === 'reset') {
      refresh(false);
      return;
    }
    if (action === 'restore') {
      machine = preset
        ? structuredClone(presets[preset].machine)
        : blankMachine(machine.model);
      exercise = false;
    }
    if (action === 'exercise' && preset) {
      machine = repairMachine(preset);
      exercise = true;
    }
    if (action === 'add-state' && machine.states.length < limits.states) {
      let id: string;
      do {
        id = `q${++serial}`;
      } while (machine.states.some((s) => s.id === id || s.name === id));
      machine.states.push({ id, name: id, final: false, output: '0' });
      if (machine.states.length === 1) machine.initial = id;
    }
    if (action === 'remove-state') {
      const state = machine.states.splice(Number(target.dataset.index), 1)[0];
      machine.transitions = machine.transitions.filter(
        (t) => t.from !== state.id && t.to !== state.id,
      );
    }
    if (
      action === 'add-transition' &&
      machine.transitions.length < limits.transitions &&
      machine.states.length
    ) {
      const missing = machine.states
        .flatMap((s) =>
          machine.alphabet.map((symbol) => ({ from: s.id, symbol })),
        )
        .find(
          (pair) =>
            !machine.transitions.some(
              (t) => t.from === pair.from && t.symbol === pair.symbol,
            ),
        );
      machine.transitions.push({
        from: missing?.from ?? machine.states[0].id,
        symbol: missing?.symbol ?? machine.alphabet[0] ?? '',
        to: machine.states[0].id,
        output: '0',
      });
    }
    if (action === 'remove-transition')
      machine.transitions.splice(Number(target.dataset.index), 1);
    refresh();
    if (action === 'add-state' || action === 'add-transition')
      button(action).focus();
  });
  element('[data-lab-ui]').hidden = false;
  refresh();
}
function initialize() {
  document.querySelectorAll<HTMLElement>('[data-automata-lab]').forEach(setup);
}
initialize();
document.addEventListener('astro:page-load', initialize);
