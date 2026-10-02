import { createCssVariablesTheme } from 'shiki';

export const codeTheme = createCssVariablesTheme({ variablePrefix: '--code-' });
codeTheme.tokenColors = [
  ...codeTheme.tokenColors.filter((rule) => rule.scope?.includes?.('markup')),
  ...Object.entries({
    variable: ['variable'],
    keyword: ['keyword'],
    modifier: ['storage'],
    operator: ['keyword.operator'],
    string: ['string'],
    constant: ['constant', 'constant.numeric'],
    boolean: ['constant.language.boolean', 'constant.language.null'],
    function: ['entity.name.function', 'support.function', 'variable.function'],
    type: [
      'entity.name.type',
      'entity.name.class',
      'support.type',
      'support.class',
      'entity.other.inherited-class',
    ],
    property: [
      'variable.other.property',
      'support.type.property-name',
      'entity.other.attribute-name',
    ],
    parameter: ['variable.parameter'],
    punctuation: ['punctuation'],
    comment: ['comment', 'string.quoted.docstring'],
  }).map(([key, scope]) => ({
    scope,
    settings: { foreground: `var(--code-token-${key})` },
  })),
];
