import { runIsolated } from './isolated';
import { runPython } from './python';
import type { RunMessage, RunRequest } from './types';

export function runProgram(
  request: RunRequest,
  receive: (message: RunMessage) => void,
  parent: HTMLElement,
): () => void {
  if (request.language === 'python') return runPython(request, receive);
  if (['java', 'haskell', 'prolog', 'php'].includes(request.language))
    return runIsolated(request, receive, parent);

  // Static constructors let Vite bundle each disposable runtime.
  const worker =
    request.language === 'riscv'
      ? new Worker(
          new URL('../../scripts/runners/riscv.worker.ts', import.meta.url),
          { type: 'module' },
        )
      : new Worker(
          new URL('../../scripts/runners/wasi.worker.ts', import.meta.url),
          { type: 'module' },
        );
  worker.onmessage = ({ data }) => receive(data);
  worker.onerror = () =>
    receive({
      type: 'error',
      text: 'Não foi possível executar. Verifica a ligação e tenta novamente.',
    });
  worker.postMessage(request);
  return () => worker.terminate();
}
