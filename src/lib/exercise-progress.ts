export type Assistance = 'none' | 'hint' | 'solution';
export interface ExerciseProgress {
  assistance: Assistance;
  result?: 'attempted' | 'correct' | 'self-checked';
  resultAssistance?: Assistance;
}
const STORAGE_KEY = 'resumos-exercise-progress';
const MAX_RECORDS = 300;

function readRecords(): Record<string, ExerciseProgress> {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}',
    );
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(
        ([, item]) =>
          item &&
          ['none', 'hint', 'solution'].includes(item.assistance) &&
          (item.result === undefined ||
            ['attempted', 'correct', 'self-checked'].includes(item.result)) &&
          (item.resultAssistance === undefined ||
            ['none', 'hint', 'solution'].includes(item.resultAssistance)),
      ),
    );
  } catch {
    return {};
  }
}
export function readExerciseProgress(
  key: string,
): ExerciseProgress | undefined {
  return readRecords()[key];
}
export function saveExerciseProgress(key: string, progress: ExerciseProgress) {
  try {
    const records = readRecords();
    delete records[key];
    records[key] = progress;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        Object.fromEntries(Object.entries(records).slice(-MAX_RECORDS)),
      ),
    );
  } catch {
    /* Practice remains available when browser storage is unavailable. */
  }
}
export function parseNumericAnswer(value: string): number | undefined {
  const normalized = value.trim().replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized)) return;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : undefined;
}
