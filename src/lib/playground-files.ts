import { isDatabase, type Language } from './runners/types';

// The tab name shown for the executable program of each language. Java must
// stay Main.java because the runner compiles that exact class.
export const MAIN_FILENAMES: Record<Language, string> = {
  python: 'main.py',
  javascript: 'main.js',
  sql: 'main.sql',
  sqlite: 'main.sql',
  postgresql: 'main.sql',
  cpp: 'main.cpp',
  c: 'main.c',
  java: 'Main.java',
  haskell: 'Main.hs',
  prolog: 'main.pl',
  php: 'main.php',
  riscv: 'main.s',
};

// The browser GHC compiles a single module from a source string, so support
// files would never reach the program. Reject them at build time instead of
// showing tabs that do nothing.
export const SINGLE_FILE_LANGUAGES: Language[] = ['haskell'];

export const MAX_SUPPORT_FILES = 8;
export const MAX_FILE_CHARS = 32_000;

const SAFE_NAME = /^[A-Za-z0-9_][A-Za-z0-9_.-]*$/;
// The WASI runner keeps the compiled program at these root paths.
const RESERVED_NAMES = new Set(['program', 'program.o', 'program.wasm']);

export interface SupportFile {
  name: string;
  content: string;
}

// Validates the `files` prop of CodePlayground and returns the entries in tab
// order. Throws at build time so a typo fails the build, not the execution.
export function supportFiles(
  language: Language,
  files: Record<string, string> | undefined,
): SupportFile[] {
  const entries = Object.entries(files ?? {});
  if (entries.length > 0 && SINGLE_FILE_LANGUAGES.includes(language))
    throw new Error(
      `CodePlayground: a linguagem ${language} só aceita o ficheiro principal.`,
    );
  if (entries.length > MAX_SUPPORT_FILES)
    throw new Error(
      `CodePlayground: no máximo ${MAX_SUPPORT_FILES} ficheiros de apoio.`,
    );
  const seen = new Set<string>();
  return entries.map(([name, content]) => {
    if (!SAFE_NAME.test(name) || name.length > 64 || RESERVED_NAMES.has(name))
      throw new Error(`CodePlayground: nome de ficheiro inválido: ${name}.`);
    if (name === MAIN_FILENAMES[language])
      throw new Error(
        `CodePlayground: ${name} é o ficheiro principal; edita code em vez de o repetir em files.`,
      );
    if (typeof content !== 'string')
      throw new Error(
        `CodePlayground: o conteúdo de ${name} tem de ser texto.`,
      );
    if (isDatabase(language) && !name.toLowerCase().endsWith('.sql'))
      throw new Error(
        'CodePlayground: os ficheiros de apoio SQL têm de acabar em .sql.',
      );
    const text = content.trim();
    if (!text) throw new Error(`CodePlayground: ${name} está vazio.`);
    if (text.length > MAX_FILE_CHARS)
      throw new Error(`CodePlayground: ${name} ultrapassa o limite de texto.`);
    const lower = name.toLowerCase();
    if (seen.has(lower))
      throw new Error(`CodePlayground: ficheiro repetido: ${name}.`);
    seen.add(lower);
    return { name, content: text };
  });
}

// Maps a support filename to an editor language. Returns null for data files,
// which use plain text instead of a programming mode.
export function supportLanguage(
  language: Language,
  name: string,
): Language | null {
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  switch (extension) {
    case 'py':
      return 'python';
    case 'js':
    case 'mjs':
    case 'cjs':
      return 'javascript';
    case 'json':
      return 'javascript';
    case 'sql':
      return language === 'postgresql' ? 'postgresql' : 'sqlite';
    case 'cpp':
    case 'cc':
    case 'hpp':
    case 'h':
    case 'c':
      return language === 'c' || language === 'cpp' ? language : 'cpp';
    case 'java':
      return 'java';
    case 'pl':
      return 'prolog';
    case 'php':
      return 'php';
    case 's':
    case 'asm':
      return 'riscv';
    default:
      return null;
  }
}
