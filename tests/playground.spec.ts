import { expect, test } from '@playwright/test';

test('PHP evaluates the authored scope example', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/cadeiras/lbaw/aplicacao-laravel/');
  const playground = page.getByRole('region', {
    name: 'Âmbito local, global e captura por valor',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  await expect(
    playground.getByRole('textbox', { name: 'Código php', exact: true }),
  ).toBeVisible();
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(playground.getByRole('status')).toHaveText('Concluído', {
    timeout: 45_000,
  });
  await expect(playground.getByLabel('Resultado', { exact: true })).toHaveText(
    '11\n4\n5\n15\n',
  );
});

test('Prolog executes the authored program once', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/cadeiras/pfl/solucoes-estruturas-prolog/');
  const playground = page.getByRole('region', {
    name: 'Termos, recolha ordenada e impressão por retrocesso',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  await expect(
    playground.getByRole('textbox', { name: 'Código prolog', exact: true }),
  ).toBeVisible();
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(playground.getByRole('status')).toHaveText('Concluído', {
    timeout: 45_000,
  });
  await expect(playground.getByLabel('Resultado', { exact: true })).toHaveText(
    'liga(a,liga(b,c))\ntarefa(treino,1)\n[1-treino,2-leitura,2-revisao]\ntarefa:leitura\ntarefa:treino\ntarefa:revisao\n',
  );
});

test('Python cannot read the lesson origin database and can be stopped', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto('/cadeiras/f1/centro-massa-momento/');
  await page.evaluate(
    () =>
      new Promise<void>((resolve, reject) => {
        const open = indexedDB.open('private-lesson-test');
        open.onsuccess = () => {
          open.result.close();
          resolve();
        };
        open.onerror = () => reject(open.error);
      }),
  );
  const playground = page.getByRole('region', {
    name: 'Colisão elástica com números',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  const run = playground.getByRole('button', { name: 'Executar', exact: true });
  await editor.fill(
    'from js import indexedDB, location\nprint(location.origin)\nprint([db.name for db in await indexedDB.databases()])',
  );
  await run.click();
  await expect(run).toBeEnabled({ timeout: 45_000 });
  await expect(playground.getByRole('status')).toHaveText('Concluído');
  const output = playground.getByLabel('Resultado', { exact: true });
  await expect(output).toContainText('http://127.0.0.1:4324');
  await expect(output).not.toContainText('private-lesson-test');
  await editor.fill('while True:\n    pass');
  await run.click();
  await expect(playground.getByRole('status')).toHaveText('A executar…', {
    timeout: 45_000,
  });
  await playground.getByRole('button', { name: 'Parar', exact: true }).click();
  await expect(playground.getByRole('status')).toHaveText(
    'Execução interrompida.',
  );
  await editor.fill('print(int(input()) * 2)');
  await playground.locator('.playground-input summary').click();
  await playground.locator('[data-stdin]').fill('21');
  await run.click();
  await expect(run).toBeEnabled({ timeout: 45_000 });
  await expect(output).toHaveText('42\n');
});

test('Python executes data analysis and displays its plot', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto('/cadeiras/f1/centro-massa-momento/');
  const playground = page.getByRole('region', {
    name: 'Colisão elástica com números',
    exact: true,
  });
  await playground.scrollIntoViewIfNeeded();
  await playground
    .getByRole('textbox', { name: 'Código python', exact: true })
    .fill(
      'import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nvalues = np.array([10, 14, 18])\nframe = pd.DataFrame({"grupo": ["A", "A", "B"], "valor": values})\nprint(frame.groupby("grupo")["valor"].mean().to_dict())\nplt.bar(["A", "B"], [12, 18])\nplt.title("Média por grupo")\nplt.show()',
    );
  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(
    playground.getByRole('button', { name: 'Executar', exact: true }),
  ).toBeEnabled({
    timeout: 90_000,
  });
  await expect(playground.getByRole('status')).toHaveText('Concluído');
  await expect(
    playground.getByLabel('Resultado', { exact: true }),
  ).toContainText("{'A': 12.0, 'B': 18.0}");
  await expect(
    playground.getByLabel('Resultado', { exact: true }),
  ).not.toContainText('MatplotlibDeprecationWarning');
  const plot = playground.getByRole('img', { name: 'Média por grupo' });
  await expect(plot).toBeVisible();
  expect(
    await plot.evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(100);
});

test('Python playground waits for preparation, highlights the theme and executes', async ({
  page,
}) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route('**/*.js', async (route) => {
    await scriptsReady;
    await route.continue();
  });
  await page.goto('/cadeiras/f1/centro-massa-momento/', {
    waitUntil: 'commit',
  });
  const playground = page.getByRole('region', {
    name: 'Colisão elástica com números',
    exact: true,
  });
  try {
    await playground.scrollIntoViewIfNeeded();
    await expect(
      playground.getByRole('button', { name: 'Executar', exact: true }),
    ).toBeDisabled();
  } finally {
    releaseScripts();
  }
  const editor = playground.getByRole('textbox', {
    name: 'Código python',
    exact: true,
  });
  await expect(editor).toBeVisible();

  const tokenColors = await playground
    .locator('.cm-line span')
    .evaluateAll((tokens) => [
      ...new Set(tokens.map((token) => getComputedStyle(token).color)),
    ]);
  expect(tokenColors.length).toBeGreaterThan(1);

  await playground
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(playground.getByRole('status')).toHaveText('Concluído', {
    timeout: 20_000,
  });
  await expect(
    playground.getByLabel('Resultado', { exact: true }),
  ).toContainText('v1 = 1.00 m/s, v2 = 4.00 m/s');
});
