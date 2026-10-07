import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
    await page.getByRole('button', { name: 'Editar fórmula' }).click();
    await page
      .getByRole('textbox', { name: 'LaTeX da fórmula' })
      .fill('\\frac{a}{b}');
    await page.getByRole('button', { name: 'Aplicar fórmula' }).click();
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

test('touch formula editing cancels without changing the source and copies usable Markdown maths', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();
  await page.goto('/caderno/?cadeira=exemplo');
  await newNote(page);
  await page
    .getByRole('textbox', { name: 'Texto do apontamento' })
    .fill('Uma fórmula $\\frac{a}{b}$');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await page.getByRole('button', { name: 'Editar fórmula' }).tap();
  await page.getByRole('textbox', { name: 'LaTeX da fórmula' }).fill('\\frac{');
  await expect(page.locator('#note-formula-error')).toContainText('incompleta');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Copiar fórmula', exact: true }).tap();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    '$\\frac{a}{b}$',
  );
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

test('editing a rendered word preserves its position and surrounding formatting', async ({
  page,
}) => {
  await page.goto('/caderno/?cadeira=exemplo#novo');
  const editor = page.getByRole('textbox', { name: 'Texto do apontamento' });
  await editor.fill('Alpha **beta** gamma');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await page.locator('.personal-editor strong').click();
  await expect(page.locator('.personal-editor strong')).toHaveText('beta');
  await page.locator('.personal-editor strong').dblclick();
  await page.keyboard.insertText('delta');
  await page.getByRole('textbox', { name: 'Título do apontamento' }).click();
  await expect(page.locator('.personal-editor')).toContainText(
    'Alpha delta gamma',
  );
  await expect(page.locator('.personal-editor strong')).toHaveText('delta');
});

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
  await editor.press('ControlOrMeta+Shift+z');
  await expect(editor).toContainText('Segundo');
});
