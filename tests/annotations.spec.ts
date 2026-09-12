import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function selectText(page: Page, text: string) {
  await page.locator('[data-annotatable]').evaluate((root, quote) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    const full = nodes.map((node) => node.data).join('');
    const start = full.indexOf(quote);
    if (start < 0) throw new Error(`Missing visible passage: ${quote}`);
    let offset = 0;
    const range = new Range();
    for (const node of nodes) {
      if (start >= offset && start < offset + node.length)
        range.setStart(node, start - offset);
      if (
        start + quote.length > offset &&
        start + quote.length <= offset + node.length
      )
        range.setEnd(node, start + quote.length - offset);
      offset += node.length;
    }
    range.startContainer.parentElement!.scrollIntoView({ block: 'center' });
    window.getSelection()!.removeAllRanges();
    window.getSelection()!.addRange(range);
  }, text);
  await expect(
    page.getByRole('group', { name: 'Anotar seleção' }),
  ).toBeVisible();
}
async function highlightedText(page: Page) {
  return page.evaluate(() =>
    [...(CSS.highlights.get('notebook') || [])]
      .map((range) => (range as Range).toString())
      .join(''),
  );
}
const passage =
  'Um apontamento pode ter definições, exemplos e pequenos exercícios.';

for (const width of [1440, 390]) {
  test(`contextual note focus and article dismissal work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/exemplo/apontamentos/');
    await selectText(page, passage);
    await page.getByRole('button', { name: 'Comentar', exact: true }).click();
    const input = page.getByRole('textbox', { name: 'O teu comentário' });
    await expect(input).toBeFocused();
    const spacing = await input.evaluate((node) => {
      const viewport = node
        .closest('.notebook-content')!
        .getBoundingClientRect();
      const field = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const ring =
        parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset);
      return {
        left: field.left - viewport.left,
        right: viewport.right - field.right,
        ring,
      };
    });
    expect(spacing.ring).toBeGreaterThan(0);
    expect(spacing.left).toBeGreaterThanOrEqual(spacing.ring);
    expect(spacing.right).toBeGreaterThanOrEqual(spacing.ring);
    await expect(page.locator('#annotation-quote')).toBeHidden();
    await expect(page.locator('#notes-status')).toBeHidden();
    await page.locator('h1').first().click();
    await expect(page.locator('#scratchpad')).toBeHidden();
    await expect.poll(() => highlightedText(page)).toBe(passage);
  });
}

test('a saved passage uses one visible highlight treatment', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Comentar', exact: true }).click();
  await expect(page.locator('.annotation-stroke')).toHaveCount(1);
  const cssHighlight = await page
    .locator('.prose p')
    .first()
    .evaluate((node) => {
      const saved = getComputedStyle(node, '::highlight(notebook)');
      const active = getComputedStyle(node, '::highlight(notebook-active)');
      return {
        saved: saved.backgroundColor,
        active: active.backgroundColor,
        decoration: active.textDecorationLine,
      };
    });
  expect(cssHighlight.saved).toBe('rgba(0, 0, 0, 0)');
  expect(cssHighlight.active).toBe('rgba(0, 0, 0, 0)');
  expect(cssHighlight.decoration).toBe('none');
});

test('selection highlights across inline formatting, comments persist and deletion has undo', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await expect(page.locator('#scratchpad')).toBeHidden();
  await expect.poll(() => highlightedText(page)).toBe(passage);
  await page.getByRole('button', { name: 'Ver nota', exact: true }).click();
  const comment = page.getByRole('textbox', { name: 'O teu comentário' });
  await expect(comment).toBeFocused();
  await comment.fill('Rever isto antes do teste. / n ? a');
  await page.keyboard.type('/n?a');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await page.reload();
  await expect.poll(() => highlightedText(page)).toBe(passage);
  await page.keyboard.press('n');
  await page.locator('.annotation-card').click();
  await expect(comment).toHaveValue('Rever isto antes do teste. / n ? a/n?a');
  await page
    .getByRole('button', { name: 'Remover destaque e comentário' })
    .click();
  await expect.poll(() => highlightedText(page)).toBe('');
  await page.getByRole('button', { name: 'Desfazer', exact: true }).click();
  await expect.poll(() => highlightedText(page)).toBe(passage);
  await page.keyboard.press('n');
  await page.locator('.annotation-card').click();
  await expect(comment).toHaveValue('Rever isto antes do teste. / n ? a/n?a');
});

test('comment directly, return from another page, export and keep private data out of AI', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Comentar', exact: true }).click();
  await page.getByLabel('O teu comentário').fill('Comentário privado de teste');
  await page.goto('/exemplo/diagramas/');
  await expect.poll(() => highlightedText(page)).toBe('');
  await page.keyboard.press('n');
  await expect(page.locator('.annotation-card')).toHaveCount(0);
  await page.getByRole('button', { name: /^Todas \d/ }).click();
  await page.locator('.annotation-card').click();
  await page.getByRole('button', { name: 'Ver no texto', exact: true }).click();
  await expect(page).toHaveURL(/apontamentos\/#nota-/);
  await expect(page.getByLabel('O teu comentário')).toHaveValue(
    'Comentário privado de teste',
  );
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descarregar notas' }).click();
  const file = await download;
  expect(file.suggestedFilename()).toBe('caderno-resumos.md');
  const stream = await file.createReadStream();
  let text = '';
  for await (const chunk of stream!) text += chunk;
  expect(text).toContain(passage);
  expect(text).toContain('Comentário privado de teste');
  await page.getByRole('button', { name: 'Fechar caderno' }).click();
  await page.getByRole('button', { name: 'Perguntar ao Chat' }).click();
  await expect(page.locator('#ai-prompt')).not.toHaveValue(
    /Comentário privado/,
  );
});

test('keyboard selection can reach actions and Escape dismisses without creating a note', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await expect(
    page.getByRole('button', { name: 'Ignorar seleção', exact: true }),
  ).toHaveCount(0);
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'Destacar', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#selection-actions')).toBeHidden();
  await expect.poll(() => highlightedText(page)).toBe('');
  await selectText(page, passage);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('O teu comentário')).toBeFocused();
});

test('existing scratchpad notes remain editable and exportable', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('resumos-notes', 'Notas antigas importantes'),
  );
  await page.goto('/');
  await page.keyboard.press('n');
  await page.getByText('Notas anteriores', { exact: true }).click();
  await expect(page.getByLabel('As tuas notas anteriores')).toHaveValue(
    'Notas antigas importantes',
  );
  await page
    .getByLabel('As tuas notas anteriores')
    .fill('Notas antigas revistas');
  await expect(page.locator('#notes-status')).toHaveText(
    'Guardado neste navegador',
  );
});

test('inserting text before a saved passage keeps it anchored; changed text becomes an honest orphan', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await page.route('**/exemplo/apontamentos/', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace(
        'Um apontamento pode ter',
        'Texto novo antes do trecho. Um apontamento pode ter',
      ),
    });
  });
  await page.reload();
  await expect.poll(() => highlightedText(page)).toBe(passage);
  await page.unroute('**/exemplo/apontamentos/');
  await page.route('**/exemplo/apontamentos/', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace(
        'Um apontamento pode ter',
        'O conteúdo mudou e agora tem',
      ),
    });
  });
  await page.reload();
  await expect.poll(() => highlightedText(page)).toBe('');
  await page.keyboard.press('n');
  await page.locator('.annotation-card').click();
  await expect(page.locator('#annotation-quote')).toHaveText(passage);
  await expect(page.locator('#annotation-missing')).toBeVisible();
});

test('storage failure is visible and leaves the unsaved comment available to download', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Full', 'QuotaExceededError');
    };
  });
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Comentar', exact: true }).click();
  await page.getByLabel('O teu comentário').fill('Não perder este texto');
  await expect(page.locator('#notes-status')).toContainText(
    'Não foi possível guardar',
  );
  await page
    .getByRole('button', { name: 'Todas as notas', exact: true })
    .click();
  await expect(page.locator('.annotation-card')).toContainText(
    'Não perder este texto',
  );
});

test('notes in another tab update without overwriting unrelated notes', async ({
  page,
  context,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const other = await context.newPage();
  await other.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await expect.poll(() => highlightedText(other)).toBe(passage);
  await selectText(other, 'Uma ideia de cada vez');
  await other.getByRole('button', { name: 'Destacar', exact: true }).click();
  await page.reload();
  await page.keyboard.press('n');
  await expect(page.locator('.annotation-card')).toHaveCount(2);
});

for (const width of [1440, 390, 320]) {
  test(`notebook is usable at ${width}px with no overflow or accessibility violations`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/exemplo/apontamentos/');
    await selectText(page, passage);
    await page.getByRole('button', { name: 'Comentar', exact: true }).click();
    await page
      .getByLabel('O teu comentário')
      .fill('Uma nota para rever amanhã.');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      (await new AxeBuilder({ page }).include('#scratchpad').analyze())
        .violations,
    ).toEqual([]);
    await page.getByRole('button', { name: 'Fechar caderno' }).click();
    await expect(page.locator('#scratchpad')).toBeHidden();
  });
}

test('pointer selection and clicking a saved highlight open the same note', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const paragraph = page.locator('.prose p').first();
  await paragraph.scrollIntoViewIfNeeded();
  const rect = await paragraph.evaluate((el) => {
    const range = new Range();
    range.selectNodeContents(el.firstChild!);
    const rect = range.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });
  await page.mouse.move(rect.x + 1, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width - 2, rect.y + rect.height / 2, {
    steps: 10,
  });
  await page.mouse.up();
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await expect.poll(() => highlightedText(page)).toContain('apontamento');
  await page.mouse.click(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await expect(page.getByLabel('O teu comentário')).toBeFocused();
  await page
    .getByRole('button', { name: 'Todas as notas', exact: true })
    .click();
  await expect(page.locator('.annotation-card')).toHaveCount(1);
});

test('touch selection actions stay in the viewport and open a comment', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  const box = await page.locator('#selection-actions').boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y + box!.height).toBeLessThanOrEqual(844);
  await page.getByRole('button', { name: 'Comentar', exact: true }).tap();
  await expect(page.getByLabel('O teu comentário')).toBeFocused();
  await page.getByLabel('O teu comentário').fill('Nota no telemóvel');
  await page.getByRole('button', { name: 'Ver no texto', exact: true }).tap();
  await expect(page.locator('#scratchpad')).toBeHidden();
  await expect.poll(() => highlightedText(page)).toBe(passage);
  await context.close();
});

for (const width of [1440, 390]) {
  test(`rough highlights and margin notes follow the passage at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto('/exemplo/apontamentos/');
    await selectText(page, passage);
    const before = await page.locator('.lesson-body').boundingBox();
    await page.getByRole('button', { name: 'Comentar', exact: true }).click();
    await page
      .getByLabel('O teu comentário')
      .fill('Rever a diferença entre definição e exemplo.');
    expect(await page.locator('.lesson-body').boundingBox()).toEqual(before);
    await expect(page.locator('.annotation-marks svg').first()).toBeVisible();
    const panel = page.locator('#scratchpad');
    const box = (await panel.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    if (width === 1440)
      expect(box.x).toBeGreaterThanOrEqual(before!.x + before!.width);
    await page.keyboard.press('Escape');
    const pin = page.getByRole('button', { name: /^Abrir nota:/ });
    await pin.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('O teu comentário')).toHaveValue(
      'Rever a diferença entre definição e exemplo.',
    );
    await page.keyboard.press('Escape');
    await page.reload();
    await expect(
      page.getByRole('button', { name: /^Abrir nota:/ }),
    ).toBeVisible();
    await expect.poll(() => highlightedText(page)).toBe(passage);
    await page.setViewportSize({
      width: width === 1440 ? 700 : 320,
      height: 900,
    });
    await expect(
      page.getByRole('button', { name: /^Abrir nota:/ }),
    ).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test('margin markers never cover lesson text on narrow screens', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  const pin = page.getByRole('button', { name: /^Abrir nota:/ });
  await expect(pin).toBeVisible();
  const marker = (await pin.boundingBox())!;
  const text = (await page.locator('.lesson-body').boundingBox())!;
  expect(marker.x).toBeGreaterThanOrEqual(text.x + text.width + 4);
  expect(marker.x + marker.width).toBeLessThanOrEqual(390);
  await pin.click();
  await expect(page.getByLabel('O teu comentário')).toBeFocused();
});

test('margin pin keeps keyboard focus through resize and editing', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  const pin = page.getByRole('button', { name: /^Abrir nota:/ });
  await pin.focus();
  await page.setViewportSize({ width: 1000, height: 900 });
  await expect(pin).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('O teu comentário')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(pin).toBeFocused();
});

test('contextual notes fit intermediate desktop widths', async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Comentar', exact: true }).click();
  await page.getByLabel('O teu comentário').fill('Uma nota.');
  const box = (await page.locator('#scratchpad').boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(1000);
});

test('syntax coloured code highlights form a continuous stroke per line', async ({
  page,
}) => {
  await page.goto('/exemplo/formatacao/');
  const code = page.locator('#soma-linguagens-panel-0 pre .line').last();
  await code.scrollIntoViewIfNeeded();
  await code.evaluate((line) => {
    const range = new Range();
    range.selectNodeContents(line);
    getSelection()!.removeAllRanges();
    getSelection()!.addRange(range);
  });
  await expect(
    page.getByRole('group', { name: 'Anotar seleção' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await expect(page.locator('.annotation-stroke')).toHaveCount(1);
});

test('a note opened on mobile follows its passage after widening the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/exemplo/apontamentos/');
  await selectText(page, passage);
  await page.getByRole('button', { name: 'Comentar', exact: true }).click();
  await page.getByLabel('O teu comentário').fill('Nota durante a leitura');
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect
    .poll(async () => {
      const panel = (await page.locator('#scratchpad').boundingBox())!;
      const article = (await page.locator('.lesson-body').boundingBox())!;
      return (
        panel.x >= article.x + article.width &&
        panel.x + panel.width <= 1440 &&
        panel.y >= 0 &&
        panel.y + panel.height <= 900
      );
    })
    .toBe(true);
});
