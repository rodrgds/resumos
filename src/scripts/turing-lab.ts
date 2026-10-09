import {
  limits,
  start,
  step,
  validate,
  type Configuration,
} from '../lib/turing/machine';
import { presets } from '../lib/turing/presets';
const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );
function setup(root: HTMLElement) {
  if (root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  const el = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const input = el<HTMLInputElement>('[data-input]');
  const preset = el<HTMLSelectElement>('[data-preset]');
  let machine = structuredClone(presets.blocks.machine);
  let current: Configuration | null = null;
  let serial = 0;
  input.value = presets.blocks.input;
  const button = (action: string) =>
    el<HTMLButtonElement>(`[data-action="${action}"]`);
  const tapeWindow = el('[data-tape]');
  const centerTape = () => {
    tapeWindow.scrollLeft =
      (tapeWindow.scrollWidth - tapeWindow.clientWidth) / 2;
  };
  const options = (items: string[], selected: string) =>
    (items.includes(selected)
      ? ''
      : `<option value="${escape(selected)}" selected>${escape(selected) || 'Escolher'} (inválido)</option>`) +
    items
      .map(
        (s) =>
          `<option value="${escape(s)}" ${s === selected ? 'selected' : ''}>${escape(s)}</option>`,
      )
      .join('');
  const radioName = `turing-initial-${crypto.randomUUID()}`;
  function editor() {
    el<HTMLInputElement>('[data-input-alphabet]').value =
      machine.inputAlphabet.join(' ');
    el<HTMLInputElement>('[data-tape-alphabet]').value =
      machine.tapeAlphabet.join(' ');
    el('[data-editor]').innerHTML =
      `<div class="turing-table" tabindex="0" role="region" aria-label="Estados, deslocação horizontal"><table><caption>Estados</caption><thead><tr><th>Nome</th><th>Inicial</th><th>Final</th><th>Remover</th></tr></thead><tbody>${machine.states.map((s, i) => `<tr><td><input data-state="${i}" data-field="name" value="${escape(s)}" maxlength="16" aria-label="Nome do estado ${i + 1}"/></td><td><input type="radio" name="${radioName}" data-state="${i}" data-field="initial" ${s === machine.initial ? 'checked' : ''} aria-label="${escape(s)} inicial"/></td><td><input type="checkbox" data-state="${i}" data-field="final" ${machine.finals.includes(s) ? 'checked' : ''} aria-label="${escape(s)} final"/></td><td><button type="button" data-action="remove-state" data-index="${i}" aria-label="Remover estado ${escape(s)}">Remover</button></td></tr>`).join('')}</tbody></table></div><button type="button" data-action="add-state" ${machine.states.length >= limits.states ? 'disabled' : ''}>Adicionar estado</button><div class="turing-table" tabindex="0" role="region" aria-label="Transições, deslocação horizontal"><table><caption>Transições, lê / escreve / move</caption><thead><tr><th>Origem</th><th>Lê</th><th>Destino</th><th>Escreve</th><th>Move</th><th>Remover</th></tr></thead><tbody>${machine.transitions.map((t, i) => `<tr>${(['from', 'read', 'to', 'write', 'move'] as const).map((field) => `<td><select data-transition="${i}" data-field="${field}" aria-label="${{ from: 'Origem', read: 'Lê', to: 'Destino', write: 'Escreve', move: 'Move' }[field]} da transição ${i + 1}">${options(field === 'from' || field === 'to' ? machine.states : field === 'move' ? ['L', 'R'] : machine.tapeAlphabet, t[field])}</select></td>`).join('')}<td><button type="button" data-action="remove-transition" data-index="${i}" aria-label="Remover transição ${i + 1}">Remover</button></td></tr>`).join('')}</tbody></table></div><button type="button" data-action="add-transition" ${machine.transitions.length >= limits.transitions || !machine.states.length ? 'disabled' : ''}>Adicionar transição</button>`;
  }
  function render() {
    const head = current?.head ?? 0;
    const tape =
      current?.tape ?? new Map([...input.value].map((s, i) => [i, s]));
    el('[data-tape]').innerHTML = Array.from({ length: 9 }, (_, i) => {
      const p = head + i - 4;
      return `<div class="turing-cell" ${p === head ? `aria-current="true" aria-label="Cabeça na célula ${p}"` : ''}><small>${p}</small><strong>${escape(tape.get(p) ?? 'B')}</strong></div>`;
    }).join('');
    centerTape();
    el('[data-configuration]').textContent =
      `Estado ${current?.state ?? machine.initial}. Cabeça na posição ${head}. Passos: ${current?.steps ?? 0}.`;
    const state = current?.state ?? machine.initial;
    const read = tape.get(head) ?? 'B';
    const ruleIndex = machine.transitions.findIndex(
      (t) => t.from === state && t.read === read,
    );
    const rule = machine.transitions[ruleIndex];
    el('[data-rule]').textContent = machine.finals.includes(state)
      ? 'Estado final, sem saídas.'
      : rule
        ? `Próxima transição: δ(${state}, ${read}) = (${rule.to}, ${rule.write}, ${rule.move}).`
        : `Sem transição para (${state}, ${read}).`;
    root
      .querySelectorAll<HTMLElement>('[data-transition]')
      .forEach((control) => {
        control
          .closest('tr')
          ?.classList.toggle(
            'is-current',
            Number(control.dataset.transition) === ruleIndex &&
              !machine.finals.includes(state),
          );
      });
    const labels = {
      running: 'Em execução.',
      accepted: 'Palavra aceite.',
      rejected: 'Palavra rejeitada.',
      inconclusive: 'Resultado inconclusivo.',
    };
    el('[data-result]').textContent = current
      ? `${labels[current.status]} ${current.reason}`
      : 'Pronta para executar.';
    const errors = validate(machine);
    el('[data-errors]').textContent = errors.join(' ');
    el('[data-errors]').hidden = !errors.length;
    button('step').disabled =
      !!errors.length || (!!current && current.status !== 'running');
    button('run').disabled = !!errors.length;
  }
  function refresh(edit = true) {
    current = null;
    if (edit) editor();
    render();
  }
  root.addEventListener('change', (event) => {
    const target = event.target;
    if (!(
      target instanceof HTMLInputElement || target instanceof HTMLSelectElement
    ))
      return;
    if (target === preset) {
      machine = structuredClone(presets[preset.value].machine);
      input.value = presets[preset.value].input;
    } else if (target.matches('[data-input-alphabet]'))
      machine.inputAlphabet = target.value.trim().split(/\s+/u).filter(Boolean);
    else if (target.matches('[data-tape-alphabet]'))
      machine.tapeAlphabet = target.value.trim().split(/\s+/u).filter(Boolean);
    else if (target.dataset.state !== undefined) {
      const i = Number(target.dataset.state),
        old = machine.states[i];
      if (target.dataset.field === 'initial') machine.initial = old;
      else if (
        target.dataset.field === 'final' &&
        target instanceof HTMLInputElement
      )
        machine.finals = target.checked
          ? [...machine.finals, old]
          : machine.finals.filter((s) => s !== old);
      else if (target.dataset.field === 'name') {
        machine.states[i] = target.value;
        machine.initial =
          machine.initial === old ? target.value : machine.initial;
        machine.finals = machine.finals.map((s) =>
          s === old ? target.value : s,
        );
        machine.transitions.forEach((t) => {
          if (t.from === old) t.from = target.value;
          if (t.to === old) t.to = target.value;
        });
      }
    } else if (target.dataset.transition !== undefined) {
      const t = machine.transitions[Number(target.dataset.transition)];
      const field = target.dataset.field;
      if (field === 'move') t.move = target.value as 'L' | 'R';
      else if (
        field === 'from' ||
        field === 'read' ||
        field === 'to' ||
        field === 'write'
      )
        t[field] = target.value;
    }
    refresh(target !== input);
  });
  input.addEventListener('input', () => refresh(false));
  root.addEventListener('click', (event) => {
    const target = (event.target as Element).closest<HTMLButtonElement>(
      '[data-action]',
    );
    if (!target) return;
    const action = target.dataset.action;
    if (action === 'step' || action === 'run') {
      try {
        if (action === 'run' || !current) current = start(machine, input.value);
        if (action === 'step') current = step(machine, current!);
        else
          while (current!.status === 'running')
            current = step(machine, current!);
        render();
      } catch (error) {
        el('[data-result]').textContent = (error as Error).message;
      }
      return;
    }
    if (action === 'restore') {
      machine = structuredClone(presets[preset.value].machine);
      input.value = presets[preset.value].input;
    }
    if (action === 'add-state') {
      let name: string;
      do {
        name = `q${++serial}`;
      } while (machine.states.includes(name));
      machine.states.push(name);
    }
    if (action === 'remove-state') {
      const name = machine.states.splice(Number(target.dataset.index), 1)[0];
      machine.finals = machine.finals.filter((s) => s !== name);
      machine.transitions = machine.transitions.filter(
        (t) => t.from !== name && t.to !== name,
      );
      if (machine.initial === name) machine.initial = machine.states[0] ?? '';
    }
    if (action === 'add-transition')
      machine.transitions.push({
        from: machine.states[0],
        read: machine.tapeAlphabet[0] ?? '',
        to: machine.states[0],
        write: machine.tapeAlphabet[0] ?? '',
        move: 'R',
      });
    if (action === 'remove-transition')
      machine.transitions.splice(Number(target.dataset.index), 1);
    refresh(action !== 'reset');
  });
  el('[data-lab-ui]').hidden = false;
  refresh();
  new ResizeObserver(centerTape).observe(tapeWindow);
}
const init = () =>
  document.querySelectorAll<HTMLElement>('[data-turing-lab]').forEach(setup);
init();
document.addEventListener('astro:page-load', init);
