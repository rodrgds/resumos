import { getCourseGuides, lessonPath } from './course-content';

export async function getReadingPages() {
  return (await getCourseGuides()).flatMap((course) => {
    const entries = [
      ...(course.introduction ? [course.introduction] : []),
      ...course.lessons,
    ];
    return entries.map((entry, index) => ({
      path: lessonPath(course, entry),
      title: entry.data.title,
      course: course.name,
      next: entries[index + 1]
        ? lessonPath(course, entries[index + 1])
        : undefined,
    }));
  });
}
