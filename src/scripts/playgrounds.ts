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
import { sql, SQLite, PostgreSQL } from '@codemirror/lang-sql';
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
import { observeExample } from '../lib/example-autorun';
import { renderSqlTable } from '../lib/sql-table';
import { preparePython } from '../lib/runners/python';

const languages = {
  python,
  javascript,
  sql: () => sql({ dialect: SQLite }),
  sqlite: () => sql({ dialect: SQLite }),
  postgresql: () => sql({ dialect: PostgreSQL }),
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
// Measure full labels even while the title is out of flow. Tabs and actions
// keep their space; titles return in a wide workspace without clipping names.
const TITLE_SPARE_SPACE = 64;

function fitToolbarTitle(root: HTMLElement) {
  const toolbar = root.querySelector<HTMLElement>('.playground-toolbar')!;
  const title = root.querySelector<HTMLElement>('.playground-title')!;
  const actions = root.querySelector<HTMLElement>('.playground-actions')!;
  const tabs = root.querySelector<HTMLElement>('.playground-file-tabs');
  const labels = [...(tabs?.querySelectorAll('label') ?? [])];
  const fit = () => {
    const style = getComputedStyle(toolbar);
    const gap = parseFloat(style.columnGap) || 0;
    const padding =
      parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const tabGap = tabs ? parseFloat(getComputedStyle(tabs).columnGap) || 0 : 0;
    const filesWidth =
      labels.reduce(
        (sum, label) => sum + label.getBoundingClientRect().width,
        0,
      ) +
      Math.max(0, labels.length - 1) * tabGap;
    const required =
      filesWidth +
      title.getBoundingClientRect().width +
      actions.getBoundingClientRect().width +
      padding +
      gap * (tabs ? 2 : 1);
    root.toggleAttribute(
      'data-toolbar-title',
      !!title.textContent?.trim() &&
        required + TITLE_SPARE_SPACE <= toolbar.clientWidth,
    );
  };
  const observer = new ResizeObserver(fit);
  for (const element of [toolbar, title, actions, ...labels])
    observer.observe(element);
  document.fonts.ready.then(fit);
  fit();
  return observer;
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
      const input = root.querySelector<HTMLTextAreaElement>('[data-stdin]');
      const originalInput = input?.value;
      const tables = document.createElement('div');
      tables.className = 'playground-tables';
      result.append(tables);
      const plots = document.createElement('div');
      plots.className = 'playground-plots';
      result.append(plots);
      let interacted = false;
      let version = 0;
      let executedVersion = 0;
      let releaseAutoRun: (() => void) | undefined;
      let cancel: (() => void) | undefined;
      let timer: ReturnType<typeof setTimeout>;
      const finish = (message: string) => {
        cancel?.();
        cancel = undefined;
        clearTimeout(timer);
        releaseAutoRun?.();
        releaseAutoRun = undefined;
        runButton.disabled = false;
        stopButton.hidden = true;
        status.textContent =
          message +
          (message && version !== executedVersion
            ? ' Código ou entrada alterados. Executa para atualizar o resultado.'
            : '');
      };
      const edited = () => {
        interacted = true;
        version++;
        if (!result.hidden && !cancel)
          status.textContent =
            'Código ou entrada alterados. Executa para atualizar o resultado.';
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
        if (message.type === 'table') renderSqlTable(tables, message);
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
            EditorView.updateListener.of((update) => {
              if (update.docChanged) edited();
            }),
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
        interacted = true;
        executedVersion = version;
        result.hidden = false;
        output.textContent = '';
        plots.replaceChildren();
        tables.replaceChildren();
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
        try {
          cancel = runProgram(request, receive, root);
          timer = setTimeout(
            () => finish('Execução interrompida após dois minutos.'),
            MAX_RUN_MS,
          );
        } catch (error) {
          finish(error instanceof Error ? error.message : String(error));
        }
      };
      if (root.dataset.autoRun === 'true')
        observeExample(root, (release) => {
          // A reader may edit or run before this example reaches the queue.
          if (
            interacted ||
            cancel ||
            editors.some(
              (editor, index) =>
                editor.state.doc.toString() !== originals[index],
            )
          ) {
            release();
            return;
          }
          releaseAutoRun = release;
          run();
        });
      input?.addEventListener('input', edited);
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
        interacted = true;
        finish('');
        if (input && originalInput !== undefined) input.value = originalInput;
        result.hidden = true;
        output.textContent = '';
        plots.replaceChildren();
        tables.replaceChildren();
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
      const toolbarObserver = fitToolbarTitle(root);
      runButton.disabled = false;
      resetButton.disabled = false;
      window.addEventListener(
        'pagehide',
        () => {
          cancel?.();
          clearTimeout(timer);
          toolbarObserver.disconnect();
          editors.forEach((editor) => editor.destroy());
        },
        { once: true },
      );
    });
}
