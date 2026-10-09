import { expect, test } from '@playwright/test';

const full = '/cadeiras/fp/primeiro/';
const short = `${full}tldr/`;

test('math-heavy TLDR keeps the page within a narrow viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/cadeiras/me/proporcoes/tldr/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.lesson-body .katex').first()).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});

test('reader actions stay visible together on a narrow screen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/cadeiras/md/conjuntos-relacoes/tldr/');
  await expect(
    page.getByRole('button', { name: 'Imprimir', exact: true }),
  ).toBeVisible();
  const actions = page.locator('.page-actions');
  const toolbar = await actions.boundingBox();
  for (const control of await actions
    .locator(':scope > button:visible, :scope > [role="switch"]')
    .all()) {
    const box = await control.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(toolbar!.x);
    expect(box!.x + box!.width).toBeLessThanOrEqual(
      toolbar!.x + toolbar!.width,
    );
  }
});

test('TLDR choice persists through navigation while direct explanations remain complete', async ({
  page,
}) => {
  await page.goto(full);
  const toggle = page.getByRole('switch', { name: 'TLDR' });
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(page).toHaveURL(short);
  await expect(page.getByRole('switch', { name: 'TLDR' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await expect(page.locator('.lesson-body')).toContainText('Síntese curta');
  await expect(page.locator('.lesson-body')).not.toContainText(
    'Conteúdo reservado',
  );
  await expect(
    page.locator('.course-sidebar a[aria-current="page"]'),
  ).toContainText('Primeiro resumo');
  await expect(page.locator('.page-sections .toc-links')).toContainText(
    'Ideia essencial',
  );
  await expect(page.locator('.page-sections .toc-links')).not.toContainText(
    'Um conceito',
  );
  await page.reload();
  await page
    .locator('.lesson-body')
    .getByRole('link', { name: 'Ler a explicação completa' })
    .click();
  await expect(page).toHaveURL(`${full}#um-conceito`);
  await expect(page.locator('.lesson-body')).toContainText(
    'Conteúdo reservado',
  );
  await page.goto('/cadeiras/fp/segundo/');
  await page.evaluate(() => {
    const link = document.createElement('a');
    link.href = '/cadeiras/fp/primeiro/';
    link.textContent = 'Resumo inserido depois';
    document.querySelector('main')!.append(link);
  });
  const dynamic = page.getByRole('link', { name: 'Resumo inserido depois' });
  await dynamic.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(short);
  await page.goto('/cadeiras/fp/segundo/');
  await expect(page.getByRole('switch', { name: 'TLDR' })).toHaveCount(0);
  const previous = page
    .getByRole('navigation', { name: 'Continuar a leitura' })
    .getByRole('link', { name: /^Anterior/ });
  await expect(previous).toHaveAttribute('href', short);
  await previous.click();
  await expect(page).toHaveURL(short);
  await page.getByRole('switch', { name: 'TLDR' }).click();
  await expect(page).toHaveURL(full);
  await page.goto('/cadeiras/fp/segundo/');
  await expect(previous).toHaveAttribute('href', full);
});

test('TLDR print, Chat and mobile controls use the displayed version', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(short);
  await expect(page.locator('.lesson-body .katex-display')).toBeVisible();
  await expect(page.locator('.lesson-body img')).toHaveAttribute(
    'alt',
    'Quatro filas de pontos.',
  );
  await expect(page.getByRole('switch', { name: 'TLDR' })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await page.getByRole('button', { name: 'Perguntar ao Chat' }).click();
  const chat = page.locator('[data-provider="chatgpt"]');
  const prompt = new URL((await chat.getAttribute('href'))!).searchParams.get(
    'prompt',
  )!;
  expect(prompt).toContain(`https://resumos.rgo.pt${short}`);
  expect(prompt).not.toContain('.md');
  await page.keyboard.press('Escape');
  const print = await page
    .locator('#print-template')
    .evaluate((template: HTMLTemplateElement) => template.content.textContent);
  expect(print).toContain('Síntese curta');
  expect(print).toContain('TLDR');
  expect(print).not.toContain('Conteúdo reservado');
});

test('TLDR links work without JavaScript and unpublished summaries have no public outputs', async ({
  browser,
  request,
  page: indexPage,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(full);
  await page.getByRole('switch', { name: 'TLDR' }).click();
  await expect(page).toHaveURL(short);
  await expect(page.locator('.lesson-body')).toContainText('Síntese curta');
  await page.getByRole('switch', { name: 'TLDR' }).click();
  await expect(page).toHaveURL(full);
  await context.close();
  for (const path of [
    '/cadeiras/fp/rascunho/tldr/',
    '/cadeiras/fp/rascunho/tldr.md',
    `${full}tldr.md`,
  ]) {
    expect((await request.get(path)).status()).toBe(404);
  }
  const exported = await (await request.get('/llms.txt')).text();
  expect(exported).not.toContain('/tldr');
  await indexPage.goto(full);
  const indexed = await indexPage.evaluate(async () => {
    const pagefind = await new Function(
      'return import("/pagefind/pagefind.js")',
    )();
    const result = await pagefind.search('Primeiro resumo de teste');
    const entries = await Promise.all(
      result.results.map((entry: { data: () => Promise<{ url: string }> }) =>
        entry.data(),
      ),
    );
    return entries.map((entry: { url: string }) => entry.url);
  });
  expect(indexed).toContain('/cadeiras/fp/primeiro/');
  expect(indexed.some((url: string) => url.includes('/tldr/'))).toBe(false);
  const original = await (await request.get('/cadeiras/fp/primeiro.md')).text();
  expect(original).toContain('Conteúdo reservado');
  expect(original).not.toContain('Síntese curta');
});

test('TLDR navigation survives unavailable browser storage', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException('Unavailable', 'SecurityError');
    };
    Storage.prototype.setItem = () => {
      throw new DOMException('Unavailable', 'SecurityError');
    };
  });
  await page.goto(short);
  await expect(
    page.locator('.course-sidebar a[aria-current="page"]'),
  ).toHaveAttribute('href', short);
  await page.getByRole('switch', { name: 'TLDR' }).click();
  await expect(page).toHaveURL(full);
  await expect(page.locator('.lesson-body')).toContainText(
    'Conteúdo reservado',
  );
});
