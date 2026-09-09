import { expect, test } from '@playwright/test';

test('AI menu stays next to its trigger and ChatGPT enables web search', async ({
  page,
}) => {
  await page.goto('/exemplo/diagramas/');
  const trigger = page.getByRole('button', { name: 'Perguntar ao Chat' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const button = (await trigger.boundingBox())!;
  const menu = (await page.locator('#ai-menu').boundingBox())!;
  expect(Math.abs(menu.x - button.x)).toBeLessThan(16);
  expect(Math.abs(menu.y - button.y - button.height)).toBeLessThan(16);
  const href = await page
    .locator('[data-provider="chatgpt"]')
    .getAttribute('href');
  expect(new URL(href!).searchParams.get('hints')).toBe('search');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#ai-menu')).toBeHidden();
});

test('course navigation comes from content and keeps drafts private', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#cadeira-fp').click();
  await expect(page).toHaveURL('/cadeiras/fp/');
  const sidebar = page.getByRole('navigation', {
    name: 'Conteúdos da cadeira',
  });
  await sidebar.getByRole('link', { name: 'Primeiro resumo de teste' }).click();
  await expect(
    sidebar.getByRole('link', { name: 'Primeiro resumo de teste' }),
  ).toHaveAttribute('aria-current', 'page');
  await page
    .getByRole('navigation', { name: 'Continuar a leitura' })
    .getByRole('link', { name: /Segundo resumo/ })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Segundo resumo de teste', exact: true }),
  ).toBeVisible();
  await expect(sidebar).not.toContainText('Segredo do rascunho');
  expect((await page.request.get('/cadeiras/fp/rascunho/')).status()).toBe(404);
  expect((await page.request.get('/cadeiras/fp/rascunho.md')).status()).toBe(
    404,
  );
  const markdown = await page.request.get('/exemplo/diagramas.md');
  expect(markdown.ok()).toBe(true);
  expect(await markdown.text()).toContain('$n^2$');
  expect(await markdown.text()).toContain('/exemplo/diagramas/figura-1.svg');
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).click();
  await page.getByRole('searchbox').fill('rascunhoexclusivoxqz928');
  await expect(page.locator('#search-status')).toContainText('Não');
  await expect(page.locator('#search-results a')).toHaveCount(0);
});

test('footnotes, containers and details work in Markdown and MDX', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-footnote-ref]').first().click();
  await expect(page).toHaveURL(/#user-content-fn-fonte$/);
  await expect(page.locator('[data-footnotes]')).toContainText(
    'Notas de rodapé',
  );
  await page.locator('[data-footnote-backref]').first().click();
  await expect(page).toHaveURL(/#user-content-fnref-fonte$/);
  await expect(page.locator('.admonition-tip')).toContainText(
    'Uma ideia por parágrafo',
  );
  const details = page.locator('details.admonition-details');
  await expect(details).not.toHaveAttribute('open');
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open');
  await page.goto('/exemplo/formatacao/');
  await expect(page.locator('.admonition-info')).toContainText(
    'Antes de começar',
  );
  await expect(page.locator('.admonition-warning')).toContainText('limites');
  await expect(page.locator('.admonition-danger')).toContainText(
    'Divisão por zero',
  );
});

test('code tabs support keyboard selection and image filters respect theme', async ({
  page,
}) => {
  await page.goto('/exemplo/formatacao/');
  const python = page.getByRole('tab', { name: 'Python' });
  await python.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'C++' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('std::cout');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tabpanel')).toContainText('print(');
  const filtered = page.locator('img[data-dark-image="dim"]');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(filtered).toHaveCSS('filter', 'brightness(0.75)');
  await expect(page.locator('img[data-dark-image="invert"]')).toHaveCSS(
    'filter',
    'invert(1) hue-rotate(180deg)',
  );
  await expect(page.locator('img[data-dark-image="original"]')).toHaveCSS(
    'filter',
    'none',
  );
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(filtered).toHaveCSS('filter', 'none');
});

test('all eight reading fonts load locally and survive navigation', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  const select = page.getByLabel('Fonte de leitura');
  const families = [
    ['sans', 'Manrope Variable'],
    ['inter', 'Inter Variable'],
    ['atkinson', 'Atkinson Hyperlegible'],
    ['lexend', 'Lexend Variable'],
    ['serif', 'Source Serif 4 Variable'],
    ['lora', 'Lora Variable'],
    ['literata', 'Literata Variable'],
    ['mono', 'IBM Plex Mono'],
  ];
  await expect(select.locator('option')).toHaveCount(8);
  for (const [id, family] of families) {
    await select.selectOption(id);
    await expect(page.locator('.prose')).toHaveCSS(
      'font-family',
      new RegExp(family),
    );
    expect(
      await page.evaluate(
        async (family) =>
          (await document.fonts.load(`16px "${family}"`)).length > 0,
        family,
      ),
    ).toBe(true);
  }
  await page.goto('/exemplo/diagramas/');
  await expect(page.locator('html')).toHaveAttribute('data-font', 'mono');
  await expect(page.locator('.prose')).toHaveCSS(
    'font-family',
    /IBM Plex Mono/,
  );
});

test('YouTube shows its thumbnail before loading the player', async ({
  page,
}) => {
  await page.route('https://i.ytimg.com/**', (route) =>
    route.fulfill({
      path: 'public/examples/pontos.svg',
      contentType: 'image/svg+xml',
    }),
  );
  await page.goto('/exemplo/diagramas/');
  const image = page.locator('.video-thumbnail');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute(
    'src',
    'https://i.ytimg.com/vi/fNk_zzaMoSs/hqdefault.jpg',
  );
  await expect
    .poll(() =>
      image.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 100,
      ),
    )
    .toBe(true);
  await expect(page.locator('iframe')).toHaveCount(0);
});

for (const width of [390, 320]) {
  test(`mobile course navigation and AI menu at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/exemplo/');
    await page.locator('.course-sidebar > summary').click();
    await page
      .getByRole('navigation', { name: 'Conteúdos da cadeira' })
      .getByRole('link', { name: 'Caixas e imagens', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Caixas e imagens', exact: true }),
    ).toBeVisible();
    const trigger = page.getByRole('button', { name: 'Perguntar ao Chat' });
    await trigger.click();
    await expect(page.locator('#ai-menu')).toBeVisible();
    const menu = (await page.locator('#ai-menu').boundingBox())!;
    expect(menu.x).toBeGreaterThanOrEqual(0);
    expect(menu.x + menu.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('Escape');
    await expect(page.locator('#ai-menu')).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
