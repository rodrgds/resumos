import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs';

const OUTPUT_LIMIT = 32_000;
const MAX_PLOTS = 8;
const MAX_PLOT_BASE64_CHARS = 2 * 1024 * 1024;

self.onmessage = async ({ data: { code, input } }) => {
  const send = (message) => self.postMessage(message);
  let globals;
  try {
    send({ type: 'status', text: 'A carregar o motor…' });
    const pyodide = await loadPyodide();
    let outputLength = 0;
    const output = (text) => {
      outputLength += text.length + 1;
      if (outputLength > OUTPUT_LIMIT)
        throw new Error(
          'A saída ultrapassou 32 mil caracteres. Reduz o número de resultados.',
        );
      send({ type: 'output', text: text + '\n' });
    };
    pyodide.setStdout({ batched: output });
    pyodide.setStderr({ batched: output });
    const lines = input
      ? input.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n')
      : [];
    pyodide.setStdin({ stdin: () => lines.shift() ?? null });
    send({ type: 'status', text: 'A carregar as bibliotecas…' });
    await pyodide.loadPackagesFromImports(code);
    let plots = 0;
    pyodide.registerJsModule('resumos_display', {
      show: (data, alt) => {
        if (++plots > MAX_PLOTS || data.length > MAX_PLOT_BASE64_CHARS)
          throw new Error(
            'Demasiados gráficos ou imagem demasiado grande. Reduz os resultados.',
          );
        send({ type: 'image', data: 'data:image/png;base64,' + data, alt });
      },
    });
    if ('matplotlib' in pyodide.loadedPackages) {
      pyodide.runPython(`
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as _plt
from io import BytesIO as _BytesIO
from base64 import b64encode as _b64encode
from resumos_display import show as _display
def _show(*args, **kwargs):
    for number in _plt.get_fignums():
        figure = _plt.figure(number)
        image = _BytesIO()
        figure.savefig(image, format="png", dpi=110, bbox_inches="tight")
        title = "; ".join(axis.get_title() for axis in figure.axes if axis.get_title())
        _display(_b64encode(image.getvalue()).decode(), title or "Gráfico gerado pelo código Python")
    _plt.close("all")
_plt.show = _show
`);
    }
    globals = pyodide.toPy({ __name__: '__main__' });
    send({ type: 'status', text: 'A executar…' });
    await pyodide.runPythonAsync(code, { globals });
    send({ type: 'done', exitCode: 0 });
  } catch (error) {
    send({ type: 'error', text: error.message || String(error) });
  } finally {
    globals?.destroy();
  }
};
