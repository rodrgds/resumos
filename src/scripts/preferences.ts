import { readingFonts } from '../data/reading-fonts';
const allowed = {
  theme: ['system', 'light', 'dark'],
  accent: ['red', 'blue', 'green'],
  width: ['normal', 'wide'],
  font: readingFonts.map((font) => font.id),
  size: ['100', '110', '120'],
} as const;
type Key = keyof typeof allowed;
const storageKey = 'resumos-preferences';
const root = document.documentElement;
const media = matchMedia('(prefers-color-scheme: dark)');
const defaults = Object.fromEntries(
  Object.entries(allowed).map(([key, values]) => [key, values[0]]),
);
let preferences: Record<string, string> = { ...defaults };
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  for (const key of Object.keys(allowed) as Key[]) {
    if ((allowed[key] as readonly string[]).includes(saved?.[key]))
      preferences[key] = saved[key];
  }
} catch {
  /* Storage can be unavailable in private browsing. Defaults still work. */
}

function apply() {
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
  };
  const save = () => {
    apply();
    output.value = `${preferences.size}%`;
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
