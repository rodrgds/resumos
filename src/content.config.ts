import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

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
  }),
});
export const collections = { lessons };
