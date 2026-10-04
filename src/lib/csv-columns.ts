// Column-aware handling for delimiter-separated data files, in the spirit
// of Rainbow CSV: each column gets a stable colour, the header its own style.
// Shared by the server-rendered fallback and the editor decorations so both
// split fields exactly the same way.

const CANDIDATES = [';', ',', '\t', '|'];

export function isCsvFilename(name: string): boolean {
  const extension = name.split('.').pop()?.toLowerCase() ?? '';
  return extension === 'csv' || extension === 'tsv';
}

function defaultDelimiter(name: string): string {
  return name.toLowerCase().endsWith('.tsv') ? '\t' : ',';
}

// Counts fields the way splitCsvSpans does, without allocating spans.
function fieldCount(line: string, delimiter: string): number {
  let count = 1;
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') i++;
      else quoted = !quoted;
    } else if (char === delimiter && !quoted) count++;
  }
  return quoted ? 0 : count;
}

// Picks the candidate with the most consistent field counts across the first
// lines. Falls back to the extension default for single-column files.
export function detectDelimiter(text: string, filename: string): string {
  const lines = text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .slice(0, 10);
  let best = defaultDelimiter(filename);
  let bestScore = -1;
  for (const delimiter of CANDIDATES) {
    const counts = lines.map((line) => fieldCount(line, delimiter));
    if (counts.some((count) => count === 0)) continue;
    const first = counts[0];
    if (first < 2) continue;
    const consistent = counts.filter((count) => count === first).length;
    const score = consistent * 10 + first;
    if (score > bestScore) {
      bestScore = score;
      best = delimiter;
    }
  }
  return best;
}

export interface CsvSpan {
  start: number;
  end: number;
}

// Splits one line into [start, end) character spans, honouring RFC-style
// double quotes ("" escapes a quote). Never spans across lines.
export function splitCsvSpans(line: string, delimiter: string): CsvSpan[] {
  const spans: CsvSpan[] = [];
  let start = 0;
  let quoted = false;
  let broken = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') i++;
      else quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      spans.push({ start, end: i });
      start = i + 1;
    }
  }
  if (quoted) broken = true;
  spans.push({ start, end: line.length });
  return broken ? [{ start: 0, end: line.length }] : spans;
}
