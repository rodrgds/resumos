import { expect, test } from '@playwright/test';

test('RISC-V uses supplied input, reports assembly errors and can stop then run again', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Experimentar RISC-V',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  const editor = playground.getByRole('textbox', {
    name: 'Código riscv',
    exact: true,
  });
  const run = playground.getByRole('button', { name: 'Executar', exact: true });
  const status = playground.getByRole('status');
  const output = playground.getByLabel('Resultado', { exact: true });
  const source = `.text
.globl main
main:
  li a7, 5
  ecall
  add a0, a0, a0
  li a7, 1
  ecall
  li a7, 10
  ecall`;
  const edit = async (code: string) => {
    await editor.click();
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.insertText(code);
  };
  await edit(source);
  await playground.getByText('Dados de entrada', { exact: true }).click();
  await playground.locator('[data-stdin]').fill('7');
  await run.click();
  await expect(status).toHaveText('Concluído');
  await expect(output).toHaveText('14');
  await edit('.text\nmain:\n  not_an_instruction a0, 1');
  await run.click();
  await expect(status).toContainText('erro');
  await expect(output).toContainText('not_an_instruction');
  await edit('.text\nmain:\n  j main');
  await run.click();
  await expect(status).toHaveText('A executar…');
  await playground.getByRole('button', { name: 'Parar', exact: true }).click();
  await expect(status).toHaveText('Execução interrompida.');
  await edit(source);
  await run.click();
  await expect(status).toHaveText('Concluído');
  await expect(output).toHaveText('14');
});
