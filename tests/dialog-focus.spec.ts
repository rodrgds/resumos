import { expect, test } from '@playwright/test';

test('closing a dialog does not steal focus from the next action', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('?');
  await expect(page.locator('#shortcuts')).toBeVisible();
  await page.evaluate(async () => {
    const dialog = document.querySelector<HTMLDialogElement>('#shortcuts')!;
    const closed = new Promise<void>((resolve) =>
      dialog.addEventListener('close', () => resolve(), { once: true }),
    );
    dialog.close();
    document.querySelector<HTMLElement>('[data-course]')!.focus();
    await closed;
  });
  await expect(page.locator('[data-course]').first()).toBeFocused();
});
