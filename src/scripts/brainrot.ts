import { brainrotClips } from '../data/brainrot-clips';
import { brainrotVoices } from '../data/brainrot-voices';
import { extractReadingCues, readingVisual } from '../lib/brainrot-content';
import { ClipFeed } from '../lib/brainrot-feed';
import { LocalVoice, type VoiceStatus } from '../lib/brainrot-voice';
import { SpeechPlayer } from '../lib/brainrot-speech-player';
import type { SpeechSource } from '../lib/brainrot-speech-stream';
import { ReadingTimeline, readingTime } from '../lib/brainrot-timeline';
import { setupVoiceRecording } from './brainrot-recording';
import { setupBrainrotSettings } from './brainrot-settings';

const LOADING_STATUS_DELAY_MS = 1_000;

export async function setupBrainrot() {
  const dialog = document.querySelector<HTMLDialogElement>('#brainrot')!;
  const body = document.querySelector('[data-annotatable]')!;
  const title =
    document.querySelector('.lesson-heading h1')?.textContent?.trim() ||
    document.title;
  const cues = extractReadingCues(body, title);
  const timeline = new ReadingTimeline(cues);
  const get = <T extends Element = HTMLElement>(selector: string) =>
    dialog.querySelector<T>(selector)!;
  const caption = get('.brainrot-caption');
  const visual = get('.brainrot-visual');
  const status = get('[data-br-status]');
  const play = get<HTMLButtonElement>('[data-br-play]');
  const seek = get<HTMLInputElement>('[data-br-seek]');
  const rate = get<HTMLSelectElement>('[data-br-rate]');
  const voiceMode = get<HTMLSelectElement>('[data-br-voice]');
  const files = get<HTMLInputElement>('[data-br-files]');
  const feedElement = get('.brainrot-feed');
  const stage = get('.brainrot-stage');
  const settingsButton = get<HTMLButtonElement>('[data-br-settings-open]');
  const voicePanel = get<HTMLDialogElement>('#brainrot-voice-settings');
  const sharePanel = get<HTMLDialogElement>('#brainrot-share');
  const panels = [voicePanel, sharePanel];
  const highlight = get<HTMLInputElement>('[data-br-highlight]');
  const audio = new SpeechPlayer();
  let loadingStatusTimer: number | undefined;
  let loadingStatusMessage = '';
  let loadingStatusVisible = false;
  function renderStatus(message: string, hidden = false) {
    if (status.textContent === message && status.hidden === hidden) return;
    status.textContent = message;
    status.hidden = hidden;
  }
  function clearLoadingStatus() {
    if (loadingStatusTimer !== undefined)
      window.clearTimeout(loadingStatusTimer);
    loadingStatusTimer = undefined;
    loadingStatusMessage = '';
    loadingStatusVisible = false;
  }
  function setStatus(message: string, options: { hidden?: boolean } = {}) {
    clearLoadingStatus();
    renderStatus(message, options.hidden ?? false);
  }
  function setLoadingStatus(message: string) {
    loadingStatusMessage = message;
    if (loadingStatusVisible) {
      renderStatus(message);
      return;
    }
    if (loadingStatusTimer !== undefined) return;
    loadingStatusTimer = window.setTimeout(() => {
      loadingStatusTimer = undefined;
      loadingStatusVisible = true;
      renderStatus(loadingStatusMessage);
    }, LOADING_STATUS_DELAY_MS);
  }
  function showVoiceCost() {
    const selected = brainrotVoices.find(
      (voice) => voice.id === voiceMode.value,
    );
    const cost = get('[data-br-voice-cost]');
    const sopro =
      selected?.engine === 'sopro' || voiceMode.value === 'personal';
    cost.hidden = !sopro;
    get('[data-br-voice-weight]').hidden = !sopro;
    cost.textContent =
      'O Sopro usa mais memória e pode demorar a preparar a leitura.';
    if (selected?.engine === 'sopro')
      cost.textContent += ` Voz sintética baseada numa amostra de ${selected.name}.`;
  }
  const voice = new LocalVoice();
  const feed = new ClipFeed(
    feedElement,
    brainrotClips,
    (label) => {
      get('[data-br-clip-name]').textContent = label;
    },
    () => {
      if (!status.hidden) return;
      setStatus('Este vídeo não abriu. Desliza para mudar de vídeo.');
    },
    stage,
  );
  let index = 0;
  let playing = false;
  let preparing = false;
  let finished = false;
  let generation = 0;
  let frame = 0;
  let elapsed = 0;
  let lastTick = 0;
  let activeVisual: Element | undefined;
  const prepared = new Map<
    number,
    { source: Promise<SpeechSource>; status: VoiceStatus }
  >();
  let awaitingCue = 0;
  let speechBufferPrimed = false;
  let customURLs: string[] = [];
  let savedOverflow = '';
  let scrubbing = false;
  let resumeAfterSeek = false;
  let renderedCaption = '';
  let currentMark: Element | undefined;
  let previousReading = { index: -1, elapsed: 0, word: 0 };
  let buffering = false;
  let settings: ReturnType<typeof setupBrainrotSettings>;

  get('[data-br-title]').textContent = title;
  function renderProgress(position = timeline.position(index, elapsed)) {
    seek.max = String(timeline.duration);
    seek.value = String(position);
    seek.style.setProperty(
      '--br-progress',
      `${timeline.duration ? (position / timeline.duration) * 100 : 0}%`,
    );
    const current = readingTime(position);
    const total = readingTime(Math.ceil(timeline.duration));
    get('[data-br-time]').textContent =
      `${current} / ${timeline.estimated ? '≈' : ''}${total}`;
    seek.setAttribute(
      'aria-valuetext',
      `${current} de ${timeline.estimated ? 'aproximadamente ' : ''}${total}`,
    );
  }

  function renderReading() {
    const cue = cues[index];
    const words = cue.text.split(/\s+/);
    const tokens =
      cue.caption ?? words.map((text) => ({ text, math: undefined }));
    const spokenDuration =
      voiceMode.value === 'silent'
        ? Math.max(2, words.length / 2.5)
        : audio.duration;
    const spokenElapsed =
      voiceMode.value === 'silent' ? elapsed : audio.currentTime;
    const captionLead =
      playing && !preparing && !audio.waiting
        ? settings.captionLeadSeconds * Number(rate.value)
        : 0;
    const fraction =
      Number.isFinite(spokenDuration) && spokenDuration > 0
        ? Math.min(0.9999, (spokenElapsed + captionLead) / spokenDuration)
        : 0;
    const weights = tokens.map((token) =>
      token.text
        .split(/\s+/)
        .reduce((sum, word) => sum + Math.max(2, word.length), 0),
    );
    const target = weights.reduce((sum, weight) => sum + weight, 0) * fraction;
    let wordIndex = 0;
    let position = 0;
    while (
      wordIndex < tokens.length - 1 &&
      position + weights[wordIndex] <= target
    )
      position += weights[wordIndex++];
    if (
      index === previousReading.index &&
      spokenElapsed >= previousReading.elapsed
    )
      wordIndex = Math.max(wordIndex, previousReading.word);
    previousReading = { index, elapsed: spokenElapsed, word: wordIndex };
    const count = settings.wordsPerCaption;
    const start = Math.floor(wordIndex / count) * count;
    const visibleWords = tokens.slice(start, start + count);
    const key = `${index}:${start}:${count}`;
    if (key !== renderedCaption) {
      renderedCaption = key;
      caption.replaceChildren(
        ...visibleWords.flatMap((word, offset) => {
          const span = document.createElement('span');
          if (word.math) span.append(readingVisual(word.math));
          else span.textContent = word.text;
          return offset && !/^[,.;:!?)}\]]/.test(word.text)
            ? [' ', span]
            : [span];
        }),
      );
      settings.pop(caption);
    }
    const mark = !highlight.checked
      ? undefined
      : cue.visual
        ? (visual.querySelector('.katex-display, math[display="block"]') ??
          undefined)
        : caption.children[wordIndex - start];
    if (mark !== currentMark) {
      currentMark?.removeAttribute('data-current-word');
      currentMark = mark;
      currentMark?.setAttribute('data-current-word', '');
    }
  }

  function render() {
    const cue = cues[index];
    if (!cue) return;
    caption.hidden = Boolean(cue.visual);
    get('[data-br-position]').textContent = `${index + 1} / ${cues.length}`;
    if (!scrubbing) renderProgress();
    get<HTMLButtonElement>('[data-br-prev]').disabled = index === 0;
    get<HTMLButtonElement>('[data-br-next]').disabled =
      index === cues.length - 1;
    if (activeVisual !== cue.visual) {
      activeVisual = cue.visual;
      visual.replaceChildren(
        ...(cue.visual ? [readingVisual(cue.visual)] : []),
      );
      visual.hidden = !cue.visual;
      visual.scrollTop = 0;
      settings.pop(visual);
    }
    renderReading();
    play.querySelector('span')!.textContent = preparing
      ? 'A preparar…'
      : playing
        ? 'Pausar'
        : finished
          ? 'Repetir'
          : 'Ouvir';
    if (voiceMode.value === 'silent' && !playing)
      play.querySelector('span')!.textContent = finished ? 'Repetir' : 'Ler';
    play.setAttribute(
      'aria-label',
      preparing || playing
        ? 'Pausar leitura'
        : finished
          ? 'Repetir leitura'
          : 'Iniciar leitura',
    );
    play.setAttribute('aria-pressed', String(playing));
    dialog.dataset.playing = String(playing);
  }

  function clearAudio() {
    audio.clear();
  }

  function pause() {
    buffering = false;
    playing = false;
    generation++;
    cancelAnimationFrame(frame);
    audio.pause();
    feed.setPlaying(false);
    clearLoadingStatus();
    status.hidden = true;
    if (preparing) {
      preparing = false;
    }
    render();
  }

  function prepare(nextIndex: number) {
    const existing = prepared.get(nextIndex);
    if (existing) {
      showVoiceProgress(existing.status, nextIndex);
      return existing.source;
    }
    const status: VoiceStatus = { phase: 'cache' };
    const source = voice.synthesize(cues[nextIndex].text, voiceMode.value, {
      delivery: settings.delivery,
      status: (update) => {
        Object.assign(status, update);
        showVoiceProgress(status, nextIndex);
      },
    });
    // A prefetched failure is handled when playback reaches this cue.
    void source.catch(() => {});
    prepared.set(nextIndex, { source, status });
    return source;
  }

  function showVoiceProgress(progress: VoiceStatus, cueIndex: number) {
    if (!dialog.open || !playing || !preparing || awaitingCue !== cueIndex)
      return;
    const messages: Record<string, string> = {
      cache: 'A procurar áudio guardado neste dispositivo…',
      cached: 'A abrir o áudio guardado…',
      opening: 'A abrir o motor de voz…',
      loading: 'A carregar a configuração do modelo…',
      reference: 'A preparar o timbre a partir da amostra de voz…',
      warming: 'A preparar a reprodução em streaming…',
      initializing: 'Ficheiros carregados. A iniciar o modelo…',
      generating: 'A gerar fala neste dispositivo…',
      saving: 'A guardar o áudio para a próxima vez…',
      download: `A descarregar os ficheiros da voz… ${Math.round((progress.loaded ?? 0) / 1_048_576)} MB recebidos`,
    };
    setLoadingStatus(
      `${messages[progress.phase] ?? 'A preparar o áudio…'} · trecho ${cueIndex + 1} de ${cues.length}`,
    );
  }

  function tick(now: number) {
    if (!playing || preparing) return;
    if (audio.waiting !== buffering) {
      buffering = audio.waiting;
      if (buffering)
        setLoadingStatus('A voz ainda está a gerar o resto deste trecho…');
      else setStatus('Voz local · Português de Portugal', { hidden: true });
    }
    if (!audio.waiting)
      elapsed += ((now - lastTick) / 1000) * Number(rate.value);
    lastTick = now;
    renderReading();
    if (!scrubbing) renderProgress();
    const cue = cues[index];
    const silentDuration = Math.max(2, cue.text.split(/\s+/).length / 2.5);
    const complete =
      voiceMode.value === 'silent'
        ? elapsed >= Math.max(cue.minimumSeconds, silentDuration)
        : audio.ended &&
          elapsed >= Math.max(cue.minimumSeconds, audio.duration || 0);
    if (complete) {
      if (index + 1 < cues.length) {
        changeCue(index + 1, { transition: 'advance' });
      } else {
        pause();
        finished = true;
        setStatus('Chegaste ao fim desta página.');
        render();
      }
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  async function start() {
    if (!cues.length || !dialog.open) return;
    if (finished) {
      index = 0;
      elapsed = 0;
      finished = false;
      clearAudio();
      prepared.clear();
      speechBufferPrimed = false;
    }
    playing = true;
    const token = ++generation;
    const usesSopro =
      voiceMode.value === 'personal' ||
      brainrotVoices.some(
        (voice) => voice.id === voiceMode.value && voice.engine === 'sopro',
      );
    if (usesSopro) audio.unlock();
    feed.setPlaying(true);
    try {
      if (voiceMode.value !== 'silent') {
        if (!audio.loaded) {
          preparing = true;
          awaitingCue = index;
          render();
          const source = await prepare(index);
          if (token !== generation || !playing || !dialog.open) return;
          if (
            usesSopro &&
            settings.delivery === 'complete' &&
            !speechBufferPrimed
          ) {
            if (index + 1 < cues.length) {
              awaitingCue = index + 1;
              await prepare(index + 1);
              if (token !== generation || !playing || !dialog.open) return;
            }
            speechBufferPrimed = true;
          }
          clearAudio();
          audio.load(source);
          audio.playbackRate = Number(rate.value);
          const ahead = usesSopro && settings.delivery === 'complete' ? 2 : 1;
          for (
            let next = index + 1;
            next <= index + ahead && next < cues.length;
            next++
          )
            prepare(next);
        }
        preparing = false;
        if (!audio.ended || elapsed < audio.duration) {
          const newAudio = audio.currentTime === 0;
          await audio.play();
          if (newAudio && elapsed > 0) {
            audio.currentTime = Math.min(elapsed, audio.duration);
            if (elapsed >= audio.duration) audio.pause();
          }
        }
        if (token !== generation || !playing || !dialog.open) return;
      }
      setStatus(
        voiceMode.value === 'silent'
          ? 'Só legendas'
          : 'Voz local · Português de Portugal',
        { hidden: true },
      );
      lastTick = performance.now();
      render();
      frame = requestAnimationFrame(tick);
    } catch {
      if (token !== generation) return;
      pause();
      clearAudio();
      voice.dispose();
      prepared.clear();
      speechBufferPrimed = false;
      setStatus(
        'Não foi possível reproduzir a voz local. Toca para tentar de novo ou escolhe Só legendas nas opções de leitura.',
      );
    }
  }

  function changeCue(
    next: number,
    options: { offset?: number; transition?: 'advance' | 'seek' } = {},
  ) {
    const resume = playing;
    generation++;
    cancelAnimationFrame(frame);
    if (options.transition !== 'advance') {
      voice.cancelPending();
      prepared.clear();
      speechBufferPrimed = false;
    }
    preparing = false;
    clearAudio();
    index = Math.max(0, Math.min(cues.length - 1, next));
    for (const previous of prepared.keys())
      if (previous < index) prepared.delete(previous);
    elapsed = options.offset ?? 0;
    finished = false;
    render();
    if (resume) void start();
  }

  play.addEventListener('click', () => (playing ? pause() : void start()));
  let pointerStart = { x: 0, y: 0 };
  let tapCancelled = false;
  const isPlaybackSurface = (target: EventTarget | null) =>
    target instanceof Element &&
    !target.closest(
      'a[href], button, input, select, summary, .brainrot-social, .brainrot-progress',
    );
  stage.addEventListener('pointerdown', (event) => {
    if (!isPlaybackSurface(event.target)) return;
    pointerStart = { x: event.clientX, y: event.clientY };
    tapCancelled = false;
  });
  stage.addEventListener('pointercancel', () => {
    tapCancelled = true;
  });
  stage.addEventListener('click', (event) => {
    if (!isPlaybackSurface(event.target)) return;
    const moved = Math.hypot(
      event.clientX - pointerStart.x,
      event.clientY - pointerStart.y,
    );
    if (moved > 10 || tapCancelled) return;
    playing ? pause() : void start();
  });
  settingsButton.addEventListener('click', () => voicePanel.showModal());
  get('.brainrot-shell').addEventListener('animationend', (event) => {
    if (
      (event as AnimationEvent).animationName === 'brainrot-phone-in' &&
      dialog.open &&
      !dialog.dataset.closing
    )
      dialog.dataset.entered = 'true';
  });
  stage.addEventListener('click', (event) => {
    if ((event.target as Element).closest('.brainrot-video-preview')) pause();
  });
  const shareURL = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )!.href;
  const shareField = get<HTMLInputElement>('[data-br-share-url]');
  const shareStatus = get('[data-br-share-status]');
  shareField.value = shareURL;
  get('[data-br-share]').addEventListener('click', () => {
    pause();
    shareStatus.textContent = '';
    sharePanel.showModal();
  });
  get('[data-br-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareURL);
      shareStatus.textContent = 'Ligação copiada.';
    } catch {
      shareField.focus();
      shareField.select();
      shareStatus.textContent = 'Seleciona e copia a ligação acima.';
    }
  });
  const nativeShare = get<HTMLButtonElement>('[data-br-native-share]');
  nativeShare.hidden = !navigator.share;
  nativeShare.addEventListener('click', async () => {
    try {
      await navigator.share({ title, url: shareURL });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        shareStatus.textContent =
          'Não foi possível abrir a partilha. Podes copiar a ligação.';
    }
  });
  for (const panel of panels) {
    panel
      .querySelector('[data-br-panel-close]')!
      .addEventListener('click', () => panel.close());
    panel.addEventListener('click', (event) => {
      const box = panel.getBoundingClientRect();
      if (
        event.target === panel &&
        (event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom)
      )
        panel.close();
    });
  }
  get('.brainrot-tabbar [aria-current]').addEventListener('click', () => {
    feedElement.focus();
  });
  async function requestClose() {
    if (!dialog.open || dialog.dataset.closing === 'true') return;
    pause();
    dialog.dataset.closing = 'true';
    await Promise.all(
      dialog
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => {})),
    );
    if (dialog.dataset.closing === 'true') dialog.close();
  }
  get('[data-br-close]').addEventListener('click', () => void requestClose());
  dialog.addEventListener('cancel', (event) => {
    if (event.target !== dialog || event.defaultPrevented) return;
    event.preventDefault();
    void requestClose();
  });
  get('[data-br-prev]').addEventListener('click', () => changeCue(index - 1));
  get('[data-br-next]').addEventListener('click', () => changeCue(index + 1));
  get('[data-br-clip-prev]').addEventListener('click', () => feed.move(-1));
  get('[data-br-clip-next]').addEventListener('click', () => feed.move(1));
  function beginSeek() {
    scrubbing = true;
    resumeAfterSeek = playing;
    pause();
    dialog.dataset.scrubbing = 'true';
  }
  function finishSeek() {
    if (!dialog.open) return;
    const resume = scrubbing ? resumeAfterSeek : playing;
    const target = timeline.locate(Number(seek.value));
    scrubbing = false;
    dialog.dataset.scrubbing = 'false';
    pause();
    changeCue(target.index, { offset: target.offset });
    if (resume) void start();
  }
  seek.addEventListener('pointerdown', beginSeek);
  seek.addEventListener('input', () => renderProgress(Number(seek.value)));
  seek.addEventListener('change', finishSeek);
  seek.addEventListener('pointerup', () =>
    requestAnimationFrame(() => {
      if (scrubbing) finishSeek();
    }),
  );
  seek.addEventListener('pointercancel', () => {
    scrubbing = false;
    dialog.dataset.scrubbing = 'false';
    renderProgress();
    if (resumeAfterSeek) void start();
  });
  audio.addEventListener('loadedmetadata', () => {
    if (!audio.complete) return;
    timeline.setSpeechDuration(index, audio.duration);
    if (!scrubbing) renderProgress();
  });
  function changeVoice() {
    showVoiceCost();
    pause();
    clearAudio();
    voice.dispose();
    prepared.clear();
    speechBufferPrimed = false;
    elapsed = 0;
    status.hidden = true;
    timeline.setMode(voiceMode.value === 'silent' ? 'silent' : 'voice');
    render();
  }
  const recordingReady = setupVoiceRecording(voicePanel, {
    pause,
    changed: () => settings.updateVoice(),
  });
  files.addEventListener('change', () => {
    const selected = Array.from(files.files || []).filter((file) =>
      file.type.startsWith('video/'),
    );
    if (!selected.length) return;
    feed.close();
    for (const url of customURLs) URL.revokeObjectURL(url);
    customURLs = selected.map((file) => URL.createObjectURL(file));
    feed.setClips(
      selected.map((file, i) => ({
        src: customURLs[i],
        label: file.name,
        kind: file.name,
      })),
    );
    feed.open();
    voicePanel.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (
      event.key !== ' ' ||
      (event.target as Element).closest('.brainrot-panel') ||
      (event.target as Element).closest('button, input, select, summary')
    )
      return;
    event.preventDefault();
    playing ? pause() : void start();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && dialog.open) pause();
  });
  document.addEventListener('brainrot:open', () => {
    delete dialog.dataset.closing;
    delete dialog.dataset.entered;
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    feed.open();
    status.hidden = true;
    render();
  });
  function close() {
    delete dialog.dataset.closing;
    delete dialog.dataset.entered;
    for (const panel of panels) if (panel.open) panel.close();
    scrubbing = false;
    dialog.dataset.scrubbing = 'false';
    pause();
    voice.dispose();
    prepared.clear();
    speechBufferPrimed = false;
    clearAudio();
    audio.dispose();
    elapsed = 0;
    feed.close();
    for (const url of customURLs) URL.revokeObjectURL(url);
    customURLs = [];
    files.value = '';
    feed.setClips(brainrotClips);
    document.body.style.overflow = savedOverflow;
  }
  dialog.addEventListener('close', close);
  window.addEventListener('pagehide', () => {
    // A cached document must return to a closed reader, not an empty video feed.
    if (dialog.open) dialog.close();
    close();
  });
  audio.addEventListener('error', () => {
    if (!playing || !audio.loaded) return;
    pause();
    clearAudio();
    setStatus('O áudio não abriu. Toca para tentar de novo.');
  });
  await recordingReady;
  settings = setupBrainrotSettings(dialog, {
    voiceChanged: changeVoice,
    rateChanged: (value) => {
      audio.playbackRate = value;
    },
    readingChanged: renderReading,
    volumeChanged: (value) => {
      audio.volume = value;
    },
  });
  timeline.setMode(voiceMode.value === 'silent' ? 'silent' : 'voice');
  showVoiceCost();
}
