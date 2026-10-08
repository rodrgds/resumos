import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

async function newNote(page: Page) {
  const empty = page.getByRole('button', {
    name: 'Novo apontamento',
    exact: true,
  });
  if (await empty.isVisible()) {
    await empty.click();
    await expect(
      page.getByRole('textbox', { name: 'Título do apontamento' }),
    ).toHaveValue('');
    return;
  }
  const previous = page.url();
  const sidebar = page.locator('.course-sidebar');
  if (!(await sidebar.getAttribute('open'))) {
    const summary = sidebar.locator('summary');
    if (await summary.isVisible()) await summary.click();
  }
  await page
    .locator('.reader-navigation')
    .getByRole('link', { name: 'Novo apontamento', exact: true })
    .click();
  await expect(page).not.toHaveURL(previous);
  await expect(page).not.toHaveURL(/#novo$/);
  await expect(
    page.getByRole('textbox', { name: 'Título do apontamento' }),
  ).toHaveValue('');
}
async function noteAction(page: Page, name: string) {
  await page
    .getByRole('button', { name: 'Ações do apontamento', exact: true })
    .click();
  await page
    .locator('#personal-actions-menu')
    .getByRole('button', { name, exact: true })
    .click();
}

async function exportedMarkdown(page: Page) {
  const download = page.waitForEvent('download');
  await noteAction(page, 'Exportar apontamento');
  return readFile((await (await download).path())!, 'utf8');
}

const image = {
  name: 'diagrama.png',
  mimeType: 'image/png',
  buffer: Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a/aUAAAAASUVORK5CYII=',
    'base64',
  ),
};

for (const width of [1440, 390]) {
  test(`personal pages render Markdown, edit math and retain local images at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/caderno/?cadeira=exemplo');
    await newNote(page);
    await page
      .getByRole('textbox', { name: 'Título do apontamento' })
      .fill('Preparação para o exame');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    await editor.fill(
      '# Revisão\n\nUma **ideia** com $x^2$.\n\n- Primeiro\n- Segundo\n\n| A | B |\n| --- | --- |\n| 1 | 2 |',
    );
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    await expect(
      page.locator('.personal-editor').getByRole('heading', { level: 1 }),
    ).toHaveText('Revisão');
    await expect(page.locator('.personal-editor strong')).toHaveText('ideia');
    await editor.locator('.katex').click();
    await expect(editor).toContainText('$x^2$');
    await expect(editor).toBeFocused();
    await page.keyboard.insertText('a + ');
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    await expect(editor.locator('annotation')).toHaveText('a + x^2');
    await page.locator('#attach-note-image').setInputFiles(image);
    await expect(
      page.locator('.personal-editor').getByRole('img'),
    ).toBeVisible();
    await expect(page.locator('#personal-save-status')).toHaveText(
      'Guardado neste navegador',
    );
    await page.reload();
    await expect(
      page.getByRole('textbox', { name: 'Título do apontamento' }),
    ).toHaveValue('Preparação para o exame');
    await expect(
      page.locator('.personal-editor').getByRole('img'),
    ).toBeVisible();
    await expect(page.locator('.personal-editor .katex')).toBeVisible();
    const violations = (
      await new AxeBuilder({ page }).include('#conteudo').analyze()
    ).violations;
    expect(violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.goto('/exemplo/apontamentos/');
    if (width < 1200) await page.locator('.course-sidebar > summary').click();
    await expect(
      page.getByRole('link', { name: 'Preparação para o exame', exact: true }),
    ).toBeVisible();
  });
}

test('multiple pages have independent undoable deletion and portable image backups', async ({
  page,
}) => {
  await page.goto('/caderno/?cadeira=exemplo');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Título do apontamento' })
    .fill('Com imagem');
  await page.locator('#attach-note-image').setInputFiles(image);
  await expect(page.locator('#personal-save-status')).toHaveText(
    'Guardado neste navegador',
  );
  const download = page.waitForEvent('download');
  await noteAction(page, 'Exportar apontamento');
  const backup = await download;
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Título do apontamento' })
    .fill('Outro');
  await noteAction(page, 'Eliminar apontamento');
  await expect(
    page.getByRole('textbox', { name: 'Título do apontamento' }),
  ).toHaveValue('Com imagem');
  await page.getByRole('button', { name: 'Desfazer eliminação' }).click();
  await expect(
    page.getByRole('textbox', { name: 'Título do apontamento' }),
  ).toHaveValue('Outro');
  await page.locator('#import-note-file').setInputFiles((await backup.path())!);
  await expect(
    page.getByRole('textbox', { name: 'Título do apontamento' }),
  ).toHaveValue('Com imagem');
  await expect(page.locator('.personal-editor').getByRole('img')).toBeVisible();
  await expect(
    page.locator('.reader-navigation .personal-page-row > a'),
  ).toHaveCount(3);
});

test('personal Markdown cannot run HTML or fetch remote images, and failed saving stays exportable', async ({
  page,
}) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/caderno/?cadeira=exemplo');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Texto do apontamento' })
    .fill(
      '<script>window.compromised=true</script>\n\n![remote](https://example.org/private.png)\n\n[bad](javascript:alert(1))',
    );
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await expect(page.locator('#personal-save-status')).toHaveText(
    'Guardado neste navegador',
  );
  expect(requests.some((url) => url.includes('example.org/private.png'))).toBe(
    false,
  );
  await expect(
    page.locator(
      '.personal-editor script, .personal-editor a[href^="javascript:"]',
    ),
  ).toHaveCount(0);
  const blocked = await page.context().newPage();
  await blocked.addInitScript(() =>
    Object.defineProperty(window, 'indexedDB', {
      get() {
        throw new Error('blocked');
      },
    }),
  );
  await blocked.goto('/caderno/?cadeira=exemplo');
  await newNote(blocked);
  await blocked
    .getByRole('textbox', { name: 'Texto do apontamento' })
    .fill('Guardar esta ideia');
  await expect(blocked.locator('#personal-save-status')).toContainText(
    'Não foi possível guardar',
  );
  const download = blocked.waitForEvent('download');
  await noteAction(blocked, 'Exportar apontamento');
  expect((await download).suggestedFilename()).toMatch(/\.md$/);
});

test('published formulas copy their original LaTeX and offer a clipboard fallback', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
    }),
  );
  await page.goto('/exemplo/apontamentos/');
  await page.locator('.lesson-body .formula-unit').first().hover();
  await page
    .getByRole('button', { name: 'Copiar fórmula', exact: true })
    .first()
    .click();
  const fallback = page.getByRole('textbox', { name: 'Fórmula para copiar' });
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveValue(/^\$[\s\S]+\$$/);
  await expect(fallback).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(fallback).toBeHidden();
});

test('touch formulas edit in place and undo restores the formula', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('Uma fórmula $x^2$');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await editor.locator('.katex').tap();
  await expect(editor).toBeFocused();
  await expect(editor).toContainText('$x^2$');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.keyboard.insertText('a + ');
  await editor.press('ControlOrMeta+z');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await expect(editor.locator('annotation')).toHaveText('x^2');
  await expect(
    editor.getByRole('button', { name: 'Copiar fórmula', exact: true }),
  ).toHaveCount(0);
  await context.close();
});

test('pasted and dropped image files persist, while unsupported files leave the page intact', async ({
  page,
}) => {
  await page.goto('/caderno/?cadeira=exemplo');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Texto do apontamento' })
    .fill('As minhas imagens');
  for (const type of ['paste', 'drop']) {
    await page.getByRole('textbox', { name: 'Texto do apontamento' }).evaluate(
      (editor, { type, bytes }) => {
        const transfer = new DataTransfer();
        transfer.items.add(
          new File([new Uint8Array(bytes)], `${type}.png`, {
            type: 'image/png',
          }),
        );
        editor.dispatchEvent(
          type === 'paste'
            ? new ClipboardEvent('paste', {
                clipboardData: transfer,
                bubbles: true,
                cancelable: true,
              })
            : new DragEvent('drop', {
                dataTransfer: transfer,
                bubbles: true,
                cancelable: true,
              }),
        );
      },
      { type, bytes: Array.from(image.buffer) },
    );
    await expect(page.locator('#personal-save-status')).toHaveText(
      'Guardado neste navegador',
    );
  }
  await page.locator('#attach-note-image').setInputFiles({
    name: 'script.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from('<svg onload="alert(1)"></svg>'),
  });
  await expect(page.locator('#personal-save-status')).toContainText(
    'Escolhe uma imagem',
  );
  await page.reload();
  await expect(page.locator('.personal-editor').getByRole('img')).toHaveCount(
    2,
  );
  await expect(page.locator('.personal-editor')).toContainText(
    'As minhas imagens',
  );
});

test('concurrent edits never silently overwrite another tab', async ({
  page,
  context,
}) => {
  await page.goto('/caderno/?cadeira=exemplo');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Texto do apontamento' })
    .fill('Original');
  await expect(page.locator('#personal-save-status')).toHaveText(
    'Guardado neste navegador',
  );
  const second = await context.newPage();
  await second.goto(page.url());
  await Promise.all([
    page
      .getByRole('textbox', { name: 'Texto do apontamento' })
      .fill('Versão A'),
    second
      .getByRole('textbox', { name: 'Texto do apontamento' })
      .fill('Versão B'),
  ]);
  await expect
    .poll(
      async () =>
        (
          await Promise.all([
            page.locator('#personal-save-status').textContent(),
            second.locator('#personal-save-status').textContent(),
          ])
        ).filter((status) => status?.includes('mudou noutro separador')).length,
    )
    .toBe(1);
  await expect(page.locator('.personal-editor')).toContainText('Versão A');
  await expect(second.locator('.personal-editor')).toContainText('Versão B');
});

test('the notebook shows all courses on home and only the current course on a lesson', async ({
  page,
}) => {
  await page.goto('/caderno/?cadeira=exemplo');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Título do apontamento' })
    .fill('O meu exemplo');
  await expect(page.locator('#personal-save-status')).toHaveText(
    'Guardado neste navegador',
  );
  await page.goto('/caderno/fp/');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Título do apontamento' })
    .fill('As minhas funções');
  await expect(page.locator('#personal-save-status')).toHaveText(
    'Guardado neste navegador',
  );
  await page.goto('/');
  await page
    .getByRole('button', { name: 'Abrir caderno', exact: true })
    .click();
  await expect(
    page
      .locator('#scratchpad')
      .getByRole('link', { name: 'O meu exemplo', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .locator('#scratchpad')
      .getByRole('link', { name: 'As minhas funções', exact: true }),
  ).toBeVisible();
  await page.goto('/exemplo/apontamentos/');
  await page
    .getByRole('button', { name: 'Abrir caderno', exact: true })
    .click();
  await expect(
    page
      .locator('#scratchpad')
      .getByRole('link', { name: 'O meu exemplo', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .locator('#scratchpad')
      .getByRole('link', { name: 'As minhas funções', exact: true }),
  ).toHaveCount(0);
});

for (const [name, markup, selector, expected] of [
  ['bold', '**beta**', 'strong', '**delta**'],
  ['italic', '*beta*', 'em', '*delta*'],
  ['strike', '~~beta~~', 's', '~~delta~~'],
  ['code', '`beta`', 'code', '`delta`'],
  ['link', '[beta](https://example.com)', 'a', '[delta](https://example.com)'],
]) {
  test(`editing a rendered ${name} word preserves its position and surrounding formatting`, async ({
    page,
  }) => {
    await page.goto('/caderno/?cadeira=exemplo#novo');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    await editor.fill(`Alpha ${markup} gamma`);
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    const formatted = editor.locator(selector);
    await formatted.click();
    await expect(formatted).toHaveText('beta');
    await formatted.dblclick();
    await page.keyboard.insertText('delta');
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    await expect(page.locator('.personal-editor')).toContainText(
      'Alpha delta gamma',
    );
    await expect(formatted).toHaveText('delta');
    expect(await exportedMarkdown(page)).toContain(`Alpha ${expected} gamma`);
  });
}

test('formula copying gives visible feedback and the mouse does not leave a sticky button', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/exemplo/apontamentos/');
  const formula = page.locator('.lesson-body .formula-unit').first();
  await formula.hover();
  const copy = formula.getByRole('button', {
    name: 'Copiar fórmula',
    exact: true,
  });
  await copy.click();
  await expect(page.locator('#formula-copy-status')).toHaveText(
    'Fórmula copiada',
  );
  await expect(page.locator('#formula-copy-status')).toHaveCSS('opacity', '1');
  await page.mouse.move(5, 5);
  await expect(copy).toHaveCSS('opacity', '0');
});

test('notes use course contents, with keyboard and pointer menus and undo', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/caderno/exemplo/#novo');
  await page
    .getByRole('textbox', { name: 'Título do apontamento' })
    .fill('Revisão pessoal');
  await expect(page.locator('#personal-save-status')).toHaveText(
    'Guardado neste navegador',
  );
  await expect(page.locator('#conteudo select')).toHaveCount(0);
  await expect(
    page
      .locator('.reader-navigation')
      .getByRole('link', { name: 'Apresentação', exact: true }),
  ).toBeVisible();
  const link = page
    .locator('.reader-navigation')
    .getByRole('link', { name: 'Revisão pessoal', exact: true });
  await link.click({ button: 'right' });
  await expect(page.locator('#note-page-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(link).toBeFocused();
  await link.press('Shift+F10');
  await page.keyboard.press('Tab');
  await expect(page.locator('#note-page-menu')).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Ações de Revisão pessoal' }),
  ).toBeFocused();
  await link.press('Shift+F10');
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#note-page-menu')).toBeHidden();
  await expect(
    page.getByRole('link', { name: 'Novo apontamento', exact: true }),
  ).toBeFocused();
  await link.press('Shift+F10');
  await page
    .locator('#note-page-menu')
    .getByRole('menuitem', { name: 'Eliminar apontamento' })
    .click();
  await expect(link).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Desfazer eliminação', exact: true })
    .click();
  await expect(link).toBeVisible();
  await page.goto('/exemplo/apontamentos/');
  await page
    .locator('.reader-navigation')
    .getByRole('button', { name: 'Ações de Revisão pessoal' })
    .click();
  await page
    .locator('#note-page-menu')
    .getByRole('menuitem', { name: 'Eliminar apontamento' })
    .click();
  await expect(link).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Desfazer eliminação', exact: true })
    .click();
  await expect(link).toBeVisible();
});

test('typing continues lists and undo restores text without a preview switch', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('- Primeiro');
  await editor.press('End');
  await editor.press('Enter');
  await page.keyboard.insertText('Segundo');
  await expect(editor).toContainText('- Segundo');
  await editor.press('ControlOrMeta+z');
  await expect(editor).not.toContainText('Segundo');
  await editor.press('ControlOrMeta+Shift+Z');
  await expect(editor).toContainText('Segundo');
});

for (const marker of ['-', '1.', '- [ ]']) {
  test(`lists continue through three items and indent with Tab (${marker})`, async ({
    page,
  }) => {
    await page.goto('/caderno/exemplo/#novo');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    await editor.fill(`${marker} Primeiro`);
    await editor.press('End');
    await editor.press('Enter');
    await page.keyboard.insertText('Segundo');
    await editor.press('Enter');
    await editor.press('Tab');
    await expect(editor).toBeFocused();
    await expect(editor.getByRole('heading')).toHaveCount(0);
    await page.keyboard.insertText('Terceiro');
    await editor.press('Enter');
    await page.keyboard.insertText('Quarto');
    await editor.press('Shift+Tab');
    await editor.press('Enter');
    await editor.press('Enter');
    await page.keyboard.insertText('Fora da lista');
    const source = await exportedMarkdown(page);
    const lines = source.split('\n');
    const first = lines.findIndex((line) => line.endsWith('Primeiro'));
    expect(lines.slice(first, first + 6)).toEqual(
      marker === '1.'
        ? [
            '1. Primeiro',
            '2. Segundo',
            '   1. Terceiro',
            '3. Quarto',
            '',
            'Fora da lista',
          ]
        : [
            `${marker} Primeiro`,
            `${marker} Segundo`,
            `  ${marker} Terceiro`,
            `${marker} Quarto`,
            '',
            'Fora da lista',
          ],
    );
  });
}

test('fenced code keeps syntax colours while typing and reading', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('```python\ndef area(r):\n    return 3.14 * r ** 2\n```');
  await editor.press('ControlOrMeta+Home');
  await editor.press('ArrowDown');
  const keyword = editor.getByText('def', { exact: true });
  await expect(keyword).toBeVisible();
  const textColour = await editor.evaluate((el) => getComputedStyle(el).color);
  await expect(keyword).not.toHaveCSS('color', textColour);
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await expect(keyword).not.toHaveCSS('color', textColour);
});

for (const [name, source] of [
  ['top-level', 'abc\n-'],
  ['nested', '- abc\n  -'],
  ['quoted', '> abc\n> -'],
  ['quoted nested', '> - abc\n>   -'],
  ['ordered nested', '1. abc\n   -'],
]) {
  test(`an empty ${name} bullet keeps body typography while real headings stay headings`, async ({
    page,
  }) => {
    await page.goto('/caderno/exemplo/#novo');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    await editor.fill(`Secção\n---\n\n- Título na lista\n  ---\n\n${source}`);
    const headings = editor.getByRole('heading', { level: 2 });
    await expect(headings).toHaveText([/^Secção$/, /Título na lista$/]);
    const bodySize = await editor.evaluate(
      (node) => getComputedStyle(node).fontSize,
    );
    const parent = editor.locator('.cm-line').filter({ hasText: 'abc' });
    await expect(parent).toHaveCSS('font-size', bodySize);
    await editor.press('ControlOrMeta+End');
    await page.keyboard.insertText(' a');
    await expect(parent).toHaveCSS('font-size', bodySize);
    await editor.press('Backspace');
    await expect(headings).toHaveText([/^Secção$/, /Título na lista$/]);
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    await expect(parent).toHaveCSS('font-size', bodySize);
    await expect(page.locator('#personal-save-status')).toHaveText(
      'Guardado neste navegador',
    );
    await page.reload();
    await expect(headings).toHaveText([/^Secção$/, /Título na lista$/]);
    await expect(parent).toHaveCSS('font-size', bodySize);
    expect(await exportedMarkdown(page)).toContain(source);
  });
}

test('formulas reveal their source in place by click and vertical arrow movement', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('Antes\n\n$$\nx^2\n$$\n\nDepois');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await editor.locator('.katex').click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(editor).toBeFocused();
  await expect(editor).toContainText('x^2');
  await expect(editor).toContainText('$$');
  await expect(
    editor.getByRole('button', { name: 'Copiar fórmula', exact: true }),
  ).toHaveCount(0);
  await editor.press('ControlOrMeta+End');
  await editor.press('Home');
  await expect(editor.locator('.katex')).toBeVisible();
  await editor.press('ArrowUp');
  await editor.press('ArrowUp');
  await expect(editor.locator('.katex')).toHaveCount(0);
  await expect(editor).toContainText('x^2');
  await page.keyboard.insertText(' + y');
  await editor.press('ControlOrMeta+End');
  await expect(editor.locator('.katex')).toBeVisible();
});

test('checklists render all requested states, toggle without losing source, and undo restores alternate states', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  const source = await readFile('tests/fixtures/checklists.md', 'utf8');
  await editor.fill(source);
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await expect(editor.getByRole('checkbox')).toHaveCount(22);
  await expect(editor.getByRole('checkbox', { name: /: done$/ })).toBeChecked();
  await expect(
    editor.getByRole('checkbox', { name: /: incomplete$/ }),
  ).toBeChecked({ indeterminate: true });
  await expect(editor).toContainText('[z] literal marker');
  await expect(
    editor.getByRole('checkbox', { name: /not a task/ }),
  ).toHaveCount(0);
  expect(
    (await new AxeBuilder({ page }).include('#conteudo').analyze()).violations,
  ).toEqual([]);
  expect(await exportedMarkdown(page)).toContain(source);
  const fire = editor.getByRole('checkbox', { name: /: fire$/ });
  await fire.check();
  await expect(fire).toBeChecked();
  expect(await exportedMarkdown(page)).toContain('- [x] fire');
  await fire.focus();
  await page.keyboard.press('ControlOrMeta+z');
  await expect(fire).not.toBeChecked();
  expect(await exportedMarkdown(page)).toContain(source);
  await fire.focus();
  await page.keyboard.press('Space');
  await expect(fire).toBeChecked();
  await expect(fire).toBeFocused();
  await page.keyboard.press('Space');
  await expect(fire).not.toBeChecked();
  expect(await exportedMarkdown(page)).toContain('- [ ] fire');
  const labels = source
    .split('\n')
    .slice(0, 22)
    .map((row) => /^- \[.\] (.*)$/.exec(row)![1]);
  for (const label of labels) {
    const box = editor.getByRole('checkbox', {
      name: new RegExp(`: ${label}$`),
    });
    if (label === 'done') {
      await box.uncheck();
      await expect(box).not.toBeChecked();
    } else {
      await box.check();
      await expect(box).toBeChecked();
    }
  }
  const toggled = await exportedMarkdown(page);
  for (const label of labels)
    expect(toggled).toContain(`- [${label === 'done' ? ' ' : 'x'}] ${label}`);
});

test('checkbox keyboard focus moves between controls without editing the text cursor elsewhere', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  const source = '- [?] Primeiro\n- [!] Segundo\n\nTexto final';
  await editor.fill(source);
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  const first = editor.getByRole('checkbox', { name: /: Primeiro$/ });
  const second = editor.getByRole('checkbox', { name: /: Segundo$/ });
  await first.focus();
  await page.keyboard.press('Tab');
  await expect(second).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(first).toBeFocused();
  await page.keyboard.press('Enter');
  expect(await exportedMarkdown(page)).toContain(source);
});

test('an empty nested alternate task outdents, then exits without swallowing its parent', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('- Pai\n  - [?] ');
  await editor.press('End');
  await editor.press('Enter');
  expect(await exportedMarkdown(page)).toContain('- Pai\n- [?] ');
  await editor.focus();
  await editor.press('ControlOrMeta+End');
  await editor.press('Enter');
  await page.keyboard.insertText('Fora');
  expect(await exportedMarkdown(page)).toContain('- Pai\n\nFora');
});

for (const [prefix, continued] of [
  ['- [/]', '- [ ]'],
  ['- [?]', '- [ ]'],
  ['1. [!]', '2. [ ]'],
  ['> - [S]', '> - [ ]'],
]) {
  test(`Enter continues ${prefix} as an unchecked task with one undo`, async ({
    page,
  }) => {
    await page.goto('/caderno/exemplo/#novo');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    const original = `${prefix} Primeiro`;
    await editor.fill(original);
    const before = await exportedMarkdown(page);
    await editor.focus();
    await editor.press('End');
    await editor.press('Enter');
    await editor.press('ControlOrMeta+z');
    expect(await exportedMarkdown(page)).toBe(before);
    await editor.focus();
    await editor.press('ControlOrMeta+End');
    await editor.press('Enter');
    await page.keyboard.insertText('Segundo');
    expect(await exportedMarkdown(page)).toContain(
      `${original}\n${continued} Segundo`,
    );
  });
}

for (const marker of ['-', '+', '*', '1.', '- [?]']) {
  test(`an empty ${marker} after ordinary text exits to a separate paragraph`, async ({
    page,
  }) => {
    await page.goto('/caderno/exemplo/#novo');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    await editor.fill('Texto normal');
    await editor.press('End');
    await editor.press('Enter');
    await page.keyboard.insertText(`${marker} `);
    await expect(editor.getByRole('heading')).toHaveCount(0);
    await editor.press('Enter');
    await page.keyboard.insertText('Fora da lista');
    expect(await exportedMarkdown(page)).toContain(
      'Texto normal\n\nFora da lista',
    );
  });
}

test('empty list-like lines inside fenced code keep their source when pressing Enter', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('```text\n- \n```');
  await editor.locator('.cm-line').filter({ hasText: /^- $/ }).click();
  await editor.press('End');
  await editor.press('Enter');
  await page.keyboard.insertText('Literal');
  expect(await exportedMarkdown(page)).toContain('```text\n- \nLiteral\n```');
});

test('indenting a list carries its children and one undo restores the complete item', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  const original =
    '- Primeiro\n- Segundo\n  - Filho\n    continuação\n- Último';
  await editor.fill(original);
  await editor.press('ControlOrMeta+Home');
  await editor.press('ArrowDown');
  await editor.press('Tab');
  expect(await exportedMarkdown(page)).toContain(
    '- Primeiro\n  - Segundo\n    - Filho\n      continuação\n- Último',
  );
  await expect(editor).toContainText('Filho');
  await expect(editor).toContainText('continuação');
  await editor.press('ControlOrMeta+z');
  expect(await exportedMarkdown(page)).toContain(original);
  await editor.press('ControlOrMeta+Shift+Z');
  await editor.press('Shift+Tab');
  expect(await exportedMarkdown(page)).toContain(original);
  await editor.press('Escape');
  await page.keyboard.press('Tab');
  await expect(editor).not.toBeFocused();
});

test('Arrow Up inside code moves to the preceding line instead of an earlier formula', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill(
    '$$\n\\frac{1}{2}\n$$\n\nTexto entre a fórmula e o código.\n\n```cpp\n#include <iostream>\n\nint main() {\n\n}\n```',
  );
  const closing = editor.locator('.cm-line').filter({ hasText: /^}$/ });
  await closing.click();
  await editor.press('End');
  await expect(editor.locator('.katex')).toBeVisible();
  await editor.press('ArrowUp');
  await page.keyboard.insertText('// acima');
  expect(await exportedMarkdown(page)).toContain(
    'int main() {\n// acima\n}\n```',
  );
});

test('an empty second item exits the list and inserting a formula keeps typing in the document', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('- Uma ideia');
  await editor.press('End');
  await editor.press('Enter');
  await editor.press('Enter');
  await page.keyboard.insertText('Outra ideia');
  expect(await exportedMarkdown(page)).toContain('- Uma ideia\n\nOutra ideia');
  await noteAction(page, 'Inserir fórmula');
  await expect(editor).toBeFocused();
  await page.keyboard.insertText('E=mc^2');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await expect(editor.locator('annotation')).toHaveText('E=mc^2');
  await editor.press('ControlOrMeta+Home');
  await editor.press('ArrowDown');
  await editor.press('ArrowDown');
  await editor.press('ArrowDown');
  await editor.press('ArrowDown');
  await expect(editor).toContainText('E=mc^2');
  await expect(editor.locator('.katex')).toHaveCount(0);
});

for (const delimiter of ['$', '$$']) {
  test(`clicking an inline formula preserves its ${delimiter} delimiters`, async ({
    page,
  }) => {
    await page.goto('/caderno/exemplo/#novo');
    const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
    await editor.fill(`Antes ${delimiter}x^2${delimiter} depois`);
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    await editor.locator('.katex').click();
    await page.keyboard.insertText('a + ');
    await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
    await expect(editor.locator('annotation')).toHaveText('a + x^2');
    expect(await exportedMarkdown(page)).toContain(
      `Antes ${delimiter}a + x^2${delimiter} depois`,
    );
  });
}

test('Tab nests a quoted list item without moving the quote itself', async ({
  page,
}) => {
  await page.goto('/caderno/exemplo/#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('> - Primeiro\n> - Segundo');
  await editor.press('ControlOrMeta+End');
  await editor.press('Tab');
  expect(await exportedMarkdown(page)).toContain('> - Primeiro\n>   - Segundo');
  await editor.press('Shift+Tab');
  expect(await exportedMarkdown(page)).toContain('> - Primeiro\n> - Segundo');
});
