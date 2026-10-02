import { expect, test } from '@playwright/test';

test('mobile code scrolls by default and the wrapping preset applies to static and editable code', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/codigo/');
  const editor = page.locator('.playground .cm-content').first();
  const webEditor = page.locator('.web-playground .cm-content').first();
  await expect(editor).toBeVisible();
  await expect(editor).toHaveCSS('white-space', 'pre');
  await expect(webEditor).toHaveCSS('white-space', 'pre');
  await editor.fill(
    'console.log("A long code line that stays on one row on a narrow phone screen instead of hiding the program structure");',
  );
  const scroller = page.locator('.playground .cm-scroller').first();
  expect(await scroller.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(
    true,
  );
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await page.getByLabel('Quebrar linhas de código', { exact: true }).check();
  await page.keyboard.press('Escape');
  await expect(editor).toHaveCSS('white-space', 'pre-wrap');
  await expect(webEditor).toHaveCSS('white-space', 'pre-wrap');
  await page.goto('/exemplo/apontamentos/');
  await expect(page.locator('pre.astro-code').first()).toHaveCSS(
    'white-space',
    'pre-wrap',
  );
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await page.getByLabel('Quebrar linhas de código', { exact: true }).uncheck();
  await page.keyboard.press('Escape');
  await expect(page.locator('pre.astro-code').first()).toHaveCSS(
    'white-space',
    'pre',
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('the saved wrapping suggestion upgrades untouched CSS and preserves edited CSS', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() =>
    localStorage.setItem(
      'resumos-css-snippets',
      JSON.stringify([
        {
          id: 'wrap-code',
          name: 'O meu código',
          enabled: true,
          css: '.prose pre.astro-code, .prose pre.astro-code code { white-space: pre-wrap; overflow-wrap: anywhere; }',
        },
      ]),
    ),
  );
  await page.goto('/exemplo/codigo/');
  await expect(page.locator('.playground .cm-content').first()).toHaveCSS(
    'white-space',
    'pre-wrap',
  );
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await expect(page.getByLabel('O meu código', { exact: true })).toBeChecked();
  await page.keyboard.press('Escape');
  await page.evaluate(() =>
    localStorage.setItem(
      'resumos-css-snippets',
      JSON.stringify([
        {
          id: 'wrap-code',
          name: 'Só estático',
          enabled: true,
          css: '.prose pre.astro-code { white-space: pre-wrap; }',
        },
      ]),
    ),
  );
  await page.reload();
  await expect(page.locator('.playground .cm-content').first()).toHaveCSS(
    'white-space',
    'pre',
  );
  await page.goto('/exemplo/apontamentos/');
  await expect(page.locator('pre.astro-code').first()).toHaveCSS(
    'white-space',
    'pre-wrap',
  );
});
