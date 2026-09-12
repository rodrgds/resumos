import { expect, test, type Page, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
import { speechWav } from '../src/lib/brainrot-audio';
import { DownloadProgress } from '../src/lib/brainrot-download-progress';

test.use({
  launchOptions: {
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    args: [
      '--use-fake-device-for-media-stream',
      '--use-fake-ui-for-media-stream',
    ],
  },
});

type VoiceTestWindow = Window & {
  brainrotTest: {
    texts: string[];
    models: string[];
    terminated: number;
    references: number[];
    release?: () => void;
    report?: (phase: string, loaded?: number) => void;
  };
};

test('download progress counts interleaved assets once without going backwards', () => {
  const progress = new DownloadProgress();
  const loaded = [
    { url: 'model.onnx', loaded: 2 },
    { url: 'weights.data', loaded: 5 },
    { url: 'model.onnx', loaded: 5 },
    { url: 'weights.data', loaded: 0 },
    { url: 'weights.data', loaded: 5 },
    { url: 'model.onnx', loaded: 8 },
  ].map((event) => progress.update(event));
  expect(loaded).toEqual([2, 7, 10, 10, 10, 13]);
});

async function mockVoice(
  page: Page,
  fail = false,
  seconds = 2,
  delayMs = 30,
  options: { hold?: boolean } = {},
) {
  await page.addInitScript(
    ({ fail, seconds, delayMs, hold }) => {
      const NativeWorker = window.Worker;
      const state = {
        texts: [] as string[],
        models: [] as string[],
        terminated: 0,
        references: [] as number[],
        release: () => {},
        report: (_phase: string, _loaded?: number) => {},
      };
      Object.assign(window, { brainrotTest: state });
      window.Worker = class extends EventTarget {
        constructor(url: string | URL, options?: WorkerOptions) {
          super();
          if (!/brainrot-(voice|sopro)/.test(String(url)))
            return new NativeWorker(url, options);
        }
        postMessage({
          id,
          text,
          model,
          reference,
          cancel,
        }: {
          id: number;
          text: string;
          model: string;
          reference?: Float32Array;
          cancel?: number[];
        }) {
          if (cancel) return;
          state.texts.push(text);
          state.models.push(model);
          state.report = (phase, loaded) =>
            this.dispatchEvent(
              new MessageEvent('message', {
                data:
                  loaded === undefined
                    ? { type: 'phase', id, phase }
                    : { type: 'progress', id, loaded },
              }),
            );
          if (reference) state.references.push(reference.length);
          const rate = 8000;
          const samples = rate * seconds;
          const buffer = new ArrayBuffer(44 + samples * 2);
          const view = new DataView(buffer);
          const word = (offset: number, text: string) =>
            [...text].forEach((letter, i) =>
              view.setUint8(offset + i, letter.charCodeAt(0)),
            );
          word(0, 'RIFF');
          view.setUint32(4, buffer.byteLength - 8, true);
          word(8, 'WAVE');
          word(12, 'fmt ');
          view.setUint32(16, 16, true);
          view.setUint16(20, 1, true);
          view.setUint16(22, 1, true);
          view.setUint32(24, rate, true);
          view.setUint32(28, rate * 2, true);
          view.setUint16(32, 2, true);
          view.setUint16(34, 16, true);
          word(36, 'data');
          view.setUint32(40, samples * 2, true);
          const amplitude = model === 'miro' ? 800 : 8000;
          for (let i = 0; i < samples; i++)
            view.setInt16(44 + i * 2, Math.sin(i * 0.15) * amplitude, true);
          const respond = () =>
            this.dispatchEvent(
              new MessageEvent('message', {
                data: fail
                  ? { type: 'error', id }
                  : {
                      type: 'audio',
                      id,
                      wav: new Blob([buffer], { type: 'audio/wav' }),
                      generationMs: model === 'miro' ? 500 : 800,
                    },
              }),
            );
          if (hold) state.release = respond;
          else setTimeout(respond, delayMs);
        }
        terminate() {
          state.terminated++;
        }
      } as unknown as typeof Worker;
    },
    { fail, seconds, delayMs, hold: options.hold },
  );
}

async function openReader(page: Page) {
  await page.goto('/exemplo/apontamentos/');
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await expect(dialog).toBeVisible();
  return dialog;
}

test('voice preparation status appears only after one second', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockVoice(page, false, 5, 30, { hold: true });
  const dialog = await openReader(page);
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as VoiceTestWindow).brainrotTest.texts.length,
      ),
    )
    .toBe(1);
  const status = dialog.locator('[data-br-status]');
  await expect(status).toBeHidden();
  await page.waitForTimeout(1_050);
  await expect(status).toBeVisible();
  await expect(status).toContainText('trecho 1 de');
});

test('short voice preparation never flashes a loading status', async ({
  page,
}) => {
  await mockVoice(page);
  const dialog = await openReader(page);
  await dialog.locator('[data-br-status]').evaluate((status) => {
    const visibleStatuses: string[] = [];
    Object.assign(window, { brainrotVisibleStatuses: visibleStatuses });
    new MutationObserver(() => {
      if (!(status as HTMLElement).hidden)
        visibleStatuses.push(status.textContent || '');
    }).observe(status, {
      attributes: true,
      attributeFilter: ['hidden'],
      childList: true,
      subtree: true,
    });
  });
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('[data-br-status]')).toHaveText(
    'Voz local · Português de Portugal',
  );
  await page.waitForTimeout(100);
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { brainrotVisibleStatuses: string[] })
          .brainrotVisibleStatuses,
    ),
  ).toEqual([]);
});

test('voice progress distinguishes download, reference preparation and speech generation', async ({
  page,
}) => {
  await mockVoice(page, false, 5, 30, { hold: true });
  const dialog = await openReader(page);
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as VoiceTestWindow).brainrotTest.texts.length,
      ),
    )
    .toBe(1);
  const status = dialog.locator('[data-br-status]');
  await page.evaluate(() =>
    (window as unknown as VoiceTestWindow).brainrotTest.report!(
      'download',
      64 * 1_048_576,
    ),
  );
  await expect(status).toContainText('64 MB recebidos');
  await page.evaluate(() =>
    (window as unknown as VoiceTestWindow).brainrotTest.report!('reference'),
  );
  await expect(status).toContainText('amostra de voz');
  await page.evaluate(() =>
    (window as unknown as VoiceTestWindow).brainrotTest.report!('generating'),
  );
  await expect(status).toContainText('A gerar fala');
  await expect(status).toContainText('trecho 1 de');
  await page.evaluate(() =>
    (window as unknown as VoiceTestWindow).brainrotTest.release!(),
  );
  await expect(status).toHaveText('Voz local · Português de Portugal');
  await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
});

for (const model of ['piper', 'markl']) {
  test(`${model} reuses the spoken page from disk after reload`, async ({
    page,
  }) => {
    await mockVoice(page, false, 5);
    for (let visit = 0; visit < 2; visit++) {
      await page.goto('/exemplo/apontamentos/');
      await page
        .locator('.lesson-heading h1')
        .evaluate(
          (el) => (el.textContent = 'Vamos estudar uma função contínua.'),
        );
      await page
        .locator('[data-annotatable]')
        .evaluate((el) => el.replaceChildren());
      await page
        .getByRole('button', { name: 'Brain rot', exact: true })
        .click();
      await page.getByRole('button', { name: 'Definições do leitor' }).click();
      await page.getByLabel('Voz', { exact: true }).selectOption(model);
      await page.getByRole('button', { name: 'Fechar definições' }).click();
      await page.getByRole('button', { name: 'Iniciar leitura' }).click();
      await expect(page.locator('[data-br-status]')).toHaveText(
        'Voz local · Português de Portugal',
      );
      await page.getByRole('button', { name: 'Pausar leitura' }).click();
      expect(
        await page.evaluate(
          () =>
            (window as unknown as VoiceTestWindow).brainrotTest.texts.length,
        ),
      ).toBe(visit === 0 ? 1 : 0);
    }
  });
}

test('speech still starts when disk caching is unavailable', async ({
  page,
}) => {
  await mockVoice(page, false, 5);
  await page.addInitScript(() => {
    const open = indexedDB.open.bind(indexedDB);
    indexedDB.open = (name, version) => {
      if (name === 'resumos-speech-cache')
        throw new DOMException('Storage denied', 'SecurityError');
      return open(name, version);
    };
  });
  const dialog = await openReader(page);
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('[data-br-status]')).toHaveText(
    'Voz local · Português de Portugal',
  );
  await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
});

test('saved speech never substitutes a different text or voice', async ({
  page,
}) => {
  await mockVoice(page, false, 5);
  for (const [model, text] of [
    ['piper', 'Esta função é contínua.'],
    ['piper', 'Esta função é descontínua.'],
    ['dii', 'Esta função é contínua.'],
  ]) {
    await page.goto('/exemplo/apontamentos/');
    await page
      .locator('.lesson-heading h1')
      .evaluate((el, value) => (el.textContent = value), text);
    await page
      .locator('[data-annotatable]')
      .evaluate((el) => el.replaceChildren());
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await page.getByLabel('Voz', { exact: true }).selectOption(model);
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await page.getByRole('button', { name: 'Iniciar leitura' }).click();
    await expect(page.locator('[data-br-status]')).toHaveText(
      'Voz local · Português de Portugal',
    );
    await page.getByRole('button', { name: 'Pausar leitura' }).click();
    expect(
      await page.evaluate(() => {
        const state = (window as unknown as VoiceTestWindow).brainrotTest;
        return [state.models[0], state.texts[0]];
      }),
    ).toEqual([model, text]);
  }
});

test('pausing while the voice loads resumes the same preparation', async ({
  page,
}) => {
  await mockVoice(page, false, 5, 30, { hold: true });
  const dialog = await openReader(page);
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as unknown as VoiceTestWindow).brainrotTest.texts.length,
      ),
    )
    .toBe(1);
  await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await page.evaluate(() =>
    (window as unknown as VoiceTestWindow).brainrotTest.release!(),
  );
  await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
  expect(
    await page.evaluate(
      () => (window as unknown as VoiceTestWindow).brainrotTest.terminated,
    ),
  ).toBe(0);
  const texts = await page.evaluate(
    () => (window as unknown as VoiceTestWindow).brainrotTest.texts,
  );
  expect(texts.filter((text) => text === texts[0])).toHaveLength(1);
});

test('switching between quiet and loud voices keeps playback volume consistent', async ({
  page,
}) => {
  await mockVoice(page);
  await page.addInitScript(() => {
    const createURL = URL.createObjectURL;
    URL.createObjectURL = (blob) => {
      if (blob instanceof Blob && /wav/.test(blob.type))
        Object.assign(window, { lastVoiceAudio: blob });
      return createURL(blob);
    };
  });
  const dialog = await openReader(page);
  const levels = [];
  for (const model of ['piper', 'miro', 'dii']) {
    await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
    await page.getByLabel('Voz', { exact: true }).selectOption(model);
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await page.evaluate(() => Object.assign(window, { lastVoiceAudio: null }));
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    await page.waitForFunction(
      () => !!(window as unknown as { lastVoiceAudio: Blob }).lastVoiceAudio,
    );
    await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
    levels.push(
      await page.evaluate(async () => {
        const blob = (window as unknown as { lastVoiceAudio: Blob })
          .lastVoiceAudio;
        const context = new AudioContext();
        const decoded = await context.decodeAudioData(await blob.arrayBuffer());
        const samples = decoded.getChannelData(0);
        const rms = Math.sqrt(
          samples.reduce((sum, sample) => sum + sample * sample, 0) /
            samples.length,
        );
        const peak = samples.reduce(
          (max, sample) => Math.max(max, Math.abs(sample)),
          0,
        );
        await context.close();
        return { db: 20 * Math.log10(rms), peak };
      }),
    );
  }
  expect(
    Math.max(...levels.map((level) => level.db)) -
      Math.min(...levels.map((level) => level.db)),
  ).toBeLessThan(1);
  expect(levels.every((level) => level.peak < 0.95 && level.db > -24)).toBe(
    true,
  );
});

test('Portuguese models are available on every device and switching voice replaces the audio', async ({
  page,
}) => {
  await mockVoice(page, false, 4);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'speechSynthesis', {
      value: {
        getVoices: () => [
          {
            name: 'Joana',
            voiceURI: 'joana',
            lang: 'pt-PT',
            localService: true,
          },
        ],
        addEventListener() {},
        speak() {
          throw new Error('The reader must use its Portuguese model');
        },
      },
    });
  });
  const dialog = await openReader(page);
  const settings = dialog.getByRole('button', {
    name: 'Definições do leitor',
  });
  await settings.click();
  const voices = page.getByLabel('Voz', { exact: true });
  await expect(voices.locator('option')).toHaveText([
    'Tugão',
    'Dii',
    'Miro',
    'Eduardo Rêgo',
    'Fernando Mendes',
    'José Mourinho',
    'Ricardo Araújo Pereira',
    'Herman José',
    'Toy',
    'Nuno Markl',
    'Só legendas',
  ]);
  for (const model of ['miro', 'dii', 'piper']) {
    await voices.selectOption(model);
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
    await expect
      .poll(() =>
        page.evaluate(() =>
          (window as unknown as VoiceTestWindow).brainrotTest.models.at(-1),
        ),
      )
      .toBe(model);
    await settings.click();
  }
  await voices.selectOption('silent');
  expect(
    await page.evaluate(
      () => (window as unknown as VoiceTestWindow).brainrotTest.terminated,
    ),
  ).toBe(3);
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await expect(dialog.locator('.brainrot-sound-off')).toBeVisible();
  const before = await page.evaluate(
    () => (window as unknown as VoiceTestWindow).brainrotTest.models.length,
  );
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await page.waitForTimeout(200);
  expect(
    await page.evaluate(
      () => (window as unknown as VoiceTestWindow).brainrotTest.models.length,
    ),
  ).toBe(before);
});

async function nextCue(dialog: Locator) {
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await dialog.getByRole('button', { name: 'Trecho seguinte' }).click();
  await dialog.getByRole('button', { name: 'Fechar definições' }).click();
}

test('desktop volume remains reachable above the button and mute restores its level', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const NativeAudio = Audio;
    window.Audio = class extends NativeAudio {
      constructor(src?: string) {
        super(src);
        Object.assign(window, { readerAudio: this });
      }
    };
  });
  const dialog = await openReader(page);
  const mute = dialog.locator('[data-br-mute]');
  const volume = dialog.getByRole('slider', { name: 'Volume', exact: true });
  await mute.hover();
  await expect(volume).toBeVisible();
  await volume.hover();
  await expect(volume).toBeVisible();
  await volume.fill('35');
  const actualVolume = () =>
    page.evaluate(
      () =>
        (window as unknown as { readerAudio: HTMLAudioElement }).readerAudio
          .volume,
    );
  await expect.poll(actualVolume).toBeCloseTo(0.35);
  await mute.click();
  await expect(mute).toHaveAccessibleName('Ativar som');
  await expect.poll(actualVolume).toBe(0);
  await mute.click();
  await expect.poll(actualVolume).toBeCloseTo(0.35);
  await expect(dialog.locator('#brainrot-voice-settings')).not.toBeVisible();
  await page.mouse.move(0, 0);
  await dialog.locator('.brainrot-feed').focus();
  await expect(volume).not.toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  await expect(dialog).toBeVisible();
  await expect.poll(actualVolume).toBeCloseTo(0.35);
});

test('caption and social preferences survive navigation without starting a voice', async ({
  page,
}) => {
  await mockVoice(page);
  let dialog = await openReader(page);
  const caption = dialog.locator('.brainrot-caption');
  const originalFontSize = parseFloat(
    await caption.evaluate((e) => getComputedStyle(e).fontSize),
  );
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page.getByLabel('Voz', { exact: true }).selectOption('silent');
  await page.getByLabel('Velocidade da leitura').selectOption('1.25');
  await page.getByLabel('Tipo de letra das legendas').selectOption('lexend');
  await page.getByLabel('Tamanho das legendas').fill('120');
  await page.getByLabel('Uma palavra de cada vez').check();
  await page.getByLabel('Realçar leitura').uncheck();
  for (const label of ['Avatar do canal', 'Gostos', 'Comentários', 'Favoritos'])
    await page.getByLabel(label, { exact: true }).uncheck();
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await expect(caption.locator(':scope > span')).toHaveCount(1);
  await expect(caption).toHaveCSS(
    'font-family',
    '"Lexend Variable", sans-serif',
  );
  expect(
    parseFloat(await caption.evaluate((e) => getComputedStyle(e).fontSize)),
  ).toBeCloseTo(originalFontSize * 1.2);
  for (const item of ['channel', 'likes', 'comments', 'bookmarks'])
    await expect(
      dialog.locator(`[data-br-decoration="${item}"]`),
    ).not.toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Partilhar', exact: true }),
  ).toBeVisible();
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  const first = await caption.textContent();
  await expect(caption).not.toHaveText(first!);
  await expect(caption.locator(':scope > span')).toHaveCount(1);
  expect(
    await page.evaluate(
      () => (window as unknown as VoiceTestWindow).brainrotTest.texts,
    ),
  ).toEqual([]);
  await page.reload();
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await expect(page.getByLabel('Voz', { exact: true })).toHaveValue('silent');
  await expect(page.getByLabel('Velocidade da leitura')).toHaveValue('1.25');
  await expect(page.getByLabel('Uma palavra de cada vez')).toBeChecked();
  await expect(page.getByLabel('Realçar leitura')).not.toBeChecked();
  await expect(page.getByLabel('Tipo de letra das legendas')).toHaveValue(
    'lexend',
  );
  await expect(page.getByLabel('Tamanho das legendas')).toHaveValue('120');
  for (const label of ['Avatar do canal', 'Gostos', 'Comentários', 'Favoritos'])
    await expect(page.getByLabel(label, { exact: true })).not.toBeChecked();
});

test('desktop opening and closing animate the phone and restore focus, with a reduced-motion path', async ({
  page,
}) => {
  const dialog = await openReader(page);
  const shell = dialog.locator('.brainrot-shell');
  const entranceTop = await shell.evaluate((element) => {
    const animation = element.getAnimations()[0];
    animation.pause();
    animation.currentTime = 100;
    return element.getBoundingClientRect().top;
  });
  expect(entranceTop).toBeGreaterThan(100);
  await expect(dialog.locator('.brainrot-clip-controls')).toHaveCSS(
    'opacity',
    '0',
  );
  await shell.evaluate((element) =>
    element.getAnimations().forEach((animation) => animation.finish()),
  );
  const stage = await dialog.locator('.brainrot-stage').boundingBox();
  const controls = await dialog
    .locator('.brainrot-clip-controls')
    .boundingBox();
  expect(controls!.x).toBeGreaterThan(stage!.x + stage!.width);
  await dialog.getByRole('button', { name: 'Voltar à página' }).click();
  await expect(dialog).not.toBeVisible();
  const opener = page.getByRole('button', { name: 'Brain rot', exact: true });
  await expect(opener).toBeFocused();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await opener.click();
  expect(
    await shell.evaluate((element) => element.getAnimations().length),
  ).toBe(0);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('Escape closes the reading options before closing the reader', async ({
  page,
}) => {
  const dialog = await openReader(page);
  const options = dialog.locator('#brainrot-voice-settings');
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page.keyboard.press('Escape');
  await expect(options).not.toHaveAttribute('open');
  await expect(dialog).toBeVisible();
  await expect(dialog).not.toHaveAttribute('data-closing', 'true');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('cards accept pause taps, suppress duplicate captions and stay centred on the video', async ({
  page,
}) => {
  await mockVoice(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML =
      '<pre><code>print("Um exemplo")</code></pre><h2>Depois do código</h2>';
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await nextCue(dialog);
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
  const card = dialog.getByRole('region', {
    name: 'Imagem, fórmula ou exemplo da página',
  });
  await card.click({ position: { x: 12, y: 12 } });
  await expect
    .soft(dialog.getByRole('button', { name: 'Iniciar leitura' }))
    .toBeVisible();
  await expect.soft(dialog.locator('.brainrot-caption')).not.toBeVisible();
  const box = await card.boundingBox();
  const stage = await dialog.locator('.brainrot-stage').boundingBox();
  expect
    .soft(Math.abs(box!.x + box!.width / 2 - (stage!.x + stage!.width / 2)))
    .toBeLessThan(1);
  const rail = await dialog.locator('.brainrot-social').boundingBox();
  expect(box!.x + box!.width).toBeLessThan(rail!.x);
  const playBox = await dialog.locator('[data-br-play]').boundingBox();
  expect(
    Math.abs(playBox!.y + playBox!.height / 2 - (stage!.y + stage!.height / 2)),
  ).toBeLessThan(1);
  expect(
    Math.abs(playBox!.x + playBox!.width / 2 - (stage!.x + stage!.width / 2)),
  ).toBeLessThan(1);
  await expect(card.locator('[data-current-line]')).toHaveCount(0);
});

test('caption wrapping never splits a spoken sentence and highlighting is optional', async ({
  page,
}) => {
  await mockVoice(page, false, 4);
  const sentence =
    'Esta frase tem palavras suficientes para ocupar várias legendas e deve continuar sem cortes artificiais na voz.';
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body, text) => {
    body.innerHTML = `<p>${text}</p><p>A frase seguinte.</p>`;
  }, sentence);
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await nextCue(dialog);
  await expect(dialog.locator('.brainrot-caption')).toHaveText(
    'Esta frase tem palavras suficientes para',
  );
  await expect(dialog.locator('[data-current-word]')).toHaveCount(1);
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await expect(
    page.getByRole('checkbox', { name: 'Realçar leitura' }),
  ).toBeChecked();
  await page.getByRole('checkbox', { name: 'Realçar leitura' }).uncheck();
  await expect(dialog.locator('[data-current-word]')).toHaveCount(0);
  await page.getByRole('checkbox', { name: 'Realçar leitura' }).check();
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(
    dialog.locator('.brainrot-caption [data-current-word]'),
  ).toBeVisible();
  await expect(dialog.locator('.brainrot-caption')).toHaveText(
    'ocupar várias legendas e deve continuar',
    { timeout: 3000 },
  );
  const spoken = await page.evaluate(
    () =>
      (window as unknown as { brainrotTest: { texts: string[] } }).brainrotTest
        .texts,
  );
  expect(spoken).toEqual([sentence, 'A frase seguinte.']);
});

test('the time scrubber follows the reading in seconds and previews its position while dragging', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML = '<p>Olá mundo.</p>';
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page.getByLabel('Voz', { exact: true }).selectOption('silent');
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  const seek = dialog.getByRole('slider', { name: 'Posição na leitura' });
  await expect(dialog.locator('[data-br-time]')).toHaveText('00:00 / 00:04');
  await expect(dialog.locator('[data-br-time]')).not.toBeVisible();
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect
    .poll(async () => Number(await seek.inputValue()))
    .toBeGreaterThan(0.5);
  const box = (await seek.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2);
  await page.mouse.down();
  await expect(dialog.locator('[data-br-time]')).toBeVisible();
  await expect(dialog.locator('[data-br-time]')).toHaveText(
    /00:0[23] \/ 00:04/,
  );
  await page.mouse.up();
  await expect(dialog.locator('.brainrot-caption')).toHaveText('Olá mundo.');
  await expect(
    dialog.getByRole('button', { name: 'Pausar leitura' }),
  ).toBeVisible();
});

test('share copies only the canonical URL and the settings cog opens voice controls', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.assign(window, { copiedLinks: [] as string[] });
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (value: string) =>
          (window as unknown as { copiedLinks: string[] }).copiedLinks.push(
            value,
          ),
      },
    });
  });
  const dialog = await openReader(page);
  await dialog.getByRole('button', { name: 'Partilhar', exact: true }).click();
  const panel = page.getByRole('dialog', {
    name: 'Partilhar página',
    exact: true,
  });
  await expect(panel.getByLabel('Ligação da página')).toHaveValue(
    'https://resumos.rgo.pt/exemplo/apontamentos/',
  );
  await panel.getByRole('button', { name: 'Copiar ligação' }).click();
  await expect(panel.getByRole('status')).toHaveText('Ligação copiada.');
  expect(
    await page.evaluate(
      () => (window as unknown as { copiedLinks: string[] }).copiedLinks,
    ),
  ).toEqual(['https://resumos.rgo.pt/exemplo/apontamentos/']);
  await page.keyboard.press('Escape');
  await expect(
    dialog.getByRole('button', { name: 'Partilhar', exact: true }),
  ).toBeFocused();
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page.getByLabel('Velocidade da leitura').selectOption('1.5');
  await expect(
    page.getByRole('checkbox', { name: 'Silenciar voz' }),
  ).toHaveCount(0);
  await page.getByLabel('Voz', { exact: true }).selectOption('silent');
  expect(
    (
      await new AxeBuilder({ page })
        .include('#brainrot-voice-settings')
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await expect(page.getByLabel('Velocidade da leitura')).toHaveValue('1.5');
  await expect(page.getByLabel('Voz', { exact: true })).toHaveValue('silent');
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await expect(dialog.locator('.brainrot-sound-off')).toBeVisible();
  await expect(dialog.locator('.brainrot-sound-on')).not.toBeVisible();
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page.getByLabel('Voz', { exact: true }).selectOption('piper');
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await expect(dialog.locator('.brainrot-sound-on')).toBeVisible();
  await expect(dialog.locator('.brainrot-sound-off')).not.toBeVisible();
});

test('code keeps legible syntax colours and YouTube appears as a clickable preview without captions', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML =
      '<section data-playground data-language="c"><pre data-source hidden><code class="language-c">#include &lt;stdio.h&gt;\nint main() { printf("Olá"); return 0; }</code></pre></section><div data-video="dQw4w9WgXcQ" data-title="Um vídeo de exemplo"></div>';
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await nextCue(dialog);
  const visual = dialog.locator('.brainrot-visual');
  await expect(visual.locator('.tok-keyword').first()).toBeVisible();
  await expect(visual.locator('.tok-string').first()).toBeVisible();
  const colors = await visual
    .locator('pre span')
    .evaluateAll((nodes) => [
      ...new Set(nodes.map((node) => getComputedStyle(node).color)),
    ]);
  expect(colors.length).toBeGreaterThanOrEqual(3);
  expect(colors).not.toContain('rgb(238, 237, 240)');
  await expect(dialog.locator('.brainrot-caption')).not.toBeVisible();
  await nextCue(dialog);
  const preview = dialog.getByRole('link', {
    name: /Clica para ver este vídeo agora/,
  });
  await expect(preview).toHaveAttribute(
    'href',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  );
  await preview
    .getByText('Clica para ver este vídeo agora')
    .click({ trial: true, timeout: 2000 });
  await preview.click({ trial: true, timeout: 2000 });
  await expect(preview.getByRole('img')).toHaveAttribute(
    'src',
    'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  );
  await expect(dialog.locator('.brainrot-caption')).not.toBeVisible();
});

test('voice and clips stay lazy; captions follow audio and pause with the reader', async ({
  page,
}) => {
  await mockVoice(page);
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/exemplo/apontamentos/');
  expect(
    requests.filter((url) =>
      /brainrot\/.*mp4|huggingface|piper|onnx/.test(url),
    ),
  ).toEqual([]);
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('.brainrot-caption')).toHaveText(
    'Texto e fórmulas',
  );
  await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
  await expect(dialog.locator('.brainrot-caption')).toHaveText(
    'Uma ideia de cada vez',
    { timeout: 6000 },
  );
  await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
  const paused = await dialog.locator('.brainrot-caption').textContent();
  await page.waitForTimeout(2300);
  await expect(dialog.locator('.brainrot-caption')).toHaveText(paused!);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Brain rot', exact: true }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { brainrotTest: { terminated: number } })
          .brainrotTest.terminated,
    ),
  ).toBeGreaterThan(0);
  expect(requests.filter((url) => /huggingface|piper|onnx/.test(url))).toEqual(
    [],
  );
});

test('the infinite feed alternates games without changing the lesson position or retaining off-screen videos', async ({
  page,
}) => {
  const dialog = await openReader(page);
  const caption = await dialog.locator('.brainrot-caption').textContent();
  const first = await dialog.locator('[data-br-clip-name]').textContent();
  const visited = [first];
  let previous = first;
  for (let step = 0; step < 7; step++) {
    await dialog
      .getByRole('button', { name: 'Vídeo seguinte', exact: true })
      .click();
    await expect(dialog.locator('[data-br-clip-name]')).not.toHaveText(
      previous!,
    );
    previous = await dialog.locator('[data-br-clip-name]').textContent();
    visited.push(previous);
    await expect(dialog.locator('.brainrot-caption')).toHaveText(caption!);
    await expect(dialog.locator('video')).toHaveCount(3);
    await expect(dialog.locator('video[src]')).toHaveCount(2);
  }
  await dialog
    .getByRole('button', { name: 'Vídeo anterior', exact: true })
    .click();
  await expect(dialog.locator('[data-br-clip-name]')).toHaveText(
    visited.at(-2)!,
  );
});

test('the reader preserves mixed text, nested lists, images and maths while excluding private controls', async ({
  page,
}) => {
  await mockVoice(page);
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML =
      '<p>Antes <img src="/examples/pontos.svg" alt="Pontos da soma"> depois.</p><ul><li>Pai<ul><li>Filho</li></ul></li></ul><p data-annotation-ignore>NOTA PRIVADA</p><p data-pagefind-ignore>CONTROLO PRIVADO</p><p>Fim.</p>';
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  const captions: string[] = [];
  while (true) {
    captions.push((await dialog.locator('.brainrot-caption').textContent())!);
    if (await dialog.locator('[data-br-next]').isDisabled()) break;
    await nextCue(dialog);
  }
  expect(captions).toEqual([
    'Texto e fórmulas',
    'Antes',
    'Pontos da soma',
    'depois.',
    'Pai',
    'Filho',
    'Fim.',
  ]);
  await expect(
    dialog.getByRole('img', { name: 'Pontos da soma' }),
  ).not.toBeVisible();
  await expect(dialog.locator('.brainrot-caption')).toBeVisible();
});

test('inline maths stays in highlighted captions and visual cards end with their own cue', async ({
  page,
}) => {
  await mockVoice(page, false, 4);
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    const math = [...body.querySelectorAll('.katex')].find(
      (node) => !node.closest('.katex-display'),
    )!.outerHTML;
    body.innerHTML = `<p>A soma ${math} dá cinco.</p><img src="/examples/pontos.svg" alt="Pontos da soma"><p>Agora seguimos em frente.</p><h2>O caso ${math}</h2><div>Este caso ${math} continua.</div>`;
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await nextCue(dialog);
  await expect(dialog.locator('.brainrot-visual')).not.toBeVisible();
  await expect(dialog.locator('.brainrot-caption .katex')).toBeVisible();
  await expect(
    dialog.locator('.brainrot-caption [data-current-word]'),
  ).toHaveText('A');
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(
    dialog.locator('.brainrot-caption [data-current-word] .katex'),
  ).toBeVisible();
  await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
  await nextCue(dialog);
  await expect(
    dialog.getByRole('img', { name: 'Pontos da soma' }),
  ).toBeVisible();
  await expect(dialog.locator('.brainrot-caption')).not.toBeVisible();
  await nextCue(dialog);
  await expect(dialog.locator('.brainrot-visual')).not.toBeVisible();
  await expect(dialog.locator('.brainrot-caption')).toHaveText(
    'Agora seguimos em frente.',
  );
  await expect(dialog.locator('.brainrot-caption')).toBeVisible();
  await nextCue(dialog);
  await expect(dialog.locator('.brainrot-caption .katex')).toBeVisible();
  await nextCue(dialog);
  await expect(dialog.locator('.brainrot-caption .katex')).toBeVisible();
});

test('scrolling over a code card changes the background without changing the reading', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML = '<pre><code>print("Exemplo")</code></pre>';
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await nextCue(dialog);
  const label = dialog.locator('[data-br-clip-name]');
  const initial = await label.textContent();
  const position = await dialog.locator('[data-br-position]').textContent();
  const card = await dialog.locator('.brainrot-visual').boundingBox();
  await page.mouse.move(card!.x + 12, card!.y + 12);
  await page.mouse.wheel(0, 550);
  await expect(label).not.toHaveText(initial!);
  await expect(dialog.locator('[data-br-position]')).toHaveText(position!);
});

test('formulas remain readable and use mathematical speech rather than duplicated KaTeX text', async ({
  page,
}) => {
  await mockVoice(page);
  const dialog = await openReader(page);
  for (let step = 0; step < 20; step++) {
    if (
      (await dialog.locator('.brainrot-caption').textContent())?.includes(
        'somatório',
      )
    )
      break;
    await nextCue(dialog);
  }
  await expect(dialog.locator('.brainrot-visual .katex-display')).toBeVisible();
  await expect(dialog.locator('.brainrot-caption')).toContainText('somatório');
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
  const spoken = await page.evaluate(() =>
    (
      window as unknown as { brainrotTest: { texts: string[] } }
    ).brainrotTest.texts.join(' '),
  );
  expect(spoken).toContain('somatório');
  expect(spoken).not.toMatch(/abre parênteses|fecha parênteses/);
});

test('web examples show their published source rather than the visitor edit', async ({
  page,
}) => {
  await page.goto('/exemplo/apontamentos/');
  await page.locator('[data-annotatable]').evaluate((body) => {
    body.innerHTML =
      '<section data-web-playground data-annotation-ignore><textarea data-html>&lt;p&gt;Exemplo publicado&lt;/p&gt;</textarea><textarea data-css>p { color: red; }</textarea><textarea data-js></textarea></section>';
    body.querySelector('textarea')!.value = '<p>EDIÇÃO PRIVADA</p>';
  });
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await nextCue(dialog);
  await expect(dialog.locator('.brainrot-visual')).toContainText(
    '<p>Exemplo publicado</p>',
  );
  await expect(dialog.locator('.brainrot-visual')).not.toContainText(
    'EDIÇÃO PRIVADA',
  );
});

test('voice errors offer retry and an explicit caption-only mode', async ({
  page,
}) => {
  await mockVoice(page, true);
  const dialog = await openReader(page);
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.getByRole('status')).toContainText('Não foi possível');
  await dialog.locator('.brainrot-feed video').nth(1).dispatchEvent('error');
  await expect(dialog.getByRole('status')).toContainText('Não foi possível');
  await expect(
    dialog.getByRole('button', { name: 'Iniciar leitura' }),
  ).toBeEnabled();
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page
    .getByRole('dialog', { name: 'Definições', exact: true })
    .getByLabel('Voz', { exact: true })
    .selectOption('silent');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('.brainrot-caption')).toHaveText(
    'Uma ideia de cada vez',
    { timeout: 6000 },
  );
});

test('leaving the page closes the reader before a back-forward cache restore', async ({
  page,
}) => {
  const dialog = await openReader(page);
  await page.evaluate(() =>
    window.dispatchEvent(
      new PageTransitionEvent('pagehide', { persisted: true }),
    ),
  );
  await page.evaluate(() =>
    window.dispatchEvent(
      new PageTransitionEvent('pageshow', { persisted: true }),
    ),
  );
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  await expect(dialog.locator('video[src]')).toHaveCount(2);
  await page.goto('/exemplo/diagramas/');
  await page.goBack();
  await expect(
    page.getByRole('dialog', { name: 'Brain rot', exact: true }),
  ).not.toBeVisible();
});

test('the player fits narrow screens and exposes labelled keyboard controls', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const dialog = await openReader(page);
  await expect(
    dialog.getByRole('button', { name: 'Voltar à página' }),
  ).toBeFocused();
  await expect(dialog.locator('#brainrot-voice-settings')).not.toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Início', exact: true }),
  ).toBeEnabled();
  for (const name of [
    'Descobrir, indisponível',
    'Criar, indisponível',
    'Caixa de entrada, indisponível',
    'Perfil, indisponível',
  ])
    await expect(
      dialog.getByRole('button', { name, exact: true }),
    ).toBeDisabled();
  expect(
    await dialog.evaluate(
      (element) => element.scrollWidth <= element.clientWidth,
    ),
  ).toBe(true);
  const accessibility = await new AxeBuilder({ page })
    .include('#brainrot')
    .analyze();
  expect(accessibility.violations).toEqual([]);
});

test.describe('touch feed', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('the volume button toggles sound on touch without opening a slider or settings', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const NativeAudio = Audio;
      window.Audio = class extends NativeAudio {
        constructor(src?: string) {
          super(src);
          Object.assign(window, { readerAudio: this });
        }
      };
      // Touch browsers may leave the playback level under hardware control.
      Object.defineProperty(HTMLMediaElement.prototype, 'volume', {
        get: () => 1,
        set: () => {},
      });
    });
    const dialog = await openReader(page);
    const mute = dialog.getByRole('button', { name: 'Silenciar som' });
    await mute.tap();
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { readerAudio: HTMLAudioElement }).readerAudio
            .muted,
      ),
    ).toBe(true);
    await expect(
      dialog.getByRole('button', { name: 'Ativar som' }),
    ).toBeVisible();
    await expect(
      dialog.getByRole('slider', { name: 'Volume', exact: true }),
    ).not.toBeVisible();
    await expect(dialog.locator('#brainrot-voice-settings')).not.toBeVisible();
    await dialog.getByRole('button', { name: 'Ativar som' }).tap();
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { readerAudio: HTMLAudioElement }).readerAudio
            .muted,
      ),
    ).toBe(false);
    await expect(mute).toBeVisible();
  });

  test('holding a swipe does not recycle the clip before the finger is lifted', async ({
    page,
  }) => {
    const dialog = await openReader(page);
    const name = dialog.locator('[data-br-clip-name]');
    const previous = await name.textContent();
    const input = await page.context().newCDPSession(page);
    await input.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 110, y: 630 }],
    });
    for (let y = 590; y >= 150; y -= 40) {
      await input.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: 110, y }],
      });
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(350);
    expect(await name.textContent()).toBe(previous);
    await input.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await expect(name).not.toHaveText(previous!);
  });

  test('tapping pauses and swiping changes games without restarting the reading', async ({
    page,
  }) => {
    await mockVoice(page);
    const dialog = await openReader(page);
    const input = await page.context().newCDPSession(page);
    await page.touchscreen.tap(110, 180);
    await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
    await dialog.getByRole('button', { name: 'Definições do leitor' }).tap();
    await page.getByRole('button', { name: 'Fechar definições' }).tap();
    await page.touchscreen.tap(110, 180);
    await expect(
      dialog.getByRole('button', { name: 'Iniciar leitura' }),
    ).toBeVisible();
    const caption = await dialog.locator('.brainrot-caption').textContent();
    await dialog.evaluate((element) => {
      const feed = element.querySelector('.brainrot-feed')!;
      let scrolling = false;
      Object.assign(window, { clipChangedDuringScroll: false });
      feed.addEventListener('scroll', () => (scrolling = true));
      feed.addEventListener('scrollend', () => (scrolling = false), {
        capture: true,
      });
      new MutationObserver(() => {
        if (scrolling) Object.assign(window, { clipChangedDuringScroll: true });
      }).observe(element.querySelector('[data-br-clip-name]')!, {
        childList: true,
      });
    });
    for (let step = 0; step < 3; step++) {
      const previous = await dialog
        .locator('[data-br-clip-name]')
        .textContent();
      await input.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x: 110, y: 630 }],
      });
      for (let y = 590; y >= 190; y -= 40) {
        await input.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x: 110, y }],
        });
        await page.waitForTimeout(16);
      }
      await input.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: [],
      });
      await expect(dialog.locator('[data-br-clip-name]')).not.toHaveText(
        previous!,
      );
      await expect(dialog.locator('.brainrot-caption')).toHaveText(caption!);
      await expect(
        dialog.getByRole('button', { name: 'Iniciar leitura' }),
      ).toBeVisible();
      await expect(dialog.locator('video[src]')).toHaveCount(2);
    }
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { clipChangedDuringScroll: boolean })
            .clipChangedDuringScroll,
      ),
    ).toBe(false);
  });
  test('swiping a media card changes game without opening its link or starting playback', async ({
    page,
  }) => {
    await page.goto('/exemplo/apontamentos/');
    await page.locator('[data-annotatable]').evaluate((body) => {
      body.innerHTML =
        '<div data-video="dQw4w9WgXcQ" data-title="Um vídeo"></div>';
    });
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
    await nextCue(dialog);
    const box = (await dialog
      .locator('.brainrot-video-preview')
      .boundingBox())!;
    const previous = await dialog.locator('[data-br-clip-name]').textContent();
    const input = await page.context().newCDPSession(page);
    const x = box.x + 20;
    const y = box.y + box.height - 20;
    await input.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x, y }],
    });
    for (let delta = 20; delta <= 120; delta += 20) {
      await input.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x, y: y - delta }],
      });
      await page.waitForTimeout(16);
    }
    await input.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await expect(dialog.locator('[data-br-clip-name]')).not.toHaveText(
      previous!,
    );
    await expect(
      dialog.getByRole('button', { name: 'Iniciar leitura' }),
    ).toBeVisible();
    expect(page.context().pages()).toHaveLength(1);
  });
});

test('landscape keeps the top controls apart and the formula readable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  const dialog = await openReader(page);
  await dialog.locator('.brainrot-shell').evaluate(async (element) => {
    await Promise.all(
      element.getAnimations().map((animation) => animation.finished),
    );
  });
  const back = await dialog
    .getByRole('button', { name: 'Voltar à página' })
    .boundingBox();
  const tabs = await dialog.locator('.brainrot-tabs').boundingBox();
  const menu = await dialog
    .getByRole('button', { name: 'Definições do leitor' })
    .boundingBox();
  expect(tabs!.x).toBeGreaterThan(back!.x + back!.width);
  expect(tabs!.x + tabs!.width).toBeLessThan(menu!.x);
  for (let step = 0; step < 20; step++) {
    if (
      (await dialog.locator('.brainrot-caption').textContent())?.includes(
        'somatório',
      )
    )
      break;
    await nextCue(dialog);
  }
  const formula = await dialog.locator('.brainrot-visual').boundingBox();
  await expect(dialog.locator('.brainrot-caption')).not.toBeVisible();
  const stage = await dialog.locator('.brainrot-stage').boundingBox();
  const topic = await dialog.locator('.brainrot-topic').boundingBox();
  const play = await dialog
    .getByRole('button', { name: 'Iniciar leitura' })
    .boundingBox();
  expect(formula!.y).toBeGreaterThan(back!.y + back!.height);
  expect(formula!.y + formula!.height).toBeLessThan(topic!.y);
  expect(
    Math.abs(formula!.x + formula!.width / 2 - (stage!.x + stage!.width / 2)),
  ).toBeLessThan(1);
  expect(
    Math.abs(play!.x + play!.width / 2 - (stage!.x + stage!.width / 2)),
  ).toBeLessThan(1);
  expect(
    Math.abs(play!.y + play!.height / 2 - (stage!.y + stage!.height / 2)),
  ).toBeLessThan(1);
});

for (const [model, modelFile] of [
  ['piper', 'pt_PT-tug%C3%A3o-medium.onnx'],
  ['miro', 'miro_pt-PT.onnx'],
  ['dii', 'dii_pt-PT.onnx'],
  ['rego', 'manifest.json'],
  ['markl', 'manifest.json'],
]) {
  test(`the real ${model} model speaks locally without uploading lesson text`, async ({
    page,
  }, testInfo) => {
    test.skip(
      process.env.RESUMOS_REAL_TTS !== '1',
      'Opt-in model and WASM downloads.',
    );
    test.setTimeout(240_000);
    const requests: { url: string; method: string; body: string | null }[] = [];
    page.on('request', (request) =>
      requests.push({
        url: request.url(),
        method: request.method(),
        body: request.postData(),
      }),
    );
    await page.addInitScript(() => {
      const chunks: number[][] = [];
      Object.assign(window, {
        streamedVoiceChunks: chunks,
        streamedVoiceFinished: false,
      });
      const start = AudioBufferSourceNode.prototype.start;
      AudioBufferSourceNode.prototype.start = function (...args) {
        if (this.buffer) chunks.push(Array.from(this.buffer.getChannelData(0)));
        return start.apply(this, args);
      };
      const NativeWorker = Worker;
      window.Worker = class extends NativeWorker {
        constructor(url: string | URL, options?: WorkerOptions) {
          super(url, options);
          this.addEventListener('message', ({ data }) => {
            if (data.type === 'end')
              Object.assign(window, { streamedVoiceFinished: true });
          });
        }
      };
      const createURL = URL.createObjectURL;
      URL.createObjectURL = (blob) => {
        if (blob instanceof Blob && /wav/.test(blob.type))
          Object.assign(window, { voiceSample: blob });
        return createURL(blob);
      };
    });
    const sentence =
      'Hoje vamos estudar os apontamentos de programação e perceber como a função recebe três números e devolve a sua soma.';
    await page.goto('/exemplo/apontamentos/');
    await page.locator('.lesson-heading h1').evaluate((heading, text) => {
      heading.textContent = text;
    }, sentence);
    await page.locator('[data-annotatable]').evaluate((body) => {
      body.replaceChildren();
    });
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
    await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
    await page.getByLabel('Voz', { exact: true }).selectOption(model);
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    await expect(dialog.locator('[data-br-status]')).toHaveText(
      'Voz local · Português de Portugal',
      { timeout: 180_000 },
    );
    if (modelFile === 'manifest.json')
      await page.waitForFunction(
        () =>
          (window as unknown as { streamedVoiceFinished: boolean })
            .streamedVoiceFinished,
        null,
        { timeout: 180_000 },
      );
    await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
    const sample = await page.evaluate(async () => {
      const chunks = (window as unknown as { streamedVoiceChunks: number[][] })
        .streamedVoiceChunks;
      if (chunks.length) {
        const samples = chunks.flat();
        return {
          samples,
          bytes: [] as number[],
          duration: samples.length / 24_000,
          peak: samples.reduce(
            (max, value) => Math.max(max, Math.abs(value)),
            0,
          ),
        };
      }
      const wav = (window as unknown as { voiceSample: Blob }).voiceSample;
      const bytes = await wav.arrayBuffer();
      const context = new AudioContext();
      const decoded = await context.decodeAudioData(bytes.slice(0));
      const result = {
        samples: undefined as number[] | undefined,
        bytes: Array.from(new Uint8Array(bytes)),
        duration: decoded.duration,
        peak: decoded
          .getChannelData(0)
          .reduce((max, value) => Math.max(max, Math.abs(value)), 0),
      };
      await context.close();
      return result;
    });
    expect(sample.duration).toBeGreaterThan(3);
    expect(sample.peak).toBeGreaterThan(0.01);
    const samplePath = testInfo.outputPath(`${model}.wav`);
    await writeFile(
      samplePath,
      sample.samples
        ? Buffer.from(
            await speechWav(
              Float32Array.from(sample.samples),
              24_000,
            ).arrayBuffer(),
          )
        : Buffer.from(sample.bytes),
    );
    await testInfo.attach(`${model}.wav`, {
      path: samplePath,
      contentType: 'audio/wav',
    });
    expect(requests.some(({ url }) => url.endsWith(modelFile))).toBe(true);
    expect(
      requests.every(
        ({ method, body }) => ['GET', 'HEAD'].includes(method) && body === null,
      ),
    ).toBe(true);
    expect(
      requests.some(({ url }) =>
        decodeURIComponent(url)
          .replace(/\+/g, ' ')
          .includes('Hoje vamos estudar'),
      ),
    ).toBe(false);
  });
}

test.describe('personal voice recording', () => {
  test('a recording stays local, is used by Sopro, survives navigation and can be deleted', async ({
    page,
  }) => {
    const personalAudioCount = () =>
      page.evaluate(
        () =>
          new Promise<number>((resolve, reject) => {
            const request = indexedDB.open('resumos-speech-cache');
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
              const db = request.result;
              const tx = db.transaction('audio');
              const count = tx
                .objectStore('audio')
                .index('voice')
                .count('personal');
              tx.oncomplete = () => {
                db.close();
                resolve(count.result);
              };
            };
          }),
      );
    await mockVoice(page, false, 5);
    const uploads: string[] = [];
    page.on('request', (request) => {
      if (!['GET', 'HEAD'].includes(request.method()) || request.postData())
        uploads.push(request.url());
    });
    await page.addInitScript(() => {
      const getUserMedia = navigator.mediaDevices.getUserMedia.bind(
        navigator.mediaDevices,
      );
      const streams: MediaStream[] = [];
      Object.assign(window, { recordedStreams: streams });
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        const stream = await getUserMedia(constraints);
        streams.push(stream);
        return stream;
      };
    });
    const dialog = await openReader(page);
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
    await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { recordedStreams: MediaStream[] })
            .recordedStreams.length,
      ),
    ).toBe(0);
    await page
      .getByRole('button', { name: 'Gravar a minha voz', exact: true })
      .click();
    await expect(dialog.locator('[data-br-play]')).toHaveAttribute(
      'aria-label',
      'Iniciar leitura',
    );
    await page.getByRole('button', { name: 'Começar gravação' }).click();
    await expect(
      page.getByRole('button', { name: 'Terminar gravação' }),
    ).toBeVisible();
    await expect(page.locator('[data-br-record-time]')).toHaveText('6 / 30 s', {
      timeout: 10_000,
    });
    await page.getByRole('button', { name: 'Terminar gravação' }).click();
    await expect(
      page.getByRole('button', { name: 'Usar esta voz' }),
    ).toBeVisible();
    await expect(page.locator('[data-br-record-preview]')).toBeVisible();
    expect(
      await page.evaluate(() =>
        (
          window as unknown as { recordedStreams: MediaStream[] }
        ).recordedStreams.every((stream) =>
          stream.getTracks().every((track) => track.readyState === 'ended'),
        ),
      ),
    ).toBe(true);
    await page.getByRole('button', { name: 'Usar esta voz' }).click();
    await expect(page.getByLabel('Voz', { exact: true })).toHaveValue(
      'personal',
    );
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          (window as unknown as VoiceTestWindow).brainrotTest.models.at(-1),
        ),
      )
      .toBe('personal');
    const reference = await page.evaluate(() =>
      (window as unknown as VoiceTestWindow).brainrotTest.references.at(-1),
    );
    expect(reference).toBeGreaterThan(5 * 24_000);
    expect(reference).toBeLessThanOrEqual(30 * 24_000);
    await expect.poll(personalAudioCount).toBeGreaterThan(0);
    await page.goto('/cadeiras/am2/');
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    const voices = page.getByLabel('Voz', { exact: true });
    await expect(voices.locator('option[value="personal"]')).toBeAttached();
    await voices.selectOption('personal');
    await page.getByRole('button', { name: 'Apagar a minha voz' }).click();
    await expect(voices).toHaveValue('piper');
    await expect(voices.locator('option[value="personal"]')).toHaveCount(0);
    expect(await personalAudioCount()).toBe(0);
    await page.reload();
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await expect(
      page.getByRole('button', { name: 'Gravar a minha voz', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Apagar a minha voz' }),
    ).toBeHidden();
    expect(uploads).toEqual([]);
  });

  test('the microphone stops automatically and closing settings discards the unsaved recording', async ({
    page,
  }) => {
    test.setTimeout(40_000);
    await mockVoice(page);
    await openReader(page);
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await page
      .getByRole('button', { name: 'Gravar a minha voz', exact: true })
      .click();
    await page.getByRole('button', { name: 'Começar gravação' }).click();
    await expect(
      page.getByRole('button', { name: 'Usar esta voz' }),
    ).toBeVisible({ timeout: 35_000 });
    await expect(page.locator('[data-br-record-time]')).toHaveText('30 / 30 s');
    const preview = page.locator('[data-br-record-preview]');
    await expect
      .poll(() => preview.evaluate((audio: HTMLAudioElement) => audio.duration))
      .toBeGreaterThan(29);
    expect(
      await preview.evaluate((audio: HTMLAudioElement) => audio.duration),
    ).toBeLessThanOrEqual(30);
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await expect(
      page
        .getByLabel('Voz', { exact: true })
        .locator('option[value="personal"]'),
    ).toHaveCount(0);
    await expect(preview).not.toHaveAttribute('src');
  });

  test('a short recording can be retried and closing an active recording releases every track', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const original = navigator.mediaDevices.getUserMedia.bind(
        navigator.mediaDevices,
      );
      const streams: MediaStream[] = [];
      Object.assign(window, { activeRecordings: streams });
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        const stream = await original(constraints);
        streams.push(stream);
        return stream;
      };
    });
    await openReader(page);
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await page
      .getByRole('button', { name: 'Gravar a minha voz', exact: true })
      .click();
    await page.getByRole('button', { name: 'Começar gravação' }).click();
    await expect(page.locator('[data-br-record-time]')).toHaveText('1 / 30 s');
    await page.getByRole('button', { name: 'Terminar gravação' }).click();
    await expect(page.locator('[data-br-record-status]')).toContainText(
      'pelo menos 5 segundos',
    );
    await expect(
      page.getByRole('button', { name: 'Usar esta voz' }),
    ).toBeHidden();
    await page.getByRole('button', { name: 'Começar gravação' }).click();
    await expect(
      page.getByRole('button', { name: 'Terminar gravação' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await expect
      .poll(() =>
        page.evaluate(() =>
          (
            window as unknown as { activeRecordings: MediaStream[] }
          ).activeRecordings.every((stream) =>
            stream.getTracks().every((track) => track.readyState === 'ended'),
          ),
        ),
      )
      .toBe(true);
  });

  test('denied microphone access explains how to retry without changing the voice', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = async () => {
        throw new DOMException('Denied', 'NotAllowedError');
      };
    });
    await openReader(page);
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await page
      .getByRole('button', { name: 'Gravar a minha voz', exact: true })
      .click();
    await page.getByRole('button', { name: 'Começar gravação' }).click();
    await expect(page.locator('[data-br-record-status]')).toContainText(
      'Permite o acesso ao microfone',
    );
    await expect(
      page.getByRole('button', { name: 'Começar gravação' }),
    ).toBeEnabled();
    await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
    await expect(page.getByLabel('Voz', { exact: true })).toHaveValue('piper');
  });

  test('cancelling a pending permission request releases a microphone granted later', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      navigator.mediaDevices.getUserMedia = () =>
        new Promise((resolve) => {
          Object.assign(window, {
            grantMicrophone: () => {
              const context = new AudioContext();
              const stream = context.createMediaStreamDestination().stream;
              Object.assign(window, { lateStream: stream });
              resolve(stream);
            },
          });
        });
    });
    await openReader(page);
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await page
      .getByRole('button', { name: 'Gravar a minha voz', exact: true })
      .click();
    await page.getByRole('button', { name: 'Começar gravação' }).click();
    await expect(page.locator('[data-br-record-status]')).toContainText(
      'A pedir acesso',
    );
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await page.evaluate(() =>
      (window as unknown as { grantMicrophone: () => void }).grantMicrophone(),
    );
    await expect
      .poll(() =>
        page.evaluate(() =>
          (window as unknown as { lateStream: MediaStream }).lateStream
            .getTracks()
            .every((track) => track.readyState === 'ended'),
        ),
      )
      .toBe(true);
    await page.getByRole('button', { name: 'Definições do leitor' }).click();
    await expect(
      page
        .getByLabel('Voz', { exact: true })
        .locator('option[value="personal"]'),
    ).toHaveCount(0);
  });
});

for (const delivery of ['complete', 'stream'] as const) {
  test(`Sopro ${delivery} playback buffers speech and preserves pause and volume`, async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const NativeWorker = Worker;
      const state = {
        started: 0,
        sent: 0,
        send: (_finish = false) => {},
        outputVolume: () => 1,
      };
      Object.assign(window, { streamTest: state });
      const createGain = AudioContext.prototype.createGain;
      AudioContext.prototype.createGain = function () {
        const gain = createGain.call(this);
        state.outputVolume = () => gain.gain.value;
        return gain;
      };
      const start = AudioBufferSourceNode.prototype.start;
      AudioBufferSourceNode.prototype.start = function (...args) {
        state.started++;
        return start.apply(this, args);
      };
      window.Worker = class extends EventTarget {
        constructor(url: string | URL, options?: WorkerOptions) {
          super();
          if (!/brainrot-sopro/.test(String(url)))
            return new NativeWorker(url, options);
        }
        postMessage({ id, cancel }: { id: number; cancel?: number[] }) {
          if (cancel) return;
          state.send = (finish = false) => {
            state.sent++;
            const samples = Float32Array.from(
              { length: 36_000 },
              (_, i) => 0.12 * Math.sin(i * 0.1),
            );
            this.dispatchEvent(
              new MessageEvent('message', {
                data: { type: 'chunk', id, samples },
              }),
            );
            if (finish)
              this.dispatchEvent(
                new MessageEvent('message', { data: { type: 'end', id } }),
              );
          };
          state.send();
        }
        terminate() {}
      } as unknown as typeof Worker;
    });
    await page.goto('/exemplo/apontamentos/');
    await page
      .locator('.lesson-heading h1')
      .evaluate(
        (h) =>
          (h.textContent =
            'Hoje vamos estudar limites e continuidade para compreender melhor as funções.'),
      );
    await page
      .locator('[data-annotatable]')
      .evaluate((b) => b.replaceChildren());
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
    await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
    await page.getByLabel('Voz', { exact: true }).selectOption('markl');
    if (delivery === 'stream')
      await page.getByLabel('Reprodução do Sopro').selectOption('stream');
    await page.getByRole('button', { name: 'Fechar definições' }).click();
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    if (delivery === 'complete') {
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              (window as unknown as { streamTest: { sent: number } }).streamTest
                .sent,
          ),
        )
        .toBe(1);
      await page.waitForTimeout(200);
      expect(
        await page.evaluate(
          () =>
            (window as unknown as { streamTest: { started: number } })
              .streamTest.started,
        ),
      ).toBe(0);
      await page.evaluate(() =>
        (
          window as unknown as {
            streamTest: { send: (finish: boolean) => void };
          }
        ).streamTest.send(true),
      );
    }
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as unknown as { streamTest: { started: number } })
              .streamTest.started,
        ),
      )
      .toBeGreaterThan(0);
    await expect(dialog.locator('[data-br-status]')).toHaveText(
      'Voz local · Português de Portugal',
    );
    const outputVolume = () =>
      page.evaluate(() =>
        (
          window as unknown as { streamTest: { outputVolume: () => number } }
        ).streamTest.outputVolume(),
      );
    await dialog.getByRole('button', { name: 'Silenciar som' }).click();
    await expect.poll(outputVolume).toBeLessThan(0.01);
    await dialog.getByRole('button', { name: 'Ativar som' }).click();
    await expect.poll(outputVolume).toBeGreaterThan(0.99);
    await expect
      .poll(() => dialog.locator('[data-br-seek]').inputValue())
      .not.toBe('0');
    await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
    const paused = await dialog.locator('[data-br-seek]').inputValue();
    await page.waitForTimeout(200);
    expect(await dialog.locator('[data-br-seek]').inputValue()).toBe(paused);
    await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
    await page.waitForTimeout(1800);
    if (delivery === 'stream') {
      const waiting = Number(
        await dialog.locator('[data-br-seek]').inputValue(),
      );
      expect(waiting).toBeLessThan(1.7);
      await page.waitForTimeout(200);
      expect(
        Number(await dialog.locator('[data-br-seek]').inputValue()) - waiting,
      ).toBeLessThan(0.05);
      await dialog.getByRole('button', { name: 'Pausar leitura' }).click();
      await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
      const started = await page.evaluate(
        () =>
          (window as unknown as { streamTest: { started: number } }).streamTest
            .started,
      );
      await page.evaluate(() =>
        (
          window as unknown as {
            streamTest: { send: (finish: boolean) => void };
          }
        ).streamTest.send(false),
      );
      await page.waitForTimeout(200);
      expect(
        await page.evaluate(
          () =>
            (window as unknown as { streamTest: { started: number } })
              .streamTest.started,
        ),
      ).toBe(started);
      await page.evaluate(() =>
        (
          window as unknown as {
            streamTest: { send: (finish: boolean) => void };
          }
        ).streamTest.send(true),
      );
    }
    await expect(
      dialog.getByRole('button', { name: 'Repetir leitura' }),
    ).toBeVisible({ timeout: 5000 });
    await page.reload();
    await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
    await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
    await expect(page.getByLabel('Reprodução do Sopro')).toHaveValue(delivery);
  });
}

test('single words lead the voice by 100 ms and keep their appearance settings', async ({
  page,
}) => {
  await mockVoice(page, false, 10);
  await page.addInitScript(() => {
    const NativeAudio = Audio;
    const state = { seconds: 0 };
    Object.assign(window, { captionAudio: state });
    window.Audio = class extends NativeAudio {
      constructor(src?: string) {
        super(src);
        Object.defineProperty(this, 'currentTime', {
          get: () => state.seconds,
        });
      }
    };
  });
  await page.goto('/exemplo/apontamentos/');
  await page
    .locator('.lesson-heading h1')
    .evaluate(
      (h) => (h.textContent = 'sol mar céu luz cor som paz voz fim ver'),
    );
  await page.locator('[data-annotatable]').evaluate((b) => b.replaceChildren());
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Brain rot', exact: true });
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await page.getByLabel('Uma palavra de cada vez').check();
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await dialog.getByRole('button', { name: 'Iniciar leitura' }).click();
  await expect(dialog.locator('[data-br-status]')).toContainText('Voz local');
  await page.evaluate(
    () =>
      ((
        window as unknown as { captionAudio: { seconds: number } }
      ).captionAudio.seconds = 0.89),
  );
  await expect(dialog.locator('.brainrot-caption')).toHaveText('sol');
  await page.evaluate(
    () =>
      ((
        window as unknown as { captionAudio: { seconds: number } }
      ).captionAudio.seconds = 0.91),
  );
  await expect(dialog.locator('.brainrot-caption')).toHaveText('mar');
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await expect(page.getByLabel('Animar texto')).not.toBeVisible();
  await page.getByLabel('Cor do realce').fill('#77eebb');
  await page.getByRole('button', { name: 'Fechar definições' }).click();
  await expect(dialog.locator('[data-current-word]')).toHaveCSS(
    'color',
    'rgb(119, 238, 187)',
  );
  await page.reload();
  await page.getByRole('button', { name: 'Brain rot', exact: true }).click();
  await dialog.getByRole('button', { name: 'Definições do leitor' }).click();
  await expect(page.getByLabel('Cor do realce')).toHaveValue('#77eebb');
  await expect(page.getByLabel('Animar texto')).not.toBeVisible();
});
