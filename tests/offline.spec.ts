import { expect, test } from '@playwright/test';

test('keeps a visited lesson available offline', async ({ page, context }) => {
  const lessonPath = '/cadeiras/am2/limites-continuidade/';

  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;
  });
  await page.goto(lessonPath);
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.reload();

  await context.setOffline(true);
  await page.reload();

  await expect(page).toHaveURL(new RegExp(`${lessonPath}$`));
  await expect(page.locator('h1')).toContainText('Limites');
  await expect(page.locator('.katex').first()).toBeVisible();
  const mathFonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return ['KaTeX_Main', 'KaTeX_Math'].map((family) =>
      [...document.fonts].some(
        (font) => font.family === family && font.status === 'loaded',
      ),
    );
  });
  expect(mathFonts).toEqual([true, true]);
});

test('shows a small fallback for an unvisited offline page', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    await navigator.serviceWorker.ready;
  });
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

  await context.setOffline(true);
  await page.goto('/cadeiras/am2/pagina-que-nao-foi-visitada/');

  await expect(page.locator('h1')).toHaveText('Estás sem ligação.');
});
