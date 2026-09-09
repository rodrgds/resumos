self.onmessage = async ({ data: { code } }) => {
  const send = (message) => self.postMessage(message);
  const output = (text) => send({ type: 'output', text: text + '\n' });
  try {
    if (!WebAssembly.Suspending)
      throw new Error(
        'Este GHC precisa de WebAssembly JSPI. Usa uma versão recente do Chrome ou Edge.',
      );
    send({
      type: 'status',
      text: 'A carregar GHC (cerca de 50 MB na primeira vez)…',
    });
    const [
      { ConsoleStdout, File, OpenFile, PreopenDirectory, WASI },
      { DyLDBrowserHost, main },
    ] = await Promise.all([
      import('https://esm.sh/gh/haskell-wasm/browser_wasi_shim'),
      import('https://cdn.jsdelivr.net/gh/haskell-wasm/ghc-in-browser@c57d8b6e37737d662aed05cab88f867918307053/dyld.mjs'),
    ]);
    const rootfs = new PreopenDirectory('/', []);
    const tar = new WASI(
      ['bsdtar', '-x'],
      [],
      [
        new OpenFile(new File(new Uint8Array(), { readonly: true })),
        ConsoleStdout.lineBuffered(output),
        ConsoleStdout.lineBuffered(output),
        rootfs,
      ],
      { debug: false },
    );
    const [archive, binary] = await Promise.all([
      fetch('https://haskell-wasm.github.io/ghc-in-browser/rootfs.tar.zst'),
      fetch('https://haskell-wasm.github.io/bsdtar-wasm/bsdtar.wasm'),
    ]);
    if (!archive.ok || !binary.ok)
      throw new Error('Não foi possível carregar GHC. Tenta novamente.');
    tar.fds[0] = new OpenFile(
      new File(new Uint8Array(await archive.arrayBuffer()), { readonly: true }),
    );
    const { instance } = await WebAssembly.instantiateStreaming(binary, {
      wasi_snapshot_preview1: tar.wasiImport,
    });
    tar.start(instance);
    const dyld = await main({
      rpc: new DyLDBrowserHost({ rootfs, stdout: output, stderr: output }),
      searchDirs: [
        '/tmp/clib',
        '/tmp/hslib/lib/wasm32-wasi-ghc-9.14.0.20251031-inplace',
      ],
      mainSoPath: '/tmp/libplayground001.so',
      args: ['libplayground001.so', '+RTS', '-c', '-RTS'],
      isIserv: false,
    });
    const run = await dyld.exportFuncs.myMain('/tmp/hslib/lib');
    send({ type: 'status', text: 'A executar…' });
    await run('-v0', code);
    send({ type: 'done', exitCode: 0 });
  } catch (error) {
    send({ type: 'error', text: error.message || String(error) });
  }
};
