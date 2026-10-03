import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('CRC register trace agrees with the teacher examples and detects altered frames', async ({
  page,
}) => {
  await page.goto('/cadeiras/rc/ligacao-de-dados/');
  const demo = page.getByRole('group', {
    name: 'Gerar e verificar CRC com registos',
  });
  await expect(demo.getByText('CRC: 001', { exact: true })).toBeVisible();
  const next = demo.getByRole('button', { name: 'Próximo bit' });
  // Independently observed in Rui Prior's calculator, for 1101 / 1011.
  for (const registers of ['001', '011', '110', '110', '111', '101', '001']) {
    await next.click();
    await expect(demo.getByRole('img')).toHaveAccessibleName(
      new RegExp(`Registos: ${registers}`),
    );
  }
  await expect(next).toBeDisabled();
  await demo.getByLabel('Mensagem (bits)').fill('101110');
  await demo.getByLabel('Gerador (bits)').fill('1001');
  await demo.getByRole('button', { name: 'Calcular CRC' }).click();
  await expect(demo.getByText('CRC: 011', { exact: true })).toBeVisible();
  await expect(
    demo.getByText('Trama: 101110011', { exact: true }),
  ).toBeVisible();
  await demo.getByLabel('Verificar trama').check();
  await expect(demo.getByRole('status')).toContainText(
    'Resto: 000. Nenhum erro detetado.',
  );
  await demo
    .getByRole('button', { name: 'Alterar bit 1', exact: true })
    .press('Space');
  await expect(demo.getByRole('status')).toContainText('Erro detetado.');
  // Error 100100000 is a shifted copy of the generator 1001 and is undetectable.
  await demo
    .getByRole('button', { name: 'Alterar bit 4', exact: true })
    .click();
  await expect(demo.getByRole('status')).toContainText(
    'Resto: 000. Nenhum erro detetado.',
  );
  await expect(
    demo.getByText(/Os bits mudaram, mas o erro é múltiplo do gerador/),
  ).toBeVisible();
});

test('CRC controls validate input and stay usable on a narrow dark screen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/cadeiras/rc/ligacao-de-dados/');
  const demo = page.getByRole('group', {
    name: 'Gerar e verificar CRC com registos',
  });
  await demo.getByLabel('Gerador (bits)').fill('1010');
  await demo.getByRole('button', { name: 'Calcular CRC' }).click();
  await expect(demo.getByRole('alert')).toContainText(
    'começar e terminar em 1',
  );
  await expect(demo.getByLabel('Gerador (bits)')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  await demo.getByLabel('Gerador (bits)').fill('10x1');
  await demo.getByRole('button', { name: 'Calcular CRC' }).click();
  await expect(demo.getByRole('alert')).toContainText('apenas 0 e 1');
  await demo.getByLabel('Gerador (bits)').fill('100000111');
  await demo.getByLabel('Mensagem (bits)').fill('00000000');
  await demo.getByRole('button', { name: 'Calcular CRC' }).click();
  await expect(demo.getByText('CRC: 00000000', { exact: true })).toBeVisible();
  await demo.getByLabel('Passo do cálculo').press('End');
  await expect(demo.getByRole('img')).toHaveAccessibleName(
    /Registos: 00000000/,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await demo.getByLabel('Verificar trama').check();
  for (const element of await demo
    .locator('button, input[type="text"], input[type="range"]')
    .filter({ visible: true })
    .all()) {
    const box = await element.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  expect(
    (await new AxeBuilder({ page }).include('[data-crc-demo]').analyze())
      .violations,
  ).toEqual([]);
});

test.describe('CRC without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('the worked CRC and register circuit remain available', async ({
    page,
  }) => {
    await page.goto('/cadeiras/rc/ligacao-de-dados/');
    const demo = page.getByRole('group', {
      name: 'Gerar e verificar CRC com registos',
    });
    await expect(demo.getByText('CRC: 001', { exact: true })).toBeVisible();
    await expect(demo.getByRole('img')).toHaveAccessibleName(/Registos: 000/);
    await expect(
      demo.getByRole('button', { name: 'Calcular CRC' }),
    ).toBeDisabled();
    await demo.getByText('Todos os passos', { exact: true }).click();
    await expect(demo.getByRole('table')).toContainText('101');
    await expect(
      demo.getByText(/Ativa JavaScript para alterar os bits/),
    ).toBeVisible();
  });
});
