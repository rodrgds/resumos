import { VoiceRecorder } from '../lib/brainrot-recorder';
import {
  RECORDING_SECONDS,
  deletePersonalVoice,
  preparePersonalVoice,
  readPersonalVoice,
  savePersonalVoice,
} from '../lib/brainrot-personal-voice';

export function setupVoiceRecording(
  panel: HTMLDialogElement,
  callbacks: { pause: () => void; changed: () => void },
) {
  const get = <T extends HTMLElement>(selector: string) =>
    panel.querySelector<T>(selector)!;
  const controls = get('[data-br-voice-controls]');
  const section = get('[data-br-recording]');
  const select = get<HTMLSelectElement>('[data-br-voice]');
  const open = get<HTMLButtonElement>('[data-br-record-open]');
  const remove = get<HTMLButtonElement>('[data-br-record-delete]');
  const start = get<HTMLButtonElement>('[data-br-record-start]');
  const stop = get<HTMLButtonElement>('[data-br-record-stop]');
  const save = get<HTMLButtonElement>('[data-br-record-save]');
  const preview = get<HTMLAudioElement>('[data-br-record-preview]');
  const status = get('[data-br-record-status]');
  const personalStatus = get('[data-br-personal-status]');
  const progress = get('[data-br-record-progress]');
  const meter = get<HTMLProgressElement>('[data-br-record-meter]');
  const time = get('[data-br-record-time]');
  const recorder = new VoiceRecorder();
  let draft: Blob | undefined;
  let previewURL: string | undefined;
  let timer: ReturnType<typeof setInterval> | undefined;
  let generation = 0;

  function clearPreview() {
    preview.pause();
    preview.removeAttribute('src');
    preview.load();
    preview.hidden = true;
    if (previewURL) URL.revokeObjectURL(previewURL);
    previewURL = undefined;
  }

  function reset() {
    generation++;
    recorder.cancel();
    clearInterval(timer);
    clearPreview();
    draft = undefined;
    section.hidden = true;
    controls.hidden = false;
    start.hidden = false;
    start.disabled = false;
    start.textContent = 'Começar gravação';
    stop.hidden = true;
    save.hidden = true;
    save.disabled = false;
    progress.hidden = true;
    status.textContent = '';
  }

  function showSavedVoice(saved: boolean) {
    const option = select.querySelector('option[value="personal"]');
    if (saved && !option)
      get('[data-br-sopro-voices]').append(
        new Option('A minha voz', 'personal'),
      );
    if (!saved) option?.remove();
    remove.hidden = !saved;
    get('[data-br-record-label]').textContent = saved
      ? 'Voltar a gravar a minha voz'
      : 'Gravar a minha voz';
  }

  void readPersonalVoice()
    .then((saved) => showSavedVoice(!!saved))
    .catch(() => {
      personalStatus.textContent =
        'Não foi possível ler a voz guardada neste navegador.';
    });

  open.addEventListener('click', () => {
    callbacks.pause();
    reset();
    controls.hidden = true;
    section.hidden = false;
    start.focus();
  });
  get('[data-br-record-cancel]').addEventListener('click', () => {
    reset();
    open.focus();
  });
  panel.addEventListener('close', reset);
  window.addEventListener('pagehide', reset);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !section.hidden) reset();
  });

  function recordingError(message: string) {
    clearInterval(timer);
    start.hidden = false;
    start.disabled = false;
    stop.hidden = true;
    save.hidden = true;
    status.textContent = message;
    start.focus();
  }

  start.addEventListener('click', async () => {
    const current = ++generation;
    clearPreview();
    draft = undefined;
    start.disabled = true;
    save.hidden = true;
    status.textContent = 'A pedir acesso ao microfone…';
    try {
      await recorder.start({
        recorded: async (recording) => {
          clearInterval(timer);
          stop.hidden = true;
          status.textContent = 'A preparar a gravação…';
          try {
            const audio = await preparePersonalVoice(recording);
            if (current !== generation) return;
            draft = audio;
            previewURL = URL.createObjectURL(audio);
            preview.src = previewURL;
            preview.hidden = false;
            start.hidden = false;
            start.disabled = false;
            start.textContent = 'Gravar novamente';
            save.hidden = false;
            status.textContent = 'Ouve a gravação antes de a usares.';
            save.focus();
          } catch (error) {
            if (current === generation)
              recordingError(
                error instanceof Error
                  ? error.message
                  : 'A gravação não abriu. Tenta de novo.',
              );
          }
        },
        error: () =>
          recordingError('A gravação foi interrompida. Tenta de novo.'),
      });
      if (current !== generation) return;
      start.hidden = true;
      stop.hidden = false;
      progress.hidden = false;
      status.textContent = 'A gravar. Lê o texto acima.';
      const began = performance.now();
      const tick = () => {
        const seconds = Math.min(
          RECORDING_SECONDS,
          Math.floor((performance.now() - began) / 1000),
        );
        meter.value = seconds;
        time.textContent = `${seconds} / ${RECORDING_SECONDS} s`;
      };
      tick();
      timer = setInterval(tick, 250);
      stop.focus();
    } catch (error) {
      if (current !== generation) return;
      const message =
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'Permite o acesso ao microfone nas definições do navegador e tenta de novo.'
          : error instanceof DOMException && error.name === 'NotFoundError'
            ? 'Não foi encontrado um microfone. Liga um e tenta de novo.'
            : error instanceof Error
              ? error.message
              : 'Não foi possível ligar o microfone. Tenta de novo.';
      recordingError(message);
    }
  });
  stop.addEventListener('click', () => recorder.stop());
  save.addEventListener('click', async () => {
    if (!draft) return;
    save.disabled = true;
    preview.pause();
    try {
      await savePersonalVoice(draft);
      showSavedVoice(true);
      select.value = 'personal';
      callbacks.changed();
      reset();
      personalStatus.textContent = 'A tua voz ficou guardada neste navegador.';
      if (panel.open) select.focus();
    } catch {
      save.disabled = false;
      status.textContent =
        'Não foi possível guardar a voz. Liberta espaço neste navegador e tenta de novo.';
    }
  });
  remove.addEventListener('click', async () => {
    remove.disabled = true;
    callbacks.pause();
    try {
      await deletePersonalVoice();
      if (select.value === 'personal') {
        select.value = 'piper';
        callbacks.changed();
      }
      showSavedVoice(false);
      personalStatus.textContent =
        'A tua gravação foi apagada deste navegador.';
      if (panel.open) open.focus();
    } catch {
      personalStatus.textContent =
        'Não foi possível apagar a gravação. Tenta de novo.';
    } finally {
      remove.disabled = false;
    }
  });
}
