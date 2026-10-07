const MAX_ROWS = 200;
const MAX_RESULTS = 32;
const MAX_COLUMNS = 64;
const OUTPUT_LIMIT = 32_000;

// Both drivers use positional rows so repeated column names stay distinct.
export function sqlResults() {
  let size = 0;
  let count = 0;
  return (columns, values) => {
    if (!columns.length) return;
    if (++count > MAX_RESULTS || columns.length > MAX_COLUMNS)
      throw new Error('Demasiados resultados ou colunas. Reduz a consulta.');
    size += columns.join('').length;
    if (size > OUTPUT_LIMIT)
      throw new Error(
        'A saída ultrapassou 32 mil caracteres. Reduz o número de resultados.',
      );
    const rows = [];
    let truncated = false;
    for (const valuesRow of values) {
      if (rows.length === MAX_ROWS) {
        truncated = true;
        break;
      }
      const row = valuesRow.map((value) => {
        if (value === null) return null;
        if (value instanceof Uint8Array)
          return `X'${Array.from(value, (byte) => byte.toString(16).padStart(2, '0')).join('')}'`;
        return String(value);
      });
      size += row.reduce((sum, value) => sum + (value?.length ?? 4) + 1, 0);
      if (size > OUTPUT_LIMIT)
        throw new Error(
          'A saída ultrapassou 32 mil caracteres. Reduz o número de resultados.',
        );
      rows.push(row);
    }
    self.postMessage({ type: 'table', columns, rows, truncated });
  };
}
