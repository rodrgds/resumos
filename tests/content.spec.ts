import { expect, test } from '@playwright/test';

test.describe('static Mermaid diagrams', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });

  test('course flowchart nodes use solid themed borders without a glow', async ({
    page,
  }) => {
    await page.goto('/cadeiras/rc/acesso-ao-meio/');
    const diagram = page.getByRole('img', { name: /^A e B sorteiam 2 e 5\./ });
    await diagram.evaluate((element: HTMLElement) => {
      element.style.setProperty('--surface', 'rgb(28, 28, 30)');
      element.style.setProperty('--accent', 'rgb(172, 184, 93)');
      element.style.color = 'rgb(216, 216, 210)';
    });
    const box = diagram.locator('svg rect[width][height][stroke]').first();
    await expect(box).toHaveCSS('stroke', 'rgb(172, 184, 93)');
    await expect(box).toHaveCSS('fill', 'rgb(28, 28, 30)');
    await expect(box).toHaveCSS('filter', 'none');
    await expect(diagram.locator('svg text').first()).toHaveCSS(
      'fill',
      'rgb(216, 216, 210)',
    );
  });

  test('render without scripts, preserve local arrows and support keyboard scrolling', async ({
    page,
  }) => {
    const externalRequests: string[] = [];
    page.on('request', (request) => {
      if (new URL(request.url()).origin !== 'http://127.0.0.1:4322')
        externalRequests.push(request.url());
    });
    await page.goto('/_content-test');
    const flow = page.getByRole('img', {
      name: 'Uma entrada válida é guardada; uma entrada inválida é corrigida.',
    });
    const sequence = page.getByRole('img', {
      name: 'O navegador pede uma página e o servidor responde com HTML.',
    });
    await expect(flow).toBeVisible();
    await expect(sequence).toBeVisible();
    expect((await flow.locator('svg text').allTextContents()).sort()).toEqual(
      ['Sim', 'Não', 'Entrada', 'Válida?', 'Guardar', 'Corrigir'].sort(),
    );
    await expect(
      sequence.getByText('Antes do primeiro pedido', { exact: true }),
    ).toBeVisible();
    const note = await sequence
      .getByText('Antes do primeiro pedido', { exact: true })
      .boundingBox();
    const request = await sequence
      .getByText('Pedido HTTP', { exact: true })
      .boundingBox();
    const response = await sequence
      .getByText('Resposta HTML', { exact: true })
      .boundingBox();
    expect(note!.y).toBeLessThan(request!.y);
    expect(request!.y).toBeLessThan(response!.y);
    const arrows = await page
      .locator('.mermaid-figure svg')
      .evaluateAll((svgs) =>
        svgs.flatMap((svg) =>
          [...svg.querySelectorAll('[marker-end], [marker-start]')].map(
            (arrow) => {
              const ref =
                arrow.getAttribute('marker-end') ||
                arrow.getAttribute('marker-start')!;
              const id = ref.slice(ref.indexOf('#') + 1, ref.lastIndexOf(')'));
              const matches = [...document.querySelectorAll('[id]')].filter(
                (node) => node.id === id,
              );
              return matches.length === 1 && svg.contains(matches[0]);
            },
          ),
        ),
      );
    expect(arrows.length).toBeGreaterThan(0);
    expect(arrows.every(Boolean)).toBe(true);
    expect(externalRequests).toEqual([]);
    await sequence.focus();
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(() => sequence.evaluate((node) => node.scrollLeft))
      .toBeGreaterThan(0);
    await page.emulateMedia({ media: 'print' });
    expect(
      await sequence.evaluate((node) => node.scrollWidth <= node.clientWidth),
    ).toBe(true);
  });
});

test('literal colons survive Markdown and MDX rendering', async ({ page }) => {
  await page.goto('/_content-test');
  await expect(
    page.getByText(
      'Formato de hora: HH:MM. Bits: imm[11:5]. Nome XML: ns:livro. Rótulo literal: :estado[pronto]{id="x"}.',
      { exact: true },
    ),
  ).toHaveCount(2);
});

test('Markdown and MDX render LaTeX alongside semantic Typst and SVG', async ({
  page,
}) => {
  await page.goto('/_content-test');
  await expect(
    page.getByRole('heading', { name: 'Exemplo Markdown' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Exemplo MDX' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Exemplo Typst' }),
  ).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveText([
    'Primeiro ponto',
    'Segundo ponto',
  ]);
  await expect(page.locator('.katex')).toHaveCount(9);
  const blocks = page.locator('.katex-display');
  await expect(blocks).toHaveCount(4);
  await page.evaluate(() => document.fonts.ready);
  for (const block of await blocks.all()) {
    const outer = (await block.boundingBox())!;
    const inner = (await block.locator('.katex-html').boundingBox())!;
    expect(
      Math.abs(inner.x + inner.width / 2 - outer.x - outer.width / 2),
    ).toBeLessThan(2);
  }
  await expect(page.locator('p .katex-display')).toHaveCount(0);
  await expect(page.locator('.typst-content math')).toHaveCount(1);
  await expect(
    page.getByRole('img', { name: 'Uma entrada transforma-se numa saída.' }),
  ).toBeVisible();
  await expect(page.locator('.typst-figure svg')).toHaveCount(1);
});
