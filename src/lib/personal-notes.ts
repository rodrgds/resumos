import { openDB, type DBSchema } from 'idb';

export interface NoteImage {
  id: string;
  name: string;
  blob: Blob;
}
export interface PersonalNote {
  id: string;
  course: string;
  title: string;
  markdown: string;
  images: NoteImage[];
  created: number;
  revision: number;
}
interface NotebookDatabase extends DBSchema {
  pages: { key: string; value: PersonalNote; indexes: { course: string } };
}
const database = () =>
  openDB<NotebookDatabase>('resumos-notebooks', 1, {
    upgrade(db) {
      db.createObjectStore('pages', { keyPath: 'id' }).createIndex(
        'course',
        'course',
      );
    },
  });

export async function readPersonalNotes(course?: string) {
  const db = await database();
  try {
    const pages = course
      ? await db.getAllFromIndex('pages', 'course', course)
      : await db.getAll('pages');
    return pages.sort((a, b) => a.created - b.created);
  } finally {
    db.close();
  }
}

export async function savePersonalNote(note: PersonalNote) {
  const db = await database();
  try {
    const transaction = db.transaction('pages', 'readwrite');
    const saved = await transaction.store.get(note.id);
    if (
      (saved && saved.revision !== note.revision) ||
      (!saved && note.revision > 0)
    ) {
      await transaction.done;
      throw new Error(
        'Este apontamento mudou noutro separador. Exporta a tua versão antes de recarregar.',
      );
    }
    const revision = note.revision + 1;
    await transaction.store.put({ ...note, revision });
    await transaction.done;
    return revision;
  } finally {
    db.close();
  }
}

export async function deletePersonalNote(note: PersonalNote) {
  const db = await database();
  try {
    const transaction = db.transaction('pages', 'readwrite');
    const saved = await transaction.store.get(note.id);
    if (saved && saved.revision !== note.revision) {
      await transaction.done;
      throw new Error(
        'Este apontamento mudou noutro separador. Recarrega antes de o eliminar.',
      );
    }
    await transaction.store.delete(note.id);
    await transaction.done;
  } finally {
    db.close();
  }
}

export function personalNoteUrl(course: string, id?: string) {
  return `/caderno/?cadeira=${encodeURIComponent(course)}${id ? `#${id}` : ''}`;
}

export const IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
]);
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export async function validateNoteImage(blob: Blob) {
  if (!IMAGE_TYPES.has(blob.type))
    throw new Error('Escolhe uma imagem PNG, JPEG, WebP, GIF ou AVIF.');
  if (blob.size > MAX_IMAGE_BYTES)
    throw new Error('A imagem excede 10 MB. Escolhe uma imagem mais pequena.');
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
  } catch {
    throw new Error(
      'Não foi possível ler esta imagem. Escolhe outro ficheiro.',
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
