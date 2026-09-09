importScripts(
  'https://cdn.jsdelivr.net/npm/swipl-wasm@8.1.2/dist/swipl/swipl-web.js',
);
self.onmessage = async ({ data: { code, input } }) => {
  const send = (message) => self.postMessage(message);
  const output = (text) => send({ type: 'output', text: text + '\n' });
  try {
    const bytes = new TextEncoder().encode(input);
    let position = 0;
    const swipl = await globalThis.SWIPL({
      arguments: ['-q'],
      print: output,
      printErr: output,
      locateFile: (path) =>
        'https://cdn.jsdelivr.net/npm/swipl-wasm@8.1.2/dist/swipl/' + path,
      stdin: () => (position < bytes.length ? bytes[position++] : null),
    });
    swipl.FS.writeFile('/program.pl', code);
    send({ type: 'status', text: 'A executar…' });
    const result = swipl.prolog.query("consult('/program.pl'), main.").once();
    if (result.error) throw new Error(result.message);
    send({ type: 'done', exitCode: result.success ? 0 : 1 });
  } catch (error) {
    send({ type: 'error', text: error.message || String(error) });
  }
};
