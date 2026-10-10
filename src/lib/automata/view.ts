import {
  isAcceptor,
  isNondeterministic,
  type Machine,
  type Model,
  type TraceRow,
} from './machine';

export const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );
export const modelNames = {
  dfa: 'DFA',
  moore: 'Moore',
  mealy: 'Mealy',
  nfa: 'NFA',
  'epsilon-nfa': 'ε-NFA',
};

export function machineConvention(model: Model) {
  return model === 'moore'
    ? 'Moore: saída inicial e uma saída após cada flanco, n + 1 saídas para n bits.'
    : model === 'mealy'
      ? 'Mealy: uma saída por bit, calculada com o estado anterior ao flanco e esse bit.'
      : isNondeterministic(model)
        ? `${modelNames[model]}: segue todos os estados ativos. Aceita se, depois de consumir toda a palavra, algum for final (círculo duplo).${model === 'epsilon-nfa' ? ' ε não consome entrada; calcula-se o fecho no início e após cada símbolo.' : ' Uma transição em falta elimina apenas esse ramo.'}`
        : 'DFA: aceita se terminar num estado final, marcado com círculo duplo.';
}

export function renderAutomataDiagram(
  machine: Machine,
  marker: string,
  row?: TraceRow,
) {
  const stateName = (id: string) =>
    machine.states.find((s) => s.id === id)?.name ?? id;
  const stateSet = (ids: string[]) =>
    ids.length ? `{${ids.map(stateName).join(', ')}}` : '∅';
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
  const radius = compact ? 70 : Math.max(110, (states.length * nodeRadius) / 2);
  const center = compact
    ? 145
    : radius +
      (nodeRadius > 45 || machine.alphabet.length > 3 ? nodeRadius + 150 : 130);
  const size = center * 2;
  const positions = states.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(states.length, 1);
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });
  const current = row?.states ?? [row?.state ?? machine.initial];
  const active =
    row?.transitions ??
    (row?.transition === null || row?.transition === undefined
      ? []
      : [row.transition]);
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
    edge.active ||= active.includes(index);
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
      return `<g data-diagram-state="${i}" tabindex="0" role="button" aria-label="Editar estado ${escape(state.name)}" class="automata-node ${current.includes(state.id) ? 'is-current' : ''}"><circle cx="${x}" cy="${y}" r="${nodeRadius}"/>${isAcceptor(machine.model) && state.final ? `<circle cx="${x}" cy="${y}" r="${nodeRadius - 5}"/>` : ''}<text x="${x}" y="${y + (machine.model === 'moore' ? -3 : 5)}" text-anchor="middle">${escape(state.name)}</text>${machine.model === 'moore' ? `<text x="${x}" y="${y + 16}" text-anchor="middle">/${escape(state.output)}</text>` : ''}${state.id === machine.initial ? `<path d="M ${x - nodeRadius - 32} ${y} L ${x - nodeRadius - 5} ${y}" marker-end="url(#${marker})"/><text x="${x - nodeRadius - 32}" y="${y - 8}">início</text>` : ''}</g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${size} ${size}" style="width:${size}px;min-width:${compact ? 0 : size}px;max-width:${compact ? '100%' : 'none'}" role="group" aria-label="Diagrama editável da máquina. Estado atual: ${escape(isNondeterministic(machine.model) ? stateSet(current) : stateName(current[0]))}."><defs><marker id="${marker}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z"/></marker></defs>${paths}${nodes}</svg>`;
}
