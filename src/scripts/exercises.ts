import {
  parseNumericAnswer,
  readExerciseProgress,
  saveExerciseProgress,
  type Assistance,
  type ExerciseProgress,
} from '../lib/exercise-progress';

type Answer =
  | { kind: 'self' }
  | { kind: 'number'; value: number; tolerance: number }
  | { kind: 'choice'; options: { correct: boolean; explanation: string }[] };

export function setupExercises() {
  document.querySelectorAll<HTMLElement>('[data-exercise]').forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = 'true';
    const answer: Answer = JSON.parse(root.dataset.answer!);
    const key = root.dataset.progressKey!;
    const feedback = root.querySelector<HTMLElement>('[data-feedback]')!;
    const help = [...root.querySelectorAll<HTMLDetailsElement>('[data-help]')];
    let progress = readExerciseProgress(key);
    let assistance: Assistance = progress?.assistance || 'none';
    const assistanceLabel = (level = assistance) =>
      level === 'solution'
        ? 'após consultar a solução'
        : level === 'hint'
          ? 'com pistas'
          : 'sem ajuda';
    const showProgress = () => {
      if (!progress) return;
      if (!progress.result) {
        feedback.textContent = `${assistance === 'solution' ? 'Solução consultada' : 'Pista consultada'}. Ainda não registaste uma resposta.`;
        return;
      }
      feedback.textContent = `${progress.result === 'correct' ? 'Resposta correta' : progress.result === 'self-checked' ? 'Resposta conferida por ti' : 'Tentativa registada'}, ${assistanceLabel(progress.resultAssistance ?? progress.assistance)}.`;
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
    help.forEach((details) =>
      details.addEventListener('toggle', () => {
        if (!details.open) return;
        readHelp();
        progress = { ...progress, assistance };
        saveExerciseProgress(key, progress);
        showProgress();
      }),
    );
    root.querySelectorAll<HTMLElement>('[data-enhanced]').forEach((element) => {
      element.hidden = false;
    });
    showProgress();
    root.querySelector('[data-check]')?.addEventListener('click', () => {
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
        feedback.textContent = `Tentativa registada, ${assistanceLabel()}. Compara depois com a solução e a lista de verificação.`;
        return;
      }
      let correct = false;
      let explanation = '';
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
          'input[type="radio"]:checked',
        );
        if (!input) {
          feedback.textContent = 'Escolhe uma resposta.';
          return;
        }
        const option = answer.options[Number(input.value)];
        correct = option.correct;
        explanation = option.explanation;
      }
      save(correct ? 'correct' : 'attempted');
      feedback.textContent = correct
        ? `Resposta correta, ${assistanceLabel()}. ${explanation}`
        : `Ainda não. ${explanation || 'Revê o cálculo ou abre uma pista.'}`;
    });
    root.querySelector('[data-self-check]')?.addEventListener('click', () => {
      readHelp();
      save('self-checked');
      showProgress();
    });
    root.querySelector('[data-clear]')?.addEventListener('click', () => {
      root
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
          '[data-response], input[type="radio"]',
        )
        .forEach((input) => {
          if (input instanceof HTMLInputElement && input.type === 'radio')
            input.checked = false;
          else input.value = '';
        });
      feedback.textContent =
        assistance === 'none'
          ? 'Resposta limpa.'
          : `Resposta limpa. A consulta de ${assistance === 'hint' ? 'pistas' : 'solução'} continua registada.`;
    });
  });
}
