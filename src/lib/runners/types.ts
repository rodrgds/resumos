export type Language =
  | 'python'
  | 'javascript'
  | 'sql'
  | 'sqlite'
  | 'postgresql'
  | 'cpp'
  | 'java'
  | 'c'
  | 'haskell'
  | 'prolog'
  | 'php'
  | 'riscv';
export interface RunRequest {
  language: Language;
  code: string;
  input: string;
  // Editable support files, in tab order. The main program is always `code`.
  files?: Record<string, string>;
}
export type RunMessage =
  | { type: 'output' | 'status' | 'error'; text: string }
  | {
      type: 'table';
      columns: string[];
      rows: (string | null)[][];
      truncated: boolean;
    }
  | { type: 'image'; data: string; alt: string }
  | { type: 'done'; exitCode: number };
export const OUTPUT_LIMIT = 32_000;

export const LANGUAGE_LABELS: Record<Language, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  sql: 'SQLite',
  sqlite: 'SQLite',
  postgresql: 'PostgreSQL',
  cpp: 'C++',
  java: 'Java',
  c: 'C',
  haskell: 'Haskell',
  prolog: 'Prolog',
  php: 'PHP',
  riscv: 'RISC-V',
};
export const isDatabase = (language: Language) =>
  ['sql', 'sqlite', 'postgresql'].includes(language);
