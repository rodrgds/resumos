import { writeFile, mkdir } from 'node:fs/promises';
import { bundledThemes } from 'shiki';
import { converter, formatHex, wcagContrast, clampChroma } from 'culori';
import { readingThemes } from '../src/data/reading-themes.ts';
import { parse } from 'jsonc-parser';

// Shiki distributes the VS Code TextMate themes. Editors map Lezer categories
// to these same colours; neither renderer claims language-server semantics.
const sources = {
  feup: ['github-light', 'github-dark'],
  gruvbox: ['gruvbox-light-medium', 'gruvbox-dark-medium'],
  'gruvbox-hard': ['gruvbox-light-hard', 'gruvbox-dark-hard'],
  'gruvbox-soft': ['gruvbox-light-soft', 'gruvbox-dark-soft'],
  catppuccin: ['catppuccin-latte', 'catppuccin-mocha'],
  'catppuccin-frappe': ['catppuccin-latte', 'catppuccin-frappe'],
  'catppuccin-macchiato': ['catppuccin-latte', 'catppuccin-macchiato'],
  nord: ['nord', 'nord'],
  dracula: ['dracula', 'dracula'],
  solarized: ['solarized-light', 'solarized-dark'],
  everforest: ['everforest-light', 'everforest-dark'],
  'everforest-hard': ['everforest-light', 'everforest-dark'],
  'everforest-soft': ['everforest-light', 'everforest-dark'],
  'tokyo-night': ['tokyo-night', 'tokyo-night'],
  'tokyo-night-storm': ['tokyo-night', 'tokyo-night'],
  'tokyo-night-moon': ['tokyo-night', 'tokyo-night'],
  'rose-pine': ['rose-pine-dawn', 'rose-pine'],
  'rose-pine-moon': ['rose-pine-dawn', 'rose-pine-moon'],
  one: ['one-light', 'one-dark-pro'],
};
const scopes = {
  keyword: 'keyword.control',
  operator: 'keyword.operator',
  modifier: 'storage.modifier',
  string: 'string.quoted',
  constant: 'constant.numeric',
  boolean: 'constant.language.boolean',
  function: 'entity.name.function',
  type: 'entity.name.type',
  property: 'variable.other.property',
  parameter: 'variable.parameter',
  variable: 'variable.other.readwrite',
  comment: 'comment.line',
  punctuation: 'punctuation',
};
function foreground(theme, target) {
  let result = theme.colors?.['editor.foreground'] || theme.fg;
  let specificity = -1;
  for (const rule of theme.tokenColors) {
    if (!rule.settings.foreground) continue;
    const selectors = Array.isArray(rule.scope)
      ? rule.scope
      : (rule.scope || '').split(',');
    for (const scope of selectors.map((scope) => scope.trim())) {
      if (!scope || scope.includes(' ') || scope.includes('-')) continue;
      if (
        (target === scope || target.startsWith(`${scope}.`)) &&
        scope.length >= specificity
      ) {
        result = rule.settings.foreground;
        specificity = scope.length;
      }
    }
  }
  return result;
}
const rgb = converter('rgb');
const oklch = converter('oklch');
function mix(a, b, amount) {
  a = rgb(a);
  b = rgb(b);
  return formatHex({
    mode: 'rgb',
    r: a.r * (1 - amount) + b.r * amount,
    g: a.g * (1 - amount) + b.g * amount,
    b: a.b * (1 - amount) + b.b * amount,
  });
}
function readable(color, backgrounds, dark) {
  const contrast = (value) =>
    Math.min(
      ...backgrounds.map((background) => wcagContrast(value, background)),
    );
  if (contrast(color) >= 4.6) return color.toLowerCase();
  const original = oklch(color);
  for (let step = 1; step <= 100; step++) {
    const value = formatHex(
      clampChroma(
        {
          ...original,
          l: original.l + (((dark ? 1 : 0) - original.l) * step) / 100,
        },
        'oklch',
        'rgb',
      ),
    );
    if (contrast(value) >= 4.6) return value;
  }
  throw new Error(`Cannot adapt ${color} to ${backgrounds}`);
}
const flexoki = await Promise.all(
  ['Light', 'Dark'].map(async (mode) => {
    const response = await fetch(
      `https://raw.githubusercontent.com/kepano/flexoki/main/vscode/Flexoki-${mode}-color-theme.json`,
    );
    if (!response.ok) throw new Error(`Flexoki ${mode}: ${response.status}`);
    return response.json();
  }),
);
const tokyo = await Promise.all(
  [
    'https://raw.githubusercontent.com/enkia/tokyo-night-vscode-theme/master/themes/tokyo-night-light-color-theme.json',
    'https://raw.githubusercontent.com/enkia/tokyo-night-vscode-theme/master/themes/tokyo-night-color-theme.json',
    'https://raw.githubusercontent.com/enkia/tokyo-night-vscode-theme/master/themes/tokyo-night-storm-color-theme.json',
    'https://raw.githubusercontent.com/patricknasralla/TokyoNightMoon/main/themes/Tokyo%20Night%20Moon-color-theme.json',
  ].map(async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url}: ${response.status}`);
    return parse(await response.text());
  }),
);
const obsidian = [
  [
    '#222222',
    '#d53984',
    '#e93147',
    '#ec7500',
    '#08b94e',
    '#7852ee',
    '#7852ee',
    '#e0ac00',
    '#e0ac00',
    '#00bfbc',
    '#00bfbc',
    '#00bfbc',
    '#ababab',
    '#5c5c5c',
  ],
  [
    '#dadada',
    '#fa99cd',
    '#fb464c',
    '#e9973f',
    '#44cf6e',
    '#a882ff',
    '#a882ff',
    '#e0de71',
    '#e0de71',
    '#53dfdd',
    '#53dfdd',
    '#53dfdd',
    '#666666',
    '#b3b3b3',
  ],
].map(([foreground, ...values]) =>
  Object.fromEntries([
    ['foreground', foreground],
    ...Object.keys(scopes).map((key, index) => [key, values[index]]),
  ]),
);
const result = {};
for (const theme of readingThemes) {
  result[theme.id] = {};
  for (const [index, mode] of ['light', 'dark'].entries()) {
    const dark = mode === 'dark';
    const source = theme.id.startsWith('flexoki')
      ? flexoki[index]
      : theme.id === 'obsidian'
        ? null
        : theme.id.startsWith('tokyo-night')
          ? tokyo[
              !dark
                ? 0
                : theme.id.endsWith('moon')
                  ? 3
                  : theme.id.endsWith('storm')
                    ? 2
                    : 1
            ]
          : (await bundledThemes[sources[theme.id][index]]()).default;
    const upstream = source
      ? Object.fromEntries([
          ['foreground', source.colors?.['editor.foreground'] || source.fg],
          ...Object.entries(scopes).map(([key, scope]) => [
            key,
            foreground(source, scope),
          ]),
        ])
      : obsidian[index];
    const colors = theme[mode];
    const background = colors.surface || (dark ? '#242427' : '#ffffff');
    const text = colors.text || (dark ? '#eeedf0' : '#292a30');
    const selection = mix(background, text, 0.17);
    result[theme.id][mode] = {
      source: source?.name || 'Obsidian 1.13.7 app.css',
      upstream,
      colors: Object.fromEntries(
        Object.entries(upstream).map(([key, color]) => [
          key,
          readable(
            color,
            [
              background,
              selection,
              mix(background, text, 0.02),
              mix(selection, text, 0.02),
            ],
            dark,
          ),
        ]),
      ),
    };
  }
}
await mkdir('src/generated', { recursive: true });
await writeFile(
  'src/generated/code-themes.json',
  JSON.stringify(result, null, 2) + '\n',
);
await writeFile(
  'src/generated/code-colors.json',
  JSON.stringify(
    Object.fromEntries(
      Object.entries(result).map(([id, modes]) => [
        id,
        Object.fromEntries(
          Object.entries(modes).map(([mode, palette]) => [
            mode,
            palette.colors,
          ]),
        ),
      ]),
    ),
    null,
    2,
  ) + '\n',
);
