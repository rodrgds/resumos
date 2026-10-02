import { expect, test } from '@playwright/test';

test('web console shows output and synchronous/asynchronous errors, ignores other senders and bounds output', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const root = page.getByRole('region', {
    name: 'Experimentar HTML, CSS e JavaScript',
    exact: true,
  });
  await root.getByText('CSS e JavaScript', { exact: true }).click();
  const code = root.getByRole('textbox', { name: 'JavaScript', exact: true });
  const render = root.getByRole('button', {
    name: 'Pré-visualizar',
    exact: true,
  });
  const output = root.getByLabel('Consola', { exact: true });
  await code.fill(
    'console.log("ready", { answer: 42 }); throw new Error("bad preview");',
  );
  await render.click();
  await expect(output).toContainText('ready {"answer":42}');
  await expect(output).toContainText('Erro: Uncaught Error: bad preview');
  await expect(root.getByRole('status')).toContainText('Consulta a consola');
  await expect(render).toBeEnabled();
  await code.fill(
    'console.log("next"); Promise.reject(new Error("promise failed"));',
  );
  await render.click();
  await expect(output).toHaveText('next\nErro: promise failed\n');
  await page.evaluate(() =>
    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'null',
        data: {
          type: 'resumos-web-console',
          level: 'error',
          text: 'wrong sender',
        },
      }),
    ),
  );
  await expect(output).not.toContainText('wrong sender');
  await code.fill('console.log("x".repeat(40000));');
  await render.click();
  await expect.poll(() => output.textContent()).toBe('x'.repeat(32000));
});

for (const language of ['prolog', 'riscv']) {
  test(`${language} distinguishes syntax tokens in the editor`, async ({
    page,
  }) => {
    await page.goto('/exemplo/codigo/');
    const playground = page.locator(`[data-language="${language}"]`);
    await playground.scrollIntoViewIfNeeded();
    const editor = playground.getByRole('textbox', {
      name: `Código ${language}`,
      exact: true,
    });
    await expect(editor).toBeVisible();
    await expect
      .poll(() =>
        editor
          .locator('.cm-line span')
          .evaluateAll(
            (tokens) =>
              new Set(tokens.map((token) => getComputedStyle(token).color))
                .size,
          ),
      )
      .toBeGreaterThan(1);
  });
}

for (const language of ['HTML', 'CSS', 'JavaScript']) {
  test(`${language} web editor highlights syntax`, async ({ page }) => {
    await page.goto('/exemplo/codigo/');
    const playground = page.locator('[data-web-playground]');
    await playground.scrollIntoViewIfNeeded();
    if (language !== 'HTML')
      await playground.getByText('CSS e JavaScript', { exact: true }).click();
    const editor = playground.getByRole('textbox', {
      name: language,
      exact: true,
    });
    await expect(editor).toBeVisible();
    await expect
      .poll(() =>
        editor
          .locator('.cm-line span')
          .evaluateAll(
            (tokens) =>
              new Set(tokens.map((token) => getComputedStyle(token).color))
                .size,
          ),
      )
      .toBeGreaterThan(1);
  });
}

test('web editors preview edits, keep the frame isolated and reset all languages', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const playground = page.locator('[data-web-playground]');
  await playground.getByText('CSS e JavaScript', { exact: true }).click();
  await playground
    .getByRole('textbox', { name: 'HTML', exact: true })
    .fill('<p id="result">Before</p>');
  await playground
    .getByRole('textbox', { name: 'CSS', exact: true })
    .fill('#result { color: rgb(0, 128, 0); }');
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill('document.querySelector("#result").textContent = "After";');
  await playground
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  const frame = playground.frameLocator('iframe');
  await expect(frame.locator('#result')).toHaveText('After');
  await expect(frame.locator('#result')).toHaveCSS('color', 'rgb(0, 128, 0)');
  let formRequests = 0;
  await page.route('https://web-preview-test.invalid/**', async (route) => {
    formRequests++;
    await route.abort();
  });
  await playground
    .getByRole('textbox', { name: 'HTML', exact: true })
    .fill(
      '<form id="form" action="https://web-preview-test.invalid/submit" method="post"><label>Amount<input id="amount" name="amount" value="1" required></label><button>Submit</button></form><p id="result">Before</p>',
    );
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill(
      'document.querySelector("#form").addEventListener("submit", event => { event.preventDefault(); document.querySelector("#result").textContent = document.querySelector("#amount").value; });',
    );
  await playground
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  await frame.getByRole('textbox', { name: 'Amount' }).fill('3');
  await frame.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(frame.locator('#result')).toHaveText('3');
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill(
      'document.addEventListener("securitypolicyviolation", event => { if (event.violatedDirective === "form-action") document.querySelector("#result").textContent = "Blocked submission"; });',
    );
  await playground
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  await frame.getByRole('button', { name: 'Submit', exact: true }).click();
  await expect(frame.locator('#result')).toHaveText('Blocked submission');
  expect(formRequests).toBe(0);
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .fill(
      'try { parent.document.body.textContent = "escaped"; } catch { document.querySelector("#result").textContent = "Blocked"; }',
    );
  await playground
    .getByRole('textbox', { name: 'JavaScript', exact: true })
    .press('Control+Enter');
  await expect(frame.locator('#result')).toHaveText('Blocked');
  await expect(
    playground.getByRole('button', { name: 'Repor exemplo web' }),
  ).toBeEnabled();
  await playground.getByRole('button', { name: 'Repor exemplo web' }).click();
  const resetIframe = playground.locator('iframe');
  await expect(resetIframe).toBeVisible();
  await expect(resetIframe).toHaveAttribute('data-web-ready', 'true');
  const resetFrame = resetIframe.contentFrame();
  const resetButton = resetFrame.getByRole('button', {
    name: 'Mudar mensagem',
  });
  await resetButton.press('Enter');
  await expect(resetFrame.locator('#mensagem')).toHaveText('Funcionou!');
  await expect(resetFrame.locator('body')).toHaveCSS(
    'color',
    'rgb(140, 45, 59)',
  );
});

test('an unfinished HTML tag still lets the reader reset the web example', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  const playground = page.locator('[data-web-playground]');
  const reset = playground.getByRole('button', { name: 'Repor exemplo web' });
  await expect(reset).toBeEnabled();
  await playground
    .getByRole('textbox', { name: 'HTML', exact: true })
    .fill('<textarea>unfinished');
  await playground
    .getByRole('button', { name: 'Pré-visualizar', exact: true })
    .click();
  await expect(reset).toBeEnabled();
  await reset.click();
  await expect(
    playground
      .frameLocator('iframe')
      .getByRole('button', { name: 'Mudar mensagem' }),
  ).toBeVisible();
});
