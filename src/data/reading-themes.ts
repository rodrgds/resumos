// Palette references and adaptations are recorded in README.md.
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
const palette = (values: string[]): Record<string, string> =>
  Object.fromEntries(tokens.map((key, i) => [key, values[i]]));
export const readingThemes: readonly {
  id: string;
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}[] = [
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
      '#8839ef',
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
      '#bd93f9',
      '#403550',
    ]),
  },
] as const;
