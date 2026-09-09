import { expect, test } from '@playwright/test';

test('clearing reading history restores the introduction', async ({ page }) => {
  await page.goto('/');
  await page.goto('/exemplo/apontamentos/');
  await page.goto('/');
  await expect(page.locator('#page-hero')).toBeHidden();
  await page.getByRole('button', { name: 'Limpar histórico' }).click();
  await expect(page.locator('#page-hero')).toBeVisible();
  await page.reload();
  await expect(page.locator('#page-hero')).toBeVisible();
});

test('returning readers never paint the introduction before page scripts load', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('#page-hero')).toBeHidden();
});

test('DOT default text inherits theme foreground', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/cadeiras/alga/espacos-vetoriais/');
  const foreground = await page
    .locator('.prose')
    .evaluate((el) => getComputedStyle(el).color);
  await expect(page.locator('.diagram-figure text').first()).toHaveCSS(
    'fill',
    foreground,
  );
});

test('snippets can be saved, toggled, restored and recovered', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await page.getByText('CSS personalizado', { exact: true }).click();
  await page.getByLabel('Simplificar cabeçalho', { exact: true }).check();
  await page.keyboard.press('Escape');
  await expect(
    page.locator('.site-header [data-nav="nucleos"]').first(),
  ).toBeHidden();
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar snippet' }).click();
  const form = page.locator('.snippet-editor:not([hidden])');
  await form.getByLabel('Nome', { exact: true }).fill('Meu CSS');
  await form
    .getByLabel('CSS', { exact: true })
    .fill('.site-header { border-bottom-width: 7px; }');
  await form.getByRole('button', { name: 'Guardar', exact: true }).click();
  await page.getByLabel('Meu CSS', { exact: true }).check();
  await expect(page.locator('.site-header')).toHaveCSS(
    'border-bottom-width',
    '7px',
  );
  await page.reload();
  await expect(page.locator('.site-header')).toHaveCSS(
    'border-bottom-width',
    '7px',
  );
  await page.goto('/?sem-css=1');
  await expect(page.locator('#appearance')).toBeVisible();
  await expect(page.locator('.site-header')).not.toHaveCSS(
    'border-bottom-width',
    '7px',
  );
  await page.getByLabel('Meu CSS', { exact: true }).uncheck();
  await page.goto('/');
  await expect(page.locator('.site-header')).not.toHaveCSS(
    'border-bottom-width',
    '7px',
  );
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.getByText('CSS personalizado', { exact: true }).click();
  await page
    .getByRole('button', { name: 'Editar Meu CSS', exact: true })
    .click();
  await page.getByRole('button', { name: 'Eliminar', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.getByText('CSS personalizado', { exact: true }).click();
  await expect(page.getByLabel('Meu CSS', { exact: true })).toHaveCount(0);
});

test('snippets apply before external scripts, remain text and stay local', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'resumos-css-snippets',
      JSON.stringify([
        {
          id: 'custom',
          name: 'Local',
          enabled: true,
          css: '.site-header { display: none !important; } /* </style><script>window.cssExecuted=true</script> */',
        },
      ]),
    ),
  );
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('.site-header')).toBeHidden();
  expect(await page.evaluate(() => 'cssExecuted' in window)).toBe(false);
});

for (const palette of [
  'feup',
  'gruvbox',
  'catppuccin',
  'nord',
  'dracula',
  'flexoki',
  'solarized',
]) {
  test(`static and runnable code share colors and fonts in ${palette}`, async ({
    page,
  }) => {
    await page.addInitScript(
      (palette) =>
        localStorage.setItem(
          'resumos-preferences',
          JSON.stringify({ palette, codeFont: 'jetbrains' }),
        ),
      palette,
    );
    for (const mode of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: mode });
      await page.goto('/exemplo/apontamentos/');
      const staticCode = page.locator('pre.astro-code').first();
      const style = await staticCode.evaluate((el) => {
        const css = getComputedStyle(el);
        return {
          background: css.backgroundColor,
          color: css.color,
          font: css.fontFamily,
          radius: css.borderRadius,
        };
      });
      const prose = await page
        .locator('.prose')
        .evaluate((el) => getComputedStyle(el).color);
      expect(style.color).toBe(prose);
      expect(style.font).toContain('JetBrains Mono');
      await page.goto('/exemplo/codigo/');
      const code = page.getByRole('textbox', {
        name: 'Código python',
        exact: true,
      });
      await code.scrollIntoViewIfNeeded();
      await code.click();
      const editor = page.locator('.cm-editor').first();
      await expect(editor).toHaveCSS('background-color', style.background);
      await expect(editor).toHaveCSS('color', style.color);
      await expect(editor).toHaveCSS('font-family', style.font);
      await expect(editor).toHaveCSS('outline-style', 'none');
      await expect(page.locator('.playground').first()).toHaveCSS(
        'border-radius',
        style.radius,
      );
      await expect(page.locator('.playground-toolbar').first()).toHaveCSS(
        'font-size',
        '13px',
      );
    }
  });
}

test('nuclei use three columns on desktop and one on narrow screens', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/nucleos/');
  const positions = await page
    .locator('.group-card')
    .evaluateAll((cards) =>
      cards.slice(0, 3).map((card) => card.getBoundingClientRect().top),
    );
  expect(new Set(positions).size).toBe(1);
  await page.setViewportSize({ width: 390, height: 850 });
  const mobile = await page
    .locator('.group-card')
    .evaluateAll((cards) =>
      cards.slice(0, 2).map((card) => card.getBoundingClientRect().top),
    );
  expect(mobile[1]).toBeGreaterThan(mobile[0]);
});

test('code appearance responds to settings and survives reload', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  await page.getByLabel('Tema', { exact: true }).selectOption('flexoki');
  await page.getByRole('radio', { name: 'Escuro', exact: true }).check();
  await page
    .getByLabel('Fonte do código', { exact: true })
    .selectOption('jetbrains');
  await page.keyboard.press('Escape');
  const editor = page.locator('.cm-editor').first();
  await expect(editor).toHaveCSS('font-family', /JetBrains Mono/);
  await expect(editor).toHaveCSS('color', 'rgb(206, 205, 195)');
  await page.reload();
  await expect(editor).toHaveCSS('font-family', /JetBrains Mono/);
  await expect(editor).toHaveCSS('color', 'rgb(206, 205, 195)');
});
