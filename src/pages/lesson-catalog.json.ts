import type { APIRoute } from 'astro';
import { getCourseGuides, lessonPath } from '../lib/course-content';

// The video project joins clips to these content IDs without importing MDX.
export const GET: APIRoute = async ({ site }) => {
  const courses = (await getCourseGuides()).filter((course) => !course.example);
  const lessons = courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.data.title,
      description: lesson.data.description,
      courseId: course.id,
      course: course.name,
      section: lesson.data.section,
      order: lesson.data.order,
      url: new URL(lessonPath(course, lesson), site).href,
    })),
  );
  return new Response(JSON.stringify({ version: 1, lessons }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
