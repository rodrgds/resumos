import { expect, test } from '@playwright/test';
import {
  appendFileSync,
  cpSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

test('animations fill their frame, loop, and only show an indicator when paused', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/exemplo/animacoes/');
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const figure of await page.locator('[data-manim]').all()) {
      const video = figure.locator('video');
      await video.scrollIntoViewIfNeeded();
      const box = (await video.boundingBox())!;
      expect(Math.abs(box.height - (box.width * 9) / 16)).toBeLessThan(1);
      await expect(video).toHaveJSProperty('controls', false);
      await expect(video).toHaveJSProperty('paused', false);
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.readyState),
        )
        .toBeGreaterThanOrEqual(2);
      const toggle = figure.getByRole('button');
      const indicator = figure.locator('.manim-paused');
      await toggle.hover();
      await expect(indicator).toBeHidden();
      await video.evaluate((element: HTMLVideoElement) => {
        element.currentTime = element.duration - 0.15;
      });
      await expect
        .poll(() =>
          video.evaluate((element: HTMLVideoElement) => element.currentTime),
        )
        .toBeLessThan(2);
      await expect(video).toHaveJSProperty('paused', false);
      await toggle.click();
      await expect(video).toHaveJSProperty('paused', true);
      await expect(indicator).toBeVisible();
      await toggle.press('Space');
      await expect(video).toHaveJSProperty('paused', false);
      await expect(indicator).toBeHidden();
    }
  }
});

test('scrolling suspends playback without forgetting a reader pause', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto('/exemplo/animacoes/');
  const figures = page.locator('[data-manim]');
  const first = figures.first().locator('video');
  const second = figures.last().locator('video');
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveJSProperty('paused', false);
  await expect(second).toHaveJSProperty('readyState', 0);
  await second.scrollIntoViewIfNeeded();
  await expect(first).toHaveJSProperty('paused', true);
  await expect(second).toHaveJSProperty('paused', false);
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveJSProperty('paused', false);
  await figures.first().getByRole('button').click();
  await second.scrollIntoViewIfNeeded();
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveJSProperty('paused', true);
  await expect(figures.first().locator('.manim-paused')).toBeVisible();
  await figures.first().getByRole('button').press('Enter');
  await expect(first).toHaveJSProperty('paused', false);
});

test('reduced motion waits for playback and theme changes preserve the position, pause and speed', async ({
  page,
}) => {
  const movies: string[] = [];
  page.on('request', (request) => {
    if (request.url().endsWith('.mp4')) movies.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exemplo/animacoes/');
  const video = page.locator('[data-manim] video').first();
  await expect(video).toHaveJSProperty('paused', true);
  await expect(video).toHaveJSProperty('readyState', 0);
  expect(movies).toEqual([]);
  const toggle = page.locator('[data-manim]').first().getByRole('button');
  await toggle.click();
  await expect(video).toHaveJSProperty('paused', false);
  await toggle.click();
  await video.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 2;
    element.playbackRate = 0.5;
  });
  await expect(video).toHaveJSProperty('seeking', false);
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.locator('input[name="theme"][value="dark"]').check();
  await page.locator('input[name="palette"][value="catppuccin"]').check();
  await expect(video).toHaveAttribute('src', /catppuccin-dark\.mp4$/);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeCloseTo(2, 1);
  await expect(video).toHaveJSProperty('paused', true);
  await expect(video).toHaveJSProperty('playbackRate', 0.5);
  await page.keyboard.press('Escape');
  await toggle.click();
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.locator('input[name="palette"][value="nord"]').check();
  await expect(video).toHaveAttribute('src', /nord-dark\.mp4$/);
  await page.keyboard.press('Escape');
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty('paused', false);
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(2);
  await toggle.click();
  await video.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 0;
    element.playbackRate = 0.75;
  });
  await expect(video).toHaveJSProperty('seeking', false);
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.locator('input[name="theme"][value="light"]').check();
  await expect(video).toHaveJSProperty('paused', true);
  await expect(video).toHaveJSProperty('currentTime', 0);
  await expect(video).toHaveJSProperty('playbackRate', 0.75);
});

test('a pause while the next theme loads prevents automatic resumption', async ({
  page,
}) => {
  await page.goto('/exemplo/animacoes/');
  const figure = page.locator('[data-manim]').first();
  const video = figure.locator('video');
  await video.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.currentTime),
    )
    .toBeGreaterThan(0.1);
  let release!: () => void;
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/nord-dark.mp4', async (route) => {
    await waiting;
    await route.continue();
  });
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.locator('input[name="theme"][value="dark"]').check();
  await page.locator('input[name="palette"][value="nord"]').check();
  await expect(video).toHaveAttribute('src', /nord-dark\.mp4$/);
  await page.keyboard.press('Escape');
  await figure.getByRole('button', { name: /^Pausar:/ }).click();
  release();
  await expect
    .poll(() =>
      video.evaluate((element: HTMLVideoElement) => element.readyState),
    )
    .toBeGreaterThanOrEqual(2);
  await expect(video).toHaveJSProperty('paused', true);
  await expect(figure.locator('.manim-paused')).toBeVisible();
});

test('posters follow every built-in palette and FEUP accent without loading movies', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exemplo/animacoes/');
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  for (const palette of [
    'feup',
    'gruvbox',
    'catppuccin',
    'nord',
    'dracula',
    'flexoki',
    'solarized',
  ]) {
    await page.locator(`input[name="palette"][value="${palette}"]`).check();
    for (const mode of ['light', 'dark']) {
      await page.locator(`input[name="theme"][value="${mode}"]`).check();
      for (const accent of palette === 'feup'
        ? ['red', 'blue', 'green']
        : ['red']) {
        if (palette === 'feup')
          await page.locator(`input[name="accent"][value="${accent}"]`).check();
        const figure = page.locator('[data-manim]').first();
        await expect(figure).toHaveAttribute(
          'data-variant',
          `${palette}-${mode}${palette === 'feup' ? `-${accent}` : ''}`,
        );
        const colors = await figure.evaluate(async (element) => {
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 1;
          const context = canvas.getContext('2d')!;
          const image = new Image();
          image.src = element.querySelector('video')!.poster;
          await image.decode();
          context.drawImage(image, 0, 0);
          const actual = [...context.getImageData(0, 0, 1, 1).data];
          context.fillStyle = getComputedStyle(
            element.querySelector('.manim-media')!,
          ).backgroundColor;
          context.fillRect(0, 0, 1, 1);
          return {
            actual,
            expected: [...context.getImageData(0, 0, 1, 1).data],
          };
        });
        for (let channel = 0; channel < 3; channel++)
          expect(
            Math.abs(colors.actual[channel] - colors.expected[channel]),
          ).toBeLessThanOrEqual(5);
        await expect(figure.locator('video')).toHaveJSProperty('readyState', 0);
      }
    }
  }
});

test('the saved palette is applied before external player scripts', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'resumos-preferences',
      JSON.stringify({ palette: 'solarized', theme: 'dark' }),
    ),
  );
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('/exemplo/animacoes/');
  const video = page.locator('[data-manim] video').first();
  await expect(video).toHaveAttribute('poster', /solarized-dark\.webp$/);
  await expect(video).toHaveAttribute('src', /solarized-dark\.mp4$/);
  await expect(video).toHaveJSProperty('readyState', 0);
});

test('the poster, description and video link work without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 700 },
  });
  const page = await context.newPage();
  await page.goto('/exemplo/animacoes/');
  await expect(page.locator('[data-manim] figcaption').first()).toContainText(
    'quatro unidades na horizontal',
  );
  const video = page.locator('[data-manim] video').first();
  await expect(video).toHaveJSProperty('controls', false);
  await expect(
    page
      .locator('[data-manim]')
      .first()
      .getByRole('link', { name: /^Abre o vídeo:/ }),
  ).toHaveAttribute('href', /\.mp4$/);
  await expect(
    page.locator('[data-manim]').first().getByRole('button'),
  ).toBeHidden();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});

test('failed media retains the explanation and offers the video link', async ({
  page,
}) => {
  await page.route('**/manim/**/*.mp4', (route) => route.abort());
  await page.goto('/exemplo/animacoes/');
  const figure = page.locator('[data-manim]').first();
  await figure.locator('video').scrollIntoViewIfNeeded();
  await expect(figure.getByRole('status')).toBeVisible();
  await expect(
    figure.getByRole('link', { name: 'Abre o vídeo' }),
  ).toHaveAttribute('href', /\.mp4$/);
  await expect(figure.locator('figcaption')).toContainText('quatro unidades');
});

test('Markdown includes the animation and its text alternative', async ({
  request,
}) => {
  const response = await request.get('/exemplo/animacoes.md');
  expect(response.ok()).toBe(true);
  const markdown = await response.text();
  expect(markdown).toMatch(
    /\[Animação: Um deslocamento a seguir ao outro\]\(https:\/\/resumos\.rgo\.pt\/manim\/soma-vetores\/[^)]+\.mp4\)/,
  );
  expect(markdown).toContain(
    'quatro unidades na horizontal e três na vertical',
  );
  expect(markdown).not.toContain('Não foi possível carregar');
});

test('build refuses stale scenes and missing media without changing the checkout', () => {
  const directory = mkdtempSync(join(tmpdir(), 'resumos-manim-test-'));
  const copy = (file: string) => {
    const target = join(directory, file);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(file, target, { recursive: true });
  };
  const verify = () =>
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `import { getManimAnimation } from ${JSON.stringify(pathToFileURL(resolve('src/lib/manim-assets.mjs')).href)}; getManimAnimation('soma-vetores');`,
      ],
      { cwd: directory, stdio: 'pipe' },
    );
  try {
    for (const file of [
      'src/data/manim-scenes.json',
      'src/styles/global.css',
      'src/content/exemplo/vetores.py',
      'scripts/render-manim.mjs',
      'scripts/manim/resumos_manim.py',
      'devenv.nix',
      'devenv.lock',
      'src/generated/manim/soma-vetores.json',
      'public/manim/soma-vetores',
    ])
      copy(file);
    expect(verify).not.toThrow();
    appendFileSync(
      join(directory, 'src/content/exemplo/vetores.py'),
      '\n# Changed scene\n',
    );
    expect(verify).toThrow(/Stale render/);
    copy('src/content/exemplo/vetores.py');
    rmSync(join(directory, 'public/manim/soma-vetores'), { recursive: true });
    expect(verify).toThrow(/devenv --profile manim shell/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
