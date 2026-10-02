import { expect, test } from '@playwright/test';

test('fresh validation gives bounded feedback and restored progress stays still', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.locator(':scope > details > summary').click();
  const response = question.getByLabel('A tua resposta');
  const check = question.getByRole('button', { name: 'Verificar resposta' });
  await response.fill('209');
  const wrongMotion = await response.evaluate((element) => {
    // Sample in the click task, before slow CI can outlast the short nudge.
    element
      .closest('[data-exercise]')!
      .querySelector<HTMLButtonElement>('[data-check]')!
      .click();
    const animations = element.getAnimations();
    return animations.map((animation) => ({
      duration: animation.effect?.getTiming().duration,
      frames: (animation.effect as KeyframeEffect)
        .getKeyframes()
        .map((frame) => {
          const transform = new DOMMatrix(String(frame.transform));
          return { x: transform.m41, y: transform.m42 };
        }),
    }));
  });
  expect(wrongMotion).toHaveLength(1);
  expect(Number(wrongMotion[0].duration)).toBeLessThanOrEqual(250);
  expect(
    wrongMotion[0].frames.every(({ x, y }) => Math.abs(x) <= 4 && y === 0),
  ).toBe(true);
  await expect(page.locator('.exercise-confetti')).toHaveCount(0);
  await expect(question.getByRole('status')).toContainText(
    'Resposta incorreta',
  );
  await page.reload();
  await question.locator(':scope > details > summary').click();
  await expect(question.getByRole('status')).toContainText(
    'Resposta incorreta',
  );

  await response.fill('210');
  const bounds = await check.evaluate((button) => {
    (button as HTMLButtonElement).click();
    const canvas = document.querySelector('.exercise-confetti')!;
    return {
      canvas: canvas.getBoundingClientRect().toJSON(),
      button: button.getBoundingClientRect().toJSON(),
    };
  });
  const burst = page.locator('.exercise-confetti');
  const { canvas, button } = bounds;
  expect(canvas.width).toBeLessThanOrEqual(240);
  expect(canvas.height).toBeLessThanOrEqual(180);
  expect(button.x + button.width / 2).toBeGreaterThanOrEqual(canvas.x);
  expect(button.x + button.width / 2).toBeLessThanOrEqual(
    canvas.x + canvas.width,
  );
  expect(button.y).toBeGreaterThanOrEqual(canvas.y);
  expect(button.y).toBeLessThanOrEqual(canvas.y + canvas.height);
  await expect(burst).toHaveCount(0);

  await page.reload();
  await question.locator(':scope > details > summary').click();
  await expect(question.getByRole('status')).toContainText('Resposta correta');
  await expect(burst).toHaveCount(0);
  expect(
    await response.evaluate((element) => element.getAnimations().length),
  ).toBe(0);
});

test('reduced motion keeps validation feedback without celebrations or nudges', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exemplo/apontamentos/');
  const question = page.getByRole('region', {
    name: '2. Calcular sem enumerar',
  });
  await question.locator(':scope > details > summary').click();
  const response = question.getByLabel('A tua resposta');
  const check = question.getByRole('button', { name: 'Verificar resposta' });
  for (const value of ['209', '210']) {
    await response.fill(value);
    await check.click();
    await expect(question.getByRole('status')).toContainText(
      value === '210' ? 'Resposta correta' : 'Resposta incorreta',
    );
    await expect(page.locator('.exercise-confetti')).toHaveCount(0);
    expect(
      await response.evaluate((element) => element.getAnimations().length),
    ).toBe(0);
  }
});
