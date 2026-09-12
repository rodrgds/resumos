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
    if (width < 1200) await page.locator('.course-sidebar > summary').click();
    const chapters = await page.locator('.course-sidebar nav').boundingBox();
    expect(chapters!.x).toBeGreaterThanOrEqual(16);
    expect(chapters!.x + chapters!.width).toBeLessThanOrEqual(width - 16);
    await page
      .getByRole('navigation', { name: 'Conteúdos da cadeira' })
      .getByRole('link', { name: 'Apresentação', exact: true })
      .click();
    await expect(page.locator('main .course-contents')).toHaveCount(0);
    if (width < 1200) await page.locator('.course-sidebar > summary').click();
    await expect(
      page
        .getByRole('navigation', { name: 'Conteúdos da cadeira' })
        .getByRole('link', { name: /Princípios de segurança/ }),
    ).toBeVisible();
    if (width < 1200) await page.keyboard.press('Escape');
    await page.goto('/exemplo/formatacao/');
    const bracket = page.getByRole('complementary', { name: 'Ideia-chave' });
    await bracket.scrollIntoViewIfNeeded();
    await expect(bracket).toContainText('Destaca a condição');
    await expect(bracket).toHaveAttribute('data-drawn', '');
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
  await page.locator('.course-sidebar > summary').click();
  await expect(
    page
      .getByRole('navigation', { name: 'Conteúdos da cadeira' })
      .getByRole('link', { name: /Texto e fórmulas/ }),
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

test('mobile reading keeps course progress without a page section strip', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  await expect(
    page.getByRole('navigation', { name: 'Progresso por secção' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('navigation', { name: 'Percurso da cadeira' }),
  ).toBeVisible();
});

test('mobile page actions stay on one horizontally scrollable row', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const actions = page.locator('.page-actions');

  await expect(actions).toBeVisible();
  await expect(actions.locator(':scope > button')).toHaveCount(3);
  await expect
    .poll(() => actions.evaluate((element) => element.scrollWidth))
    .toBeGreaterThan(await actions.evaluate((element) => element.clientWidth));
  expect(
    await actions.evaluate((element) => element.clientHeight),
  ).toBeLessThan(90);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);

  await actions.evaluate((element) => {
    element.scrollLeft = element.scrollWidth;
  });
  expect(
    await actions.evaluate((element) => element.scrollLeft),
  ).toBeGreaterThan(0);
});

test('mobile reader bars sit directly below the site header', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const bounds = await page.evaluate(() => {
    const header = document
      .querySelector('.site-header')!
      .getBoundingClientRect();
    const headerStyle = getComputedStyle(
      document.querySelector('.site-header')!,
    );
    const navigation = document
      .querySelector('.reader-navigation')!
      .getBoundingClientRect();
    return {
      headerBottom: header.bottom,
      navigationTop: navigation.top,
      headerBorderBottom: headerStyle.borderBottomWidth,
    };
  });

  expect(bounds.navigationTop).toBe(bounds.headerBottom);
  expect(bounds.headerBorderBottom).toBe('0px');
});

test('mobile course progress fills the navigation track', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/lbaw/');
  const progress = page.locator('.course-progress');
  const bounds = await progress.evaluate((element) => {
    const track = element.getBoundingClientRect();
    const links = [...element.querySelectorAll('a')];
    const first = links[0].getBoundingClientRect();
    const last = links.at(-1)!.getBoundingClientRect();
    return {
      trackRight: track.right,
      firstLeft: first.left,
      lastRight: last.right,
      lastWidth: last.width,
    };
  });

  expect(bounds.firstLeft).toBeCloseTo(12, 0);
  expect(bounds.lastRight).toBeCloseTo(bounds.trackRight, 0);
  expect(bounds.lastWidth).toBeGreaterThan(24);
});

test('desktop course progress fits its sidebar without horizontal scrolling', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/cadeiras/fsi/principios-seguranca/');
  const bounds = await page.locator('.course-progress').evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));

  expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.clientWidth);
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
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await links.nth(1).click();
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'location');
  await expect(links.first()).toHaveAttribute('data-completed', '');
  await expect(links.first()).toHaveAttribute('data-drawn', 'strike-through');
  await expect(links.nth(1)).toHaveAttribute('data-drawn', 'underline');
  await expect(links.nth(1).locator('svg')).toBeAttached();
  const path = links.first().locator('svg path').first();
  await expect(path).toHaveCSS(
    'stroke',
    await page
      .locator('.course-sidebar a[aria-current="page"]')
      .evaluate((el) => getComputedStyle(el).color),
  );
  await expect(path).toHaveCSS('animation-name', 'rough-notation-dash');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(links.first().locator('svg path').first()).toHaveCSS(
    'animation-name',
    'none',
  );
  await links.first().click();
  await expect(links.first()).toHaveAttribute('aria-current', 'location');
  await expect(links.first()).not.toHaveAttribute('data-completed', '');
  await page.locator('.lesson-pagination').scrollIntoViewIfNeeded();
  await expect(links.last()).toHaveAttribute('data-completed', '');
});

test('desktop course sidebar uses the viewport down to its bottom gutter', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 640 });
  await page.goto('/cadeiras/am2/taylor-extremos/');
  await page.mouse.wheel(0, 600);
  await expect(page.locator('.site-header')).toHaveClass(/header-hidden/);
  const sidebar = page.locator('.reader-navigation');
  await expect
    .poll(async () => {
      const box = await sidebar.boundingBox();
      return Math.round(box!.y + box!.height);
    })
    .toBe(616);
  await sidebar.hover();
  await page.mouse.wheel(0, 1800);
  await expect(page.locator('.course-contribute')).toBeInViewport();
});

test('mobile header hides after closing appearance with a pointer', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/fsi/controlo-acessos/');
  const trigger = page.getByRole('button', { name: 'Personalizar aparência' });
  await trigger.click();
  await page.getByRole('button', { name: 'Fechar personalização' }).click();
  await expect(trigger).toBeFocused();
  await page.mouse.wheel(0, 650);
  await expect(page.locator('.site-header')).toHaveClass(/header-hidden/);
  await page.keyboard.press('Tab');
  await expect(page.locator('.site-header')).not.toHaveClass(/header-hidden/);
});
