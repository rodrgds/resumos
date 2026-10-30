import type { CodeAnswer } from '../../../lib/code-exercise';

export interface PrologQuestion {
  id: string;
  title: string;
  prompt: string;
  context?: string;
  restriction?: string;
  definitions?: string;
  figures?: { label: string; alt: string; svg: string }[];
  answer:
    | CodeAnswer
    | { kind: 'number'; value: number; tolerance: number }
    | { kind: 'self'; checklist: string[] }
    | {
        kind: 'choice';
        options: { text: string; correct: boolean; explanation: string }[];
      };
  solution: string;
  reasoning: string;
  explanation: string;
}
