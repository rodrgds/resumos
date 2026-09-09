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
    return {
      id,
      name: curriculum?.name || 'Cadeira de exemplo',
      path: id === 'exemplo' ? '/exemplo/' : `/cadeiras/${id}/`,
      example: id === 'exemplo',
      introduction: pages.find((page) => page.id === `${id}/index`),
      lessons: pages
        .filter((page) => page.id !== `${id}/index`)
        .sort(
          (a, b) =>
            sectionOrder.indexOf(a.data.section) -
              sectionOrder.indexOf(b.data.section) ||
            a.data.order - b.data.order ||
            a.data.title.localeCompare(b.data.title, 'pt'),
        ),
    };
  });
}
