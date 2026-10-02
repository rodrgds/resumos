export interface CodeTest {
  name: string;
  code?: string;
  input?: string;
  output: string;
}

export interface CodeAnswer {
  kind: 'code';
  language: 'python' | 'javascript';
  starter: string;
  tests: CodeTest[];
}

export const normalizeTestOutput = (output: string) =>
  output.replace(/\r\n/g, '\n').replace(/\n+$/, '');
