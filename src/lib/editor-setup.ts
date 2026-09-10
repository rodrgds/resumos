import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  HighlightStyle,
  bracketMatching,
  foldKeymap,
} from '@codemirror/language';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import {
  closeBrackets,
  autocompletion,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { tags } from '@lezer/highlight';

const codeHighlightStyle = HighlightStyle.define([
  {
    tag: [tags.keyword, tags.operator, tags.modifier, tags.meta],
    color: 'var(--code-token-keyword)',
  },
  {
    tag: [tags.string, tags.attributeValue],
    color: 'var(--code-token-string)',
  },
  {
    tag: [
      tags.number,
      tags.bool,
      tags.null,
      tags.constant(tags.name),
      tags.color,
    ],
    color: 'var(--code-token-constant)',
  },
  {
    tag: [
      tags.function(tags.variableName),
      tags.function(tags.propertyName),
      tags.typeName,
      tags.tagName,
      tags.labelName,
    ],
    color: 'var(--code-token-function)',
  },
  {
    tag: [tags.propertyName, tags.attributeName],
    color: 'var(--code-token-parameter)',
  },
  { tag: tags.punctuation, color: 'var(--code-token-punctuation)' },
  {
    tag: tags.comment,
    color: 'var(--code-token-comment)',
    fontStyle: 'italic',
  },
]);

export function editorSetup(root: HTMLElement) {
  return [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
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
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      ...completionKeymap,
      ...lintKeymap,
    ]),
  ];
}
