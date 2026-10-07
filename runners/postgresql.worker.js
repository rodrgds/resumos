import { PGlite } from './pglite/index.js';
import { sqlResults } from './sql-results.js';

self.onmessage = async ({ data: { code, files } }) => {
  let db;
  let filename = 'main.sql';
  try {
    self.postMessage({ type: 'status', text: 'A carregar PostgreSQL…' });
    const asset = async (name) => {
      const response = await fetch(
        new URL(`./pglite/${name}`, import.meta.url),
      );
      if (!response.ok)
        throw new Error(`Não foi possível carregar ${name}. Tenta novamente.`);
      return response;
    };
    // Fetch explicitly so a failed download rejects instead of leaving the
    // upstream ready promise pending. Each retry still uses a fresh Worker.
    const [pgliteWasmModule, initdbWasmModule, fsBundle] = await Promise.all([
      WebAssembly.compileStreaming(asset('pglite.wasm')),
      WebAssembly.compileStreaming(asset('initdb.wasm')),
      asset('pglite.data').then((response) => response.blob()),
    ]);
    db = await PGlite.create({
      dataDir: 'memory://',
      pgliteWasmModule,
      initdbWasmModule,
      fsBundle,
    });
    await db.exec("SET statement_timeout = '30s';");
    for (const [name, seed] of Object.entries(files ?? {})) {
      filename = name;
      await db.exec(seed);
    }
    filename = 'main.sql';
    self.postMessage({ type: 'status', text: 'A executar…' });
    // Include array types installed during initialization. Query overrides
    // preserve PostgreSQL's text without rounding or collapsing array values.
    const parsers = Object.fromEntries(
      Object.keys(db.parsers).map((id) => [id, (value) => value]),
    );
    const result = sqlResults();
    for (const query of await db.exec(code, { rowMode: 'array', parsers }))
      result(
        query.fields.map((field) => field.name),
        query.rows,
      );
    self.postMessage({ type: 'done', exitCode: 0 });
  } catch (error) {
    self.postMessage({
      type: 'error',
      text: `${filename}: ${error.message ?? String(error)}`,
    });
  } finally {
    await db?.close();
  }
};
