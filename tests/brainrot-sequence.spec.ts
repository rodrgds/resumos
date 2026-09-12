import { expect, test } from '@playwright/test';

test('background video advances through one complete recording before wrapping', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  const following = dialog.locator('.brainrot-clip:nth-child(3) video');
  const prefix = '/brainrot/gta-8VmCwcGw6SI-';
  await expect(current).toHaveAttribute('src', `${prefix}000.mp4`);
  await expect(current).not.toHaveAttribute('loop', '');
  await expect(following).toHaveAttribute('src', `${prefix}001.mp4`);

  for (let part = 1; part <= 10; part++) {
    await current.dispatchEvent('ended');
    await expect(current).toHaveAttribute(
      'src',
      `${prefix}${String(part % 10).padStart(3, '0')}.mp4`,
    );
    await expect(following).toHaveAttribute(
      'src',
      `${prefix}${String((part + 1) % 10).padStart(3, '0')}.mp4`,
    );
    await expect(dialog.locator('video[src]')).toHaveCount(2);
  }
});
