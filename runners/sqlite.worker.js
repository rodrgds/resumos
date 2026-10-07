import initSqlJs from 'sql.js';
import { sqlResults } from './sql-results.js';

self.onmessage = async ({ data: { code, files } }) => {
  let db;
  let filename = 'main.sql';
  try {
    self.postMessage({ type: 'status', text: 'A carregar SQLite…' });
    const SQL = await initSqlJs({
      locateFile: () => new URL('./sqlite.wasm', import.meta.url).href,
    });
    db = new SQL.Database();
    for (const [name, seed] of Object.entries(files ?? {})) {
      filename = name;
      db.run(seed);
    }
    filename = 'main.sql';
    self.postMessage({ type: 'status', text: 'A executar…' });
    const result = sqlResults();
    for (const statement of db.iterateStatements(code)) {
      const columns = statement.getColumnNames();
      if (!columns.length) {
        statement.step();
        continue;
      }
      function* rows() {
        while (statement.step()) yield statement.get(null, { useBigInt: true });
      }
      result(columns, rows());
    }
    self.postMessage({ type: 'done', exitCode: 0 });
  } catch (error) {
    self.postMessage({
      type: 'error',
      text: `${filename}: ${error.message ?? String(error)}`,
    });
  } finally {
    db?.close();
  }
};
