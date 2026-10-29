const STORAGE_KEY = 'resumos-exercise-responses';

function readRecords(): Record<string, string> {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}',
    );
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(
        ([, response]) => typeof response === 'string',
      ),
    );
  } catch {
    return {};
  }
}

export function readExerciseResponse(key: string): string | undefined {
  return readRecords()[key];
}

export function saveExerciseResponse(
  key: string,
  response: string | undefined,
) {
  try {
    const records = readRecords();
    delete records[key];
    if (response !== undefined) records[key] = response;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // Practice remains available when browser storage is unavailable.
  }
}
