import { expect, test } from '@playwright/test';

test('native copy keeps formulas once, in order, within selected text and the whole page', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/cadeiras/alga/ortogonalidade/tldr/');
  await page
    .locator('.lesson-body li')
    .first()
    .evaluate((item) => {
      const range = new Range();
      range.selectNodeContents(item);
      getSelection()!.removeAllRanges();
      getSelection()!.addRange(range);
    });
  await page.keyboard.press('ControlOrMeta+c');
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(
      'Uma família é ortogonal se $u_i\\cdot u_j=0$ para $i\\ne j$. Se todos os vetores forem não nulos, é independente.',
    );
  const richCopy = await page.evaluate(async () => {
    const [item] = await navigator.clipboard.read();
    const html = await (await item.getType('text/html')).text();
    const document = new DOMParser().parseFromString(html, 'text/html');
    return {
      text: document.body.textContent,
      bold: document.querySelector('strong')?.textContent,
    };
  });
  expect(richCopy.bold).toBe('ortogonal');
  expect(richCopy.text).toContain('$u_i\\cdot u_j=0$ para $i\\ne j$');
  await page
    .locator('.lesson-body li')
    .first()
    .evaluate((item) => {
      const range = new Range();
      range.setStart(item.firstChild!, 4);
      range.setEnd(item.querySelectorAll('.katex')[1], 1);
      getSelection()!.removeAllRanges();
      getSelection()!.addRange(range);
    });
  await page.keyboard.press('ControlOrMeta+c');
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('família é ortogonal se $u_i\\cdot u_j=0$ para $i\\ne j$');
  await page.keyboard.press('ControlOrMeta+a');
  await page.keyboard.press('ControlOrMeta+c');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).not.toContain('A cópia automática não está disponível.');
  expect(copied.match(/\$u_i\\cdot u_j=0\$/g)).toHaveLength(1);
  expect(copied).toContain(
    '$$\nu_1=v_1,\\qquad\nu_j=v_j-\\sum_{i=1}^{j-1}\\frac{v_j\\cdot u_i}{u_i\\cdot u_i}u_i.\n$$',
  );
  expect(copied.indexOf('Para uma família independente')).toBeLessThan(
    copied.indexOf('$$\nu_1='),
  );
  expect(copied.indexOf('$$\nu_1=')).toBeLessThan(
    copied.indexOf('Retira as projeções'),
  );
});

for (const javaScriptEnabled of [false, true]) {
  test(`standalone lesson formulas stay centered with JavaScript ${javaScriptEnabled ? 'enabled' : 'disabled'}`, async ({
    browser,
  }) => {
    for (const width of [1280, 320]) {
      const context = await browser.newContext({
        baseURL: test.info().project.use.baseURL,
        javaScriptEnabled,
        viewport: { width, height: 844 },
        hasTouch: width === 320,
      });
      const page = await context.newPage();
      await page.goto('/cadeiras/rc/desempenho-e-filas/');
      await page.evaluate(() => document.fonts.ready);
      const formula = page.locator('.katex').filter({
        has: page.locator('annotation', { hasText: /^N=\\lambda T\.$/ }),
      });
      await expect(formula).toHaveCount(1);
      const block = page.locator('.katex-display').filter({ has: formula });
      await expect(block).toHaveCount(1);
      const outer = (await block.boundingBox())!;
      const inner = (await formula.locator('.katex-html').boundingBox())!;
      expect(
        Math.abs(inner.x + inner.width / 2 - outer.x - outer.width / 2),
      ).toBeLessThan(2);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await context.close();
    }
  });
}

test('diagrams are centered and use the reading theme', async ({ page }) => {
  await page.goto('/exemplo/diagramas/');
  const figure = page.locator('.typst-figure').first();
  const svg = figure.locator('svg').first();
  const outer = (await figure.boundingBox())!;
  const inner = (await svg.boundingBox())!;
  expect(
    Math.abs(inner.x + inner.width / 2 - outer.x - outer.width / 2),
  ).toBeLessThan(2);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(figure).not.toHaveCSS('background-color', 'rgb(255, 255, 255)');
});

test('a formula can be highlighted and restored without duplicate math text', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const formula = page.locator('.katex').first();
  await formula.locator('.katex-html').click();
  expect(await page.evaluate(() => getSelection()!.isCollapsed)).toBe(true);
  await expect(
    page.getByRole('group', { name: 'Anotar seleção' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await page.reload();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.querySelectorAll('[data-math-highlight]').length,
      ),
    )
    .toBe(1);
  await page.keyboard.press('n');
  await expect(page.locator('.annotation-card')).toHaveCount(1);
  await expect(
    page.locator('.annotation-card').getByText('$n$', { exact: true }),
  ).toBeVisible();
});

for (const javaScriptEnabled of [false, true]) {
  test(`long display formulas wrap with JavaScript ${javaScriptEnabled ? 'enabled' : 'disabled'}`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      baseURL: test.info().project.use.baseURL,
      javaScriptEnabled,
    });
    const page = await context.newPage();
    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/cadeiras/me/distribuicoes/tldr/');
      await page.evaluate(() => document.fonts.ready);
      for (const size of [18, 28]) {
        await page.evaluate(
          (size) =>
            document.documentElement.style.setProperty(
              '--reading-size',
              `${size}px`,
            ),
          size,
        );
        const overflow = await page
          .locator('.katex-display')
          .evaluateAll(
            (blocks) =>
              blocks.filter(
                (block) => block.scrollWidth > block.clientWidth + 1,
              ).length,
          );
        expect(overflow).toBe(0);
      }
    }
    await context.close();
  });
}

test('selections across formulas paint the whole object and keep annotation anchors', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  const formula = page.locator('.lesson-body .katex').first();
  await formula.evaluate((math) => {
    const paragraph = math.closest('p')!;
    const range = new Range();
    range.selectNodeContents(paragraph);
    getSelection()!.removeAllRanges();
    getSelection()!.addRange(range);
  });
  await expect(formula).toHaveAttribute('data-formula-selected', '');
  await expect(formula).toHaveCSS('user-select', 'none');
  await expect(formula.locator('.katex-html')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  );
  await page.getByRole('button', { name: 'Comentar', exact: true }).click();
  await page
    .getByRole('textbox', { name: 'O teu comentário' })
    .fill('Fórmula no contexto.');
  await page.reload();
  await expect(formula).toHaveAttribute('data-math-highlight', 'saved');
  await page.keyboard.press('ControlOrMeta+a');
  await expect
    .poll(() =>
      page.locator('.lesson-body .katex:not([data-formula-selected])').count(),
    )
    .toBe(0);
  await page.evaluate(() => getSelection()!.removeAllRanges());
  await expect(page.locator('[data-formula-selected]')).toHaveCount(0);
});

test('a display formula selects its padded block and offers Copy for clicks and native selections', async ({
  browser,
}) => {
  const page = await browser.newPage({
    baseURL: test.info().project.use.baseURL,
    viewport: { width: 390, height: 844 },
    hasTouch: true,
  });
  await page.goto('/cadeiras/alga/ortogonalidade/tldr/');
  const block = page
    .locator('.katex-display')
    .filter({ has: page.locator('annotation', { hasText: /^u_1=/ }) });
  await block.tap({ position: { x: 5, y: 5 } });
  const copy = page.getByRole('button', {
    name: 'Copiar fórmula',
    exact: true,
  });
  await expect(copy).toBeVisible();
  await expect(block).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(block.locator('.katex')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  );
  expect(await page.evaluate(() => getSelection()!.isCollapsed)).toBe(true);
  await page.getByRole('button', { name: 'Destacar', exact: true }).click();
  await page.reload();
  await expect(block).toHaveAttribute('data-math-highlight', 'saved');
  await block.evaluate((element) => {
    element.scrollIntoView({ block: 'center' });
    const range = new Range();
    range.selectNodeContents(element.querySelector('.katex')!);
    getSelection()!.removeAllRanges();
    getSelection()!.addRange(range);
  });
  await expect(copy).toBeVisible();
  await expect(block).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await page.close();
});
