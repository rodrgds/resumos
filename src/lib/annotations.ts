import { readLocal, writeLocal } from './storage';

export interface TextAnchor {
  exact: string;
  prefix: string;
  suffix: string;
  start: number;
}
export interface Annotation {
  id: string;
  path: string;
  title: string;
  anchor: TextAnchor;
  comment: string;
  created: number;
}
const PREFIX = 'resumos-annotation:v1:';
export const LEGACY_NOTES_KEY = 'resumos-notes';

function isAnnotation(value: unknown): value is Annotation {
  if (!value || typeof value !== 'object') return false;
  const note = value as Annotation;
  return (
    typeof note.id === 'string' &&
    /^[\w-]+$/.test(note.id) &&
    typeof note.path === 'string' &&
    /^\/(?!\/)/.test(note.path) &&
    typeof note.title === 'string' &&
    typeof note.comment === 'string' &&
    Number.isFinite(note.created) &&
    !!note.anchor &&
    typeof note.anchor.exact === 'string' &&
    !!note.anchor.exact.trim() &&
    typeof note.anchor.prefix === 'string' &&
    typeof note.anchor.suffix === 'string' &&
    Number.isInteger(note.anchor.start) &&
    note.anchor.start >= 0
  );
}

// Separate keys keep edits in different tabs from overwriting the whole notebook.
export function readAnnotations(): { notes: Annotation[]; available: boolean } {
  const notes: Annotation[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (!key.startsWith(PREFIX)) continue;
      try {
        const note: unknown = JSON.parse(readLocal(key) || 'null');
        if (isAnnotation(note) && key === PREFIX + note.id) notes.push(note);
      } catch {
        /* Preserve unreadable entries for recovery. */
      }
    }
    return { notes, available: true };
  } catch {
    return { notes, available: false };
  }
}
export function saveAnnotation(note: Annotation) {
  return writeLocal(PREFIX + note.id, JSON.stringify(note));
}
export function removeAnnotation(id: string) {
  try {
    localStorage.removeItem(PREFIX + id);
    return true;
  } catch {
    return false;
  }
}
export function isAnnotationKey(key: string | null) {
  return key === null || key.startsWith(PREFIX) || key === LEGACY_NOTES_KEY;
}
