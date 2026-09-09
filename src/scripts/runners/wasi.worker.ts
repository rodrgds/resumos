import { WASI, type WASIFS } from '@runno/wasi';
import { Archive } from '@obsidize/tar-browserify';
import {
  OUTPUT_LIMIT,
  type RunRequest,
  type RunMessage,
} from '../../lib/runners/types';

// Runtime binaries and compiler flags follow Runno's supported language recipes.
const ASSETS = 'https://runno.dev/langs/';
const send = (message: RunMessage) => self.postMessage(message);
async function asset(name: string) {
  const response = await fetch(ASSETS + name);
  if (!response.ok)
    throw new Error(`Não foi possível carregar ${name}. Tenta novamente.`);
  return response;
}
async function filesystem(name: string): Promise<WASIFS> {
  const response = await asset(name);
  const stream = response.body!.pipeThrough(new DecompressionStream('gzip'));
  const { entries } = await Archive.extract(
    new Uint8Array(await new Response(stream).arrayBuffer()),
  );
  return Object.fromEntries(
    entries
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const path = '/' + entry.fileName.replace(/^\/+/, '');
        const date = new Date(entry.lastModified);
        return [
          path,
          {
            path,
            mode: 'binary',
            content: entry.content!,
            timestamps: { access: date, modification: date, change: date },
          },
        ];
      }),
  );
}
self.onmessage = async ({ data }: MessageEvent<RunRequest>) => {
  try {
    const { language, code, input } = data;
    let fs: WASIFS = {};
    let remainingInput: string | null = input
      ? input.replace(/\n?$/, '\n')
      : null;
    let outputLength = 0;
    const output = (text: string) => {
      outputLength += text.length;
      if (outputLength > OUTPUT_LIMIT)
        throw new Error(
          'A saída ultrapassou 32 mil caracteres. Reduz o número de resultados.',
        );
      send({ type: 'output', text });
    };
    const run = async (binary: string | Response, args: string[]) => {
      const result = await WASI.start(
        typeof binary === 'string' ? asset(binary) : binary,
        {
          args,
          fs,
          env: {},
          stdout: output,
          stderr: output,
          stdin: () => {
            const value = remainingInput;
            remainingInput = null;
            return value;
          },
        },
      );
      fs = result.fs;
      return result.exitCode;
    };
    send({ type: 'status', text: 'A carregar o motor…' });
    if (language === 'python') fs = await filesystem('python-3.11.3.tar.gz');
    if (language === 'cpp' || language === 'c')
      fs = await filesystem('clang-fs.tar.gz');
    const date = new Date();
    fs['/program'] = {
      path: '/program',
      mode: 'string',
      content: code,
      timestamps: { access: date, modification: date, change: date },
    };
    let exitCode: number;
    if (language === 'cpp' || language === 'c') {
      send({ type: 'status', text: 'A compilar…' });
      exitCode = await run('clang.wasm', [
        'clang',
        '-cc1',
        '-Werror',
        '-emit-obj',
        '-disable-free',
        '-isysroot',
        '/sys',
        '-internal-isystem',
        '/sys/include/c++/v1',
        '-internal-isystem',
        '/sys/include',
        '-internal-isystem',
        '/sys/lib/clang/8.0.1/include',
        '-ferror-limit',
        '4',
        '-fmessage-length',
        '80',
        '-O2',
        language === 'c' ? '-std=c17' : '-std=c++17',
        '-o',
        '/program.o',
        '-x',
        language === 'c' ? 'c' : 'c++',
        '/program',
      ]);
      if (exitCode === 0)
        exitCode = await run('wasm-ld.wasm', [
          'wasm-ld',
          '--no-threads',
          '--export-dynamic',
          '-z',
          'stack-size=1048576',
          '-L/sys/lib/wasm32-wasi',
          '/sys/lib/wasm32-wasi/crt1.o',
          '/program.o',
          '-lc',
          '-lc++',
          '-lc++abi',
          '-o',
          '/program.wasm',
        ]);
      if (exitCode !== 0) return send({ type: 'done', exitCode });
      send({ type: 'status', text: 'A executar…' });
      const compiled = fs['/program.wasm'];
      exitCode = await run(
        new Response(new Uint8Array(compiled.content as Uint8Array), {
          headers: { 'Content-Type': 'application/wasm' },
        }),
        ['program'],
      );
    } else {
      send({ type: 'status', text: 'A executar…' });
      const commands = {
        python: ['python-3.11.3.wasm', ['python', '/program']],
        javascript: ['wasmedge_quickjs.wasm', ['quickjs', '/program']],
        sql: ['sqlite.wasm', ['sqlite', '-batch', '-cmd', '.read /program']],
      } as const;
      if (!(language in commands))
        throw new Error('Esta linguagem usa um motor isolado.');
      const [binary, args] = commands[language as keyof typeof commands];
      exitCode = await run(binary, [...args]);
    }
    send({ type: 'done', exitCode });
  } catch (error) {
    send({
      type: 'error',
      text: error instanceof Error ? error.message : String(error),
    });
  }
};
