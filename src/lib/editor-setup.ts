import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  Decoration,
  EditorView,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
} from '@codemirror/view';
import { EditorState, Prec } from '@codemirror/state';
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  bracketMatching,
  foldKeymap,
  LanguageSupport,
  Language,
  LRLanguage,
} from '@codemirror/language';
import {
  history,
  defaultKeymap,
  historyKeymap,
  indentWithTab,
  temporarilySetTabFocusMode,
} from '@codemirror/commands';
import {
  highlightSelectionMatches,
  searchKeymap,
  selectNextOccurrence,
} from '@codemirror/search';
import {
  closeBrackets,
  autocompletion,
  closeBracketsKeymap,
  completionKeymap,
  completeFromList,
  ifNotIn,
} from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { styleTags } from '@lezer/highlight';
import { codeHighlightStyle, parameter } from './editor-highlight';
import { editorVim } from './editor-vim';

// Remaining reserved words from https://docs.python.org/3/reference/lexical_analysis.html#keywords.
// The language package already supplies constants and compound-statement snippets.
const pythonKeywords = ifNotIn(
  ['String', 'FormatString', 'Comment', 'PropertyName'],
  completeFromList(
    [
      'and',
      'as',
      'assert',
      'async',
      'await',
      'break',
      'continue',
      'del',
      'elif',
      'else',
      'except',
      'finally',
      'global',
      'in',
      'is',
      'lambda',
      'nonlocal',
      'not',
      'or',
      'pass',
      'raise',
      'return',
      'with',
      'yield',
    ].map((label) => ({ label, type: 'keyword' })),
  ),
);
export function editorLanguage(support: LanguageSupport | Language) {
  if (
    !(support instanceof LanguageSupport) ||
    !(support.language instanceof LRLanguage)
  )
    return support;
  return new LanguageSupport(
    support.language.configure({
      props: [
        styleTags({
          'ParamList/VariableName ParamList/VariableDefinition ParameterDeclaration/VariableName':
            parameter,
        }),
      ],
    }),
    [
      support.support,
      ...(support.language.name === 'python'
        ? [support.language.data.of({ autocomplete: pythonKeywords })]
        : []),
    ],
  );
}

const selectedWhitespace = EditorView.decorations.compute(
  ['doc', 'selection'],
  (state) =>
    Decoration.set(
      state.selection.ranges.flatMap(({ from, to }) =>
        Array.from(state.sliceDoc(from, to).matchAll(/[ \t]/g), (match) =>
          Decoration.mark({
            class: match[0] === ' ' ? 'cm-highlightSpace' : 'cm-highlightTab',
          }).range(from + match.index, from + match.index + 1),
        ),
      ),
      true,
    ),
);

export function editorSetup(root: HTMLElement) {
  return [
    editorVim(),
    Prec.highest(
      EditorView.domEventHandlers({
        keydown(event, view) {
          // Multiple selections consume Escape before CodeMirror's Tab escape handler.
          if (event.key === 'Escape') temporarilySetTabFocusMode(view);
          return false;
        },
      }),
    ),
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    selectedWhitespace,
    history(),
    foldGutter({
      markerDOM(open) {
        const template = root.querySelector<HTMLTemplateElement>(
          open ? '[data-fold-open]' : '[data-fold-closed]',
        )!;
        return template.content.firstElementChild!.cloneNode(
          true,
        ) as HTMLElement;
      },
    }),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    syntaxHighlighting(codeHighlightStyle),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    keymap.of([
      { key: 'Ctrl-d', run: selectNextOccurrence, preventDefault: true },
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap,
      indentWithTab,
    ]),
  ];
}
