import {
  parseNumericAnswer,
  readExerciseProgress,
  saveExerciseProgress,
  type Assistance,
  type ExerciseProgress,
} from '../lib/exercise-progress';
import {
  createExerciseFeedback,
  showExerciseNotice,
} from '../lib/exercise-feedback';

type Answer =
  | { kind: 'self' }
  | { kind: 'code' }
  | { kind: 'number'; value: number; tolerance: number }
  | { kind: 'choice'; options: { correct: boolean; explanation: string }[] };

export function setupExercises() {
  document.querySelectorAll<HTMLElement>('[data-exercise]').forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';
    const answer: Answer = JSON.parse(root.dataset.answer!);
    const key = root.dataset.progressKey!;
    const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
    const effects = createExerciseFeedback(root);
    root.addEventListener('exercise-code-reset', () => {
      effects.reset();
      delete feedback.dataset.result;
      feedback.textContent = '';
    });
    const help = [...root.querySelectorAll<HTMLDetailsElement>('[data-help]')];
    let progress = readExerciseProgress(key);
    const selfChecks =
      root.querySelectorAll<HTMLButtonElement>('[data-self-check]');
    let assistance: Assistance = progress?.assistance || 'none';
    const assistanceLabel = (level = assistance) =>
      level === 'solution'
        ? 'após consultar a solução'
        : level === 'hint'
          ? 'com pistas'
          : 'sem ajuda';
    const showProgress = () => {
      selfChecks.forEach((button) => {
        button.setAttribute(
          'aria-pressed',
          String(progress?.result === `self-${button.dataset.selfCheck}`),
        );
      });
      if (!progress) return;
      if (!progress.result) {
        delete feedback.dataset.result;
        feedback.textContent = '';
        return;
      }
      feedback.dataset.result = progress.result;
      const result = progress.result;
      if (
        (result === 'attempted' || result === 'self-checked') &&
        answer.kind === 'self'
      ) {
        delete feedback.dataset.result;
        feedback.textContent = '';
        return;
      }
      const label =
        result === 'correct'
          ? 'Resposta correta'
          : result === 'self-correct'
            ? 'Resposta correta (autoavaliação)'
            : result === 'self-incorrect'
              ? 'Resposta a rever (autoavaliação)'
              : 'Resposta incorreta';
      feedback.textContent = `${label}, ${assistanceLabel(progress.resultAssistance ?? progress.assistance)}.`;
    };
    const save = (result: NonNullable<ExerciseProgress['result']>) => {
      progress = { result, assistance, resultAssistance: assistance };
      saveExerciseProgress(key, progress);
    };
    const readHelp = () => {
      const saved = readExerciseProgress(key)?.assistance;
      if (saved === 'solution' || (saved === 'hint' && assistance === 'none'))
        assistance = saved;
      if (
        help.some(
          (details) => details.open && details.dataset.help === 'solution',
        )
      )
        assistance = 'solution';
      else if (assistance === 'none' && help.some((details) => details.open))
        assistance = 'hint';
    };
    const showResult = (
      correct: boolean,
      explanation: string | DocumentFragment = '',
    ) => {
      readHelp();
      save(correct ? 'correct' : 'attempted');
      feedback.dataset.result = correct ? 'correct' : 'attempted';
      feedback.textContent = correct
        ? `Resposta correta, ${assistanceLabel()}.`
        : 'Resposta incorreta.';
      if (explanation) feedback.append(' ', explanation);
      effects.play({
        correct,
        trigger: root.querySelector<HTMLElement>(
          answer.kind === 'code' ? '[data-code-check]' : '[data-check]',
        ),
        response: root.querySelector<HTMLElement>(
          answer.kind === 'code'
            ? '[data-code-editor]'
            : '[data-response], fieldset',
        ),
      });
    };
    root.addEventListener('exercise-code-result', (event) => {
      if (answer.kind !== 'code') return;
      const detail = (
        event as CustomEvent<{ correct: boolean; message: string }>
      ).detail;
      if (
        !detail ||
        typeof detail.correct !== 'boolean' ||
        typeof detail.message !== 'string'
      )
        return;
      showResult(detail.correct, detail.message);
    });
    help.forEach((details) => {
      const recordHelp = () => {
        readHelp();
        if (details.dataset.help === 'solution') assistance = 'solution';
        else if (assistance === 'none') assistance = 'hint';
        progress = { ...progress, assistance };
        saveExerciseProgress(key, progress);
        showProgress();
      };
      details.querySelector('summary')!.addEventListener('click', (event) => {
        // Native toggle is queued; save opening help before a reload can race it.
        if (!event.defaultPrevented && !details.open) recordHelp();
      });
      details.addEventListener('toggle', () => {
        if (details.open) recordHelp();
      });
    });
    root.querySelectorAll<HTMLElement>('[data-enhanced]').forEach((element) => {
      element.hidden = false;
    });
    showProgress();
    root.querySelector('[data-check]')?.addEventListener('click', () => {
      if (answer.kind === 'code') return;
      effects.reset();
      delete feedback.dataset.result;
      readHelp();
      if (answer.kind === 'self') {
        const response =
          root.querySelector<HTMLTextAreaElement>('[data-response]')!;
        if (!response.value.trim()) {
          feedback.textContent = 'Escreve primeiro o teu raciocínio.';
          response.focus();
          return;
        }
        save('attempted');
        const solution = root.querySelector<HTMLDetailsElement>(
          '[data-help="solution"]',
        )!;
        solution.open = true;
        readHelp();
        progress = { ...progress, assistance };
        saveExerciseProgress(key, progress);
        showProgress();
        solution.querySelector<HTMLElement>('summary')!.focus();
        solution.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        return;
      }
      let correct = false;
      let explanation: string | DocumentFragment = '';
      if (answer.kind === 'number') {
        const input = root.querySelector<HTMLInputElement>('[data-response]')!;
        const value = parseNumericAnswer(input.value);
        if (value === undefined) {
          feedback.textContent = 'Escreve um número válido, sem unidades.';
          input.focus();
          return;
        }
        correct =
          value >= answer.value - answer.tolerance &&
          value <= answer.value + answer.tolerance;
      } else {
        const input = root.querySelector<HTMLInputElement>(
          '[data-exercise-controls] input[type="radio"]:checked',
        );
        if (!input) {
          feedback.textContent = 'Escolhe uma resposta.';
          return;
        }
        const option = answer.options[Number(input.value)];
        correct = option.correct;
        explanation = root
          .querySelectorAll<HTMLTemplateElement>('[data-option-explanation]')
          [Number(input.value)].content.cloneNode(true) as DocumentFragment;
      }
      showResult(correct, explanation);
    });
    selfChecks.forEach((button) =>
      button.addEventListener('click', () => {
        const correct = button.dataset.selfCheck === 'correct';
        const result = correct ? 'self-correct' : 'self-incorrect';
        const changed = progress?.result !== result;
        readHelp();
        save(result);
        showProgress();
        if (changed) {
          showExerciseNotice(
            correct ? 'Assinalada como correta.' : 'Marcada para rever.',
          );
          effects.reset();
          if (correct) {
            // Let the new status settle scroll anchoring before placing the burst.
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (
                  progress?.result === 'self-correct' &&
                  button.getClientRects().length
                )
                  effects.play({ correct: true, trigger: button });
              });
            });
          }
        }
      }),
    );
    const clear = root.querySelector<HTMLButtonElement>('[data-clear]');
    const responses = root.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >(
      '[data-exercise-controls] [data-response], [data-exercise-controls] input[type="radio"]',
    );
    const updateClear = () => {
      if (!clear) return;
      clear.hidden = ![...responses].some((input) =>
        input instanceof HTMLInputElement && input.type === 'radio'
          ? input.checked
          : Boolean(input.value),
      );
    };
    root.addEventListener('input', updateClear);
    updateClear();
    clear?.addEventListener('click', () => {
      effects.reset();
      responses.forEach((input) => {
        if (input instanceof HTMLInputElement && input.type === 'radio')
          input.checked = false;
        else input.value = '';
      });
      updateClear();
      responses[0]?.focus();
      delete feedback.dataset.result;
      feedback.textContent =
        assistance === 'none'
          ? 'Resposta limpa.'
          : `Resposta limpa. ${assistance === 'hint' ? 'Pistas consultadas' : 'Solução consultada'}.`;
    });
  });
}
