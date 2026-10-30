import {
  clearExerciseProgress,
  EXERCISE_PROGRESS_EVENT,
  isExerciseSolved,
  readExerciseProgress,
} from '../lib/exercise-progress';
import { clearExerciseResponses } from '../lib/exercise-responses';
import { showExerciseNotice } from '../lib/exercise-feedback';

const CLEARED_FLAG = 'resumos-exercises-cleared';
type Filter = 'all' | 'unsolved' | 'solved';

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
const plural = (count: number) => (count === 1 ? 'exercício' : 'exercícios');

export function setupExerciseBank() {
  const root = document.querySelector<HTMLElement>('[data-exercise-bank]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const count = root.querySelector<HTMLElement>('[data-bank-count]')!;
  const bar = root.querySelector<HTMLElement>('[data-bank-bar]')!;
  const actions = root.querySelector<HTMLElement>('[data-bank-actions]')!;
  const filters = root.querySelector<HTMLElement>('[data-bank-filters]')!;
  const empty = root.querySelector<HTMLElement>('[data-bank-empty]')!;
  const random = root.querySelector<HTMLButtonElement>('[data-bank-random]')!;
  const clear = root.querySelector<HTMLButtonElement>('[data-bank-clear]')!;
  const search = root.querySelector<HTMLInputElement>('[data-bank-search]')!;
  const confirm = root.querySelector<HTMLDialogElement>('[data-bank-confirm]')!;
  const segments = [
    ...root.querySelectorAll<HTMLButtonElement>('[data-bank-filter]'),
  ];
  let filter: Filter = 'all';

  const items = [
    ...document.querySelectorAll<HTMLElement>('[data-exercise]'),
  ].map((element) => ({
    element,
    key: element.dataset.progressKey!,
    text: normalize(
      `${element.querySelector('.exercise-title')?.textContent ?? ''} ${
        element.querySelector('.exercise-prompt')?.textContent ?? ''
      }`,
    ),
    solved: false,
    touched: false,
  }));
  const topics = [...document.querySelectorAll<HTMLElement>('.lesson-body h2')]
    .map((heading) => {
      const members: typeof items = [];
      for (
        let node = heading.nextElementSibling;
        node && node.tagName !== 'H2';
        node = node.nextElementSibling
      ) {
        const item = items.find((candidate) => candidate.element === node);
        if (item) members.push(item);
      }
      return { heading, members };
    })
    .filter((topic) => topic.members.length);
  const topicBars = topics.map((topic) => {
    const element = document.createElement('div');
    element.className = 'exercise-topic-bar';
    element.setAttribute('data-annotation-ignore', '');
    const label = document.createElement('span');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Aleatório deste tema';
    button.addEventListener('click', () =>
      openRandom(topic.members.filter((item) => !item.solved)),
    );
    element.append(label, button);
    topic.heading.after(element);
    return { element, label, button };
  });

  const matchesQuery = (item: (typeof items)[number]) =>
    item.text.includes(normalize(search.value.trim()));
  const matchesFilter = (item: (typeof items)[number]) =>
    filter === 'all' || (filter === 'solved') === item.solved;
  const render = () => {
    items.forEach((item) => {
      const progress = readExerciseProgress(item.key);
      item.solved = isExerciseSolved(progress);
      item.touched = progress !== undefined;
    });
    const solved = items.filter((item) => item.solved).length;
    count.textContent = `${solved} de ${items.length} resolvidos`;
    bar.style.width = `${items.length ? (solved / items.length) * 100 : 0}%`;
    random.disabled = solved === items.length;
    random.title = random.disabled ? 'Já resolveste todos os exercícios' : '';
    clear.disabled = !items.some((item) => item.touched);
    actions.hidden = false;
    filters.hidden = false;
    segments.forEach((button) =>
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.bankFilter === filter),
      ),
    );
    let shown = 0;
    items.forEach((item) => {
      // A hidden ancestor would take an open modal off screen; filter again once it closes.
      const open = item.element.querySelector('dialog[open]');
      item.element.hidden =
        !open && !(matchesFilter(item) && matchesQuery(item));
      if (!item.element.hidden) shown += 1;
    });
    empty.hidden = shown > 0;
    topics.forEach((topic, index) => {
      const { element, label, button } = topicBars[index];
      const done = topic.members.filter((item) => item.solved).length;
      label.textContent = `${done} de ${topic.members.length} resolvidos`;
      button.disabled = done === topic.members.length;
      const visible = topic.members.some((item) => !item.element.hidden);
      topic.heading.hidden = element.hidden = !visible;
    });
  };
  function openRandom(pool: typeof items) {
    const candidates = pool.filter(matchesQuery);
    if (!candidates.length) return;
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    if (chosen.element.hidden) {
      filter = 'all';
      render();
    }
    chosen.element.dispatchEvent(new Event('exercise-modal-request'));
  }
  render();
  window.addEventListener(EXERCISE_PROGRESS_EVENT, render);
  window.addEventListener('storage', render);
  // `close` does not bubble, so listen while capturing.
  document.addEventListener('close', render, true);
  search.addEventListener('input', render);
  segments.forEach((button) =>
    button.addEventListener('click', () => {
      filter = button.dataset.bankFilter as Filter;
      render();
    }),
  );
  random.addEventListener('click', () =>
    openRandom(items.filter((item) => !item.solved)),
  );
  clear.addEventListener('click', () => {
    const solved = items.filter((item) => item.solved).length;
    root.querySelector('[data-bank-confirm-text]')!.textContent =
      solved > 0
        ? `Isto volta a marcar ${solved} ${plural(solved)} como por resolver e apaga as respostas e o código guardados neste navegador. Não é possível desfazer.`
        : 'Isto apaga as respostas e o código guardados neste navegador. Não é possível desfazer.';
    confirm.showModal();
  });
  root
    .querySelector('[data-bank-cancel]')!
    .addEventListener('click', () => confirm.close());
  root
    .querySelector('[data-bank-confirm-clear]')!
    .addEventListener('click', () => {
      const keys = items.map((item) => item.key);
      clearExerciseProgress(keys);
      clearExerciseResponses(keys);
      try {
        sessionStorage.setItem(CLEARED_FLAG, '1');
      } catch {
        /* The reload below still resets every exercise. */
      }
      // Reloading resets radios, editors and help state in one place.
      location.reload();
    });
  try {
    if (sessionStorage.getItem(CLEARED_FLAG)) {
      sessionStorage.removeItem(CLEARED_FLAG);
      showExerciseNotice('Todos os exercícios estão por resolver.');
    }
  } catch {
    /* No notice without session storage. */
  }
}
