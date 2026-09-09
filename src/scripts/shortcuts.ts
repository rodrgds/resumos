import { readLocal, writeLocal } from '../lib/storage';
const STORAGE_KEY = 'resumos-shortcuts';
const defaults = {
  search: '/',
  notes: 'n',
  appearance: ',',
  shortcuts: '?',
  ai: 'a',
};
const labels = {
  search: 'Pesquisar',
  notes: 'Caderno',
  appearance: 'Aparência',
  shortcuts: 'Atalhos',
  ai: 'Perguntar à IA',
};
type Action = keyof typeof defaults;
const vimKeys = ['h', 'j', 'k', 'l'];
export function setupShortcuts(actions: Record<Action, () => void>) {
  let bindings = { ...defaults };
  let enabled = true;
  let vim = false;
  try {
    const saved = JSON.parse(readLocal(STORAGE_KEY) || 'null');
    if (saved) {
      const candidate = { ...defaults, ...saved.bindings };
      const keys = Object.values(candidate).filter(Boolean);
      if (
        keys.every((key) => typeof key === 'string' && key.length === 1) &&
        new Set(keys).size === keys.length
      )
        bindings = candidate;
      enabled = saved.enabled !== false;
      vim =
        saved.vim === true &&
        !Object.values(bindings).some((key) => vimKeys.includes(key));
    }
  } catch {
    /* Invalid local preferences fall back to the defaults. */
  }
  const list = document.querySelector('#shortcut-list')!;
  const status = document.querySelector('#shortcut-status')!;
  const single = document.querySelector<HTMLInputElement>('#single-keys')!;
  const vimInput = document.querySelector<HTMLInputElement>('#vim-keys')!;
  let recording: Action | null = null;
  const save = () => {
    if (!writeLocal(STORAGE_KEY, JSON.stringify({ bindings, enabled, vim })))
      status.textContent =
        'As alterações só se aplicam até fechares esta página.';
  };
  function render() {
    list.replaceChildren();
    single.checked = enabled;
    vimInput.checked = vim;
    for (const action of Object.keys(defaults) as Action[]) {
      const row = document.createElement('div');
      row.className = 'shortcut-row';
      const label = document.createElement('span');
      label.textContent = labels[action];
      const button = document.createElement('button');
      button.dataset.shortcut = action;
      button.textContent = bindings[action] || 'Desativado';
      button.setAttribute('aria-label', `Mudar atalho: ${labels[action]}`);
      button.addEventListener('click', () => {
        recording = action;
        button.textContent = 'Carrega numa tecla';
        status.textContent = `Novo atalho para ${labels[action]}.`;
      });
      row.append(label, button);
      list.append(row);
    }
  }
  single.addEventListener('change', () => {
    enabled = single.checked;
    save();
  });
  vimInput.addEventListener('change', () => {
    if (
      vimInput.checked &&
      Object.values(bindings).some((key) => vimKeys.includes(key))
    ) {
      vimInput.checked = false;
      status.textContent = 'Liberta primeiro as teclas h, j, k e l.';
      return;
    }
    vim = vimInput.checked;
    save();
  });
  document.querySelector('#reset-shortcuts')!.addEventListener('click', () => {
    bindings = { ...defaults };
    enabled = true;
    vim = false;
    recording = null;
    render();
    save();
    status.textContent = 'Atalhos repostos.';
  });
  document.querySelector('#shortcuts')!.addEventListener('close', () => {
    recording = null;
    render();
  });
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.isComposing || event.repeat) return;
      if (recording) {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Escape') {
          recording = null;
          render();
          status.textContent = 'Alteração cancelada.';
          return;
        }
        const key = event.key === 'Backspace' ? '' : event.key.toLowerCase();
        if (
          event.ctrlKey ||
          event.metaKey ||
          event.altKey ||
          key.length > 1 ||
          key === ' '
        ) {
          status.textContent = 'Escolhe uma letra, um número ou um sinal.';
          return;
        }
        if (
          key &&
          (Object.entries(bindings).some(
            ([action, value]) => action !== recording && value === key,
          ) ||
            (vim && vimKeys.includes(key)))
        ) {
          status.textContent = 'Essa tecla já está em uso.';
          return;
        }
        const action = recording;
        bindings[action] = key;
        recording = null;
        render();
        save();
        status.textContent = 'Atalho guardado.';
        document
          .querySelector<HTMLButtonElement>(`[data-shortcut="${action}"]`)
          ?.focus();
        return;
      }
      const target = event.target as Element;
      if (
        event.defaultPrevented ||
        target
          .closest('input, textarea, select, [contenteditable="true"]')
          ?.checkVisibility() ||
        document.querySelector('dialog[open]')
      )
        return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        actions.search();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (enabled) {
        const action = (Object.keys(bindings) as Action[]).find(
          (action) => bindings[action] === key,
        );
        if (action) {
          event.preventDefault();
          actions[action]();
          return;
        }
      }
      if (vim && vimKeys.includes(key)) {
        const cards = [
          ...document.querySelectorAll<HTMLElement>(
            '[data-course], .group-card, .lesson-link',
          ),
        ];
        if (!cards.length) return;
        event.preventDefault();
        const current = cards.find((card) => card === document.activeElement);
        if (!current) {
          cards[0].focus();
          return;
        }
        const origin = current.getBoundingClientRect();
        const horizontal = key === 'h' || key === 'l';
        const direction = key === 'h' || key === 'k' ? -1 : 1;
        const candidates = cards
          .filter((card) => card !== current)
          .map((card) => {
            const rect = card.getBoundingClientRect();
            const dx = rect.x - origin.x;
            const dy = rect.y - origin.y;
            return {
              card,
              primary: (horizontal ? dx : dy) * direction,
              cross: Math.abs(horizontal ? dy : dx),
            };
          })
          .filter((item) => item.primary > 5)
          .sort((a, b) => a.primary + a.cross * 3 - (b.primary + b.cross * 3));
        candidates[0]?.card.focus();
      }
    },
    true,
  );
  render();
}
