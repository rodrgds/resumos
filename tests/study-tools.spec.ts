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

test('AI menu offers working destinations and a copy fallback', async ({
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
  ).toHaveAttribute('href', 'https://chatgpt.com/');
  await expect(page.getByRole('link', { name: /Gemini/ })).toHaveAttribute(
    'href',
    'https://gemini.google.com/app',
  );
  await page.getByRole('button', { name: 'Copiar pergunta' }).click();
  await expect(
    page.getByRole('textbox', { name: 'Pergunta para a IA' }),
  ).toBeFocused();
  await expect(page.locator('#ai-prompt')).toHaveValue(/Fletcher/);
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
        await page.screenshot({
          path: `.impeccable/review/${width}-${theme}-${path.replaceAll('/', '-')}.png`,
          fullPage: true,
        });
      }
    }
  });
}
