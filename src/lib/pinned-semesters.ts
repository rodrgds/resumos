export const SEMESTER_PIN_KEY = 'resumos-pinned-semesters';

export function readSemesterPins(validIds: Iterable<string>): Set<string> {
  const allowed = new Set(validIds);
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(SEMESTER_PIN_KEY) || '[]',
    );
    return new Set(
      Array.isArray(saved) ? saved.filter((id) => allowed.has(id)) : [],
    );
  } catch {
    return new Set();
  }
}
