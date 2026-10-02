import { expect, test } from '@playwright/test';

test('scrolling chooses another recording and a random playback position without seeking the lesson', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  const caption = await dialog.locator('.brainrot-caption').textContent();
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-000.mp4',
  );
  await dialog
    .locator('.brainrot-stage')
    .dispatchEvent('wheel', { deltaY: 100 });
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/subway-wOPAA823UWI-048.mp4',
  );
  await expect
    .poll(() => current.evaluate((video: HTMLVideoElement) => video.readyState))
    .toBeGreaterThanOrEqual(1);
  const playback = await current.evaluate((video: HTMLVideoElement) => ({
    time: video.currentTime,
    duration: video.duration,
  }));
  expect(playback.time / playback.duration).toBeCloseTo(0.75, 1);
  await expect(dialog.locator('.brainrot-caption')).toHaveText(caption!);
  await expect(dialog.locator('video[src]')).toHaveCount(2);
  await current.dispatchEvent('ended');
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/subway-wOPAA823UWI-049.mp4',
  );
});

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
