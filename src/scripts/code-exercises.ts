import { EditorView, keymap } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { editorSetup, editorLanguage } from '../lib/editor-setup';
import {
  normalizeTestOutput,
  type CodeAnswer,
  type CodeTest,
} from '../lib/code-exercise';
import { runProgram } from '../lib/runners/run';
import { preparePython } from '../lib/runners/python';
import { OUTPUT_LIMIT, type RunMessage } from '../lib/runners/types';

const MAX_TEST_MS = 120_000;

interface TestOutcome {
  passed?: boolean;
  output: string;
  error?: string;
}

export function setupCodeExercises() {
  document
    .querySelectorAll<HTMLElement>('[data-code-exercise]')
    .forEach((root) => {
      if (root.dataset.ready) return;
      root.dataset.ready = 'true';
      const exercise = root.closest<HTMLElement>('[data-exercise]')!;
      const answer: CodeAnswer = JSON.parse(exercise.dataset.answer!);
      const source = root.querySelector<HTMLElement>('[data-code-source]')!;
      const check = root.querySelector<HTMLButtonElement>('[data-code-check]')!;
      const stop = root.querySelector<HTMLButtonElement>('[data-code-stop]')!;
      const reset = root.querySelector<HTMLButtonElement>('[data-code-reset]')!;
      const result = root.querySelector<HTMLElement>('[data-code-result]')!;
      const status = root.querySelector<HTMLElement>('[data-code-status]')!;
      const output = root.querySelector<HTMLElement>('[data-code-output]')!;
      const diagnostics = root.querySelectorAll<HTMLTemplateElement>(
        '[data-code-diagnostic]',
      );
      const showDiagnostic = (index: number, outcome: TestOutcome) => {
        output.replaceChildren(diagnostics[index].content.cloneNode(true));
        output.querySelector<HTMLElement>('[data-code-obtained]')!.textContent =
          outcome.output || '(sem saída)';
        const error = output.querySelector<HTMLElement>('[data-code-error]')!;
        error.hidden = !outcome.error;
        error.textContent = outcome.error || '';
        output.hidden = false;
      };
      const clearFeedback = () =>
        exercise.dispatchEvent(new Event('exercise-code-reset'));
      let running = false;
      let cancel: (() => void) | undefined;
      let runId = 0;
      const finish = () => {
        const returnFocus = document.activeElement === stop;
        running = false;
        check.disabled = false;
        check.hidden = false;
        reset.disabled = false;
        reset.hidden = editor.state.doc.toString() === answer.starter;
        stop.hidden = true;
        if (returnFocus) check.focus();
      };
      const interrupt = () => {
        runId++;
        cancel?.();
        cancel = undefined;
        finish();
      };
      const evaluate = (test: CodeTest, code: string): Promise<TestOutcome> =>
        new Promise((resolve, reject) => {
          let text = '';
          let dispose: (() => void) | undefined;
          const cleanup = () => {
            clearTimeout(timer);
            dispose?.();
            cancel = undefined;
          };
          const timer = setTimeout(() => {
            cleanup();
            resolve({
              output: text,
              error:
                'O teste demorou demasiado. Revê os ciclos e tenta novamente.',
            });
          }, MAX_TEST_MS);
          cancel = () => {
            cleanup();
            reject(new Error('Verificação interrompida.'));
          };
          const receive = (message: RunMessage) => {
            if (message.type === 'status')
              status.textContent = `Teste «${test.name}»: ${message.text}`;
            if (message.type === 'output') {
              text += message.text;
              if (text.length > OUTPUT_LIMIT) {
                cleanup();
                resolve({
                  output: text,
                  error: 'Demasiada saída. Reduz os prints e tenta novamente.',
                });
              }
            }
            if (message.type === 'error') {
              cleanup();
              resolve({ output: text, error: message.text });
            }
            if (message.type === 'done') {
              cleanup();
              const passed =
                message.exitCode === 0 &&
                normalizeTestOutput(text) === normalizeTestOutput(test.output);
              resolve({
                passed,
                output: text,
                error:
                  message.exitCode === 0
                    ? undefined
                    : `O programa terminou com erro (${message.exitCode}).`,
              });
            }
          };
          const request = {
            language: answer.language,
            code: test.code ? `${code}\n\n${test.code}` : code,
            input: test.input || '',
          };
          try {
            dispose = runProgram(request, receive, root);
          } catch (error) {
            cleanup();
            resolve({
              output: text,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        });
      const run = async () => {
        if (running) return;
        const id = ++runId;
        const moveFocus = document.activeElement === check;
        running = true;
        check.disabled = true;
        check.hidden = true;
        reset.disabled = true;
        reset.hidden = true;
        stop.hidden = false;
        if (moveFocus) stop.focus();
        result.hidden = false;
        delete result.dataset.result;
        output.hidden = true;
        output.textContent = '';
        clearFeedback();
        const code = editor.state.doc.toString();
        try {
          for (const [index, test] of answer.tests.entries()) {
            status.textContent = `Teste ${index + 1}/${answer.tests.length}: ${test.name}`;
            const outcome = await evaluate(test, code);
            if (id !== runId) return;
            if (!outcome.passed) {
              result.dataset.result = 'attempted';
              status.textContent =
                outcome.passed === undefined
                  ? `Erro no teste ${index + 1}/${answer.tests.length}: «${test.name}».`
                  : `Teste ${index + 1}/${answer.tests.length}: «${test.name}» falhou.`;
              showDiagnostic(index, outcome);
              if (outcome.passed === undefined) return;
              finish();
              exercise.dispatchEvent(
                new CustomEvent('exercise-code-result', {
                  bubbles: true,
                  detail: {
                    correct: false,
                    message: `Revê o teste «${test.name}».`,
                  },
                }),
              );
              return;
            }
          }
          status.textContent = `${answer.tests.length}/${answer.tests.length} testes passaram.`;
          result.dataset.result = 'correct';
          finish();
          exercise.dispatchEvent(
            new CustomEvent('exercise-code-result', {
              bubbles: true,
              detail: { correct: true, message: '' },
            }),
          );
        } catch (error) {
          if (id === runId) {
            result.dataset.result = 'attempted';
            status.textContent =
              error instanceof Error ? error.message : String(error);
          }
        } finally {
          if (id === runId && running) finish();
        }
      };
      const editor = new EditorView({
        doc: answer.starter,
        parent: root.querySelector('[data-code-editor]')!,
        extensions: [
          editorSetup(root),
          editorLanguage(
            answer.language === 'python' ? python() : javascript(),
          ),
          EditorView.contentAttributes.of({
            'aria-label': `Código ${answer.language}`,
            spellcheck: 'false',
          }),
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            if (running) {
              interrupt();
              status.textContent = 'Código alterado. Verifica novamente.';
            } else result.hidden = true;
            reset.hidden = editor.state.doc.toString() === answer.starter;
            clearFeedback();
          }),
          keymap.of([
            {
              key: 'Mod-Enter',
              run: () => {
                void run();
                return true;
              },
            },
          ]),
        ],
      });
      source.hidden = true;
      check.disabled = false;
      reset.disabled = false;
      check.onclick = () => void run();
      if (answer.language === 'python')
        root.addEventListener('focusin', preparePython);
      stop.onclick = () => {
        interrupt();
        status.textContent = 'Verificação interrompida.';
      };
      reset.onclick = () => {
        interrupt();
        editor.dispatch({
          changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: answer.starter,
          },
        });
        result.hidden = true;
        clearFeedback();
        editor.focus();
      };
      const observer = new MutationObserver(() => {
        if (root.isConnected) return;
        interrupt();
        editor.destroy();
        observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      window.addEventListener('pagehide', interrupt, { once: true });
    });
}
