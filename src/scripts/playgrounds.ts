import { EditorView } from '@codemirror/view';
import { editorSetup } from '../lib/editor-setup';
import { keymap } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { sql } from '@codemirror/lang-sql';
import { cpp } from '@codemirror/lang-cpp';
import { StreamLanguage } from '@codemirror/language';
import { haskell } from '@codemirror/legacy-modes/mode/haskell';
import { php } from '@codemirror/lang-php';
import { java } from '@codemirror/lang-java';
import { prolog } from 'codemirror-lang-prolog';
import { assembly } from '@codincod/codemirror-lang-assembly';
import {
  OUTPUT_LIMIT,
  type Language,
  type RunMessage,
} from '../lib/runners/types';
import { runIsolated } from '../lib/runners/isolated';

const languages = {
  python,
  javascript,
  sql,
  cpp,
  java,
  c: cpp,
  haskell: () => StreamLanguage.define(haskell),
  prolog,
  riscv: assembly,
  php,
};
const MAX_RUN_MS = 120_000;
const MAX_PLOTS = 8;
const MAX_PLOT_BASE64_CHARS = 2 * 1024 * 1024;
const PNG_DATA_PREFIX = 'data:image/png;base64,';
export function setupPlaygrounds() {
  document
    .querySelectorAll<HTMLElement>('[data-playground]')
    .forEach((root) => {
      if (root.dataset.ready) return;
      root.dataset.ready = 'true';
      const language = root.dataset.language as Language;
      const source = root.querySelector<HTMLElement>('[data-source]')!;
      const original = source.textContent || '';
      const runButton = root.querySelector<HTMLButtonElement>('[data-run]')!;
      const resetButton =
        root.querySelector<HTMLButtonElement>('[data-reset]')!;
      const stopButton = root.querySelector<HTMLButtonElement>('[data-stop]')!;
      const result = root.querySelector<HTMLElement>('.playground-result')!;
      const status = root.querySelector<HTMLElement>('[role=status]')!;
      const output = root.querySelector<HTMLElement>('[data-output]')!;
      const plots = document.createElement('div');
      plots.className = 'playground-plots';
      result.append(plots);
      let cancel: (() => void) | undefined;
      let timer: ReturnType<typeof setTimeout>;
      const finish = (message: string) => {
        cancel?.();
        cancel = undefined;
        clearTimeout(timer);
        runButton.disabled = false;
        stopButton.hidden = true;
        status.textContent = message;
      };
      const receive = (message: RunMessage) => {
        if (message.type === 'status') status.textContent = message.text;
        if (message.type === 'output') {
          if (output.textContent!.length + message.text.length > OUTPUT_LIMIT)
            return finish(
              'Saída demasiado longa. Reduz o número de resultados.',
            );
          output.append(document.createTextNode(message.text));
        }
        if (message.type === 'image') {
          if (
            plots.childElementCount >= MAX_PLOTS ||
            typeof message.data !== 'string' ||
            message.data.length >
              MAX_PLOT_BASE64_CHARS + PNG_DATA_PREFIX.length ||
            !/^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(message.data)
          )
            return finish('Gráfico demasiado grande ou inválido.');
          const image = document.createElement('img');
          image.src = message.data;
          image.alt =
            typeof message.alt === 'string'
              ? message.alt
              : 'Gráfico gerado pelo código';
          plots.append(image);
        }
        if (message.type === 'done')
          finish(
            message.exitCode === 0
              ? 'Concluído'
              : `Terminou com erro (${message.exitCode})`,
          );
        if (message.type === 'error') finish(message.text);
      };
      const run = () => {
        if (cancel) return;
        result.hidden = false;
        output.textContent = '';
        plots.replaceChildren();
        status.textContent = 'A carregar o motor…';
        runButton.disabled = true;
        stopButton.hidden = false;
        const request = {
          language,
          code: editor.state.doc.toString(),
          input:
            root.querySelector<HTMLTextAreaElement>('[data-stdin]')?.value ||
            '',
        };
        if (['python', 'java', 'haskell', 'prolog', 'php'].includes(language))
          cancel = runIsolated(request, receive, root);
        else {
          // Keep each constructor static so Vite bundles both Worker entrypoints.
          const worker =
            language === 'riscv'
              ? new Worker(
                  new URL('./runners/riscv.worker.ts', import.meta.url),
                  { type: 'module' },
                )
              : new Worker(
                  new URL('./runners/wasi.worker.ts', import.meta.url),
                  { type: 'module' },
                );
          cancel = () => worker.terminate();
          worker.onmessage = (event) => receive(event.data);
          worker.onerror = () =>
            finish(
              'Não foi possível executar. Verifica a ligação e tenta novamente.',
            );
          worker.postMessage(request);
        }
        timer = setTimeout(
          () => finish('Execução interrompida após dois minutos.'),
          MAX_RUN_MS,
        );
      };
      const editor = new EditorView({
        doc: original,
        parent: root.querySelector('[data-editor]')!,
        extensions: [
          editorSetup(root),
          languages[language](),
          EditorView.lineWrapping,
          EditorView.contentAttributes.of({
            'aria-label': `Código ${language}`,
            spellcheck: 'false',
          }),
          keymap.of([
            {
              key: 'Mod-Enter',
              run: () => {
                run();
                return true;
              },
            },
          ]),
        ],
      });
      source.hidden = true;
      runButton.onclick = run;
      stopButton.onclick = () => finish('Execução interrompida.');
      resetButton.onclick = () => {
        finish('');
        result.hidden = true;
        output.textContent = '';
        plots.replaceChildren();
        editor.dispatch({
          changes: { from: 0, to: editor.state.doc.length, insert: original },
        });
        editor.focus();
      };
      runButton.disabled = false;
      resetButton.disabled = false;
      window.addEventListener(
        'pagehide',
        () => {
          cancel?.();
          clearTimeout(timer);
          editor.destroy();
        },
        { once: true },
      );
    });
}
