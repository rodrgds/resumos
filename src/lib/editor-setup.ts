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
  HighlightStyle,
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
import { tags, Tag, styleTags } from '@lezer/highlight';
import { editorVim } from './editor-vim';

const parameter = Tag.define(tags.variableName);
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

const codeHighlightStyle = HighlightStyle.define([
  {
    tag: parameter,
    color: 'var(--code-token-parameter)',
    '--code-selected-text': 'var(--code-token-parameter)',
  },
  {
    tag: [tags.keyword, tags.meta],
    color: 'var(--code-token-keyword)',
    '--code-selected-text': 'var(--code-token-keyword)',
  },
  {
    tag: [tags.string, tags.attributeValue],
    color: 'var(--code-token-string)',
    '--code-selected-text': 'var(--code-token-string)',
  },
  {
    tag: [tags.number, tags.null, tags.constant(tags.name), tags.color],
    color: 'var(--code-token-constant)',
    '--code-selected-text': 'var(--code-token-constant)',
  },
  {
    tag: [
      tags.function(tags.variableName),
      tags.function(tags.propertyName),
      tags.tagName,
      tags.labelName,
    ],
    color: 'var(--code-token-function)',
    '--code-selected-text': 'var(--code-token-function)',
  },
  {
    tag: [tags.propertyName, tags.attributeName],
    color: 'var(--code-token-property)',
    '--code-selected-text': 'var(--code-token-property)',
  },
  {
    tag: tags.variableName,
    color: 'var(--code-token-variable)',
    '--code-selected-text': 'var(--code-token-variable)',
  },
  {
    tag: tags.typeName,
    color: 'var(--code-token-type)',
    '--code-selected-text': 'var(--code-token-type)',
  },
  {
    tag: tags.bool,
    color: 'var(--code-token-boolean)',
    '--code-selected-text': 'var(--code-token-boolean)',
  },
  {
    tag: tags.operator,
    color: 'var(--code-token-operator)',
    '--code-selected-text': 'var(--code-token-operator)',
  },
  {
    tag: tags.modifier,
    color: 'var(--code-token-modifier)',
    '--code-selected-text': 'var(--code-token-modifier)',
  },
  {
    tag: tags.punctuation,
    color: 'var(--code-token-punctuation)',
    '--code-selected-text': 'var(--code-token-punctuation)',
  },
  {
    tag: tags.comment,
    color: 'var(--code-token-comment)',
    '--code-selected-text': 'var(--code-token-comment)',
    fontStyle: 'italic',
  },
]);

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
