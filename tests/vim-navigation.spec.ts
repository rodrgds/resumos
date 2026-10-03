import { expect, test, type Page } from '@playwright/test';

async function expectCursorAt(page: Page, selector: string, offset: number) {
  await expect
    .poll(async () => {
      const expected = await page
        .locator(selector)
        .first()
        .evaluate((element, at) => {
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
          );
          const node = walker.nextNode()!;
          const range = document.createRange();
          range.setStart(node, at);
          range.setEnd(node, at + 1);
          const rect = range.getBoundingClientRect();
          return { x: rect.x, y: rect.y };
        }, offset);
      const actual = await page.locator('[data-vim-cursor]').boundingBox();
      return actual
        ? Math.abs(expected.x - actual.x) + Math.abs(expected.y - actual.y)
        : Infinity;
    })
    .toBeLessThan(1);
}

test('Vim moves a visible reading cursor through text without editing it', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/apontamentos/');
  const prose = page.locator('[data-annotatable]');
  const before = await prose.innerHTML();
  await page.keyboard.press('g');
  await page.keyboard.press('g');
  const cursor = page.locator('[data-vim-cursor]');
  await expect(cursor).toBeVisible();
  const start = await cursor.boundingBox();
  await page.keyboard.press('l');
  await expect
    .poll(async () => (await cursor.boundingBox())?.x)
    .toBeGreaterThan(start!.x);
  await page.keyboard.press('h');
  await expect
    .poll(async () => (await cursor.boundingBox())?.x)
    .toBeCloseTo(start!.x, 0);
  await page.keyboard.press('}');
  await expect
    .poll(async () => (await cursor.boundingBox())?.y)
    .toBeGreaterThan(start!.y);
  await expectCursorAt(page, '[data-annotatable] p', 0);
  await page.keyboard.press('{');
  await expectCursorAt(page, '[data-annotatable] h2', 0);
  const heading = await page
    .locator('[data-annotatable] h2')
    .first()
    .textContent();
  const secondWord = heading!.search(/\s\S/) + 1;
  await page.keyboard.press('w');
  await expectCursorAt(page, '[data-annotatable] h2', secondWord);
  await page.keyboard.press('b');
  await expectCursorAt(page, '[data-annotatable] h2', 0);
  await page.keyboard.press('e');
  await expectCursorAt(
    page,
    '[data-annotatable] h2',
    heading!.indexOf(' ') - 1,
  );
  await page.keyboard.press('0');
  await expectCursorAt(page, '[data-annotatable] h2', 0);
  await page.keyboard.down('l');
  await page.keyboard.down('l');
  await page.keyboard.up('l');
  await expectCursorAt(page, '[data-annotatable] h2', 2);
  await page.keyboard.press('0');
  await page.keyboard.press('3');
  await page.keyboard.press('l');
  await expectCursorAt(page, '[data-annotatable] h2', 3);
  await page.keyboard.press('^');
  await expectCursorAt(page, '[data-annotatable] h2', 0);
  await page.keyboard.press('$');
  await expectCursorAt(
    page,
    '[data-annotatable] h2',
    heading!.trimEnd().length - 1,
  );
  await page.keyboard.press('G');
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.keyboard.press('g');
  await page.keyboard.press('g');
  await expectCursorAt(page, '[data-annotatable] h2', 0);
  expect(await prose.innerHTML()).toBe(before);
  expect(await prose.locator('[contenteditable=true]').count()).toBe(0);
});

test('Vim visual lines, local search and notes stay separate from editable controls', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true }));
    localStorage.setItem('resumos-notes', 'Private scratch');
  });
  await page.goto('/exemplo/vim-navigation/');
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press('g');
  await page.keyboard.press('g');
  await page.keyboard.press('}');
  const cursor = page.locator('[data-vim-cursor]');
  const firstLine = await cursor.boundingBox();
  await page.keyboard.press('j');
  await expect
    .poll(async () => (await cursor.boundingBox())?.y)
    .toBeGreaterThan(firstLine!.y);
  await page.keyboard.press('k');
  await expectCursorAt(page, '[data-annotatable] p', 0);
  await page.keyboard.press('/');
  await expect(
    page.getByRole('dialog', { name: 'Pesquisar nesta página' }),
  ).toBeVisible();
  const term = 'apontamento pode';
  await page.getByRole('searchbox', { name: 'Texto nesta página' }).fill(term);
  await expect(page.locator('#vim-search-status')).toContainText('resultado');
  await page.keyboard.press('Escape');
  await expect(page.locator('#vim-search')).toBeHidden();
  await page.keyboard.press('a');
  await expect(page.locator('#ai-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.keyboard.press('/');
  await page.getByRole('searchbox', { name: 'Texto nesta página' }).fill(term);
  await page.keyboard.press('Enter');
  await expectCursorAt(page, '[data-annotatable] p', 3);
  await page.keyboard.press('/');
  await page.getByRole('searchbox', { name: 'Texto nesta página' }).fill('Uma');
  await page.keyboard.press('Enter');
  await expectCursorAt(page, '#uma-tabela', 0);
  await page.keyboard.press('n');
  await expectCursorAt(page, '#uma-imagem', 0);
  await expect(page.locator('#scratchpad')).toBeHidden();
  await page.keyboard.press('N');
  await expectCursorAt(page, '#uma-tabela', 0);
  await page.keyboard.press('Escape');
  await page.keyboard.down('n');
  await page.keyboard.down('n');
  await page.keyboard.up('n');
  await expect(page.locator('#scratchpad')).toBeVisible();
  await page.locator('#legacy-notes summary').click();
  const note = page.locator('#legacy-notes-input');
  await expect(note).toBeVisible();
  await note.focus();
  await page.keyboard.type('a/jk');
  await expect(page.locator('#ai-menu')).toBeHidden();
  await expect(page.locator('#vim-search')).toBeHidden();
  expect(
    await page.evaluate(
      (value) =>
        Object.values(localStorage).some((item) => item.includes(value)),
      term,
    ),
  ).toBe(false);
});

test('Appearance and shortcut Vim switches share settings and reject motion conflicts', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.keyboard.press(',');
  await page.locator('#appearance-vim-keys').check();
  await page.keyboard.press('Escape');
  await page.keyboard.press('?');
  await expect(page.locator('#vim-keys')).toBeChecked();
  await page.getByRole('button', { name: 'Mudar atalho: Caderno' }).click();
  await page.keyboard.press('w');
  await expect(page.locator('#shortcut-status')).toHaveText(
    'Essa tecla já está em uso.',
  );
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(page.locator('[data-vim-cursor]')).toBeVisible();
  await page.keyboard.press(',');
  await expect(page.locator('#appearance-vim-keys')).toBeChecked();
  await page.locator('#appearance-vim-keys').uncheck();
  await expect(page.locator('[data-vim-cursor]')).toBeHidden();
  await page.keyboard.press('Escape');
  await page.keyboard.press('?');
  await expect(page.locator('#vim-keys')).not.toBeChecked();
  await page.getByRole('button', { name: 'Mudar atalho: Caderno' }).click();
  await page.keyboard.press('w');
  await page.locator('#vim-keys').click();
  await expect(page.locator('#vim-keys')).not.toBeChecked();
  await expect(page.locator('#shortcut-status')).toContainText(
    'Liberta primeiro',
  );
});

test('Reading motions preserve a reader selection and global search remains available', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/apontamentos/');
  const selected = await page
    .locator('[data-annotatable] pre')
    .first()
    .evaluate((paragraph) => {
      const range = document.createRange();
      range.selectNodeContents(paragraph);
      const selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
      return selection.toString();
    });
  await page.keyboard.press('j');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(
    selected,
  );
  await page.locator('[data-open-ai]').focus();
  await page.keyboard.press('Control+k');
  await expect(page.locator('#global-search')).toBeVisible();
  await page.keyboard.press('a');
  await expect(page.locator('#ai-menu')).toBeHidden();
  await page.keyboard.press('Escape');
  await expect(page.locator('#global-search')).toBeHidden();
  await page.keyboard.press('a');
  await expect(page.locator('#ai-menu')).toBeVisible();
});

test('Chat shortcut opens, rather than toggles away, a visible Chat menu', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-open-ai]').focus();
  await page.keyboard.press('a');
  await expect(page.locator('#ai-menu')).toBeVisible();
  await page.keyboard.press('a');
  await expect(page.locator('#ai-menu')).toBeVisible();
});

test('Vim follows mouse clicks and drags, and y copies the native selection only while enabled', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/apontamentos/');
  const paragraph = page.locator('[data-annotatable] p').first();
  const before = await page.locator('[data-annotatable]').innerHTML();
  const coordinates = await paragraph.evaluate((element) => {
    const node = element.firstChild!;
    return [0, 5, 8].map((offset) => {
      const range = document.createRange();
      range.setStart(node, offset);
      range.setEnd(node, offset + 1);
      const rect = range.getBoundingClientRect();
      return { x: rect.x + 0.1, y: rect.y + rect.height / 2 };
    });
  });
  await page.mouse.click(coordinates[1].x, coordinates[1].y);
  await expectCursorAt(page, '[data-annotatable] p', 5);
  await page.keyboard.press('l');
  await expectCursorAt(page, '[data-annotatable] p', 6);
  await page.mouse.move(coordinates[0].x, coordinates[0].y);
  await page.mouse.down();
  await page.mouse.move(coordinates[2].x, coordinates[2].y, { steps: 8 });
  await page.mouse.up();
  expect(await page.evaluate(() => getSelection()!.toString())).toBe(
    'Um apont',
  );
  await expectCursorAt(page, '[data-annotatable] p', 7);
  await page.keyboard.press('y');
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('Um apont');
  await expect(
    page.getByRole('status').filter({ hasText: 'Texto copiado.' }),
  ).toBeVisible();
  expect(await page.locator('[data-annotatable]').innerHTML()).toBe(before);
  await page.evaluate(() => getSelection()!.removeAllRanges());
  await page.mouse.move(coordinates[2].x, coordinates[2].y);
  await page.mouse.down();
  await page.mouse.move(coordinates[0].x, coordinates[0].y, { steps: 8 });
  await page.mouse.up();
  await expectCursorAt(page, '[data-annotatable] p', 0);
  await page.keyboard.press('l');
  expect(await page.evaluate(() => getSelection()!.toString())).toBe('m apont');
  await page.evaluate(() => {
    const original = navigator.clipboard.writeText;
    navigator.clipboard.writeText = async function () {
      navigator.clipboard.writeText = original;
      throw new DOMException('Clipboard denied', 'NotAllowedError');
    };
  });
  await page.keyboard.press('y');
  await expect(
    page.getByRole('status').filter({ hasText: 'Não foi possível copiar' }),
  ).toBeVisible();
  expect(await page.evaluate(() => getSelection()!.toString())).toBe('m apont');
  await page.keyboard.press(',');
  await page.locator('#appearance-vim-keys').uncheck();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-vim-cursor]')).toBeHidden();
  await page.evaluate(() => navigator.clipboard.writeText('untouched'));
  await paragraph.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    getSelection()!.removeAllRanges();
    getSelection()!.addRange(range);
  });
  await page.keyboard.press('y');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'untouched',
  );
});

test('mouse selections keep whole Unicode characters when Vim moves either endpoint', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/apontamentos/');
  const paragraph = page.locator('[data-annotatable] p').first();
  const coordinates = await paragraph.evaluate((element) => {
    element.textContent = 'A🙂B';
    return [0, 3].map((offset) => {
      const range = document.createRange();
      range.setStart(element.firstChild!, offset);
      range.setEnd(element.firstChild!, offset + 1);
      const rect = range.getBoundingClientRect();
      return { x: rect.x + 0.1, y: rect.y + rect.height / 2 };
    });
  });
  for (const reverse of [false, true]) {
    await page.evaluate(() => getSelection()!.removeAllRanges());
    const start = coordinates[reverse ? 1 : 0];
    const end = coordinates[reverse ? 0 : 1];
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 8 });
    await page.mouse.up();
    await page.keyboard.press(reverse ? 'l' : 'h');
    const expected = reverse ? '🙂' : 'A';
    expect(await page.evaluate(() => getSelection()!.toString())).toBe(
      expected,
    );
    await page.keyboard.press('y');
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(expected);
  }
});

test('Vim visual selection uses the existing highlight and comment actions', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/apontamentos/');
  await page.keyboard.press('g');
  await page.keyboard.press('g');
  await page.keyboard.press('v');
  await page.keyboard.press('2');
  await page.keyboard.press('l');
  expect(await page.evaluate(() => getSelection()!.toString())).toBe('Uma');
  const highlight = page.getByRole('button', { name: 'Destacar', exact: true });
  await page.keyboard.press('Tab');
  await expect(highlight).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Abrir nota: Uma', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('}');
  await page.keyboard.press('v');
  await page.keyboard.press('e');
  expect(await page.evaluate(() => getSelection()!.toString())).toBe('Um');
  await expect(highlight).toBeVisible();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'Comentar', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await page.getByLabel('O teu comentário').fill('Comentário criado em Vim');
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Abrir nota: Uma', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Abrir nota: Um', exact: true })
    .click();
  await expect(page.getByLabel('O teu comentário')).toHaveValue(
    'Comentário criado em Vim',
  );
});

test('Vim selects complete visual lines and activates disclosures without trapping focused controls', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() =>
    localStorage.setItem('resumos-shortcuts', JSON.stringify({ vim: true })),
  );
  await page.goto('/exemplo/apontamentos/');
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press('g');
  await page.keyboard.press('g');
  await page.keyboard.press('}');
  await page.keyboard.press('V');
  const selectedLine = await page.evaluate(() => getSelection()!.toString());
  expect(selectedLine).toMatch(/^Um apontamento/);
  expect(selectedLine).not.toContain('Usa as tuas palavras');
  await page.keyboard.press('j');
  const twoLines = await page.evaluate(() => getSelection()!.toString());
  expect(twoLines.startsWith(selectedLine)).toBe(true);
  expect(twoLines.length).toBeGreaterThan(selectedLine.length);
  await page.keyboard.press('k');
  expect(await page.evaluate(() => getSelection()!.toString())).toBe(
    selectedLine,
  );
  await page.keyboard.press('Escape');
  expect(await page.evaluate(() => getSelection()!.isCollapsed)).toBe(true);
  await page.goto('/exemplo/formatacao/');
  await page.keyboard.press('/');
  await page
    .getByRole('searchbox', { name: 'Texto nesta página' })
    .fill('Ver a resolução de um exercício');
  await page.keyboard.press('Enter');
  const details = page
    .locator('details')
    .filter({
      has: page.getByText('Ver a resolução de um exercício', { exact: true }),
    })
    .first();
  await expect(details).not.toHaveAttribute('open');
  await page.keyboard.press('Space');
  await expect(details).toHaveAttribute('open', '');
  await page.keyboard.press('Enter');
  await expect(details).not.toHaveAttribute('open');
  await page.locator('[data-open-ai]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#ai-menu')).toBeVisible();
  await expect(details).not.toHaveAttribute('open');
  await page.goto('/exemplo/apontamentos/');
  await page.keyboard.press('/');
  await page
    .getByRole('searchbox', { name: 'Texto nesta página' })
    .fill('gráficos, diagramas e vídeo');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/exemplo\/diagramas\/$/);
});
