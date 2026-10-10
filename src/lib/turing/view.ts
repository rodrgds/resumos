import type { Machine, Configuration } from './machine';

export const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ]!,
  );

export function turingView(
  machine: Machine,
  input: string,
  current: Configuration | null = null,
) {
  const head = current?.head ?? 0;
  const tape = current?.tape ?? new Map([...input].map((s, i) => [i, s]));
  const tapeHtml = Array.from({ length: 9 }, (_, i) => {
    const p = head + i - 4;
    return `<div class="turing-cell" ${p === head ? `aria-current="true" aria-label="Cabeça na célula ${p}"` : ''}><small>${p}</small><strong>${escape(tape.get(p) ?? 'B')}</strong></div>`;
  }).join('');
  const configuration = `Estado ${current?.state ?? machine.initial}. Cabeça na posição ${head}. Passos: ${current?.steps ?? 0}.`;
  const state = current?.state ?? machine.initial;
  const read = tape.get(head) ?? 'B';
  const ruleIndex = machine.transitions.findIndex(
    (t) => t.from === state && t.read === read,
  );
  const rule = machine.transitions[ruleIndex];
  const ruleText = machine.finals.includes(state)
    ? 'Estado final, sem saídas.'
    : rule
      ? `Próxima transição: δ(${state}, ${read}) = (${rule.to}, ${rule.write}, ${rule.move}).`
      : `Sem transição para (${state}, ${read}).`;
  const labels = {
    running: 'Em execução.',
    accepted: 'Palavra aceite.',
    rejected: 'Palavra rejeitada.',
    inconclusive: 'Resultado inconclusivo.',
  };
  const result = current
    ? `${labels[current.status]} ${current.reason}`
    : 'Pronta para executar.';
  return {
    tape: tapeHtml,
    configuration,
    rule: ruleText,
    ruleIndex,
    state,
    result,
  };
}
