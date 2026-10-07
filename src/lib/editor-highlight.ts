import { HighlightStyle } from '@codemirror/language';
import { tags, Tag } from '@lezer/highlight';

export const parameter = Tag.define(tags.variableName);

export const codeHighlightStyle = HighlightStyle.define([
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
