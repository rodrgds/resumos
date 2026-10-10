import {
  compare,
  isAcceptor,
  isNondeterministic,
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

import {
  escape,
  modelNames,
  machineConvention,
  renderAutomataDiagram,
} from '../lib/automata/view';

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
  const stateSet = (ids: string[]) =>
    ids.length ? `{${ids.map(stateName).join(', ')}}` : '∅';
  const transitionSymbols = () =>
    machine.model === 'epsilon-nfa'
      ? [...machine.alphabet, 'ε']
      : machine.alphabet;
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
    element('[data-diagram]').innerHTML = renderAutomataDiagram(
      machine,
      marker,
      execution?.rows[position],
    );
  }

  const marker = `automata-arrow-${crypto.randomUUID()}`;

  function editor() {
    alphabet.value = machine.alphabet.join(' ');
    element('[data-editor]').innerHTML =
      `<div class="automata-table"><table><caption>Estados, ${modelNames[machine.model]}</caption><thead><tr><th>Nome</th><th>Inicial</th>${isAcceptor(machine.model) ? '<th>Final</th>' : machine.model === 'moore' ? '<th>Saída</th>' : ''}<th>Remover</th></tr></thead><tbody>${machine.states.map((s, i) => `<tr><td><input data-state="${i}" data-field="name" aria-label="Nome do estado ${i + 1}" maxlength="16" value="${escape(s.name)}"/></td><td><input type="radio" name="initial-${marker}" data-state="${i}" data-field="initial" aria-label="${escape(s.name)} inicial" ${s.id === machine.initial ? 'checked' : ''}/></td>${isAcceptor(machine.model) ? `<td><input type="checkbox" data-state="${i}" data-field="final" aria-label="${escape(s.name)} final" ${s.final ? 'checked' : ''}/></td>` : machine.model === 'moore' ? `<td><input data-state="${i}" data-field="output" aria-label="Saída de ${escape(s.name)}" maxlength="12" value="${escape(s.output)}"/></td>` : ''}<td><button type="button" data-action="remove-state" data-index="${i}" aria-label="Remover estado ${escape(s.name)}">Remover</button></td></tr>`).join('')}</tbody></table></div><button type="button" data-action="add-state" ${machine.states.length >= limits.states ? 'disabled' : ''}>Adicionar estado</button><div class="automata-table"><table><caption>Transições</caption><thead><tr><th>Origem</th><th>Símbolo</th><th>Destino</th>${machine.model === 'mealy' ? '<th>Saída</th>' : ''}<th>Remover</th></tr></thead><tbody>${machine.transitions
        .map(
          (t, i) =>
            `<tr><td><select data-transition="${i}" data-field="from" aria-label="Origem da transição ${i + 1}">${options(t.from)}</select></td><td><select data-transition="${i}" data-field="symbol" aria-label="Símbolo da transição ${i + 1}"><option value="" ${!transitionSymbols().includes(t.symbol) ? 'selected' : ''}>Escolher</option>${transitionSymbols()
              .map(
                (s) =>
                  `<option ${s === t.symbol ? 'selected' : ''} value="${escape(s)}">${escape(s)}</option>`,
              )
              .join(
                '',
              )}</select></td><td><select data-transition="${i}" data-field="to" aria-label="Destino da transição ${i + 1}">${options(t.to)}</select></td>${machine.model === 'mealy' ? `<td><input data-transition="${i}" data-field="output" aria-label="Saída da transição ${i + 1}" maxlength="12" value="${escape(t.output)}"/></td>` : ''}<td><button type="button" data-action="remove-transition" data-index="${i}" aria-label="Remover transição ${i + 1}">Remover</button></td></tr>`,
        )
        .join(
          '',
        )}</tbody></table></div><button type="button" data-action="add-transition" ${!machine.states.length || machine.transitions.length >= limits.transitions ? 'disabled' : ''}>Adicionar transição</button>`;
  }

  function renderExecution() {
    diagram();
    const rows = execution?.rows.slice(0, position + 1) ?? [];
    const complete = execution && position === execution.rows.length - 1;
    const nondeterministic = isNondeterministic(machine.model);
    const epsilon = machine.model === 'epsilon-nfa';
    element('[data-result]').textContent = !execution
      ? 'Pronta para executar.'
      : `${complete ? (isAcceptor(machine.model) ? (execution.accepted ? 'Palavra aceite.' : 'Palavra rejeitada.') : 'Entrada consumida.') : `Passo ${position} de ${execution.rows.length - 1}.`} ${nondeterministic ? `Estados ativos ${stateSet(rows[rows.length - 1].states!)}.` : `Estado ${stateName(rows[rows.length - 1].state)}.`}${
          !isAcceptor(machine.model)
            ? ` Saídas: ${
                rows
                  .map((r) => r.output)
                  .filter(Boolean)
                  .join(' · ') || 'nenhuma'
              }.`
            : ''
        }`;
    element('[data-trace]').innerHTML = rows.length
      ? `<table><caption>${nondeterministic ? 'Conjuntos após cada símbolo consumido' : 'Percurso da execução'}</caption><thead><tr><th>Passo</th><th>Entrada</th>${epsilon ? '<th>Destinos diretos</th>' : ''}<th>${epsilon ? 'Fecho-ε, estados ativos' : nondeterministic ? 'Estados ativos' : 'Estado'}</th>${!isAcceptor(machine.model) ? '<th>Saída</th>' : ''}</tr></thead><tbody>${rows.map((row, i) => `<tr ${i === position ? 'aria-current="step"' : ''}><td>${i}</td><td>${i ? escape(row.symbol) : 'ε (início)'}</td>${epsilon ? `<td>${escape(stateSet(row.destinations!))}</td>` : ''}<td>${escape(nondeterministic ? stateSet(row.states!) : stateName(row.state))}</td>${!isAcceptor(machine.model) ? `<td>${escape(row.output) || 'nenhuma'}</td>` : ''}</tr>`).join('')}</tbody></table>`
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
      : '';
    element('[data-validation]').hidden = !errors.length;
    button('run').disabled = errors.length > 0;
    button('verify').disabled = errors.length > 0;
    button('exercise').disabled = !preset;
    const restoreLabel = preset ? 'Repor exemplo' : 'Limpar máquina';
    button('restore').setAttribute('aria-label', restoreLabel);
    button('restore').title = restoreLabel;
    element('[data-convention]').textContent = machineConvention(machine.model);
    element('[data-task]').hidden = !exercise;
    element('[data-task]').textContent =
      exercise && preset ? presets[preset].task : '';
    button('verify').hidden = !exercise;
    button('start-exercise').hidden = !exercise;
    element('[data-solution]').hidden = !exercise;
    element('[data-verification]').hidden = true;
    renderExecution();
    if (!errors.length && isNondeterministic(machine.model)) {
      execution = execute(machine, '');
      diagram();
      element('[data-result]').textContent =
        `Pronta para executar. Estados iniciais ativos ${stateSet(execution.rows[0].states!)}.`;
      execution = null;
    }
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
    if (action === 'start-exercise' && preset) {
      machine = blankMachine(presets[preset].machine.model);
      machine.alphabet = [...presets[preset].machine.alphabet];
      element<HTMLDetailsElement>('.automata-editor').open = true;
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
  refresh();
  element('[data-lab-ui]').inert = false;
}
function initialize() {
  document.querySelectorAll<HTMLElement>('[data-automata-lab]').forEach(setup);
}
initialize();
document.addEventListener('astro:page-load', initialize);
