import { expect, test } from '@playwright/test';

test('families expose variants, keep the selected family, and persist an accent across modes and reload', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.getByRole('radio', { name: 'Flexoki', exact: true }).check();
  const variant = page.getByRole('combobox', {
    name: /Variante|Acento Flexoki/,
  });
  await expect(variant.locator('option')).toHaveCount(8);
  await variant.selectOption({ label: 'Ciano' });
  await expect(
    page.getByRole('radio', { name: 'Flexoki', exact: true }),
  ).toBeChecked();
  await expect(page.locator('html')).toHaveAttribute(
    'data-palette',
    'flexoki-cyan',
  );
  await page.getByRole('radio', { name: 'Escuro', exact: true }).check();
  await expect(variant).toHaveValue('flexoki-cyan');
  await page.reload();
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await expect(variant).toHaveValue('flexoki-cyan');
  await expect(
    page.getByRole('radio', { name: 'Flexoki', exact: true }),
  ).toBeChecked();
  await page.getByRole('radio', { name: 'Gruvbox', exact: true }).check();
  await variant.selectOption({ label: 'Hard' });
  await expect(page.locator('html')).toHaveAttribute(
    'data-palette',
    'gruvbox-hard',
  );
  await page.getByRole('radio', { name: 'Obsidian', exact: true }).check();
  await expect(variant).toBeHidden();
});

test('code has distinct category colours shared by static code and editors, independent of Flexoki accent', async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (localStorage.getItem('resumos-preferences')) return;
    localStorage.setItem(
      'resumos-preferences',
      JSON.stringify({ palette: 'flexoki' }),
    );
  });
  await page.goto('/exemplo/codigo/');
  const editor = page
    .getByRole('region', { name: 'Experimentar Python', exact: true })
    .getByRole('textbox', { name: 'Código python', exact: true });
  await editor.fill(
    'def rainbow(value):\n    # Comment\n    return "string", value + 42',
  );
  const colors = await editor
    .locator('span')
    .evaluateAll((spans) => [
      ...new Set(spans.map((span) => getComputedStyle(span).color)),
    ]);
  expect(colors.length).toBeGreaterThanOrEqual(6);
  const before = await editor.innerText();
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page
    .getByLabel('Acento Flexoki', { exact: true })
    .selectOption({ label: 'Verde' });
  await expect(editor).toHaveText(before.replaceAll('\n', ''));
  const after = await editor
    .locator('span')
    .evaluateAll((spans) => [
      ...new Set(spans.map((span) => getComputedStyle(span).color)),
    ]);
  expect(after).toEqual(colors);
  await page.getByRole('radio', { name: 'Catppuccin', exact: true }).check();
  const values = editor.getByText('value', { exact: true });
  const declarationColor = await values
    .first()
    .evaluate((span) => getComputedStyle(span).color);
  const referenceColor = await values
    .last()
    .evaluate((span) => getComputedStyle(span).color);
  expect(declarationColor).not.toBe(referenceColor);
  const numberColor = await editor
    .getByText('42', { exact: true })
    .evaluate((span) => getComputedStyle(span).color);
  await page.goto('/exemplo/formatacao/');
  await expect(
    page.locator('pre.astro-code span[style*="--code-token-constant"]').first(),
  ).toHaveCSS('color', numberColor);
});
