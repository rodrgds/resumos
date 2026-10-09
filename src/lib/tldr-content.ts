import { getCollection, type CollectionEntry } from 'astro:content';
import { getCourseGuides, lessonPath, type Lesson } from './course-content';

export type Tldr = CollectionEntry<'tldr'>;
export function canSummarize(entry: Lesson) {
  return (
    !entry.id.startsWith('exemplo/') &&
    !entry.id.endsWith('/index') &&
    entry.data.studyKind === 'lesson' &&
    ['conteudo', 'laboratorios'].includes(entry.data.section)
  );
}
export async function getPublicTldr() {
  const [summaries, lessons] = await Promise.all([
    getCollection('tldr'),
    getCollection('lessons'),
  ]);
  const byId = new Map(lessons.map((entry) => [entry.id, entry]));
  for (const summary of summaries) {
    const lesson = byId.get(summary.id);
    if (!lesson || !canSummarize(lesson)) {
      throw new Error(
        `${summary.id}: TLDR must belong to an existing pedagogical lesson.`,
      );
    }
  }
  return summaries.filter((summary) => !byId.get(summary.id)!.data.draft);
}
export async function getTldrPaths() {
  const [summaries, courses] = await Promise.all([
    getPublicTldr(),
    getCourseGuides(),
  ]);
  return Object.fromEntries(
    summaries.map((summary) => {
      const course = courses.find(
        (course) => course.id === summary.id.split('/')[0],
      )!;
      const entry = course.pages.find((entry) => entry.id === summary.id)!;
      const path = lessonPath(course, entry);
      return [path, `${path}tldr/`];
    }),
  );
}
