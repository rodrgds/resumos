import { expect, test } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`default snippets hide their targets at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/exemplo/apontamentos/');
    await page.goto('/');
    await expect(page.locator('[data-reading-history]')).toBeVisible();
    await page.getByRole('button', { name: 'Personalizar aparência' }).click();
    await page.getByLabel('Ocultar continuar a ler', { exact: true }).check();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-reading-history]')).toBeHidden();
    await page.goto('/exemplo/apontamentos/');
    await page.getByRole('button', { name: 'Personalizar aparência' }).click();
    await page
      .getByLabel('Ocultar ações de IA e copiar', { exact: true })
      .check();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-open-ai]')).toBeHidden();
    await page.reload();
    await expect(page.locator('[data-open-ai]')).toBeHidden();
    await page.getByRole('button', { name: 'Personalizar aparência' }).click();
    await page.getByLabel('Simplificar cabeçalho', { exact: true }).check();
    await page.keyboard.press('Escape');
    for (const target of await page
      .locator(
        '.site-header :is([data-nav="nucleos"], [data-nav="contribute"], [data-action="notes"], [data-action="appearance"])',
      )
      .all()) {
      await expect(target).toBeHidden();
    }
    await expect(
      page.getByRole('button', { name: 'Aparência', exact: true }),
    ).toBeVisible();
  });
}

test('saved defaults are repaired before scripts without replacing custom CSS', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() =>
    localStorage.setItem(
      'resumos-css-snippets',
      JSON.stringify([
        {
          id: 'hide-ai',
          name: 'O meu nome',
          enabled: true,
          css: '[data-open-ai], #ai-menu, #copy-prompt { display: none; }',
        },
        {
          id: 'hide-history',
          name: 'Histórico personalizado',
          enabled: true,
          css: '.site-header { border-bottom-width: 7px; }',
        },
      ]),
    ),
  );
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/exemplo/apontamentos/');
  await expect(page.locator('[data-open-ai]')).toBeHidden();
  await expect(page.locator('.site-header')).toHaveCSS(
    'border-bottom-width',
    '7px',
  );
  await page.unroute('**/*.js');
  await page.reload();
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await expect(page.getByLabel('O meu nome', { exact: true })).toBeChecked();
  await page
    .getByRole('button', { name: 'Adicionar sugestões em falta' })
    .click();
  await expect(
    page.getByLabel('Ocultar Brain rot', { exact: true }),
  ).not.toBeChecked();
  await expect(
    page.getByLabel('Histórico personalizado', { exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole('button', { name: 'Adicionar sugestões em falta' }),
  ).toBeHidden();
  await page
    .getByRole('button', { name: 'Editar Ocultar Brain rot', exact: true })
    .click();
  await page.getByRole('button', { name: 'Eliminar', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await expect(
    page.getByLabel('Ocultar Brain rot', { exact: true }),
  ).toHaveCount(0);
});

for (const width of [1440, 390]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`new suggestions work together at ${width}px in ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/exemplo/apontamentos/');
      await page
        .getByRole('button', { name: 'Personalizar aparência' })
        .click();
      for (const name of [
        'Ocultar Brain rot',
        'Cabeçalho sem seguir o scroll',
        'Sublinhar links dos apontamentos',
        'Quebrar linhas de código estático',
        'Alternar o fundo das linhas de tabelas',
      ]) {
        await page.getByLabel(name, { exact: true }).check();
      }
      await page.keyboard.press('Escape');
      await expect(page.locator('[data-open-brainrot]')).toBeHidden();
      await expect(page.locator('.site-header')).toHaveCSS(
        'position',
        'static',
      );
      await expect(page.locator('.prose a').first()).toHaveCSS(
        'text-decoration-line',
        'underline',
      );
      await expect(page.locator('pre.astro-code').first()).toHaveCSS(
        'white-space',
        'pre-wrap',
      );
      const soft = await page
        .locator('.lesson-body .prose')
        .evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--soft').trim(),
        );
      const stripe = page.locator('.prose tbody tr:nth-child(even)').first();
      // Resolve the theme color through the browser, including color-mix values.
      const expected = await page.evaluate((color) => {
        const probe = document.createElement('div');
        probe.style.backgroundColor = color;
        document.body.append(probe);
        const resolved = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return resolved;
      }, soft);
      await expect(stripe).toHaveCSS('background-color', expected);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page
        .getByRole('button', { name: 'Personalizar aparência' })
        .click();
      await page.locator('.css-snippets').scrollIntoViewIfNeeded();
    });
  }
}

test('an edited AI preset keeps its CSS', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() =>
    localStorage.setItem(
      'resumos-css-snippets',
      JSON.stringify([
        {
          id: 'hide-ai',
          name: 'Meu botão',
          enabled: true,
          css: '.page-actions [data-open-ai] { border-width: 7px; }',
        },
      ]),
    ),
  );
  await page.goto('/exemplo/apontamentos/');
  await expect(page.locator('[data-open-ai]')).toBeVisible();
  await expect(page.locator('[data-open-ai]')).toHaveCSS('border-width', '7px');
});
