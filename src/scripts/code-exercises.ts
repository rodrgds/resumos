import { EditorView, keymap } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { editorSetup } from '../lib/editor-setup';
import {
  normalizeTestOutput,
  type CodeAnswer,
  type CodeTest,
} from '../lib/code-exercise';
import { runProgram } from '../lib/runners/run';
import { OUTPUT_LIMIT, type RunMessage } from '../lib/runners/types';

const MAX_TEST_MS = 120_000;

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
      const clearFeedback = () =>
        exercise.dispatchEvent(new Event('exercise-code-reset'));
      let running = false;
      let cancel: (() => void) | undefined;
      let runId = 0;
      const finish = () => {
        running = false;
        check.disabled = false;
        reset.disabled = false;
        stop.hidden = true;
      };
      const interrupt = () => {
        runId++;
        cancel?.();
        cancel = undefined;
        finish();
      };
      const evaluate = (
        test: CodeTest,
        code: string,
      ): Promise<{ passed: boolean; diagnostic: string }> =>
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
            reject(
              new Error(
                'O teste demorou demasiado. Revê os ciclos e tenta novamente.',
              ),
            );
          }, MAX_TEST_MS);
          cancel = () => {
            cleanup();
            reject(new Error('Verificação interrompida.'));
          };
          const receive = (message: RunMessage) => {
            if (message.type === 'status')
              status.textContent = `${test.name}: ${message.text}`;
            if (message.type === 'output') {
              text += message.text;
              if (text.length > OUTPUT_LIMIT) {
                cleanup();
                reject(
                  new Error(
                    'Demasiada saída. Reduz os prints e tenta novamente.',
                  ),
                );
              }
            }
            if (message.type === 'error') {
              cleanup();
              reject(new Error(message.text));
            }
            if (message.type === 'done') {
              cleanup();
              const passed =
                message.exitCode === 0 &&
                normalizeTestOutput(text) === normalizeTestOutput(test.output);
              resolve({
                passed,
                diagnostic:
                  message.exitCode === 0
                    ? `Esperado:\n${test.output || '(sem saída)'}\n\nObtido:\n${text || '(sem saída)'}`
                    : text ||
                      `O programa terminou com erro (${message.exitCode}).`,
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
            reject(error);
          }
        });
      const run = async () => {
        if (running) return;
        const id = ++runId;
        running = true;
        check.disabled = true;
        reset.disabled = true;
        stop.hidden = false;
        result.hidden = false;
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
              status.textContent = `Falhou: ${test.name}`;
              output.hidden = false;
              output.textContent = outcome.diagnostic;
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
          exercise.dispatchEvent(
            new CustomEvent('exercise-code-result', {
              bubbles: true,
              detail: { correct: true, message: '' },
            }),
          );
        } catch (error) {
          if (id === runId)
            status.textContent =
              error instanceof Error ? error.message : String(error);
        } finally {
          if (id === runId) finish();
        }
      };
      const editor = new EditorView({
        doc: answer.starter,
        parent: root.querySelector('[data-code-editor]')!,
        extensions: [
          editorSetup(root),
          answer.language === 'python' ? python() : javascript(),
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
