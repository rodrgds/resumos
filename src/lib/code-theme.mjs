import { createCssVariablesTheme } from 'shiki';
import { transformerRenderWhitespace } from '@shikijs/transformers';

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

export const codeShikiConfig = {
  theme: codeTheme,
  transformers: [
    transformerRenderWhitespace(),
    {
      name: 'preserve-selection-colour',
      span(node) {
        const style = node.properties.style;
        if (typeof style !== 'string') return;
        const colour = style.match(/(?:^|;)\s*color:\s*([^;]+)/)?.[1];
        if (colour)
          node.properties.style = `${style};--code-selected-text:${colour}`;
      },
    },
  ],
};
