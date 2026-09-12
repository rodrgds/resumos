import { getCollection, type CollectionEntry } from 'astro:content';
import { courses as leic } from '../data/courses';
import { courses as meic } from '../data/meic';

export const sections = {
  conteudo: 'Conteúdo',
  laboratorios: 'Laboratórios',
  exercicios: 'Exercícios',
  guias: 'Guias',
  recursos: 'Recursos',
};
export type Lesson = CollectionEntry<'lessons'>;
export interface CourseGuide {
  id: string;
  name: string;
  path: string;
  example: boolean;
  lessons: Lesson[];
  pages: Lesson[];
  revisions: Lesson[];
  exercises: Lesson[];
  introduction?: Lesson;
}
export function lessonPath(course: CourseGuide, lesson: Lesson) {
  const slug = lesson.id.split('/').slice(1).join('/');
  return slug === 'index' ? course.path : `${course.path}${slug}/`;
}
export async function getCourseGuides(): Promise<CourseGuide[]> {
  const entries = await getCollection('lessons', ({ data }) => !data.draft);
  const sectionOrder = Object.keys(sections);
  const groups = new Map<string, Lesson[]>();
  for (const entry of entries) {
    const [id, slug] = entry.id.split('/');
    if (!slug) throw new Error(`Put ${entry.id} inside its course folder.`);
    const group = groups.get(id) || [];
    group.push(entry);
    groups.set(id, group);
  }
  return [...groups].map(([id, pages]) => {
    const curriculum = [...leic, ...meic].find((course) => course.id === id);
    if (id !== 'exemplo' && !curriculum)
      throw new Error(
        `Unknown course folder: ${id}. Use an id from courses.ts or meic.ts.`,
      );
    const ordered = pages
      .filter((page) => page.id !== `${id}/index`)
      .sort(
        (a, b) =>
          sectionOrder.indexOf(a.data.section) -
            sectionOrder.indexOf(b.data.section) ||
          a.data.order - b.data.order ||
          a.data.title.localeCompare(b.data.title, 'pt'),
      );
    for (const page of pages) {
      for (const target of page.data.practices) {
        if (
          page.data.section === 'exercicios' ||
          page.data.studyKind === 'revision'
        )
          throw new Error(`${page.id}: attach exercises to a lesson.`);
        const linked = pages.find((candidate) => candidate.id === target);
        if (!linked || linked.data.section !== 'exercicios') {
          throw new Error(
            `${page.id}: practice ${target} must be a published exercise in the same course.`,
          );
        }
      }
      if (
        page.data.section === 'exercicios' &&
        !pages.some((lesson) => lesson.data.practices.includes(page.id))
      )
        throw new Error(
          `${page.id}: attach this exercise set to a lesson through practices.`,
        );
    }
    return {
      id,
      name: curriculum?.name || 'Cadeira de exemplo',
      path: id === 'exemplo' ? '/exemplo/' : `/cadeiras/${id}/`,
      example: id === 'exemplo',
      introduction: pages.find((page) => page.id === `${id}/index`),
      pages: ordered.filter((page) => page.data.section !== 'exercicios'),
      lessons: ordered.filter(
        (page) =>
          page.data.studyKind !== 'revision' &&
          page.data.section !== 'exercicios',
      ),
      revisions: ordered.filter((page) => page.data.studyKind === 'revision'),
      exercises: ordered.filter(
        (page) =>
          page.data.section === 'exercicios' &&
          page.data.studyKind !== 'revision',
      ),
    };
  });
}
