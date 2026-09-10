import { expect, test } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`opening notes preserves reading position and measure at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/exemplo/apontamentos/');
    const article = page.locator('.lesson-body');
    await article.scrollIntoViewIfNeeded();
    const before = await article.boundingBox();
    await page.keyboard.press('n');
    await expect(page.locator('#scratchpad')).toBeVisible();
    expect(await article.boundingBox()).toEqual(before);
    await page.keyboard.press('Escape');
    await expect(page.locator('#scratchpad')).toBeHidden();
  });
}

test('projects are absent from discovery links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="/projetos/"]')).toHaveCount(0);
});

test('chapter overlay supports section jumps and Escape without reflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 878, height: 900 });
  await page.goto('/exemplo/apontamentos/');
  const article = page.locator('.lesson-body');
  const before = await article.boundingBox();
  const trigger = page.locator('.course-sidebar > summary');
  await trigger.click();
  const nav = page.getByRole('navigation', { name: 'Conteúdos da cadeira' });
  await expect(nav).toBeVisible();
  expect(await article.boundingBox()).toEqual(before);
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  const section = nav.locator('.toc-links a').first();
  const hash = await section.getAttribute('href');
  await section.click();
  await expect(nav).toBeHidden();
  expect(new URL(page.url()).hash).toBe(encodeURI(hash!));
});

for (const width of [1440, 390]) {
  test(`reader navigation and author brackets remain usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto('/cadeiras/fsi/principios-seguranca/');
    await page.screenshot({ path: `.impeccable/review/reader-${width}.png` });
    if (width < 1200) await page.locator('.course-sidebar > summary').click();
    const chapters = await page.locator('.course-sidebar nav').boundingBox();
    expect(chapters!.x).toBeGreaterThanOrEqual(16);
    expect(chapters!.x + chapters!.width).toBeLessThanOrEqual(width - 16);
    await page.screenshot({ path: `.impeccable/review/chapters-${width}.png` });
    await page
      .getByRole('navigation', { name: 'Conteúdos da cadeira' })
      .getByRole('link', { name: 'Apresentação', exact: true })
      .click();
    await expect(
      page
        .getByRole('navigation', { name: 'Resumos da cadeira' })
        .getByRole('link')
        .first(),
    ).toBeVisible();
    await page.screenshot({ path: `.impeccable/review/course-${width}.png` });
    await page.goto('/exemplo/formatacao/');
    const bracket = page.getByRole('complementary', { name: 'Ideia-chave' });
    await bracket.scrollIntoViewIfNeeded();
    await expect(bracket).toContainText('Destaca a condição');
    await expect(bracket).toHaveAttribute('data-drawn', '');
    await page.screenshot({ path: `.impeccable/review/bracket-${width}.png` });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test('chapter links and author emphasis remain usable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/exemplo/formatacao/');
  const bracket = page.getByRole('complementary', { name: 'Ideia-chave' });
  await expect(bracket).toContainText('Destaca a condição');
  await page.locator('.course-sidebar > summary').click();
  await page
    .getByRole('navigation', { name: 'Conteúdos da cadeira' })
    .getByRole('link', { name: 'Apresentação', exact: true })
    .click();
  await expect(
    page.getByRole('navigation', { name: 'Resumos da cadeira' }),
  ).toBeVisible();
  await context.close();
});

test('shared header and direct lesson actions stay consistent', async ({
  page,
}) => {
  await page.setViewportSize({ width: 878, height: 859 });
  await page.goto('/');
  const home = await page.locator('.site-header').innerHTML();
  await page.goto('/exemplo/');
  expect(await page.locator('.site-header').innerHTML()).toBe(home);
  await expect(
    page.getByRole('button', { name: 'Brain rot', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.page-actions a.markdown-link')).toHaveCount(0);
  const chat = await page
    .locator('[data-open-ai]')
    .evaluate((el) => getComputedStyle(el).font);
  expect(
    await page
      .locator('[data-open-brainrot]')
      .evaluate((el) => getComputedStyle(el).font),
  ).toBe(chat);
});

test('section progress follows reading and links to sections', async ({
  page,
}) => {
  await page.setViewportSize({ width: 878, height: 900 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const progress = page.getByRole('navigation', {
    name: 'Progresso por secção',
  });
  await expect(progress).toBeVisible();
  const link = progress.getByRole('link').nth(2);
  await link.click();
  await expect(link).toHaveAttribute('aria-current', 'location');
  expect(new URL(page.url()).hash).toBe(
    encodeURI((await link.getAttribute('href'))!),
  );
  await page.locator('.lesson-pagination').scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      progress
        .getByRole('link')
        .evaluateAll((links) =>
          links.every(
            (link) => link.style.getPropertyValue('--section-progress') === '1',
          ),
        ),
    )
    .toBe(true);
});

test('mobile header hides downwards, returns upwards and reveals keyboard focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const header = page.locator('.site-header');
  await page.mouse.wheel(0, 650);
  await expect(header).toHaveClass(/header-hidden/);
  await page.mouse.wheel(0, -120);
  await expect(header).not.toHaveClass(/header-hidden/);
  await page.mouse.wheel(0, 200);
  await expect(header).toHaveClass(/header-hidden/);
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).focus();
  await expect(header).not.toHaveClass(/header-hidden/);
  await page.getByLabel('Mais navegação', { exact: true }).click();
  await expect(
    page.locator('.header-menu-links').getByRole('link', { name: 'Núcleos' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(
    page.getByLabel('Mais navegação', { exact: true }),
  ).toBeFocused();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test('wide navigation frames a narrower article and padded actions', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const brand = await page.locator('.brand').boundingBox();
  const course = await page.locator('.reader-course').boundingBox();
  expect(brand!.x).toBe(48);
  const article = await page.locator('.course-article').boundingBox();
  const sections = await page.locator('.page-sections').boundingBox();
  expect(course!.x).toBeLessThan(article!.x);
  expect(sections!.x).toBeGreaterThanOrEqual(article!.x + article!.width);
  expect(
    await page
      .locator('.lesson-body')
      .evaluate((el) => el.getBoundingClientRect().width),
  ).toBe(640);
  for (const button of await page.locator('.page-actions > button').all()) {
    expect(
      await button.evaluate((el) =>
        parseFloat(getComputedStyle(el).paddingLeft),
      ),
    ).toBeGreaterThanOrEqual(12);
    expect(
      await button.evaluate((el) =>
        parseFloat(getComputedStyle(el).paddingRight),
      ),
    ).toBeGreaterThanOrEqual(12);
  }
});

for (const width of [390, 320]) {
  test(`opening the mobile notebook preserves header spacing at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/exemplo/apontamentos/');
    const bounds = () =>
      page.locator('.header-inner').evaluate((el) => {
        const brand = el.querySelector('.brand')!.getBoundingClientRect();
        const nav = el.querySelector('nav')!.getBoundingClientRect();
        return { brandLeft: brand.left, navRight: nav.right };
      });
    const before = await bounds();
    await page
      .getByRole('button', { name: 'Abrir caderno', exact: true })
      .click();
    expect(await bounds()).toEqual(before);
    await page.setViewportSize({ width, height: 430 });
    expect(await bounds()).toEqual(before);
  });
}

test('course progress spans lessons and preserves desktop sidebars', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const course = page.getByRole('navigation', { name: 'Percurso da cadeira' });
  const links = course.getByRole('link');
  expect(await links.count()).toBeGreaterThan(1);
  await links.nth(1).click();
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.course-sidebar nav')).toBeVisible();
  await expect(page.locator('.page-sections')).toBeVisible();
  await page.locator('.lesson-pagination').scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      links
        .nth(1)
        .evaluate((el) => el.style.getPropertyValue('--section-progress')),
    )
    .toBe('1');
  await expect(page.locator('.course-sidebar nav')).toBeVisible();
});

test('desktop header returns on upward scroll and keyboard focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  await page.mouse.wheel(0, 650);
  await expect(page.locator('.site-header')).toHaveClass(/header-hidden/);
  await page.mouse.wheel(0, -120);
  await expect(page.locator('.site-header')).not.toHaveClass(/header-hidden/);
  await page.mouse.wheel(0, 200);
  await expect(page.locator('.site-header')).toHaveClass(/header-hidden/);
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).focus();
  await expect(page.locator('.site-header')).not.toHaveClass(/header-hidden/);
});

test('desktop section list underlines the current section and crosses passed sections', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const sidebar = page.getByRole('complementary', {
    name: 'Secções desta página',
  });
  await expect(sidebar.locator('.section-progress')).toHaveCount(0);
  const links = sidebar.locator('.toc-links a');
  await links.nth(1).click();
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'location');
  await expect(links.first()).toHaveAttribute('data-completed', '');
  await expect(links.first()).toHaveAttribute('data-drawn', '');
  await expect(links.nth(1)).toHaveCSS('text-decoration-line', 'underline');
  await page.screenshot({
    path: '.impeccable/review/section-list-progress.png',
  });
  await links.first().click();
  await expect(links.first()).toHaveAttribute('aria-current', 'location');
  await expect(links.first()).not.toHaveAttribute('data-completed', '');
  await page.locator('.lesson-pagination').scrollIntoViewIfNeeded();
  await expect(links.last()).toHaveAttribute('data-completed', '');
});
