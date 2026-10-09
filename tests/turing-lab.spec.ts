import { expect, test } from '@playwright/test';
test('the tape starts with its head centered on a narrow screen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/cadeiras/tc/turing-decidibilidade/');
  const tape = page.locator('[data-turing-lab] [data-tape]');
  await expect(tape).toBeVisible();
  const centerOffset = () =>
    tape.evaluate((element) => {
      const window = element.getBoundingClientRect();
      const head = element
        .querySelector('[aria-current]')!
        .getBoundingClientRect();
      return Math.abs(head.x + head.width / 2 - window.x - window.width / 2);
    });
  await expect.poll(centerOffset).toBeLessThan(3);
  await page.setViewportSize({ width: 390, height: 800 });
  await expect.poll(centerOffset).toBeLessThan(3);
});

test('reader can step, change a rule, reset and run custom machines', async ({
  page,
}) => {
  await page.goto('/cadeiras/tc/turing-decidibilidade/');
  const lab = page.locator('[data-turing-lab]');
  await lab.getByRole('button', { name: 'Passo', exact: true }).click();
  await expect(lab.locator('[data-configuration]')).toHaveText(
    'Estado q1. Cabeça na posição 1. Passos: 1.',
  );
  await expect(lab.locator('[aria-current] strong')).toHaveText('a');
  await expect(
    lab.locator('[data-tape] strong').filter({ hasText: /^X$/ }),
  ).toHaveCount(1);
  await lab.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toHaveText(
    'Pronta para executar.',
  );
  await lab.getByText('Editar estados e transições', { exact: true }).click();
  await lab
    .getByLabel('Move da transição 1', { exact: true })
    .selectOption('L');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText(
    'Palavra rejeitada.',
  );
  await lab.getByRole('button', { name: 'Repor exemplo', exact: true }).click();
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText('Palavra aceite.');
  await lab.locator('[data-preset]').selectOption('blank');
  await lab
    .getByRole('button', { name: 'Adicionar transição', exact: true })
    .click();
  await lab.getByLabel('Lê da transição 1', { exact: true }).selectOption('B');
  await lab
    .getByLabel('Destino da transição 1', { exact: true })
    .selectOption('qf');
  await lab
    .getByLabel('Escreve da transição 1', { exact: true })
    .selectOption('1');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText('Palavra aceite.');
  await expect(lab.locator('[data-configuration]')).toContainText(
    'Estado qf. Cabeça na posição 1. Passos: 1.',
  );
  await expect(lab.locator('[data-tape]')).toContainText('1');
  await lab.locator('[data-preset]').selectOption('loop');
  await lab.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(lab.locator('[data-result]')).toContainText(
    'Resultado inconclusivo.',
  );
});
