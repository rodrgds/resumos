export type Language =
  | 'python'
  | 'javascript'
  | 'sql'
  | 'cpp'
  | 'java'
  | 'c'
  | 'haskell'
  | 'prolog'
  | 'php';
export interface RunRequest {
  language: Language;
  code: string;
  input: string;
}
export type RunMessage =
  | { type: 'output' | 'status' | 'error'; text: string }
  | { type: 'done'; exitCode: number };
export const OUTPUT_LIMIT = 32_000;
