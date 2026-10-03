import { expect, test } from '@playwright/test';

test('Vim preference controls real editing modes and can be disabled without losing code', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/codigo/');
  const root = page.getByRole('region', {
    name: 'Experimentar Python',
    exact: true,
  });
  const editor = root.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await editor.click();
  await page.keyboard.type('ggdd');
  await expect(editor).toHaveText('print(sum(numeros))');
  await page.keyboard.type('u');
  await expect(editor).toContainText('numeros = range(1, 6)');
  await page.keyboard.type('ggi# vim');
  await page.keyboard.press('Escape');
  await expect(editor).toContainText('# vim');
  await page.getByRole('button', { name: 'Aparência', exact: true }).click();
  await page.locator('#appearance-vim-keys').uncheck();
  await page.keyboard.press('Escape');
  await editor.click();
  await page.keyboard.press('ControlOrMeta+Home');
  await page.keyboard.type('plain');
  await expect(editor).toContainText('plain# vim');
});

test('expanded editors preserve edits and undo, contain focus, and put output beside code', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const root = page.getByRole('region', {
    name: 'Experimentar Python',
    exact: true,
  });
  const editor = root.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await editor.fill('print("workspace")');
  await root
    .getByRole('button', { name: 'Expandir editor', exact: true })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Experimentar Python',
    exact: true,
  });
  await expect(dialog).toBeVisible();
  await expect(editor).toBeFocused();
  await dialog
    .getByRole('button', { name: 'Fechar editor expandido', exact: true })
    .focus();
  await page.keyboard.press('Shift+Tab');
  expect(
    await dialog.evaluate((workspace) =>
      workspace.contains(document.activeElement),
    ),
  ).toBe(true);
  await page.keyboard.press('Tab');
  await expect(
    dialog.getByRole('button', {
      name: 'Fechar editor expandido',
      exact: true,
    }),
  ).toBeFocused();
  await editor.focus();
  const source = await dialog.locator('.editor-source-pane').boundingBox();
  const result = await dialog.locator('.editor-result-pane').boundingBox();
  expect(result!.x).toBeGreaterThan(source!.x + source!.width - 1);
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.type('print("changed")');
  await dialog
    .getByRole('button', { name: 'Fechar editor expandido', exact: true })
    .click();
  await expect(dialog).toHaveCount(0);
  await expect(editor).toHaveText('print("changed")');
  await editor.click();
  await page.keyboard.press('ControlOrMeta+z');
  await expect(editor).toHaveText('print("workspace")');
  await root
    .getByRole('button', { name: 'Expandir editor', exact: true })
    .click();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('dialog', { name: 'Experimentar Python', exact: true }),
  ).toHaveCount(0);
  await expect(
    root.getByRole('button', { name: 'Expandir editor', exact: true }),
  ).toBeFocused();
});

test('only selected text highlights matches and Ctrl+D edits the next occurrence together', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const editor = page
    .getByRole('region', { name: 'Experimentar Python', exact: true })
    .getByRole('textbox', { name: 'Código python', exact: true });
  await editor.fill('value = 1\nprint(value)\nprint(value)');
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowRight');
  await expect(editor.locator('.cm-selectionMatch')).toHaveCount(0);
  await page.keyboard.press('Shift+ArrowRight');
  await expect(editor.locator('.cm-selectionMatch')).toHaveCount(2);
  await page.keyboard.press('ArrowLeft');
  await expect(editor.locator('.cm-selectionMatch')).toHaveCount(0);
  await page.keyboard.press('Control+d');
  await expect(editor.locator('.cm-selectionMatch')).toHaveCount(2);
  await page.keyboard.press('Control+d');
  await page.keyboard.type('total');
  await expect(editor).toHaveText('total = 1print(total)print(value)');
  await page.keyboard.press('ControlOrMeta+z');
  await expect(editor).toHaveText('value = 1print(value)print(value)');
  await page.keyboard.press('Escape');
  await page.keyboard.press('Tab');
  await expect(editor).not.toBeFocused();
});

test('adding a cursor below types into both lines and Tab indents both selections', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const editor = page
    .getByRole('region', { name: 'Experimentar Python', exact: true })
    .getByRole('textbox', { name: 'Código python', exact: true });
  await editor.fill('first\nsecond');
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ControlOrMeta+Alt+ArrowDown');
  await page.keyboard.type('# ');
  await expect(editor).toHaveText('# first# second');
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.press('Tab');
  expect(await editor.innerText()).toBe('  # first\n  # second');
  await page.keyboard.press('Shift+Tab');
  expect(await editor.innerText()).toBe('# first\n# second');
});

test('mobile web workspace switches source languages and keeps the isolated preview below code', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/codigo/');
  const root = page.getByRole('region', {
    name: 'Experimentar HTML, CSS e JavaScript',
    exact: true,
  });
  await root
    .getByRole('button', { name: 'Expandir editor', exact: true })
    .click();
  const workspace = page.getByRole('dialog', {
    name: 'Experimentar HTML, CSS e JavaScript',
    exact: true,
  });
  await workspace.getByRole('radio', { name: 'CSS', exact: true }).check();
  await workspace
    .getByRole('textbox', { name: 'CSS', exact: true })
    .fill('body { color: rgb(12, 34, 56) }');
  await workspace
    .getByRole('radio', { name: 'JavaScript', exact: true })
    .check();
  await workspace
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill('');
  await workspace.getByRole('radio', { name: 'HTML', exact: true }).check();
  await workspace
    .getByRole('textbox', { name: 'HTML', exact: true })
    .fill('<p>Workspace preview</p>');
  await workspace
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  const preview = workspace
    .frameLocator('iframe')
    .getByText('Workspace preview', { exact: true });
  await expect(preview).toHaveCSS('color', 'rgb(12, 34, 56)');
  const source = await workspace.locator('.editor-source-pane').boundingBox();
  const result = await workspace.locator('.editor-result-pane').boundingBox();
  expect(result!.y).toBeGreaterThanOrEqual(source!.y + source!.height - 1);
  expect(
    await workspace.evaluate((dialog) => dialog.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await workspace
    .getByRole('button', { name: 'Fechar editor expandido', exact: true })
    .click();
  await expect(
    root.getByRole('textbox', { name: 'HTML', exact: true }),
  ).toHaveText('<p>Workspace preview</p>');
  await expect(
    root.frameLocator('iframe').getByText('Workspace preview', { exact: true }),
  ).toBeVisible();
});

test('expanding and closing a web editor preserves interactive preview state', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const root = page.getByRole('region', {
    name: 'Experimentar HTML, CSS e JavaScript',
    exact: true,
  });
  await root.getByText('CSS e JavaScript', { exact: true }).click();
  await root.getByRole('textbox', { name: 'JavaScript', exact: true }).fill('');
  await root
    .getByRole('textbox', { name: 'HTML', exact: true })
    .fill(
      '<button onclick="this.textContent=Number(this.textContent)+1">0</button>',
    );
  await root
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  const counter = root.frameLocator('iframe').getByRole('button');
  await counter.click();
  await expect(counter).toHaveText('1');
  await root
    .getByRole('button', { name: 'Expandir editor', exact: true })
    .click();
  await expect(counter).toHaveText('1');
  await counter.click();
  await root
    .getByRole('button', { name: 'Fechar editor expandido', exact: true })
    .click();
  await expect(counter).toHaveText('2');
});

test('an active isolated Python run survives fullscreen without restarting its channel', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto('/exemplo/codigo/');
  const root = page.getByRole('region', {
    name: 'Experimentar Python',
    exact: true,
  });
  await root
    .getByRole('textbox', { name: 'Código python', exact: true })
    .fill(
      'import asyncio\nprint("before")\nawait asyncio.sleep(8)\nprint("after")',
    );
  await root.getByRole('button', { name: 'Executar', exact: true }).click();
  await expect(root.getByLabel('Resultado', { exact: true })).toContainText(
    'before',
    { timeout: 60_000 },
  );
  await root
    .getByRole('button', { name: 'Expandir editor', exact: true })
    .click();
  await root
    .getByRole('button', { name: 'Fechar editor expandido', exact: true })
    .click();
  await expect(
    root.getByRole('button', { name: 'Parar', exact: true }),
  ).toBeVisible();
  await expect(root.getByRole('status')).toHaveText('Concluído', {
    timeout: 30_000,
  });
  await expect(root.getByLabel('Resultado', { exact: true })).toHaveText(
    'before\nafter\n',
  );
});
