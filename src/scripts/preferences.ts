import { readingFonts } from '../data/reading-fonts';
import { readingHistory } from '../lib/reading-history';
import { readSemesterPins } from '../lib/pinned-semesters';
import { codeFonts } from '../data/code-fonts';
import { readReadingPages } from '../lib/reading-catalog';
interface ThemeOption {
  id: string;
  name: string;
  family?: string;
  variant?: string;
}

export function setupPreferences(readingThemes: ThemeOption[]) {
  const allowed = {
    theme: ['system', 'light', 'dark'],
    accent: ['red', 'blue', 'green'],
    palette: readingThemes.map((theme) => theme.id),
    width: Array.from({ length: 12 }, (_, i) => String(1040 + i * 80)),
    measure: Array.from({ length: 12 }, (_, i) => String(560 + i * 40)),
    font: readingFonts.map((font) => font.id),
    codeFont: codeFonts.map((font) => font.id),
    size: ['100', '110', '120'],
  } as const;
  type Key = keyof typeof allowed;
  const storageKey = 'resumos-preferences';
  const root = document.documentElement;
  const semesters = document.querySelector('#pinnable-semesters');
  if (semesters)
    root.dataset.hasPins = String(
      readSemesterPins(JSON.parse(semesters.textContent!)).size > 0,
    );
  const readingPages = document.querySelector('#reading-pages');
  if (readingPages) {
    const paths = new Set(readReadingPages().map((page) => page.path));
    root.dataset.hasHistory = String(
      readingHistory().some((visit) => paths.has(visit.path)),
    );
  }
  const media = matchMedia('(prefers-color-scheme: dark)');
  const defaults = Object.fromEntries(
    Object.entries(allowed).map(([key, values]) => [key, values[0]]),
  );
  defaults.width = '1200';
  defaults.measure = '640';
  defaults.font = 'serif';
  let preferences: Record<string, string> = { ...defaults };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved.width === 'normal') saved.width = '1360';
    if (saved.width === 'wide') saved.width = '1840';
    for (const key of Object.keys(allowed) as Key[]) {
      if ((allowed[key] as readonly string[]).includes(saved?.[key]))
        preferences[key] = saved[key];
    }
  } catch {
    /* Storage can be unavailable in private browsing. Defaults still work. */
  }

  function apply() {
    root.style.setProperty(
      '--code-font',
      codeFonts.find((font) => font.id === preferences.codeFont)!.family,
    );
    root.style.setProperty(
      '--reading-font',
      readingFonts.find((font) => font.id === preferences.font)!.family,
    );
    for (const [key, value] of Object.entries(preferences)) {
      if (key !== 'theme' && root.dataset[key] !== value)
        root.dataset[key] = value;
    }
    root.dataset.theme =
      preferences.theme === 'system'
        ? media.matches
          ? 'dark'
          : 'light'
        : preferences.theme;
    root.style.setProperty('--container', `${preferences.width}px`);
    root.style.setProperty('--reading-width', `${preferences.measure}px`);
  }
  apply();
  media.addEventListener('change', apply);

  function bind() {
    const form = document.querySelector<HTMLFormElement>('#preferences');
    const output = document.querySelector<HTMLOutputElement>('#size-value');
    if (!form || !output) return;
    const sync = () => {
      const selected = readingThemes.find(
        (theme) => theme.id === preferences.palette,
      )!;
      const family = selected.family || selected.name;
      form.querySelector<HTMLElement>('#palette-variant-label')!.textContent =
        family === 'Flexoki' ? 'Acento Flexoki' : 'Variante';
      const variants =
        form.querySelector<HTMLSelectElement>('#palette-variant')!;
      if (variants.dataset.family !== family) {
        variants.replaceChildren(
          ...readingThemes
            .filter((theme) => (theme.family || theme.name) === family)
            .map((theme) => new Option(theme.variant || theme.name, theme.id)),
        );
        variants.dataset.family = family;
      }
      form.querySelector<HTMLElement>('#theme-variant')!.hidden =
        variants.options.length < 2;
      for (const input of form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement
      >('input, select')) {
        if (input instanceof HTMLInputElement && input.type === 'radio')
          input.checked = input.dataset.themeFamily
            ? input.dataset.themeFamily === family
            : input.value === preferences[input.name];
        else input.value = preferences[input.name];
      }
      output.value = `${preferences.size}%`;
      document.querySelector<HTMLOutputElement>('#width-value')!.value =
        `${preferences.width} px`;
      document.querySelector<HTMLOutputElement>('#measure-value')!.value =
        `${preferences.measure} px`;
    };
    const save = () => {
      apply();
      output.value = `${preferences.size}%`;
      document.querySelector<HTMLOutputElement>('#width-value')!.value =
        `${preferences.width} px`;
      document.querySelector<HTMLOutputElement>('#measure-value')!.value =
        `${preferences.measure} px`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(preferences));
      } catch {
        /* Keep preferences for this visit. */
      }
    };
    sync();
    form.addEventListener('input', (event) => {
      const input = event.target;
      if (!(
        input instanceof HTMLInputElement || input instanceof HTMLSelectElement
      ))
        return;
      const key = input.name as Key;
      if (
        key in allowed &&
        (allowed[key] as readonly string[]).includes(input.value)
      ) {
        preferences[key] = input.value;
        save();
        sync();
      }
    });
    form.addEventListener('reset', (event) => {
      event.preventDefault();
      preferences = { ...defaults };
      save();
      sync();
    });
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', bind);
  else bind();
}
