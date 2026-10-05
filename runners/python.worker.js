import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs';

const OUTPUT_LIMIT = 32_000;
const MAX_PLOTS = 8;
const MAX_PLOT_BASE64_CHARS = 2 * 1024 * 1024;
const runtime = loadPyodide();
runtime.then(
  () => self.postMessage({ type: 'ready' }),
  (error) =>
    self.postMessage({ type: 'error', text: error.message || String(error) }),
);

self.onmessage = async ({ data: { code, input, files } }) => {
  const send = (message) => self.postMessage(message);
  let globals;
  try {
    const pyodide = await runtime;
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
    for (const [name, content] of Object.entries(files ?? {})) {
      if (typeof name !== 'string' || typeof content !== 'string') continue;
      pyodide.FS.writeFile(name, content);
    }
    send({ type: 'status', text: 'A carregar as bibliotecas…' });
    // Only Python sources declare dependencies. Data files can look like
    // broken Python (e.g. 01/10/2026) and would hide the real imports.
    const sources = [
      ...Object.entries(files ?? {})
        .filter(
          ([name, content]) =>
            typeof name === 'string' &&
            typeof content === 'string' &&
            name.toLowerCase().endsWith('.py'),
        )
        .map(([, content]) => content),
      code,
    ];
    await pyodide.loadPackagesFromImports(sources.join('\n'), {
      messageCallback: () => {},
    });
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
import warnings as _warnings
from resumos_display import show as _display
def _show(*args, **kwargs):
    for number in _plt.get_fignums():
        figure = _plt.figure(number)
        image = _BytesIO()
        # Pyodide's bundled Agg renderer warns about its own pixel coordinates.
        # Keep warnings from the student's code visible outside this adapter.
        with _warnings.catch_warnings():
            _warnings.filterwarnings(
                "ignore",
                message=r"The [xy] parameter as float was deprecated in Matplotlib 3\\.10",
                category=matplotlib.MatplotlibDeprecationWarning,
            )
            figure.savefig(image, format="png", dpi=110, bbox_inches="tight")
        title = "; ".join(axis.get_title() for axis in figure.axes if axis.get_title())
        _display(_b64encode(image.getvalue()).decode(), title or "Gráfico gerado pelo código Python")
    _plt.close("all")
_plt.show = _show
`);
    }
    globals = pyodide.toPy({ __name__: '__main__' });
    send({ type: 'status', text: 'A executar…' });
    try {
      await pyodide.runPythonAsync(code, { globals });
    } catch (error) {
      send({ type: 'output', text: (error.message || String(error)) + '\n' });
      send({ type: 'done', exitCode: 1 });
      return;
    }
    send({ type: 'done', exitCode: 0 });
  } catch (error) {
    send({ type: 'error', text: error.message || String(error) });
  } finally {
    globals?.destroy();
  }
};
