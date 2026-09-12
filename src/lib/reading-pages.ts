import { getCourseGuides, lessonPath } from './course-content';

export async function getReadingPages() {
  return (await getCourseGuides()).flatMap((course) => {
    const entries = [
      ...(course.introduction ? [course.introduction] : []),
      ...course.pages,
    ];
    return entries.map((entry) => ({
      path: lessonPath(course, entry),
      title: entry.data.title,
      course: course.name,
      next:
        (course.lessons.includes(entry) || entry === course.introduction) &&
        course.lessons[course.lessons.indexOf(entry) + 1]
          ? lessonPath(
              course,
              course.lessons[course.lessons.indexOf(entry) + 1],
            )
          : undefined,
    }));
  });
}
