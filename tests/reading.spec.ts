import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { access } from 'node:fs/promises';

test('relation matrix remains readable and operable at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/cadeiras/md/operacoes-relacoes/');
  const matrix = page.getByRole('table', {
    name: 'Relação em {1, 2, 3}. Cada botão liga ou desliga um par.',
  });
  const region = matrix.locator('..');
  const bounds = await region.boundingBox();
  for (const cell of await matrix.locator('caption, th, button').all()) {
    const box = await cell.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(bounds!.x);
    expect(box!.x + box!.width).toBeLessThanOrEqual(
      bounds!.x + bounds!.width + 1,
    );
  }
  const status = region.getByRole('status');
  await expect(status).toContainText('Transitiva: não, falta (1, 3).');
  await matrix.getByRole('button', { name: 'Par (1, 3)', exact: true }).click();
  await expect(status).toContainText('Transitiva: sim.');
  for (const value of [1, 2, 3]) {
    await matrix
      .getByRole('button', { name: `Par (${value}, ${value})`, exact: true })
      .click();
  }
  await expect(status).toContainText('Reflexiva: sim.');
  await matrix
    .getByRole('button', { name: 'Par (3, 3)', exact: true })
    .press('Space');
  await expect(status).toContainText('Reflexiva: não.');
});

test.describe('course diagrams without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('DFA labels remain legible on a narrow screen', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto('/cadeiras/tc/automatos-finitos/');
    const sizes = await page
      .locator('[data-tc-dfa] svg text')
      .evaluateAll((labels) =>
        labels.map((label) => {
          const matrix = (label as SVGTextElement).getScreenCTM()!;
          return (
            Number.parseFloat(getComputedStyle(label).fontSize) *
            Math.hypot(matrix.a, matrix.b)
          );
        }),
      );
    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) expect(size).toBeGreaterThanOrEqual(12);
  });

  test('relational schema labels remain legible on a narrow screen', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto('/cadeiras/lbaw/esquema-relacional/');
    const sizes = await page
      .locator('.lesson-body .diagram-figure svg text')
      .evaluateAll((labels) =>
        labels.map((label) => {
          const matrix = (label as SVGTextElement).getScreenCTM()!;
          return (
            Number.parseFloat(getComputedStyle(label).fontSize) *
            Math.hypot(matrix.a, matrix.b)
          );
        }),
      );
    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) expect(size).toBeGreaterThanOrEqual(12);
  });

  test('matrix demo renders the initial transformed square', async ({
    page,
  }) => {
    await page.goto('/cadeiras/alga/matrizes/');
    const demo = page.locator('[data-matrix-transform]');
    await expect(demo.locator('[data-result]')).toContainText('det(A) = 6');
    await expect(demo.locator('[data-columns]')).toContainText('A e1 = (2, 0)');
    await expect(demo.locator('[data-columns]')).toContainText('A e2 = (1, 3)');
    const corners = await demo.locator('[data-image]').evaluate((polygon) =>
      (polygon.getAttribute('points') || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((point) => point.split(',').map(Number)),
    );
    expect(corners).toEqual([
      [0, 0],
      [2, 0],
      [3, -3],
      [1, -3],
    ]);
  });

  test('ramp begins with the chosen forces and a vertical weight', async ({
    page,
  }) => {
    await page.goto('/cadeiras/f1/leis-newton/');
    const demo = page.locator('[data-f1-ramp]');
    await expect(demo.locator('output')).toContainText('16,99');
    await expect(demo.locator('output')).toContainText('6,8');
    await expect(demo.locator('output')).toContainText('1,51');
    const geometry = await demo.evaluate((element) => {
      const slope = element.querySelector('[data-slope]') as SVGGElement;
      const weight = element.querySelector('[data-weight]') as SVGGElement;
      const block = element.querySelector('.block') as SVGRectElement;
      const slopeMatrix = slope.getCTM()!;
      const weightMatrix = weight.getCTM()!;
      const box = block.getBBox();
      const center = new DOMPoint(
        box.x + box.width / 2,
        box.y + box.height / 2,
      ).matrixTransform(block.getCTM()!);
      const origin = new DOMPoint(0, 0).matrixTransform(weightMatrix);
      return {
        incline: slopeMatrix.b / slopeMatrix.a,
        weightTilt: weightMatrix.b,
        deltaX: origin.x - center.x,
        deltaY: origin.y - center.y,
      };
    });
    expect(geometry.incline).toBeCloseTo(-Math.sqrt(3) / 3, 5);
    expect(geometry.weightTilt).toBeCloseTo(0, 5);
    expect(geometry.deltaX).toBeCloseTo(0, 3);
    expect(geometry.deltaY).toBeCloseTo(0, 3);
  });

  test('damped oscillator begins with its physical curve and readout', async ({
    page,
  }) => {
    await page.goto('/cadeiras/f1/oscilacoes/');
    const demo = page.locator('[data-f1-oscillator]');
    await expect(demo.locator('output')).toContainText('0,32');
    await expect(demo.locator('output')).toContainText('0,4');
    const endpoints = await demo.evaluate((element) => {
      const curve = element.querySelector('[data-curve]') as SVGPathElement;
      const axis = element.querySelector('.axis') as SVGPathElement;
      const bounds = axis.getBBox();
      const zeroY = axis.getPointAtLength(axis.getTotalLength()).y;
      const start = curve.getPointAtLength(0);
      const end = curve.getPointAtLength(curve.getTotalLength());
      return {
        length: curve.getTotalLength(),
        width: bounds.width,
        startX: (start.x - bounds.x) / bounds.width,
        endX: (end.x - bounds.x) / bounds.width,
        finalDisplacementRatio: (zeroY - end.y) / (zeroY - start.y),
      };
    });
    expect(endpoints.length).toBeGreaterThan(endpoints.width);
    expect(endpoints.startX).toBeCloseTo(0, 5);
    expect(endpoints.endX).toBeCloseTo(1, 5);
    expect(endpoints.finalDisplacementRatio).toBeCloseTo(0.079116023619, 5);
  });

  for (const sample of [
    {
      route: '/cadeiras/f2/circuitos-reativos/',
      curve: '[data-f2-rc] [data-curve]',
      x: 112,
      y: 45.3002924855,
    },
    {
      route: '/cadeiras/f2/fourier/',
      curve: '[data-f2-fourier] [data-wave]',
      x: 123.75,
      y: 43.791543674,
    },
    {
      route: '/cadeiras/f2/frequencia-amostragem/',
      curve: '[data-f2-sampling] [data-original]',
      x: 54.5,
      y: 151.14496766,
    },
    {
      route: '/cadeiras/f2/frequencia-amostragem/',
      curve: '[data-f2-sampling] [data-alias]',
      x: 54.5,
      y: 68.85503234,
    },
  ]) {
    test(`initial physics curve matches the chosen values: ${sample.curve}`, async ({
      page,
    }) => {
      await page.goto(sample.route);
      const curve = page.locator(sample.curve);
      await expect(curve).not.toHaveAttribute('d', '');
      const point = await curve.evaluate((element, targetX) => {
        const path = element as SVGPathElement;
        let low = 0;
        let high = path.getTotalLength();
        for (let step = 0; step < 40; step++) {
          const middle = (low + high) / 2;
          if (path.getPointAtLength(middle).x < targetX) low = middle;
          else high = middle;
        }
        const value = path.getPointAtLength((low + high) / 2);
        return [value.x, value.y];
      }, sample.x);
      expect(point[0]).toBeCloseTo(sample.x, 2);
      expect(Math.abs(point[1] - sample.y)).toBeLessThan(0.08);
    });
  }

  test('sampling starts with eleven coincident original and alias samples', async ({
    page,
  }) => {
    await page.goto('/cadeiras/f2/frequencia-amostragem/');
    const samples = page.locator('[data-f2-sampling] [data-samples] circle');
    await expect(samples).toHaveCount(11);
    const points = await samples.evaluateAll((elements) =>
      elements.map((element) => [
        Number(element.getAttribute('cx')),
        Number(element.getAttribute('cy')),
      ]),
    );
    for (let n = 0; n <= 10; n++) {
      expect(points[n][0]).toBeCloseTo(35 + 39 * n, 3);
      expect(points[n][1]).toBeCloseTo(
        110 - 70 * Math.cos((2 * Math.PI * 3 * n) / 10),
        3,
      );
    }
  });
});

test('neutral diagram labels follow the effective text color', async ({
  page,
}) => {
  await page.goto('/cadeiras/fsi/sistemas-seguros/');
  const diagram = page.locator('.lesson-body .diagram-figure').first();
  await page.addStyleTag({
    content:
      '.diagram-figure { --text: #222; color: #fafafa !important; background: #141414 !important; }',
  });
  await expect(diagram.locator('svg text').first()).toHaveCSS(
    'fill',
    'rgb(250, 250, 250)',
  );
});

test('AI menu stays next to its trigger and ChatGPT enables web search', async ({
  page,
}) => {
  await page.goto('/exemplo/diagramas/');
  const trigger = page.getByRole('button', { name: 'Perguntar ao Chat' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const button = (await trigger.boundingBox())!;
  const menu = (await page.locator('#ai-menu').boundingBox())!;
  expect(Math.abs(menu.x - button.x)).toBeLessThan(16);
  expect(Math.abs(menu.y - button.y - button.height)).toBeLessThan(16);
  const href = await page
    .locator('[data-provider="chatgpt"]')
    .getAttribute('href');
  expect(new URL(href!).searchParams.get('hints')).toBe('search');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#ai-menu')).toBeHidden();
});

test('course navigation comes from content and keeps drafts private', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.locator('#cadeira-fp').click();
  await expect(page).toHaveURL('/cadeiras/fp/');
  const sidebar = page.getByRole('navigation', {
    name: 'Conteúdos da cadeira',
  });
  await sidebar.getByRole('link', { name: 'Primeiro resumo de teste' }).click();
  await expect(
    sidebar.getByRole('link', { name: 'Primeiro resumo de teste' }),
  ).toHaveAttribute('aria-current', 'page');
  await page
    .getByRole('navigation', { name: 'Continuar a leitura' })
    .getByRole('link', { name: /Segundo resumo/ })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Segundo resumo de teste', exact: true }),
  ).toBeVisible();
  await expect(sidebar).not.toContainText('Segredo do rascunho');
  expect((await page.request.get('/cadeiras/fp/rascunho/')).status()).toBe(404);
  expect((await page.request.get('/cadeiras/fp/rascunho.md')).status()).toBe(
    404,
  );
  const markdown = await page.request.get('/exemplo/diagramas.md');
  expect(markdown.ok()).toBe(true);
  expect(await markdown.text()).toContain('$n^2$');
  expect(await markdown.text()).toContain('/exemplo/diagramas/figura-1.svg');
  await page.getByRole('button', { name: 'Pesquisar', exact: true }).click();
  await page.getByRole('searchbox').fill('"qzxw9182kvjm4"');
  await expect(page.locator('#search-status')).toContainText('Não');
  await expect(page.locator('#search-results a')).toHaveCount(0);
  // Cloudflare Pages needs this artifact to disable its homepage fallback.
  await access('.test-dist/404.html');
  const missingPage = await page.goto('/cadeiras/fp/rascunho/');
  expect(missingPage?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Página não encontrada' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Ver cadeiras', exact: true }).click();
  await expect(page).toHaveURL('/');
});

test('footnotes, containers and details work in Markdown and MDX', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-footnote-ref]').first().click();
  await expect(page).toHaveURL(/#user-content-fn-fonte$/);
  await expect(page.locator('[data-footnotes]')).toContainText(
    'Notas de rodapé',
  );
  await page.locator('[data-footnote-backref]').first().click();
  await expect(page).toHaveURL(/#user-content-fnref-fonte$/);
  await expect(page.locator('.admonition-tip')).toContainText(
    'Uma ideia por parágrafo',
  );
  const details = page.locator('details.admonition-details');
  await expect(details).not.toHaveAttribute('open');
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open');
  await page.goto('/exemplo/formatacao/');
  await expect(page.locator('.admonition-info')).toContainText(
    'Antes de começar',
  );
  await expect(page.locator('.admonition-warning')).toContainText('limites');
  await expect(page.locator('.admonition-danger')).toContainText(
    'Divisão por zero',
  );
});

test('vector arrows render above their letters', async ({ page }) => {
  await page.goto('/cadeiras/f1/trabalho-energia/');
  const placed = await page.evaluate(() => {
    const svgs = [...document.querySelectorAll('.katex .accent-body svg')];
    if (!svgs.length) return false;
    return svgs.every((svg) => {
      const overlay = svg.parentElement;
      // With mismatched KaTeX CSS the overlay flows inline after the
      // letter; positioned correctly it is a block above it.
      if (!overlay || getComputedStyle(overlay).display === 'inline')
        return false;
      const accent = svg.closest('.katex-accent');
      const base = accent?.querySelector('.mord.mathnormal');
      if (!base) return false;
      const arrow = svg.getBoundingClientRect();
      const letter = base.getBoundingClientRect();
      const arrowMiddle = arrow.top + arrow.height / 2;
      const letterMiddle = letter.top + letter.height / 2;
      return arrowMiddle < letterMiddle - 2;
    });
  });
  expect(placed).toBe(true);
});

test('code tabs support keyboard selection and image filters respect theme', async ({
  page,
}) => {
  await page.goto('/exemplo/formatacao/');
  const python = page.getByRole('tab', { name: 'Python' });
  await python.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'C++' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('std::cout');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tabpanel')).toContainText('print(');
  const filtered = page.locator('img[data-dark-image="dim"]');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(filtered).toHaveCSS('filter', 'brightness(0.75)');
  await expect(page.locator('img[data-dark-image="invert"]')).toHaveCSS(
    'filter',
    'invert(1) hue-rotate(180deg)',
  );
  await expect(page.locator('img[data-dark-image="original"]')).toHaveCSS(
    'filter',
    'none',
  );
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(filtered).toHaveCSS('filter', 'none');
});

test('reading fonts load locally and survive navigation', async ({ page }) => {
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Personalizar aparência' }).click();
  const fonts = page.getByRole('group', {
    name: 'Fonte de leitura',
    exact: true,
  });
  const families = [
    ['sans', 'Manrope Variable'],
    ['inter', 'Inter Variable'],
    ['atkinson', 'Atkinson Hyperlegible'],
    ['lexend', 'Lexend Variable'],
    ['serif', 'Source Serif 4 Variable'],
    ['lora', 'Lora Variable'],
    ['literata', 'Literata Variable'],
    ['mono', 'IBM Plex Mono'],
  ];
  for (const [id, family] of families) {
    await fonts.locator(`input[value="${id}"]`).check();
    await expect(page.locator('.lesson-body .prose')).toHaveCSS(
      'font-family',
      new RegExp(family),
    );
    expect(
      await page.evaluate(
        async (family) =>
          (await document.fonts.load(`16px "${family}"`)).length > 0,
        family,
      ),
    ).toBe(true);
  }
  await page.goto('/exemplo/diagramas/');
  await expect(page.locator('html')).toHaveAttribute('data-font', 'mono');
  await expect(page.locator('.lesson-body .prose')).toHaveCSS(
    'font-family',
    /IBM Plex Mono/,
  );
});

test('YouTube shows its thumbnail before loading the player', async ({
  page,
}) => {
  await page.route('https://i.ytimg.com/**', (route) =>
    route.fulfill({
      path: 'public/examples/pontos.svg',
      contentType: 'image/svg+xml',
    }),
  );
  await page.goto('/exemplo/diagramas/');
  const image = page.locator('.video-thumbnail');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute(
    'src',
    'https://i.ytimg.com/vi/fNk_zzaMoSs/hqdefault.jpg',
  );
  await expect
    .poll(() =>
      image.evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 100,
      ),
    )
    .toBe(true);
  await expect(page.locator('iframe')).toHaveCount(0);
});

for (const width of [390, 320]) {
  test(`mobile course navigation and AI menu at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/exemplo/');
    if (await page.locator('.course-sidebar > summary').isVisible())
      await page.locator('.course-sidebar > summary').click();
    await page
      .getByRole('navigation', { name: 'Conteúdos da cadeira' })
      .getByRole('link', { name: 'Caixas e imagens', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Caixas e imagens', exact: true }),
    ).toBeVisible();
    const trigger = page.getByRole('button', { name: 'Perguntar ao Chat' });
    await trigger.click();
    await expect(page.locator('#ai-menu')).toBeVisible();
    const menu = (await page.locator('#ai-menu').boundingBox())!;
    expect(menu.x).toBeGreaterThanOrEqual(0);
    expect(menu.x + menu.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('Escape');
    await expect(page.locator('#ai-menu')).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test('mobile reading keeps navigation in a landmark and tables keyboard accessible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cadeiras/rc/folha-consulta/');
  const accessibility = await new AxeBuilder({ page })
    .withRules(['region', 'scrollable-region-focusable'])
    .analyze();
  expect(
    accessibility.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map(({ target }) => target),
    })),
  ).toEqual([]);
  const table = page.locator('.prose table').first();
  await table.scrollIntoViewIfNeeded();
  expect(
    await table.evaluate((node) => node.scrollWidth > node.clientWidth),
  ).toBe(true);
  await table.focus();
  await page.keyboard.press('ArrowRight');
  await expect
    .poll(() => table.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(0);
});
