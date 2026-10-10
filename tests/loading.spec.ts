import { expect, test } from '@playwright/test';

test('a slow analytics server cannot delay appearance controls', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  let release!: () => void;
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('https://cool.rgo.pt/script.js', async (route) => {
    await waiting;
    await route.abort();
  });
  try {
    await page.goto('/exemplo/apontamentos/', { waitUntil: 'commit' });
    await page.waitForLoadState('domcontentloaded', { timeout: 2000 });
    await page.getByRole('button', { name: 'Personalizar aparência' }).click();
    await expect(page.locator('#appearance')).toBeVisible({ timeout: 2000 });
    await page.getByRole('radio', { name: 'Escuro', exact: true }).check();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  } finally {
    release();
    await page.unrouteAll({ behavior: 'wait' });
  }
});

test('a Python lesson keeps editor JavaScript below 1 MB', async ({ page }) => {
  await page.goto('/cadeiras/fp/recursao/');
  const editor = page
    .getByRole('region', { name: 'Calcular um fatorial', exact: true })
    .getByRole('textbox', { name: 'Código python', exact: true });
  await expect(editor).toBeVisible();
  await editor.fill('print(2 + 3)');
  const bytes = await page.evaluate(() => {
    const scripts = performance.getEntriesByType(
      'resource',
    ) as PerformanceResourceTiming[];
    const unique = new Map(
      scripts
        .filter(
          (entry) =>
            entry.name.startsWith(location.origin) &&
            entry.name.endsWith('.js'),
        )
        .map((entry) => [entry.name, entry.decodedBodySize]),
    );
    return [...unique.values()].reduce((total, bytes) => total + bytes, 0);
  });
  expect(bytes).toBeLessThan(1_000_000);
});

test('a saved sans font does not download the unused default reading font', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'resumos-preferences',
      JSON.stringify({ font: 'sans' }),
    ),
  );
  const fonts: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'font') fonts.push(request.url());
  });
  await page.goto('/exemplo/apontamentos/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.lesson-body')).toHaveCSS(
    'font-family',
    /Manrope/,
  );
  expect(fonts.some((url) => url.includes('source-serif-4'))).toBe(false);
});

test('the homepage keeps its inline reading catalogue below 90 KB', async ({
  page,
}) => {
  await page.goto('/');
  const bytes = await page
    .locator('#reading-pages, #tldr-paths')
    .evaluateAll((scripts) =>
      scripts.reduce(
        (bytes, script) =>
          bytes + new TextEncoder().encode(script.textContent || '').length,
        0,
      ),
    );
  expect(bytes).toBeLessThan(90_000);
});

test('saved appearance paints without downloading page JavaScript and keeps startup code small', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'resumos-preferences',
      JSON.stringify({
        palette: 'gruvbox-hard',
        theme: 'dark',
        font: 'serif',
      }),
    );
  });
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/exemplo/apontamentos/');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(29, 32, 33)',
  );
  await expect(page.locator('html')).toHaveAttribute(
    'data-palette',
    'gruvbox-hard',
  );
  // Parser-blocking startup must stay small even as the theme catalogue grows.
  const startupBytes = await page.evaluate(() =>
    [...document.head.querySelectorAll('script:not([src])')]
      .filter(
        (script) =>
          !script.getAttribute('type') ||
          script.getAttribute('type') === 'text/javascript',
      )
      .reduce(
        (bytes, script) =>
          bytes + new TextEncoder().encode(script.textContent || '').length,
        0,
      ),
  );
  expect(startupBytes).toBeLessThan(8000);
});

test('keyboard focus prepares the chosen lesson before navigation', async ({
  page,
}) => {
  await page.goto('/cadeiras/bd/');
  const lesson = page.locator('a[href="/cadeiras/bd/normalizacao/"]').first();
  const request = page.waitForRequest(
    (request) =>
      new URL(request.url()).pathname === '/cadeiras/bd/normalizacao/',
    { timeout: 3000 },
  );
  await lesson.focus();
  await request;
  await expect(page).toHaveURL(/\/cadeiras\/bd\/$/);
  await lesson.click();
  await expect(page.locator('h1')).toContainText('Normalização');
});
