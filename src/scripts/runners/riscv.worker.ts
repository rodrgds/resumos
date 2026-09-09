import { makeRiscVFromFiles, RISCV, StopReason } from '@specy/risc-v';
import {
  OUTPUT_LIMIT,
  type RunRequest,
  type RunMessage,
} from '../../lib/runners/types';

const send = (message: RunMessage) => self.postMessage(message);
self.onmessage = async ({
  data: { code, input },
}: MessageEvent<RunRequest>) => {
  try {
    let outputLength = 0;
    const output = (value: unknown) => {
      const text = String(value);
      outputLength += text.length;
      if (outputLength > OUTPUT_LIMIT)
        throw new Error('Saída demasiado longa. Reduz o número de resultados.');
      send({ type: 'output', text });
    };
    let cursor = 0;
    const readLine = () => {
      if (cursor >= input.length)
        throw new Error(
          'Faltam dados de entrada. Acrescenta uma linha e volta a executar.',
        );
      const end = input.indexOf('\n', cursor);
      const line = input
        .slice(cursor, end < 0 ? input.length : end)
        .replace(/\r$/, '');
      cursor = end < 0 ? input.length : end + 1;
      return line;
    };
    const readNumber = (kind: 'integer' | 'float') => {
      const line = readLine().trim();
      const value = Number(line);
      if (
        !line ||
        !Number.isFinite(value) ||
        (kind === 'integer' &&
          (!Number.isInteger(value) ||
            value < -2147483648 ||
            value > 2147483647))
      )
        throw new Error(
          kind === 'integer'
            ? 'A entrada deve ser um inteiro de 32 bits.'
            : 'A entrada deve ser um número.',
        );
      return value;
    };
    send({ type: 'status', text: 'A montar o programa…' });
    const simulator = makeRiscVFromFiles({ 'main.s': code }, 'main.s');
    RISCV.setIs64Bit(false);
    for (const name of [
      'printInt',
      'printFloat',
      'printDouble',
      'printString',
      'printChar',
      'log',
    ] as const)
      simulator.registerHandler(name, output);
    simulator.registerHandler('logLine', (line) => output(line + '\n'));
    simulator.registerHandler('readInt', () => readNumber('integer'));
    simulator.registerHandler('readFloat', () => readNumber('float'));
    simulator.registerHandler('readDouble', () => readNumber('float'));
    simulator.registerHandler('readString', readLine);
    simulator.registerHandler('readChar', () => {
      if (cursor >= input.length) throw new Error('Faltam dados de entrada.');
      return input[cursor++];
    });
    const assembly = simulator.assemble();
    if (assembly.report) output(assembly.report);
    if (assembly.hasErrors) return send({ type: 'done', exitCode: 1 });
    simulator.initialize(true);
    simulator.setUndoEnabled(false);
    send({ type: 'status', text: 'A executar…' });
    const reason = await simulator.simulate();
    send({ type: 'done', exitCode: reason === StopReason.EXCEPTION ? 1 : 0 });
  } catch (error) {
    send({
      type: 'error',
      text: error instanceof Error ? error.message : String(error),
    });
  }
};
