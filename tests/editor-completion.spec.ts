import { expect, test } from '@playwright/test';

for (const { palette, appearance, width } of [
  { palette: 'feup', appearance: 'dark', width: 1280 },
  { palette: 'gruvbox', appearance: 'light', width: 320 },
] as const) {
  test(`completion remains readable and accepts Python suggestions in ${palette} ${appearance}`, async ({
    page,
  }) => {
    await page.addInitScript((palette) => {
      localStorage.setItem('resumos-preferences', JSON.stringify({ palette }));
    }, palette);
    await page.emulateMedia({ colorScheme: appearance });
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/exemplo/codigo/');
    const playground = page.getByRole('region', {
      name: 'Experimentar Python',
      exact: true,
    });
    await playground.scrollIntoViewIfNeeded();
    const editor = playground.getByRole('textbox', {
      name: 'Código python',
      exact: true,
    });
    await editor.fill('def exemplo(valor):\n    pri');
    await page.keyboard.press('Control+Space');
    const suggestions = playground.getByRole('listbox');
    const selected = suggestions.getByRole('option', { selected: true });
    await expect(selected).toHaveText('print');
    const colors = await suggestions.evaluate((list) => {
      const popup = list.closest('.cm-tooltip')!;
      const editor = list.closest('.cm-editor')!;
      const selected = list.querySelector('[aria-selected="true"]')!;
      const background = getComputedStyle(popup).backgroundColor;
      const luminance = (color: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].map(
          (channel) => {
            const normalized = channel / 255;
            return normalized <= 0.04045
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          },
        );
        return r * 0.2126 + g * 0.7152 + b * 0.0722;
      };
      const contrast = (foreground: string, background: string) => {
        const fg = luminance(foreground);
        const bg = luminance(background);
        return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      };
      return {
        background,
        editorBackground: getComputedStyle(editor).backgroundColor,
        selectedBackground: getComputedStyle(selected).backgroundColor,
        contrast: contrast(getComputedStyle(list).color, background),
        selectedContrast: contrast(
          getComputedStyle(selected).color,
          getComputedStyle(selected).backgroundColor,
        ),
      };
    });
    expect(colors.background).toBe(colors.editorBackground);
    expect(colors.selectedBackground).not.toBe(colors.background);
    expect(colors.contrast).toBeGreaterThanOrEqual(4.5);
    expect(colors.selectedContrast).toBeGreaterThanOrEqual(4.5);
    // Respect CodeMirror's brief guard against keys typed as suggestions appear.
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await expect(selected).not.toHaveText('print');
    await page.keyboard.press('ArrowUp');
    await expect(selected).toHaveText('print');
    await page.keyboard.press('Enter');
    await expect(editor).toHaveText('def exemplo(valor):    print');
    await expect(suggestions).toBeHidden();
    await playground
      .getByRole('button', { name: 'Expandir editor', exact: true })
      .click();
    await editor.fill('quantidade = 3\nquan');
    await page.keyboard.press('Control+Space');
    await expect(selected).toHaveText('quantidade');
    const bounds = await suggestions.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    await selected.click();
    await expect(editor).toHaveText('quantidade = 3quantidade');
  });
}

test('Python completes simple keywords without suggesting code inside strings or comments', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const playground = page.getByRole('region', {
    name: 'Experimentar Python',
    exact: true,
  });
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  for (const [prefix, word] of [
    ['ret', 'return'],
    ['impor', 'import'],
    ['pas', 'pass'],
  ]) {
    await editor.fill(prefix);
    await page.keyboard.press('Control+Space');
    const option = playground.getByRole('option', {
      name: new RegExp(`^${word}(?:$|statement)`),
    });
    await expect(option).toBeVisible();
    await option.click();
    await expect(editor).toContainText(word);
  }
  for (const text of ['# ret', '"ret']) {
    await editor.fill(text);
    await page.keyboard.press('Control+Space');
    await expect(playground.getByRole('listbox')).toBeHidden();
  }
});
