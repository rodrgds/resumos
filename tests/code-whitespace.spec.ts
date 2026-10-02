import { expect, test } from '@playwright/test';

test('static and editable whitespace marks do not change copied or executed code', async ({
  page,
}) => {
  await page.goto('/_content-test/');
  const code = page
    .locator('pre.astro-code')
    .filter({ hasText: 'function greet' });
  await expect(code.locator('.space').first()).toBeVisible();
  await expect(code.locator('.tab').first()).toBeVisible();
  const space = code.locator('.space').first();
  await expect
    .poll(() =>
      space.evaluate((node) => getComputedStyle(node).backgroundImage),
    )
    .toBe('none');
  const text = await code.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element.querySelector('code')!);
    const selection = getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);
    return {
      text: selection.toString(),
      syntaxPreserved: [...element.querySelectorAll('span')].every(
        (token) =>
          getComputedStyle(token).color ===
          getComputedStyle(token, '::selection').color,
      ),
    };
  });
  expect(text.text).toBe('function greet(name) {\n\treturn "Olá, " + name;\n}');
  expect(text.syntaxPreserved).toBe(true);
  expect(
    await space.evaluate(
      (node) => getComputedStyle(node, '::after').backgroundImage,
    ),
  ).not.toBe('none');
  await expect
    .poll(() =>
      space.evaluate((node) => getComputedStyle(node).backgroundImage),
    )
    .not.toBe('none');
  await page.evaluate(() => getSelection()!.removeAllRanges());
  await expect
    .poll(() =>
      space.evaluate((node) => getComputedStyle(node).backgroundImage),
    )
    .toBe('none');
  await space.evaluate((node) => {
    const range = document.createRange();
    range.selectNodeContents(node);
    getSelection()!.addRange(range);
  });
  await expect
    .poll(() =>
      space.evaluate((node) => getComputedStyle(node).backgroundImage),
    )
    .not.toBe('none');
  expect(
    await code
      .locator('.space')
      .nth(1)
      .evaluate((node) => getComputedStyle(node).backgroundImage),
  ).toBe('none');
  await page.goto('/cadeiras/fp/tuplos-listas/');
  const exercise = page.locator('#matriz-linhas');
  await exercise.locator(':scope > details > summary').click();
  await exercise.getByLabel('Ver solução', { exact: true }).click();
  await expect(exercise.locator('pre.astro-code .space').first()).toBeVisible();
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Experimentar JavaScript',
    exact: true,
  });
  const editor = playground.getByRole('textbox', {
    name: 'Código javascript',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  await editor.fill('const x = 2;\n\tconsole.log(x + 3);');
  await expect(
    editor.locator('.cm-highlightSpace, .cm-highlightTab'),
  ).toHaveCount(0);
  await editor.click();
  await page.keyboard.press('ControlOrMeta+a');
  await expect(editor.locator('.cm-highlightSpace').first()).toBeVisible();
  await expect(editor.locator('.cm-highlightTab').first()).toBeVisible();
  const copied = await editor.evaluate(() => getSelection()!.toString());
  expect(copied).toBe('const x = 2;\n\tconsole.log(x + 3);');
  await page.keyboard.press('ArrowRight');
  await expect(
    editor.locator('.cm-highlightSpace, .cm-highlightTab'),
  ).toHaveCount(0);
  await page.keyboard.press('Shift+Home');
  await page.keyboard.press('Shift+Home');
  await expect(
    editor.locator('.cm-line').first().locator('.cm-highlightSpace'),
  ).toHaveCount(0);
  await expect(editor.locator('.cm-highlightTab')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(
    editor.locator('.cm-highlightSpace, .cm-highlightTab'),
  ).toHaveCount(0);
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(playground.getByLabel('Resultado', { exact: true })).toHaveText(
    '5\n',
    { timeout: 45_000 },
  );
});
