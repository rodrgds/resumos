import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const chromeErrors: string[] = [];
test.beforeEach(async ({ page }) => {
  page.on('pageerror', (error) => chromeErrors.push(error.message));
  await page.goto('/');
});
test.afterEach(() => {
  expect(chromeErrors.splice(0)).toEqual([]);
});

test('global search finds courses and content without filtering the homepage', async ({
  page,
}) => {
  await expect(page.locator('#course-search, [data-year]')).toHaveCount(0);
  await page.keyboard.press('/');
  const search = page.getByRole('searchbox');
  await expect(search).toBeFocused();
  await search.fill('metodos estatisticos');
  await expect(page.locator('#search-results')).toContainText(
    'Métodos Estatísticos',
  );
  await search.fill('Fletcher');
  await expect(page.locator('#search-results')).toContainText('Fletcher');
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('#search-results a').last()).toBeFocused();
  await search.focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/exemplo\/diagramas/);
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).click();
  await search.fill('JuniFEUP');
  await expect(page.locator('#search-results')).toContainText('Núcleos');
  // Pagefind falls back to shorter prefixes for unquoted queries.
  await search.fill('"zzzzinexistente"');
  await expect(page.locator('#search-status')).toContainText('Não encontrámos');
});

test('unpublished courses explain their status and restore focus', async ({
  page,
}) => {
  const card = page.locator('[data-course][data-acronym="PUP"]');
  await card.click();
  await expect(page.getByRole('dialog')).toContainText('Projeto UP');
  await expect(page.getByRole('dialog')).toContainText(
    'ainda estão por escrever',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(card).toBeFocused();
});

test('semester pins add horizontal cards at the top and survive reload', async ({
  page,
}) => {
  const original = page.locator('#cadeiras .semester').first();
  const pin = original.locator('.semester-pin');
  await pin.click();
  const pinned = page.locator('[data-pinned-semesters]');
  await expect(pinned).toBeVisible();
  await expect(page.locator('#page-hero')).toBeHidden();
  await expect(original).toBeVisible();
  await expect(pin).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => scrollY)).toBe(0);
  const card = pinned.locator('[data-course]').first();
  const bounds = (await card.boundingBox())!;
  expect(bounds.width).toBeGreaterThan(bounds.height);
  await page.reload();
  await expect(pinned).toBeVisible();
  await expect(page.locator('#page-hero')).toBeHidden();
  await expect(pin).toHaveAttribute('aria-pressed', 'true');
  await pinned.locator('[data-acronym="PUP"]').click();
  await expect(page.locator('#course-detail')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(pinned.locator('[data-acronym="PUP"]')).toBeFocused();
  await pinned.locator('.semester-pin').click();
  await expect(pinned).toBeHidden();
  await expect(page.locator('#page-hero')).toBeVisible();
  await expect(pin).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(pinned).toBeHidden();
});

test('visiting the catalogue alone keeps the introduction visible', async ({
  page,
}) => {
  await expect(page.locator('#page-hero')).toBeVisible();
  await page.reload();
  await expect(page.locator('#page-hero')).toBeVisible();
});

test('CT choices follow their group, stay local and update pinned semesters', async ({
  page,
}) => {
  const thirdYear = page.locator('#cadeiras [data-semester="3-1"]');
  await thirdYear.getByText('Escolher CT III', { exact: true }).click();
  const choice = thirdYear.getByRole('combobox', { name: 'Opção de CT III' });
  await choice.selectOption('ct-iadp');
  await expect(thirdYear.locator('[data-ct-card]')).toContainText(
    'Introdução à análise de dados em Python',
  );
  await thirdYear.locator('.semester-pin').click();
  const pinned = page.locator('[data-pinned-semesters]');
  await expect(pinned.locator('[data-ct-card]')).toContainText(
    'Introdução à análise de dados em Python',
  );
  await page.reload();
  await thirdYear.getByText('Escolher CT III', { exact: true }).click();
  await expect(choice).toHaveValue('ct-iadp');
  await expect(pinned.locator('[data-ct-card]')).toContainText(
    'Introdução à análise de dados em Python',
  );
  await pinned.getByText('Escolher CT III', { exact: true }).click();
  await pinned
    .getByRole('combobox', { name: 'Opção de CT III' })
    .selectOption('ct-aadl');
  await expect(
    pinned.getByRole('combobox', { name: 'Opção de CT III' }),
  ).toBeFocused();
  const accessibility = await new AxeBuilder({ page })
    .include('[data-pinned-semesters]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  const published = thirdYear.locator('[data-ct-card] a');
  await expect(published).toHaveAttribute('href', '/cadeiras/ct-aadl/');
  await pinned.locator('[data-ct-card] a').click();
  await expect(page).toHaveURL(/\/cadeiras\/ct-aadl\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'aquisição automatizada de dados laboratoriais',
  );
  await page.goto('/');
  await thirdYear.getByText('Escolher CT III', { exact: true }).click();
  await expect(choice).toHaveValue('ct-aadl');
  await choice.selectOption('');
  await expect(pinned.locator('[data-ct-card]')).toContainText(
    'Competências Transversais III',
  );
  await page.reload();
  await thirdYear.getByText('Escolher CT III', { exact: true }).click();
  await expect(choice).toHaveValue('');
});

test('saved CT choices reject unknown options and options from another group', async ({
  page,
}) => {
  await page.evaluate(() =>
    localStorage.setItem(
      'resumos-ct-choices',
      JSON.stringify({ ct1: 'ct-cp', ct2: 'ct-iadp', ct3: 'unknown' }),
    ),
  );
  await page.reload();
  for (const group of ['ct1', 'ct2', 'ct3']) {
    await expect(
      page.locator(`#cadeiras [data-ct-choice="${group}"]`),
    ).toHaveValue('');
  }
  await page.getByText('Escolher CT II', { exact: true }).click();
  const choice = page.getByRole('combobox', { name: 'Opção de CT II' });
  await choice.selectOption('ct-cp');
  await expect(page.locator('#cadeiras [data-ct-slot="ct2"]')).toContainText(
    'Comunicação Profissional',
  );
  await page.reload();
  await page.getByText('Escolher CT II', { exact: true }).click();
  await expect(choice).toHaveValue('ct-cp');
});

test('CT reference links remain available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: test.info().project.use.baseURL,
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByText('Escolher CT III', { exact: true }).click();
  const slot = page.locator('#cadeiras [data-ct-slot="ct3"]');
  await expect(
    slot.getByRole('link', { name: 'Introdução à análise de dados em Python' }),
  ).toHaveAttribute('href', /pv_ocorrencia_id=590452$/);
  await expect(
    slot.getByRole('link', { name: /aquisição automatizada/ }),
  ).toHaveAttribute('href', '/cadeiras/ct-aadl/');
  await context.close();
});

test('appearance persists, follows system, and resets', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await page.getByRole('radio', { name: 'Escuro', exact: true }).check();
  await page.getByRole('radio', { name: 'Azul', exact: true }).check();
  await page.getByLabel('Largura da página').fill('1840');
  await page
    .getByRole('group', { name: 'Fonte de leitura', exact: true })
    .getByRole('radio', { name: 'Source Serif 4', exact: true })
    .check();
  await page.getByRole('slider', { name: 'Tamanho do texto' }).fill('120');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'blue');
  await expect(page.locator('html')).toHaveAttribute('data-width', '1840');
  await expect(page.locator('html')).toHaveAttribute('data-font', 'serif');
  await expect(page.locator('html')).toHaveAttribute('data-size', '120');
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await page.getByRole('button', { name: 'Repor preferências' }).click();
  await expect(
    page
      .getByRole('group', { name: 'Modo de cor' })
      .getByRole('radio', { name: 'Sistema', exact: true }),
  ).toBeChecked();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Personalizar aparência' }),
  ).toBeFocused();
});

for (const width of [1440, 390, 320]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${width}px ${theme}: accessible and no overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      await page
        .getByRole('button', { name: 'Personalizar aparência' })
        .click();
      const panelResult = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        panelResult.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    });
  }
}
