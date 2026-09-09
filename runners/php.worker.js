import { PHP, loadPHPRuntime, setPhpIniEntries } from '@php-wasm/universal';
import { getPHPLoaderModule } from '@php-wasm/web-8-4';

self.onmessage = async ({ data: { code, input } }) => {
  const send = (message) => self.postMessage(message);
  try {
    const php = new PHP(await loadPHPRuntime(await getPHPLoaderModule()));
    await setPhpIniEntries(php, { html_errors: '0' });
    send({ type: 'status', text: 'A executar…' });
    const response = await php.runStream({ code, body: input });
    send({ type: 'output', text: await response.stdoutText });
    const errors = await response.stderrText;
    if (errors) send({ type: 'output', text: errors });
    send({ type: 'done', exitCode: await response.exitCode });
  } catch (error) {
    send({ type: 'error', text: error.message || String(error) });
  }
};
