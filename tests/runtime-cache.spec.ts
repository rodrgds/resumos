import { expect, test, type Page } from '@playwright/test';

async function execute(page: Page, language: string, code: string) {
  return page.evaluate(
    ({ language, code }) =>
      new Promise<{ output: string; tables: unknown[] }>((resolve, reject) => {
        const channel = new MessageChannel();
        const result = { output: '', tables: [] as unknown[] };
        channel.port1.onmessage = ({ data }) => {
          if (data.type === 'output') result.output += data.text;
          if (data.type === 'table') result.tables.push(data);
          if (data.type === 'error') {
            channel.port1.close();
            reject(new Error(data.text));
          }
          if (data.type === 'done') {
            channel.port1.close();
            resolve(result);
          }
        };
        window.postMessage({ language, code, input: '' }, location.origin, [
          channel.port2,
        ]);
      }),
    { language, code },
  );
}

for (const language of ['sqlite', 'postgresql']) {
  test(`${language} starts a fresh database after reloading offline`, async ({
    page,
    context,
  }) => {
    test.setTimeout(90_000);
    await page.goto('http://127.0.0.1:4324/worker.html');
    await execute(page, language, 'CREATE TABLE previous_run(x INTEGER);');
    await context.setOffline(true);
    await page.reload();
    const result = await execute(
      page,
      language,
      'CREATE TABLE previous_run(x INTEGER); INSERT INTO previous_run VALUES (42); SELECT x FROM previous_run;',
    );
    expect(result.tables).toEqual([
      expect.objectContaining({ columns: ['x'], rows: [['42']] }),
    ]);
  });
}

test('Python and its downloaded NumPy package run in a fresh interpreter offline', async ({
  page,
  context,
}) => {
  test.setTimeout(120_000);
  await page.goto('http://127.0.0.1:4324/worker.html');
  const first = await execute(
    page,
    'python',
    'import numpy as np\nimport builtins\nbuiltins.previous_run = True\nprint(np.sum([2, 3]))',
  );
  expect(first.output).toBe('5\n');
  await context.setOffline(true);
  await page.reload();
  const second = await execute(
    page,
    'python',
    'import numpy as np\nimport builtins\nprint(hasattr(builtins, "previous_run"))\nprint(np.sum([4, 5]))',
  );
  expect(second.output).toBe('False\n9\n');
});

test('runner reloads offline at the canonical URL used by Cloudflare Pages', async ({
  page,
  context,
}) => {
  let offline = false;
  await context.route('http://127.0.0.1:4324/worker', async (route) => {
    if (offline) return route.abort('internetdisconnected');
    await route.fulfill({
      response: await route.fetch({
        url: 'http://127.0.0.1:4324/worker.html',
      }),
    });
  });
  await page.goto('http://127.0.0.1:4324/worker');
  await expect(page).toHaveURL('http://127.0.0.1:4324/worker');
  await execute(page, 'sqlite', 'SELECT 1;');
  offline = true;
  await context.setOffline(true);
  await page.reload();
  expect(
    (await execute(page, 'sqlite', 'SELECT 42 AS answer;')).tables,
  ).toEqual([expect.objectContaining({ columns: ['answer'], rows: [['42']] })]);
});

test('activating a new runner cache preserves unrelated browser data', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:4324/');
  await page.evaluate(async () => {
    await (
      await caches.open('resumos-engines-obsolete')
    ).put('/old.wasm', new Response('old runtime'));
    await (
      await caches.open('unrelated-reader-data')
    ).put('/keep', new Response('keep me'));
  });
  await page.goto('http://127.0.0.1:4324/worker.html');
  await execute(page, 'sqlite', 'SELECT 1;');
  const result = await page.evaluate(async () => ({
    old: (await caches.keys()).includes('resumos-engines-obsolete'),
    privateData: await (
      await (await caches.open('unrelated-reader-data')).match('/keep')
    )?.text(),
  }));
  expect(result).toEqual({ old: false, privateData: 'keep me' });
});

for (const [language, code] of [
  ['php', '<?php echo 42;'],
  ['prolog', 'main :- writeln(42).'],
  ['haskell', 'main = print (42 :: Int)'],
]) {
  test(`${language} reuses its engine after reloading offline`, async ({
    page,
    context,
  }) => {
    test.setTimeout(180_000);
    await page.goto('http://127.0.0.1:4324/worker.html');
    expect((await execute(page, language, code)).output.trim()).toBe('42');
    await context.setOffline(true);
    await page.reload();
    expect((await execute(page, language, code)).output.trim()).toBe('42');
  });
}
