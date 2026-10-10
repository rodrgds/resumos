import { readingThemes } from '../data/reading-themes';
import codeThemes from '../generated/code-colors.json';

// Build-time CSS keeps palette tables out of the parser-blocking preferences script.
export function readingThemeStyles() {
  return readingThemes
    .flatMap((palette) =>
      (['light', 'dark'] as const).map((mode) => {
        const syntax = codeThemes[palette.id as keyof typeof codeThemes][mode];
        const tokens = {
          ...palette[mode],
          ...Object.fromEntries(
            Object.entries(syntax).map(([key, value]) => [
              key === 'foreground' ? 'code-foreground' : `code-token-${key}`,
              value,
            ]),
          ),
        };
        return `:root[data-palette="${palette.id}"][data-theme="${mode}"]{${Object.entries(
          tokens,
        )
          .map(([key, value]) => `--${key}:${value}`)
          .join(';')}}`;
      }),
    )
    .join('\n');
}
