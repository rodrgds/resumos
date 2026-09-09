import { readingThemes } from '../data/reading-themes';
import { readingFonts } from '../data/reading-fonts';
import { readingHistory } from '../lib/reading-history';
import { codeFonts } from '../data/code-fonts';
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
const readingPages = document.querySelector('#reading-pages');
if (readingPages) {
  const paths = new Set(
    (JSON.parse(readingPages.textContent!) as { path: string }[]).map(
      (page) => page.path,
    ),
  );
  root.dataset.hasHistory = String(
    readingHistory().some((visit) => paths.has(visit.path)),
  );
}
const media = matchMedia('(prefers-color-scheme: dark)');
const defaults = Object.fromEntries(
  Object.entries(allowed).map(([key, values]) => [key, values[0]]),
);
defaults.width = '1360';
defaults.measure = '720';
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
  for (const [key, value] of Object.entries(preferences))
    root.dataset[key] = value;
  root.dataset.theme =
    preferences.theme === 'system'
      ? media.matches
        ? 'dark'
        : 'light'
      : preferences.theme;
  root.style.setProperty('--container', `${preferences.width}px`);
  root.style.setProperty('--reading-width', `${preferences.measure}px`);
  for (const key of [
    'page',
    'surface',
    'text',
    'muted',
    'line',
    'soft',
    'accent',
    'accent-soft',
    'diagram-secondary',
  ])
    root.style.removeProperty(`--${key}`);
  const palette = readingThemes.find(
    (theme) => theme.id === preferences.palette,
  )!;
  const colors = root.dataset.theme === 'dark' ? palette.dark : palette.light;
  for (const [key, value] of Object.entries(colors))
    root.style.setProperty(`--${key}`, value);
}
apply();
media.addEventListener('change', apply);

function bind() {
  const form = document.querySelector<HTMLFormElement>('#preferences');
  const output = document.querySelector<HTMLOutputElement>('#size-value');
  if (!form || !output) return;
  const sync = () => {
    for (const input of form.querySelectorAll<
      HTMLInputElement | HTMLSelectElement
    >('input, select')) {
      if (input instanceof HTMLInputElement && input.type === 'radio')
        input.checked = input.value === preferences[input.name];
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
