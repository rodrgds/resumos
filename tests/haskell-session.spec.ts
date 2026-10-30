import { expect, test } from '@playwright/test';

test('Haskell verification sessions load fresh program state and discard used compilers', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto('http://127.0.0.1:4324/worker.html');
  const outputs = await page.evaluate(async () => {
    const open = () => {
      const channel = new MessageChannel();
      let receive: (message: {
        type: string;
        text?: string;
      }) => void = () => {};
      channel.port1.onmessage = ({ data }) => receive(data);
      window.postMessage(
        { language: 'haskell', type: 'session' },
        location.origin,
        [channel.port2],
      );
      return {
        run(code: string) {
          return new Promise<string>((resolve, reject) => {
            let output = '';
            receive = (message) => {
              if (message.type === 'output') output += message.text;
              if (message.type === 'error') reject(Error(message.text));
              if (message.type === 'done') resolve(output.trim());
            };
            channel.port1.postMessage({ code });
          });
        },
        close() {
          channel.port1.postMessage({ type: 'cancel' });
          channel.port1.close();
        },
      };
    };
    const source =
      'import Data.IORef\nimport System.IO.Unsafe\nvalue = unsafePerformIO (newIORef (0::Int))\n{-# NOINLINE value #-}\nmain = modifyIORef value (+1) >> readIORef value >>= print';
    const first = open();
    const result = [await first.run(source), await first.run(source)];
    first.close();
    const second = open();
    result.push(await second.run(source));
    second.close();
    return result;
  });
  expect(outputs).toEqual(['1', '1', '1']);
  await expect.poll(() => page.workers().length).toBe(1);
});

test('stopping Haskell terminates the running compiler and allows a fresh check', async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto('/exemplo/exercise-help/');
  const exercise = page.locator('#haskell-double');
  await exercise.locator('.exercise-disclosure > summary').click();
  const editor = exercise.getByRole('textbox', {
    name: 'Código haskell',
    exact: true,
  });
  const check = exercise.getByRole('button', {
    name: 'Verificar código',
    exact: true,
  });
  await editor.fill('dobro x = length ([1..] :: [Integer])');
  await check.click();
  await expect(exercise.locator('[data-code-status]')).toContainText(
    'A executar',
    { timeout: 60_000 },
  );
  await exercise.getByRole('button', { name: 'Parar', exact: true }).click();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    'Verificação interrompida.',
  );
  await expect(exercise.locator('[data-summary-status]')).toBeHidden();
  await expect
    .poll(
      () =>
        page.workers().filter((w) => w.url().includes('haskell.worker.js'))
          .length,
    )
    .toBe(1);
  await editor.fill('dobro x = x + x');
  await check.click();
  await expect(exercise.locator('[data-code-status]')).toHaveText(
    '2/2 testes passaram.',
    { timeout: 60_000 },
  );
});
