import { expect, test } from '@playwright/test';
import { runnerHeaders } from './helpers/runner-headers';

test.beforeEach(async ({ page }) => runnerHeaders(page));

test('database examples and programs without input have no unused input control', async ({
  page,
}) => {
  await page.goto('/exemplo/codigo/');
  for (const language of [
    'sqlite',
    'postgresql',
    'javascript',
    'python',
    'php',
    'haskell',
  ])
    await expect(
      page.locator(
        `[data-playground][data-language="${language}"] .playground-stdin`,
      ),
    ).toHaveCount(0);
  await expect(page.locator('[data-language="cpp"] [data-stdin]')).toHaveValue(
    '5',
  );
});

for (const language of ['sqlite', 'postgresql']) {
  test(`${language} runs editable seeds, preserves SQL values and starts fresh after errors`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.goto('/exemplo/databases/');
    const root = page.locator(`[data-playground][data-language="${language}"]`);
    await root.scrollIntoViewIfNeeded();
    const editor = root.getByRole('textbox', {
      name: `Código ${language}`,
      exact: true,
    });
    const run = root.getByRole('button', { name: 'Executar', exact: true });
    const execute = async (code: string) => {
      await editor.fill(code);
      await run.click();
      await expect(run).toBeEnabled({ timeout: 60_000 });
    };
    await execute(
      "SELECT id, nome FROM item; SELECT NULL AS valor, '' AS vazio, 'NULL' AS texto; SELECT 9007199254740993 AS repetido, 'a;b' AS repetido; SELECT nome FROM item WHERE id = 99;",
    );
    await expect(root.getByRole('status')).toHaveText('Concluído');
    const tables = root.getByRole('table');
    await expect(tables).toHaveCount(4);
    await expect(tables.nth(0).getByRole('cell')).toHaveText(['1', 'Ana']);
    await expect(tables.nth(1).getByRole('cell')).toHaveText([
      'NULL',
      '""',
      'NULL',
    ]);
    await expect(tables.nth(1).getByTitle('Valor nulo')).toHaveCount(1);
    await expect(tables.nth(2).getByRole('columnheader')).toHaveText([
      'repetido',
      'repetido',
    ]);
    await expect(tables.nth(2).getByRole('cell')).toHaveText([
      '9007199254740993',
      'a;b',
    ]);
    await expect(tables.nth(3).getByRole('columnheader')).toHaveText(['nome']);
    await expect(tables.nth(3).getByRole('cell')).toHaveText(['Sem linhas']);

    if (language === 'postgresql') {
      await execute(
        "SELECT ARRAY['a,b','c',NULL,''] AS elementos, ARRAY[[1,2],[3,4]] AS matriz, 12.30::numeric(8,2) AS preco, TIMESTAMP '2026-12-14 21:30' AS data;",
      );
      await expect(root.getByRole('cell')).toHaveText([
        '{"a,b",c,NULL,""}',
        '{{1,2},{3,4}}',
        '12.30',
        '2026-12-14 21:30:00',
      ]);
    }

    // The seed is a real editable script, and result strings never become HTML.
    await root.getByRole('radio', { name: 'dados.sql', exact: true }).check();
    await root
      .getByRole('textbox', { name: 'Ficheiro dados.sql' })
      .fill(
        "CREATE TABLE item(id INTEGER PRIMARY KEY, nome TEXT); INSERT INTO item VALUES (7, '<img src=x onerror=alert(1)>');",
      );
    await root.getByRole('radio', { name: 'main.sql', exact: true }).check();
    await execute(
      "BEGIN; UPDATE item SET nome = 'alterado'; ROLLBACK; SELECT id, nome FROM item;",
    );
    await expect(root.getByRole('status')).toHaveText('Concluído');
    await expect(root.getByRole('cell')).toHaveText([
      '7',
      '<img src=x onerror=alert(1)>',
    ]);
    await expect(root.locator('.playground-tables img')).toHaveCount(0);
    await execute(
      'CREATE TABLE temporaria(x INTEGER); INSERT INTO temporaria VALUES (42); SELECT x FROM temporaria;',
    );
    await expect(root.getByRole('cell')).toHaveText(['42']);
    await execute('SELECT x FROM temporaria;');
    await expect(root.getByRole('status')).toContainText('main.sql:');
    await expect(root.getByRole('table')).toHaveCount(0);
    await execute('SELECT id FROM item;');
    await expect(root.getByRole('status')).toHaveText('Concluído');
    await expect(root.getByRole('cell')).toHaveText(['7']);
    await root.getByRole('button', { name: 'Repor código' }).click();
    await run.click();
    await expect(run).toBeEnabled({ timeout: 60_000 });
    await expect(root.getByRole('cell')).toHaveText(['1', 'Ana']);
  });

  test(`${language} bounds results and can stop a query then run again`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.goto('/exemplo/databases/');
    const root = page.locator(`[data-playground][data-language="${language}"]`);
    await root.scrollIntoViewIfNeeded();
    const editor = root.getByRole('textbox', {
      name: `Código ${language}`,
      exact: true,
    });
    const run = root.getByRole('button', { name: 'Executar', exact: true });
    await editor.fill(
      'WITH RECURSIVE numeros(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM numeros WHERE n<250) SELECT n FROM numeros;',
    );
    await run.click();
    await expect(run).toBeEnabled({ timeout: 60_000 });
    await expect(root.getByRole('table').getByRole('cell')).toHaveCount(200);
    await expect(root.getByRole('table')).toHaveAccessibleName(
      'Resultado 1, 200 linhas (primeiras 200)',
    );
    if (language === 'sqlite') {
      await editor.fill(`SELECT 1 AS "${'x'.repeat(40000)}" WHERE 0;`);
      await run.click();
      await expect(run).toBeEnabled({ timeout: 60_000 });
      await expect(root.getByRole('status')).toContainText('32 mil caracteres');
      await expect(root.getByRole('table')).toHaveCount(0);
    }
    await editor.fill(
      language === 'postgresql'
        ? "SELECT repeat('x', 40000);"
        : 'SELECT hex(zeroblob(20000));',
    );
    await run.click();
    await expect(run).toBeEnabled({ timeout: 60_000 });
    await expect(root.getByRole('status')).toContainText('32 mil caracteres');
    await expect(root.getByRole('table')).toHaveCount(0);
    await editor.fill(
      language === 'postgresql'
        ? 'SELECT pg_sleep(60);'
        : 'WITH RECURSIVE numeros(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM numeros WHERE n<100000000) SELECT SUM(n) FROM numeros;',
    );
    await run.click();
    await expect(root.getByRole('status')).toHaveText('A executar…', {
      timeout: 60_000,
    });
    await root.getByRole('button', { name: 'Parar', exact: true }).click();
    await expect(root.getByRole('status')).toHaveText('Execução interrompida.');
    await editor.fill('SELECT 42 AS resposta;');
    await run.click();
    await expect(run).toBeEnabled({ timeout: 60_000 });
    await expect(root.getByRole('status')).toHaveText('Concluído');
    await expect(root.getByRole('cell')).toHaveText(['42']);
  });
}

test('visible examples run once, preserve edits, and keep manual examples idle', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto('/exemplo/databases/');
  const manual = page.getByRole('region', {
    name: 'SQLite com dados editáveis',
    exact: true,
  });
  await manual.scrollIntoViewIfNeeded();
  await expect(
    manual.getByRole('button', { name: 'Executar', exact: true }),
  ).toBeEnabled();
  await expect(manual.getByRole('status')).toBeHidden();
  const automatic = page.getByRole('region', {
    name: 'Exemplo automático',
    exact: true,
  });
  await automatic.scrollIntoViewIfNeeded();
  await expect(automatic.getByRole('status')).toHaveText('Concluído', {
    timeout: 60_000,
  });
  await expect(automatic.getByLabel('Resultado', { exact: true })).toHaveText(
    'resultado inicial\n',
  );
  const editor = automatic.getByRole('textbox', {
    name: 'Código javascript',
    exact: true,
  });
  await editor.fill('console.log("resultado editado");');
  await manual.scrollIntoViewIfNeeded();
  await automatic.scrollIntoViewIfNeeded();
  await expect(automatic.getByLabel('Resultado', { exact: true })).toHaveText(
    'resultado inicial\n',
  );
  await automatic
    .getByRole('button', { name: 'Executar', exact: true })
    .click();
  await expect(automatic.getByLabel('Resultado', { exact: true })).toHaveText(
    'resultado editado\n',
    { timeout: 30_000 },
  );
});

test('explicit standard input and PHP request bodies reach their program and reset', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto('/exemplo/databases/');
  for (const [title, label, initial, changed, expected] of [
    ['Entrada explícita', 'Entrada padrão', '21', '7', '14\n'],
    ['Corpo explícito', 'Disponível em php://input', 'abc', 'pedido', 'pedido'],
  ]) {
    const root = page.getByRole('region', { name: title, exact: true });
    await root.scrollIntoViewIfNeeded();
    await root.locator('.playground-stdin summary').click();
    const input = root.getByRole('textbox', { name: label, exact: true });
    await expect(input).toHaveValue(initial);
    await input.fill(changed);
    const run = root.getByRole('button', { name: 'Executar', exact: true });
    await run.click();
    await expect(run).toBeEnabled({ timeout: 60_000 });
    await expect(root.getByRole('status')).toHaveText('Concluído');
    await expect(root.getByLabel('Resultado', { exact: true })).toHaveText(
      expected,
    );
    await root.getByRole('button', { name: 'Repor código' }).click();
    await expect(input).toHaveValue(initial);
  }
});

test('a database engine download failure releases the editor for a fresh retry', async ({
  page,
  context,
}) => {
  test.setTimeout(90_000);
  await context.route('**/pglite/pglite.wasm', (route) => route.abort());
  await page.goto('/exemplo/databases/');
  const root = page.getByRole('region', {
    name: 'PostgreSQL com dados editáveis',
    exact: true,
  });
  await root.scrollIntoViewIfNeeded();
  const run = root.getByRole('button', { name: 'Executar', exact: true });
  await run.click();
  await expect(run).toBeEnabled({ timeout: 60_000 });
  await expect(root.getByRole('status')).toContainText('main.sql:');
  await context.unroute('**/pglite/pglite.wasm');
  await run.click();
  await expect(run).toBeEnabled({ timeout: 60_000 });
  await expect(root.getByRole('status')).toHaveText('Concluído');
  await expect(root.getByRole('cell')).toHaveText(['1', 'Ana']);
});
