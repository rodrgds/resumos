import { expect, test } from '@playwright/test';

const message =
  'https://resumos.rgo.pt/exemplo/codigo/\nMalta, preciso de ajuda aqui. Alguém me sabe dizer…';

test('WhatsApp copies the public page URL and an editable question starter', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/exemplo/codigo/?private=example#prolog');
  await page.locator('[data-open-ai]').click();
  await page.getByRole('button', { name: /WhatsApp/ }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(message);
  await expect(page.locator('#ai-status')).toContainText('WhatsApp');
});

test('WhatsApp offers manual copying when clipboard access fails and preserves the AI prompt', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new Error('Clipboard denied')),
    });
  });
  await page.goto('/exemplo/codigo/');
  await page.locator('[data-open-ai]').click();
  await page.getByRole('button', { name: /WhatsApp/ }).click();
  const field = page.getByRole('textbox', { name: 'Mensagem para copiar' });
  await expect(field).toBeVisible();
  await expect(field).toHaveValue(message);
  await expect(field).toBeFocused();
  await page.getByRole('link', { name: /Gemini/ }).click();
  await expect(field).toHaveValue(/Lê primeiro a versão Markdown:/);
});
