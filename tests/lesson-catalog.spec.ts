import { expect, test } from '@playwright/test';

test('video catalog exports published lesson URLs without supplemental or private pages', async ({
  request,
}) => {
  const response = await request.get('/lesson-catalog.json');
  expect(response.ok()).toBe(true);
  const catalog = await response.json();
  expect(catalog.version).toBe(1);
  const ids = catalog.lessons.map((lesson: { id: string }) => lesson.id);
  expect(ids).toContain('fp/primeiro');
  expect(ids).toContain('fp/segundo');
  expect(ids).not.toContain('fp/rascunho');
  expect(ids).not.toContain('fp/index');
  expect(ids).not.toContain('fp/folha-consulta');
  expect(ids.some((id: string) => id.startsWith('exemplo/'))).toBe(false);
  expect(new Set(ids).size).toBe(ids.length);
  const first = catalog.lessons.find(
    (lesson: { id: string }) => lesson.id === 'fp/primeiro',
  );
  expect(first.url).toBe('https://resumos.rgo.pt/cadeiras/fp/primeiro/');
  expect((await request.get('/cadeiras/fp/primeiro/')).ok()).toBe(true);
});
