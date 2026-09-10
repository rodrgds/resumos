import { expect, test } from '@playwright/test';

for (const language of ['prolog', 'riscv']) {
  test(`${language} distinguishes syntax tokens in the editor`, async ({
    page,
  }) => {
    await page.goto('/exemplo/codigo/');
    const playground = page.locator(`[data-language="${language}"]`);
    await playground.scrollIntoViewIfNeeded();
    const editor = playground.getByRole('textbox', {
      name: `Código ${language}`,
      exact: true,
    });
    await expect(editor).toBeVisible();
    await expect
      .poll(() =>
        editor
          .locator('.cm-line span')
          .evaluateAll(
            (tokens) =>
              new Set(tokens.map((token) => getComputedStyle(token).color))
                .size,
          ),
      )
      .toBeGreaterThan(1);
  });
}

for (const language of ['HTML', 'CSS', 'JavaScript']) {
  test(`${language} web editor highlights syntax`, async ({ page }) => {
    await page.goto('/exemplo/codigo/');
    const playground = page.locator('[data-web-playground]');
    await playground.scrollIntoViewIfNeeded();
    if (language !== 'HTML') await playground.locator('summary').click();
    const editor = playground.getByRole('textbox', {
      name: language,
      exact: true,
    });
    await expect(editor).toBeVisible();
    await expect
      .poll(() =>
        editor
          .locator('.cm-line span')
          .evaluateAll(
            (tokens) =>
              new Set(tokens.map((token) => getComputedStyle(token).color))
                .size,
          ),
      )
      .toBeGreaterThan(1);
  });
}

test('web editors preview edits, keep the frame isolated and reset all languages', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const playground = page.locator('[data-web-playground]');
  await playground.locator('summary').click();
  await playground
    .getByRole('textbox', { name: 'HTML', exact: true })
    .fill('<p id="result">Before</p>');
  await playground
    .getByRole('textbox', { name: 'CSS', exact: true })
    .fill('#result { color: rgb(0, 128, 0); }');
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill('document.querySelector("#result").textContent = "After";');
  await playground
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  const frame = playground.frameLocator('iframe');
  await expect(frame.locator('#result')).toHaveText('After');
  await expect(frame.locator('#result')).toHaveCSS('color', 'rgb(0, 128, 0)');
  await expect(playground.locator('iframe')).toHaveAttribute(
    'sandbox',
    'allow-scripts',
  );
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill(
      'try { parent.document.body.textContent = "escaped"; } catch { document.querySelector("#result").textContent = "Blocked"; }',
    );
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .press('Control+Enter');
  await expect(frame.locator('#result')).toHaveText('Blocked');
  await playground.getByRole('button', { name: 'Repor exemplo web' }).click();
  await frame.getByRole('button', { name: 'Mudar mensagem' }).click();
  await expect(frame.locator('#mensagem')).toHaveText('Funcionou!');
  await expect(frame.locator('body')).toHaveCSS('color', 'rgb(140, 45, 59)');
});
