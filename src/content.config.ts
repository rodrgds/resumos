import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const edition = z.string().regex(/^20\d{2}\/\d{2}$/);
const editorial = z.object({
  basedOn: edition.optional(),
  review: z
    .object({
      edition,
      reviewer: z.string().min(1),
      date: z.iso.date(),
    })
    .optional(),
  sources: z
    .array(z.object({ title: z.string().min(1), url: z.url() }))
    .default([]),
  coverage: z.string().min(1).optional(),
  gaps: z.array(z.string().min(1)).default([]),
});

const lessons = defineCollection({
  loader: glob({
    pattern: [
      'src/content/lessons/**/[^_]*.{md,mdx}',
      ...(process.env.RESUMOS_TEST_CONTENT === '1'
        ? ['tests/fixtures/course-content/**/[^_]*.{md,mdx}']
        : []),
    ],
    base: '.',
    generateId: ({ entry }) =>
      entry
        .replace(
          /^(src\/content\/lessons|tests\/fixtures\/course-content)\//,
          '',
        )
        .replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z
      .enum(['conteudo', 'laboratorios', 'exercicios', 'guias', 'recursos'])
      .default('conteudo'),
    order: z.number().int().nonnegative().default(0),
    draft: z.boolean().default(false),
    studyKind: z.enum(['lesson', 'revision']).default('lesson'),
    practices: z.array(z.string().min(1)).default([]),
    editorial: editorial.optional(),
  }),
});
export const collections = { lessons };
