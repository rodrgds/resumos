import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('notes stay local across navigation and typing does not trigger shortcuts', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('n');
  const notes = page.getByRole('textbox', { name: 'As tuas notas' });
  await expect(notes).toBeFocused();
  await notes.fill('As minhas notas privadas: / n a ?');
  await page.keyboard.type('/n?a');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await page.goto('/exemplo/apontamentos/');
  await page.keyboard.press('n');
  await expect(notes).toHaveValue('As minhas notas privadas: / n a ?/n?a');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descarregar notas' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('notas-resumos.txt');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Perguntar à IA' }).click();
  await expect(page.locator('#ai-prompt')).not.toHaveValue(
    /minhas notas privadas/,
  );
});

test('shortcuts can be remapped, reject conflicts and survive reload', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('?');
  await page
    .getByRole('button', { name: 'Mudar atalho: Bloco de notas' })
    .click();
  await page.keyboard.press('/');
  await expect(page.locator('#shortcut-status')).toHaveText(
    'Essa tecla já está em uso.',
  );
  await page.keyboard.press('b');
  await expect(page.locator('#shortcut-status')).toHaveText('Atalho guardado.');
  await page.keyboard.press('Escape');
  await page.reload();
  await page.keyboard.press('n');
  await expect(page.locator('#scratchpad')).toBeHidden();
  await page.keyboard.press('b');
  await expect(page.locator('#scratchpad')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.keyboard.press('?');
  await page.getByLabel('Navegar nos cartões').check();
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('link', { name: 'Resumos LEIC FEUP, início' }),
  ).toBeFocused();
  await page.keyboard.press('j');
  await expect(page.locator('[data-course]').first()).toBeFocused();
  await page.keyboard.press('l');
  await expect(page.locator('[data-course]').nth(1)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#course-detail')).toBeVisible();
});

test('AI links ask providers to read the page URL and offer a copy fallback', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
    }),
  );
  await page.goto('/exemplo/diagramas/');
  await page.getByRole('button', { name: 'Perguntar à IA' }).click();
  await expect(page.locator('#ai-menu')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'ChatGPT', exact: true }),
  ).toHaveAttribute('href', /^https:\/\/chatgpt.com\/\?prompt=/);
  for (const [provider, parameter] of [
    ['chatgpt', 'prompt'],
    ['claude', 'q'],
    ['perplexity', 'q'],
  ]) {
    const link = page.locator(`[data-provider="${provider}"]`);
    const url = new URL((await link.getAttribute('href'))!);
    expect(url.searchParams.get(parameter)).toBe(
      'Lê esta página: https://resumos-feup.pages.dev/exemplo/diagramas/. Quero fazer perguntas sobre ela. Responde em português de Portugal. Se não conseguires ler a página, diz-me.',
    );
    await expect(link.locator('.provider-icon')).toBeVisible();
  }
  await expect(
    page.locator('[data-provider="gemini"] .provider-icon'),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Gemini/ })).toHaveAttribute(
    'href',
    'https://gemini.google.com/app',
  );
  await page.getByRole('button', { name: 'Copiar pergunta' }).click();
  await expect(
    page.getByRole('textbox', { name: 'Pergunta para a IA' }),
  ).toBeFocused();
  await expect(page.locator('#ai-prompt')).toHaveValue(
    /https:\/\/resumos-feup.pages.dev\/exemplo\/diagramas\//,
  );
  await expect(page.locator('#ai-prompt')).not.toHaveValue(/Fletcher/);
  await expect(page.locator('#ai-status')).toContainText(
    'Copia a pergunta abaixo',
  );
});

test('mock course renders diagrams and only loads YouTube on request', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: 'cadeira de exemplo', exact: true })
    .click();
  await expect(
    page.getByText(/Esta cadeira não faz parte do plano da FEUP/),
  ).toBeVisible();
  await page.locator('.lesson-link').nth(1).click();
  await expect(page.locator('.typst-figure svg')).toHaveCount(2);
  await expect(page.locator('.diagram-figure svg')).toHaveCount(1);
  await expect(page.locator('.typst-content math')).toHaveCount(2);
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.route('https://www.youtube-nocookie.com/**', (route) =>
    route.fulfill({ body: '<html><title>Video</title></html>' }),
  );
  await page.getByRole('button', { name: /Carregar vídeo/ }).click();
  await expect(page.locator('iframe')).toHaveAttribute(
    'src',
    /youtube-nocookie.com\/embed\/fNk_zzaMoSs/,
  );
});

for (const width of [1440, 390, 320]) {
  test(`${width}px: groups and example content remain readable`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      for (const path of [
        '/nucleos/',
        '/mieic/',
        '/exemplo/apontamentos/',
        '/exemplo/diagramas/',
      ]) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(
          result.violations.map((item) => ({
            id: item.id,
            nodes: item.nodes.map((node) => node.target),
          })),
        ).toEqual([]);
        await page.locator('footer').scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            page
              .locator('img:visible')
              .evaluateAll((images) =>
                images.every(
                  (image) =>
                    image instanceof HTMLImageElement &&
                    image.complete &&
                    image.naturalWidth > 0,
                ),
              ),
          )
          .toBe(true);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `.impeccable/review/${width}-${theme}-${path.replaceAll('/', '-')}.png`,
          fullPage: true,
        });
      }
    }
  });
}

test('homepage stays simple and the nuclei include NIAEFEUP with white logo backgrounds and blue ACM and IEEE cards', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.page-actions')).toHaveCount(0);
  await page.goto('/nucleos/');
  await expect(page.locator('.group-card')).toHaveCount(5);
  await expect(
    page.locator('.group-card').filter({
      has: page.getByRole('heading', { name: 'NIAEFEUP', exact: true }),
    }),
  ).toHaveAttribute('href', 'https://niaefeup.pt/');
  for (const [name, color] of [
    ['ACM FEUP', 'rgb(22, 77, 123)'],
    ['IEEE FEUP', 'rgb(0, 98, 155)'],
  ]) {
    const card = page
      .locator('.group-card')
      .filter({ has: page.getByRole('heading', { name, exact: true }) });
    await expect(card).toHaveCSS('background-color', color);
    await expect(card.locator('.group-logo')).toHaveCSS(
      'background-color',
      'rgb(255, 255, 255)',
    );
    await expect(card).toHaveCSS('color', 'rgb(255, 255, 255)');
  }
  expect(
    await page
      .locator('.group-logo img')
      .evaluateAll((images) =>
        images.every(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBe(true);
});

test('useful links and the complete archived MIEIC plan are reachable', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: /TTS · Horários/ }),
  ).toHaveAttribute('href', 'https://tts.niaefeup.pt/planner');
  await expect(
    page.getByRole('link', { name: /Uni · U.Porto/ }),
  ).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=pt.up.fe.ni.uni',
  );
  await expect(
    page.getByRole('link', { name: /Resumos SofiaViP/ }),
  ).toHaveAttribute(
    'href',
    'https://drive.google.com/drive/folders/1PZYhtsUc6mDA96jnVR4wiLWWxNWeovdK',
  );
  await page.getByRole('link', { name: 'MIEIC Arquivo' }).click();
  await expect(
    page.getByRole('heading', { name: 'MIEIC', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.year-section')).toHaveCount(5);
  await expect(page.locator('[data-course]')).toHaveCount(82);
  await expect(
    page.locator('[data-course-year="4"] [data-course]'),
  ).toHaveCount(28);
  await expect(
    page.locator('[data-course-year="5"] [data-course]'),
  ).toHaveCount(23);
  await page.locator('[data-acronym="SESI"]').click();
  await expect(
    page.getByRole('heading', {
      name: 'Seminário de Engenharia de Software e Sistemas de Informação',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('#course-description')).toHaveText(
    'Tens apontamentos desta cadeira? Podes ajudar a começar.',
  );
  await page.keyboard.press('Escape');
  await page.keyboard.press('Control+k');
  await page.getByRole('searchbox').fill('Microprocessadores');
  await page.locator('#search-results a').first().click();
  await expect(page).toHaveURL(/\/mieic\/#resumo-mieic-mpcp-1/);
  await expect(page.locator('[data-acronym="MPCP"]')).toBeFocused();
});
