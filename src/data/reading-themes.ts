// Palette references and adaptations are recorded in docs/leitura.md.
const tokens = [
  'page',
  'surface',
  'text',
  'muted',
  'line',
  'soft',
  'accent',
  'accent-soft',
] as const;
const palette = (values: string[]): Record<string, string> => ({
  ...Object.fromEntries(tokens.map((key, i) => [key, values[i]])),
  'diagram-secondary': `color-mix(in srgb, ${values[6]} 65%, ${values[2]})`,
});
type ReadingTheme = {
  id: string;
  name: string;
  family?: string;
  variant?: string;
  light: Record<string, string>;
  dark: Record<string, string>;
};
const baseThemes: readonly ReadingTheme[] = [
  { id: 'feup', name: 'FEUP', light: {}, dark: {} },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    light: palette([
      '#fbf1c7',
      '#f9f5d7',
      '#3c3836',
      '#665c54',
      '#d5c4a1',
      '#ebdbb2',
      '#9d0006',
      '#f2dfbd',
    ]),
    dark: palette([
      '#282828',
      '#32302f',
      '#ebdbb2',
      '#bdae93',
      '#504945',
      '#3c3836',
      '#fabd2f',
      '#473e2a',
    ]),
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    light: palette([
      '#eff1f5',
      '#e6e9ef',
      '#4c4f69',
      '#5c5f77',
      '#bcc0cc',
      '#dce0e8',
      '#802de5',
      '#e5d7fa',
    ]),
    dark: palette([
      '#1e1e2e',
      '#242437',
      '#cdd6f4',
      '#bac2de',
      '#45475a',
      '#313244',
      '#cba6f7',
      '#382e4a',
    ]),
  },
  {
    id: 'nord',
    name: 'Nord',
    light: palette([
      '#eceff4',
      '#f5f7fa',
      '#2e3440',
      '#4c566a',
      '#c2cad6',
      '#e5e9f0',
      '#3b5b75',
      '#d8e2ec',
    ]),
    dark: palette([
      '#2e3440',
      '#353d4b',
      '#eceff4',
      '#d8dee9',
      '#4c566a',
      '#3b4252',
      '#88c0d0',
      '#364b59',
    ]),
  },
  {
    id: 'dracula',
    name: 'Dracula',
    light: palette([
      '#fffbeb',
      '#fffdf5',
      '#1f1f1f',
      '#6c664b',
      '#cfcab6',
      '#f1eddb',
      '#644ac9',
      '#eae3f9',
    ]),
    dark: palette([
      '#282a36',
      '#303240',
      '#f8f8f2',
      '#c4c5d4',
      '#55586d',
      '#44475a',
      '#cba8ff',
      '#403550',
    ]),
  },
  {
    id: 'flexoki',
    name: 'Flexoki',
    light: palette([
      '#fffcf0',
      '#f2f0e5',
      '#100f0f',
      '#64635e',
      '#dad8ce',
      '#e6e4d9',
      '#a02f6f',
      '#f4dce5',
    ]),
    dark: palette([
      '#100f0f',
      '#1c1b1a',
      '#cecdc3',
      '#9f9d96',
      '#403e3c',
      '#282726',
      '#db68a2',
      '#35232c',
    ]),
  },
  {
    id: 'solarized',
    name: 'Solarized',
    light: palette([
      '#fdf6e3',
      '#eee8d5',
      '#3e545b',
      '#4e646a',
      '#c9c5b7',
      '#e4decc',
      '#00678f',
      '#d7e4df',
    ]),
    dark: palette([
      '#002b36',
      '#073642',
      '#b3c1c1',
      '#98a6a6',
      '#36545b',
      '#123e48',
      '#69b5e0',
      '#123e48',
    ]),
  },
] as const;

function themeVariant(
  base: ReadingTheme,
  id: string,
  variant: string,
  light: Record<string, string>,
  dark: Record<string, string>,
): ReadingTheme {
  const colors = (
    overrides: Record<string, string>,
    original: Record<string, string>,
  ) => {
    const result = { ...original, ...overrides };
    result['diagram-secondary'] =
      `color-mix(in srgb, ${result.accent} 65%, ${result.text})`;
    return result;
  };
  return {
    id,
    name: `${base.name} · ${variant}`,
    family: base.name,
    variant,
    light: colors(light, base.light),
    dark: colors(dark, base.dark),
  };
}
const gruvbox = baseThemes.find((theme) => theme.id === 'gruvbox')!;
const catppuccin = baseThemes.find((theme) => theme.id === 'catppuccin')!;
const flexoki = baseThemes.find((theme) => theme.id === 'flexoki')!;

const flexokiAccents = [
  ['red', 'Vermelho', '#af3029', '#eb6456', '#ffcabb', '#3e1715'],
  ['orange', 'Laranja', '#9d4310', '#ec8b49', '#fed3af', '#40200d'],
  ['yellow', 'Amarelo', '#7f5f00', '#dfb431', '#f6e2a0', '#3a2d04'],
  ['green', 'Verde', '#536907', '#a0af54', '#dde2b2', '#252d09'],
  ['cyan', 'Ciano', '#1c6c66', '#5abdac', '#bfe8d9', '#122f2c'],
  ['blue', 'Azul', '#205ea6', '#66a0c8', '#c6dde8', '#12253b'],
  ['purple', 'Violeta', '#5e409d', '#a699d0', '#e2d9e9', '#261c39'],
] as const;

const everforest: ReadingTheme = {
  id: 'everforest',
  name: 'Everforest',
  variant: 'Medium',
  light: palette([
    '#fdf6e3',
    '#f4f0d9',
    '#46535b',
    '#5c6a72',
    '#e0dcc7',
    '#efebd4',
    '#536907',
    '#f0f1d2',
  ]),
  dark: palette([
    '#2d353b',
    '#343f44',
    '#e4dac4',
    '#b7c3b9',
    '#4f585e',
    '#3d484d',
    '#a7c080',
    '#425047',
  ]),
};

const tokyoDay = palette([
  '#e1e2e7',
  '#d0d5e3',
  '#253d73',
  '#405180',
  '#b4b5b9',
  '#c4c8da',
  '#1e5197',
  '#c4c8da',
]);
const tokyoNight: ReadingTheme = {
  id: 'tokyo-night',
  name: 'Tokyo Night',
  variant: 'Night / Day',
  light: tokyoDay,
  dark: palette([
    '#1a1b26',
    '#16161e',
    '#c0caf5',
    '#a9b1d6',
    '#3b4261',
    '#292e42',
    '#7aa2f7',
    '#292e42',
  ]),
};
const roseDawn = palette([
  '#faf4ed',
  '#fffaf3',
  '#464261',
  '#69657f',
  '#dfdad9',
  '#f4ede8',
  '#756389',
  '#f4ede8',
]);
const rosePine: ReadingTheme = {
  id: 'rose-pine',
  name: 'Rosé Pine',
  variant: 'Main / Dawn',
  light: roseDawn,
  dark: palette([
    '#191724',
    '#1f1d2e',
    '#e0def4',
    '#a4a0be',
    '#403d52',
    '#21202e',
    '#c4a7e7',
    '#403d52',
  ]),
};

export const readingThemes: readonly ReadingTheme[] = [
  ...baseThemes.map((theme) => ({
    ...theme,
    variant: (
      {
        gruvbox: 'Medium',
        catppuccin: 'Mocha / Latte',
        flexoki: 'Magenta',
      } as Record<string, string>
    )[theme.id],
  })),
  themeVariant(
    gruvbox,
    'gruvbox-hard',
    'Hard',
    { page: '#f9f5d7', surface: '#fbf1c7' },
    { page: '#1d2021', surface: '#282828' },
  ),
  themeVariant(
    gruvbox,
    'gruvbox-soft',
    'Soft',
    { page: '#f2e5bc', surface: '#fbf1c7' },
    { page: '#32302f', surface: '#3c3836' },
  ),
  themeVariant(
    catppuccin,
    'catppuccin-frappe',
    'Frappé / Latte',
    {},
    {
      page: '#303446',
      surface: '#292c3c',
      text: '#c6d0f5',
      muted: '#b5bfe2',
      line: '#51576d',
      soft: '#414559',
      accent: '#d1a5ed',
      'accent-soft': '#414559',
    },
  ),
  themeVariant(
    catppuccin,
    'catppuccin-macchiato',
    'Macchiato / Latte',
    {},
    {
      page: '#24273a',
      surface: '#1e2030',
      text: '#cad3f5',
      muted: '#b8c0e0',
      line: '#494d64',
      soft: '#363a4f',
      accent: '#c6a0f6',
      'accent-soft': '#363a4f',
    },
  ),
  ...flexokiAccents.map(([id, name, light, dark, lightSoft, darkSoft]) =>
    themeVariant(
      flexoki,
      `flexoki-${id}`,
      name,
      { accent: light, 'accent-soft': lightSoft },
      { accent: dark, 'accent-soft': darkSoft },
    ),
  ),
  everforest,
  themeVariant(
    everforest,
    'everforest-hard',
    'Hard',
    { page: '#fffbef', surface: '#f8f5e4', line: '#e8e5d5', soft: '#f2efdf' },
    { page: '#272e33', surface: '#2e383c', line: '#495156', soft: '#374145' },
  ),
  themeVariant(
    everforest,
    'everforest-soft',
    'Soft',
    {
      page: '#f3ead3',
      surface: '#eae4ca',
      line: '#d8d3ba',
      soft: '#e5dfc5',
      muted: '#55636b',
    },
    {
      page: '#333c43',
      surface: '#3a464c',
      line: '#555f66',
      soft: '#434f55',
      accent: '#afc988',
    },
  ),
  tokyoNight,
  themeVariant(
    tokyoNight,
    'tokyo-night-storm',
    'Storm / Day',
    {},
    { page: '#24283b', surface: '#1f2335' },
  ),
  themeVariant(
    tokyoNight,
    'tokyo-night-moon',
    'Moon / Day',
    {},
    {
      page: '#222436',
      surface: '#1e2030',
      text: '#c8d3f5',
      muted: '#a9b1d6',
      line: '#3b4261',
      soft: '#2f334d',
      accent: '#82aaff',
      'accent-soft': '#2f334d',
    },
  ),
  rosePine,
  themeVariant(
    rosePine,
    'rose-pine-moon',
    'Moon / Dawn',
    {},
    { page: '#232136', surface: '#2a273f', line: '#44415a', soft: '#2a283e' },
  ),
  {
    id: 'one',
    name: 'One',
    variant: 'Dark / Light',
    light: palette([
      '#fafafa',
      '#eaeaeb',
      '#383a42',
      '#61646f',
      '#dbdbdc',
      '#e5e5e6',
      '#3360c2',
      '#e5e5e6',
    ]),
    dark: palette([
      '#282c34',
      '#21252b',
      '#c7cedb',
      '#abb2bf',
      '#3e4451',
      '#3e4451',
      '#74b9f1',
      '#3e4451',
    ]),
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    light: palette([
      '#ffffff',
      '#f6f6f6',
      '#222222',
      '#5c5c5c',
      '#e4e4e4',
      '#fafafa',
      '#7e54df',
      '#ece6f7',
    ]),
    dark: palette([
      '#1c1c1c',
      '#282828',
      '#dadada',
      '#b3b3b3',
      '#333333',
      '#232323',
      '#a68af9',
      '#333333',
    ]),
  },
];

export const readingThemeFamilies = [
  ...new Set(readingThemes.map((theme) => theme.family || theme.name)),
].map((name) => ({
  name,
  themes: readingThemes.filter(
    (theme) => (theme.family || theme.name) === name,
  ),
}));
