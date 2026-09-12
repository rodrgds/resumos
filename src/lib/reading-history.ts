import { readLocal, writeLocal } from './storage';

const STORAGE_KEY = 'resumos-reading-history';
const MAX_VISITS = 20;
export interface ReadingVisit {
  path: string;
  visitedAt: number;
  position: number;
  reachedEnd: boolean;
  exercise?: string;
}

export function readingHistory(): ReadingVisit[] {
  try {
    const values: unknown = JSON.parse(readLocal(STORAGE_KEY) || '[]');
    if (!Array.isArray(values)) return [];
    return values
      .filter(
        (value): value is ReadingVisit =>
          value &&
          typeof value.path === 'string' &&
          /^\/(exemplo|cadeiras)\//.test(value.path) &&
          Number.isFinite(value.visitedAt) &&
          Number.isFinite(value.position) &&
          value.position >= 0 &&
          value.position <= 1 &&
          typeof value.reachedEnd === 'boolean' &&
          (value.exercise === undefined ||
            (typeof value.exercise === 'string' &&
              /^[a-z0-9][a-z0-9-]*$/.test(value.exercise))),
      )
      .slice(0, MAX_VISITS);
  } catch {
    return [];
  }
}

export function saveReadingVisit(visit: ReadingVisit): void {
  writeLocal(
    STORAGE_KEY,
    JSON.stringify(
      [visit, ...readingHistory().filter((item) => item.path !== visit.path)]
        .sort((a, b) => b.visitedAt - a.visitedAt)
        .slice(0, MAX_VISITS),
    ),
  );
}

export function clearReadingHistory(): void {
  writeLocal(STORAGE_KEY, '[]');
}
