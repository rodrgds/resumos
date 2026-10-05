import { expect, test } from '@playwright/test';

test('prepared Python runs skip engine startup and keep program state disposable', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.goto('/cadeiras/f1/centro-massa-momento/');
  const results = await page.evaluate(async () => {
    const iframe = document.createElement('iframe');
    iframe.hidden = true;
    iframe.src = 'http://127.0.0.1:4324/worker.html';
    await new Promise<void>((resolve) => {
      iframe.onload = () => resolve();
      document.body.append(iframe);
    });
    const request = (data: object) =>
      new Promise<Array<{ type: string; text?: string }>>((resolve) => {
        const channel = new MessageChannel();
        const messages: Array<{ type: string; text?: string }> = [];
        channel.port1.onmessage = ({ data }) => {
          messages.push(data);
          if (['ready', 'done', 'error'].includes(data.type)) {
            channel.port1.postMessage({ type: 'cancel' });
            channel.port1.close();
            resolve(messages);
          }
        };
        iframe.contentWindow!.postMessage(
          { language: 'python', input: '', ...data },
          'http://127.0.0.1:4324',
          [channel.port2],
        );
      });
    const preparation = await request({ type: 'prepare', code: '' });
    // Keep a failed preparation from leaving subsequent requests waiting.
    if (preparation.at(-1)?.type !== 'ready') {
      iframe.remove();
      return { preparation, first: [], second: [] };
    }
    const first = await request({
      code: 'import builtins, os\nbuiltins.private_value = 42\nopen("private.txt", "w").write("secret")\nos.environ["PRIVATE_VALUE"] = "secret"\nprint(42)',
    });
    await request({ type: 'prepare', code: '' });
    const second = await request({
      code: 'import builtins, os\nprint(hasattr(builtins, "private_value"))\nprint(os.path.exists("private.txt"))\nprint("PRIVATE_VALUE" in os.environ)',
    });
    iframe.remove();
    return { preparation, first, second };
  });
  expect(results.preparation).toEqual([{ type: 'ready' }]);
  for (const messages of [results.first, results.second]) {
    expect(messages).not.toContainEqual({
      type: 'status',
      text: 'A carregar o motor…',
    });
    expect(messages.at(-1)?.type).toBe('done');
  }
  expect(results.first.filter((message) => message.type === 'output')).toEqual([
    { type: 'output', text: '42\n' },
  ]);
  expect(
    results.second
      .filter((message) => message.type === 'output')
      .map((message) => message.text)
      .join(''),
  ).toBe('False\nFalse\nFalse\n');
});
