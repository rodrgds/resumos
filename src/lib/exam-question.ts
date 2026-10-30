import type { CodeAnswer } from './code-exercise';

export type ExamAnswer =
  | CodeAnswer
  | { kind: 'self'; checklist: string[] }
  | { kind: 'number'; value: number; tolerance: number; unit?: string }
  | {
      kind: 'choice';
      options: { text: string; correct: boolean; explanation: string }[];
    };

export type ExamCodeLanguage =
  | 'text'
  | 'prolog'
  | 'sql'
  | 'haskell'
  | 'python'
  | 'javascript'
  | 'java'
  | 'c'
  | 'cpp'
  | 'bash'
  | 'json'
  | 'yaml'
  | 'html'
  | 'css'
  | 'markdown'
  | 'latex';

/** A question imported from an old exam or exercise sheet. */
export interface ExamQuestion {
  id: string;
  title: string;
  /** Short provenance label, for example "Teste 1, 2023/24". */
  source?: string;
  /** Slug used by the page to group questions under a topic heading. */
  topic?: string;
  /** Optional instruction from the original exam, such as a prohibited function. */
  restriction?: string;
  /** Markdown, including display maths and code spans. */
  prompt: string;
  context?: string;
  definitions?: string;
  definitionsLanguage?: ExamCodeLanguage;
  figures?: { label: string; alt: string; svg: string }[];
  answer: ExamAnswer;
  /** Markdown for non-code answers; source code for code answers. */
  solution: string;
  reasoning: string;
  explanation?: string;
  revision?: number;
  hint?: string;
  hintMore?: string;
  mistakes?: string;
}
