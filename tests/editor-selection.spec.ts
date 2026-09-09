import { expect, test } from '@playwright/test';

for (const palette of ['feup', 'gruvbox', 'catppuccin', 'nord', 'dracula']) {
  for (const appearance of ['light', 'dark'] as const) {
    test(`selected code stays readable on every line in ${palette} ${appearance}`, async ({
      page,
    }) => {
      await page.addInitScript((palette) => {
        localStorage.setItem(
          'resumos-preferences',
          JSON.stringify({ palette }),
        );
      }, palette);
      await page.emulateMedia({ colorScheme: appearance });
      await page.goto('/exemplo/codigo/');
      const editor = page.getByRole('textbox', {
        name: 'Código python',
        exact: true,
      });
      await editor.scrollIntoViewIfNeeded();
      await editor.click();
      await page.keyboard.press('ControlOrMeta+a');
      await expect(
        page.locator('.cm-selectionBackground').first(),
      ).toBeVisible();
      await expect
        .poll(async () => {
          const result = await editor.evaluate((content) => {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            const ctx = canvas.getContext('2d')!;
            const luminance = (color: string) => {
              ctx.clearRect(0, 0, 1, 1);
              ctx.fillStyle = color;
              ctx.fillRect(0, 0, 1, 1);
              const channels = [...ctx.getImageData(0, 0, 1, 1).data]
                .slice(0, 3)
                .map((v) => {
                  const s = v / 255;
                  return s <= 0.04045
                    ? s / 12.92
                    : ((s + 0.055) / 1.055) ** 2.4;
                });
              return (
                channels[0] * 0.2126 +
                channels[1] * 0.7152 +
                channels[2] * 0.0722
              );
            };
            const root = content.closest('.cm-editor')!;
            const selection = root.querySelector('.cm-selectionBackground')!;
            const contrasts: number[] = [];
            let selectionVisible = true;
            for (const line of content.querySelectorAll('.cm-line')) {
              const backgrounds = [false, true].map((selected) => {
                ctx.clearRect(0, 0, 1, 1);
                for (const color of [
                  getComputedStyle(root).backgroundColor,
                  selected
                    ? getComputedStyle(selection).backgroundColor
                    : 'transparent',
                  getComputedStyle(line).backgroundColor,
                ]) {
                  ctx.fillStyle = color;
                  ctx.fillRect(0, 0, 1, 1);
                }
                return [...ctx.getImageData(0, 0, 1, 1).data].join(',');
              });
              selectionVisible &&= backgrounds[0] !== backgrounds[1];
              for (const token of [line, ...line.querySelectorAll('span')]) {
                ctx.clearRect(0, 0, 1, 1);
                for (const color of [
                  getComputedStyle(root).backgroundColor,
                  getComputedStyle(selection).backgroundColor,
                  getComputedStyle(line).backgroundColor,
                  getComputedStyle(token, '::selection').backgroundColor,
                ]) {
                  ctx.fillStyle = color;
                  ctx.fillRect(0, 0, 1, 1);
                }
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                const bg = luminance(`rgb(${r}, ${g}, ${b})`);
                const fg = luminance(
                  getComputedStyle(token, '::selection').color,
                );
                contrasts.push(
                  (Math.max(bg, fg) + 0.05) / (Math.min(bg, fg) + 0.05),
                );
              }
            }
            return { contrast: Math.min(...contrasts), selectionVisible };
          });
          return result.selectionVisible && result.contrast >= 4.5;
        })
        .toBe(true);
    });
  }
}
