import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('project links remain available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/projetos/');
  await expect(
    page.getByRole('link', { name: 'FeUpload', exact: true }),
  ).toHaveAttribute('href', 'https://github.com/T0m2sT/FeUpload');
  await expect(page.getByRole('search')).toBeHidden();
  await context.close();
});

test('project search combines course and text, restores its URL and clears empty results', async ({
  page,
}) => {
  await page.goto('/projetos/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Projetos de estudantes',
  );
  await page.getByLabel('Cadeira ou área', { exact: true }).selectOption('DA');
  await page
    .getByRole('searchbox', { name: 'Pesquisar projetos' })
    .fill('registos');
  const results = page.locator('[data-project]:visible');
  await expect(results).toHaveCount(2);
  await expect(
    results.filter({ hasText: 'sillss1/register-allocation-tool' }),
  ).toBeVisible();
  await expect(
    results.filter({ hasText: 'MiguelMirandaRocha/FEUP-LEIC-DA-Proj2' }),
  ).toBeVisible();
  await page.reload();
  await expect(results).toHaveCount(2);
  await page
    .getByRole('searchbox', { name: 'Pesquisar projetos' })
    .fill('nenhum-projeto-assim');
  await expect(page.locator('[data-project-empty]')).toBeVisible();
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(
    page.getByRole('searchbox', { name: 'Pesquisar projetos' }),
  ).toBeFocused();
  await expect(
    page.getByRole('link', { name: 'FeUpload', exact: true }),
  ).toHaveAttribute('href', 'https://github.com/T0m2sT/FeUpload');
  await expect(page).toHaveURL(/\/projetos\/$/);
});

for (const width of [1440, 390, 320]) {
  test(`projects at ${width}px remain accessible and fit the viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/projetos/');
    await page
      .getByLabel('Cadeira ou área', { exact: true })
      .selectOption('LCOM');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}
