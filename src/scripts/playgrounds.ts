import {
  Decoration,
  EditorView,
  ViewPlugin,
  type ViewUpdate,
} from '@codemirror/view';
import type { Range } from '@codemirror/state';
import { editorSetup, editorLanguage } from '../lib/editor-setup';
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
import { supportLanguage } from '../lib/playground-files';
import {
  detectDelimiter,
  isCsvFilename,
  splitCsvSpans,
} from '../lib/csv-columns';
import { runProgram } from '../lib/runners/run';
import { preparePython } from '../lib/runners/python';

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
// Rainbow-style column colours for data files, using the same splitter as
// the server-rendered fallback so both paint identical columns.
function csvColumns(filename: string) {
  const build = (view: EditorView) => {
    const delimiter = detectDelimiter(view.state.doc.toString(), filename);
    const marks: Range<Decoration>[] = [];
    for (const { from, to } of view.visibleRanges) {
      let number = view.state.doc.lineAt(from).number;
      for (;;) {
        const line = view.state.doc.line(number);
        if (line.from > to) break;
        if (line.text.trim() !== '')
          for (const [column, span] of splitCsvSpans(
            line.text,
            delimiter,
          ).entries()) {
            if (span.end > span.start)
              marks.push(
                Decoration.mark({
                  class: `csv-col-${column % 10}${number === 1 ? ' csv-header' : ''}`,
                }).range(line.from + span.start, line.from + span.end),
              );
          }
        if (line.to >= to || number >= view.state.doc.lines) break;
        number++;
      }
    }
    return Decoration.set(marks, true);
  };
  return ViewPlugin.fromClass(
    class {
      decorations;
      constructor(view: EditorView) {
        this.decorations = build(view);
      }
      update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged)
          this.decorations = build(update.view);
      }
    },
    { decorations: (value) => value.decorations },
  );
}
export function setupPlaygrounds() {
  document
    .querySelectorAll<HTMLElement>('[data-playground]')
    .forEach((root) => {
      if (root.dataset.ready) return;
      root.dataset.ready = 'true';
      const language = root.dataset.language as Language;
      const panes = [...root.querySelectorAll<HTMLElement>('[data-file-pane]')];
      const sources = panes.map((pane) =>
        pane.querySelector<HTMLElement>(
          '[data-source], [data-support-source]',
        )!,
      );
      const originals = sources.map((source) => source.textContent || '');
      const filenames = sources.map(
        (source) => source.getAttribute('data-filename') || 'ficheiro',
      );
      const tabs = root.querySelector<HTMLElement>('.playground-file-tabs');
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
      const editors = panes.map((pane, index) => {
        const csv = index > 0 && isCsvFilename(filenames[index]);
        const mode = csv
          ? null
          : index === 0
            ? language
            : (supportLanguage(language, filenames[index]) ?? null);
        return new EditorView({
          doc: originals[index],
          parent: pane.querySelector('[data-editor], [data-support-editor]')!,
          extensions: [
            editorSetup(root),
            ...(mode ? [editorLanguage(languages[mode]())] : []),
            ...(csv ? [csvColumns(filenames[index])] : []),
            EditorView.contentAttributes.of({
              'aria-label':
                index === 0
                  ? `Código ${language}`
                  : `Ficheiro ${filenames[index]}`,
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
      });
      sources.forEach((source) => {
        source.hidden = true;
      });
      const selectFile = (selected: number) => {
        panes.forEach((pane, index) => {
          pane.hidden = index !== selected;
        });
        editors[selected].requestMeasure();
      };
      if (tabs) {
        tabs.hidden = false;
        tabs.addEventListener('change', () => {
          const selected = Number(
            tabs.querySelector<HTMLInputElement>('input:checked')!.value,
          );
          selectFile(selected);
        });
        selectFile(0);
      }
      const run = () => {
        if (cancel) return;
        result.hidden = false;
        output.textContent = '';
        plots.replaceChildren();
        status.textContent = 'A carregar o motor…';
        runButton.disabled = true;
        stopButton.hidden = false;
        const files: Record<string, string> = {};
        editors.forEach((editor, index) => {
          if (index > 0) files[filenames[index]] = editor.state.doc.toString();
        });
        const request = {
          language,
          code: editors[0].state.doc.toString(),
          files,
          input:
            root.querySelector<HTMLTextAreaElement>('[data-stdin]')?.value ||
            '',
        };
        cancel = runProgram(request, receive, root);
        timer = setTimeout(
          () => finish('Execução interrompida após dois minutos.'),
          MAX_RUN_MS,
        );
      };
      runButton.onclick = run;
      if (language === 'python')
        root.addEventListener('focusin', preparePython);
      stopButton.onclick = () => finish('Execução interrompida.');
      root.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        for (const panel of root.querySelectorAll(
          'details.playground-stdin[open]',
        )) {
          if (panel instanceof HTMLDetailsElement) panel.open = false;
        }
      });
      resetButton.onclick = () => {
        finish('');
        result.hidden = true;
        output.textContent = '';
        plots.replaceChildren();
        editors.forEach((editor, index) =>
          editor.dispatch({
            changes: {
              from: 0,
              to: editor.state.doc.length,
              insert: originals[index],
            },
          }),
        );
        const visible = editors.findIndex(
          (_editor, index) => !panes[index].hidden,
        );
        editors[visible < 0 ? 0 : visible].focus();
      };
      runButton.disabled = false;
      resetButton.disabled = false;
      window.addEventListener(
        'pagehide',
        () => {
          cancel?.();
          clearTimeout(timer);
          editors.forEach((editor) => editor.destroy());
        },
        { once: true },
      );
    });
}
