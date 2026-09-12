import { expect, test } from '@playwright/test';

test('a long two-column reading table stacks its cells and scrolls before the video feed', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML = `<table><thead><tr><th>Se queres…</th><th>Usa e verifica…</th></tr></thead><tbody>${Array.from(
      { length: 8 },
      (_, index) =>
        `<tr><td>Passo ${index + 1}</td><td>Factos e regras cabeca :- objetivo1, objetivo2. A vírgula é conjunção, o ponto e vírgula é alternativa. Nomes iniciados por minúscula são átomos.</td></tr>`,
    ).join('')}</tbody></table>`;
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await dialog.getByRole('button', { name: 'Trecho seguinte' }).click();
  await dialog.getByRole('button', { name: 'Fechar definições' }).click();
  const card = dialog.locator('.brainrot-visual');
  await expect(card.locator('table')).toBeVisible();
  const positions = await card
    .locator('tbody tr')
    .first()
    .evaluate((row) => {
      const [label, description] = [...row.children];
      return {
        label: label.getBoundingClientRect(),
        description: description.getBoundingClientRect(),
      };
    });
  expect(positions.description.top).toBeGreaterThanOrEqual(
    positions.label.bottom,
  );
  const clip = await dialog
    .locator('.brainrot-clip:nth-child(2) video')
    .getAttribute('src');
  const bounds = await card.boundingBox();
  await page.mouse.move(
    bounds!.x + bounds!.width / 2,
    bounds!.y + bounds!.height / 2,
  );
  await page.mouse.wheel(0, 480);
  await expect
    .poll(() => card.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await expect(
    dialog.locator('.brainrot-clip:nth-child(2) video'),
  ).toHaveAttribute('src', clip!);
  await card.evaluate((element) => {
    element.scrollTop = 0;
  });
  const input = await page.context().newCDPSession(page);
  const x = bounds!.x + bounds!.width / 2;
  const y = bounds!.y + bounds!.height - 50;
  await input.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x, y }],
  });
  for (let distance = 35; distance <= 210; distance += 35) {
    await input.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x, y: y - distance }],
    });
    await page.waitForTimeout(16);
  }
  await input.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await expect
    .poll(() => card.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await expect(
    dialog.locator('.brainrot-clip:nth-child(2) video'),
  ).toHaveAttribute('src', clip!);
});
