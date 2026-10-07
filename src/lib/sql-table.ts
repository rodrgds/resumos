import type { RunMessage } from './runners/types';

type TableResult = Extract<RunMessage, { type: 'table' }>;

export function renderSqlTable(container: HTMLElement, result: TableResult) {
  const table = document.createElement('table');
  const caption = table.createCaption();
  const count = result.rows.length;
  caption.textContent = `Resultado ${container.childElementCount + 1}, ${count} ${count === 1 ? 'linha' : 'linhas'}${result.truncated ? ' (primeiras 200)' : ''}`;
  const head = table.createTHead().insertRow();
  for (const column of result.columns) {
    const cell = document.createElement('th');
    cell.scope = 'col';
    cell.textContent = column;
    head.append(cell);
  }
  const body = table.createTBody();
  for (const values of result.rows) {
    const row = body.insertRow();
    for (const value of values) {
      const cell = row.insertCell();
      cell.textContent = value === null ? 'NULL' : value === '' ? '""' : value;
      if (value === null) {
        cell.className = 'sql-null';
        cell.title = 'Valor nulo';
      }
    }
  }
  if (!count) {
    const cell = body.insertRow().insertCell();
    cell.colSpan = result.columns.length;
    cell.textContent = 'Sem linhas';
    cell.className = 'sql-empty';
  }
  const scroll = document.createElement('div');
  scroll.className = 'sql-table-scroll';
  scroll.tabIndex = 0;
  scroll.setAttribute('role', 'region');
  scroll.setAttribute('aria-label', caption.textContent);
  scroll.append(table);
  container.append(scroll);
}
