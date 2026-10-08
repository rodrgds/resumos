import type { IconName } from '../components/Icon.astro';

export const taskStates = {
  ' ': { label: 'Por fazer', icon: null },
  '/': { label: 'Incompleta', icon: null },
  x: { label: 'Concluída', icon: 'check-circle-solid' },
  '-': { label: 'Cancelada', icon: 'minus-small' },
  '>': { label: 'Encaminhada', icon: 'paper-airplane-solid' },
  '<': { label: 'Agendada', icon: 'calendar-days-solid' },
  '?': { label: 'Pergunta', icon: 'question-mark-circle-solid' },
  '!': { label: 'Importante', icon: 'exclamation-triangle-solid' },
  '*': { label: 'Favorito', icon: 'star-solid' },
  '"': { label: 'Citação', icon: 'chat-bubble-left-right-solid' },
  l: { label: 'Localização', icon: 'map-pin-solid' },
  b: { label: 'Marcador', icon: 'bookmark-solid' },
  i: { label: 'Informação', icon: 'information-circle-solid' },
  S: { label: 'Poupança', icon: 'currency-dollar-solid' },
  I: { label: 'Ideia', icon: 'light-bulb-solid' },
  p: { label: 'Vantagem', icon: 'hand-thumb-up-solid' },
  c: { label: 'Desvantagem', icon: 'hand-thumb-down-solid' },
  f: { label: 'Fogo', icon: 'fire-solid' },
  k: { label: 'Chave', icon: 'key-solid' },
  w: { label: 'Vitória', icon: 'trophy-solid' },
  u: { label: 'Subida', icon: 'arrow-trending-up' },
  d: { label: 'Descida', icon: 'arrow-trending-down' },
} as const satisfies Record<string, { label: string; icon: IconName | null }>;

export type TaskState = keyof typeof taskStates;

export function taskState(marker: string): TaskState | undefined {
  const state = marker === 'X' ? 'x' : marker;
  return Object.hasOwn(taskStates, state) ? (state as TaskState) : undefined;
}

export function parseTaskPrefix(source: string) {
  const match = /^[ \t]*(?:[-+*]|\d+[.)])[ \t]+\[(.)\](?:[ \t]+|$)/.exec(
    source,
  );
  if (!match) return;
  const state = taskState(match[1]);
  if (state === undefined) return;
  return {
    state,
    length: match[0].length,
    statusOffset: match[0].indexOf('[') + 1,
  };
}
