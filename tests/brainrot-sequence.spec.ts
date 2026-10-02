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
  await expect(dialog.locator('video[src]')).toHaveCount(3);
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
  const following = dialog.locator('.brainrot-clip:nth-child(1) video');
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
    await expect(dialog.locator('video[src]')).toHaveCount(3);
  }
});

test('scrolling shows a decoded frame without waiting for a fresh video download', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-000.mp4',
  );
  await expect
    .poll(() =>
      dialog
        .locator('video[src]')
        .evaluateAll((videos) =>
          videos.every(
            (video) =>
              (video as HTMLVideoElement).readyState >= 2 &&
              !(video as HTMLVideoElement).seeking,
          ),
        ),
    )
    .toBe(true);
  let release!: () => void;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/brainrot/*.mp4', async (route) => {
    await blocked;
    await route.continue();
  });
  try {
    await dialog
      .locator('.brainrot-stage')
      .dispatchEvent('wheel', { deltaY: 100 });
    await current.dispatchEvent('ended');
    await expect(current).toHaveAttribute(
      'src',
      '/brainrot/subway-wOPAA823UWI-048.mp4',
    );
    await expect
      .poll(
        () =>
          current.evaluate(
            (video: HTMLVideoElement) =>
              video.readyState >= 2 && !video.seeking,
          ),
        { timeout: 1500 },
      )
      .toBe(true);
  } finally {
    release();
    await page.unrouteAll({ behavior: 'wait' });
  }
});

test('an early scroll keeps the current frame until the upcoming random seek is decoded', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  let release!: () => void;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  let requested = false;
  await page.route('**/brainrot/subway-wOPAA823UWI-048.mp4', async (route) => {
    requested = true;
    await blocked;
    await route.continue();
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  try {
    await expect.poll(() => requested).toBe(true);
    await expect
      .poll(() =>
        current.evaluate((video: HTMLVideoElement) => video.readyState),
      )
      .toBeGreaterThanOrEqual(2);
    const caption = await dialog.locator('.brainrot-caption').textContent();
    await dialog
      .locator('.brainrot-stage')
      .dispatchEvent('wheel', { deltaY: 100 });
    await expect(current).toHaveAttribute(
      'src',
      '/brainrot/gta-8VmCwcGw6SI-000.mp4',
    );
    expect(
      await current.evaluate((video: HTMLVideoElement) => video.readyState),
    ).toBeGreaterThanOrEqual(2);
    await current.dispatchEvent('ended');
    await expect(current).toHaveAttribute(
      'src',
      '/brainrot/gta-8VmCwcGw6SI-000.mp4',
    );
    release();
    await expect(current).toHaveAttribute(
      'src',
      '/brainrot/subway-wOPAA823UWI-048.mp4',
    );
    expect(
      await current.evaluate(
        (video: HTMLVideoElement) => video.readyState >= 2 && !video.seeking,
      ),
    ).toBe(true);
    await expect(dialog.locator('.brainrot-caption')).toHaveText(caption!);
    await expect(dialog.locator('video[src]')).toHaveCount(3);
    await page.keyboard.press('Escape');
    await expect(dialog.locator('video')).toHaveCount(0);
  } finally {
    release();
    await page.unrouteAll({ behavior: 'wait' });
  }
});

test('upward swipes reveal the prepared random frame before settling', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const feed = dialog.locator('.brainrot-feed');
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-000.mp4',
  );
  await expect
    .poll(() =>
      dialog.locator('video[src]').evaluateAll((videos) =>
        videos.every((video) => {
          const media = video as HTMLVideoElement;
          return media.readyState >= 2 && !media.seeking;
        }),
      ),
    )
    .toBe(true);
  await feed.dispatchEvent('touchstart', { touches: [{ identifier: 1 }] });
  await feed.evaluate((element) => {
    element.scrollTop = 0;
  });
  const revealed = dialog.locator('.brainrot-clip:first-child video');
  await expect(revealed).toHaveAttribute(
    'src',
    '/brainrot/subway-wOPAA823UWI-048.mp4',
  );
  expect(
    await revealed.evaluate(
      (video: HTMLVideoElement) => video.readyState >= 2 && !video.seeking,
    ),
  ).toBe(true);
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-000.mp4',
  );
  await feed.dispatchEvent('touchend', { touches: [] });
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/subway-wOPAA823UWI-048.mp4',
  );
});

test('natural completion retains the last frame while the sequential successor downloads', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  let release!: () => void;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/brainrot/gta-8VmCwcGw6SI-001.mp4', async (route) => {
    await blocked;
    await route.continue();
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  try {
    await expect
      .poll(() =>
        current.evaluate((video: HTMLVideoElement) => video.readyState),
      )
      .toBeGreaterThanOrEqual(2);
    await current.dispatchEvent('ended');
    await expect(current).toHaveAttribute(
      'src',
      '/brainrot/gta-8VmCwcGw6SI-000.mp4',
    );
    expect(
      await current.evaluate((video: HTMLVideoElement) => video.readyState),
    ).toBeGreaterThanOrEqual(2);
    release();
    await expect(current).toHaveAttribute(
      'src',
      '/brainrot/gta-8VmCwcGw6SI-001.mp4',
    );
    expect(
      await current.evaluate((video: HTMLVideoElement) => video.readyState),
    ).toBeGreaterThanOrEqual(2);
  } finally {
    release();
    await page.unrouteAll({ behavior: 'wait' });
  }
});

test('natural completion waits for a stationary touch to release before advancing', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.75;
  });
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const current = dialog.locator('.brainrot-clip:nth-child(2) video');
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-000.mp4',
  );
  await expect
    .poll(() =>
      dialog.locator('video[src]').evaluateAll((videos) =>
        videos.every((node) => {
          const video = node as HTMLVideoElement;
          return video.readyState >= 2 && !video.seeking;
        }),
      ),
    )
    .toBe(true);
  const feed = dialog.locator('.brainrot-feed');
  await feed.dispatchEvent('touchstart', { touches: [{ identifier: 1 }] });
  await current.dispatchEvent('ended');
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-000.mp4',
  );
  await feed.dispatchEvent('touchend', { touches: [] });
  await expect(current).toHaveAttribute(
    'src',
    '/brainrot/gta-8VmCwcGw6SI-001.mp4',
  );
});
