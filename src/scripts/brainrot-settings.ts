import { readingFonts } from '../data/reading-fonts';
import {
  readBrainrotPreferences,
  saveBrainrotPreferences,
} from '../lib/brainrot-preferences';

export function setupBrainrotSettings(
  dialog: HTMLDialogElement,
  callbacks: {
    voiceChanged: () => void;
    rateChanged: (rate: number) => void;
    readingChanged: () => void;
    volumeChanged: (volume: number) => void;
  },
) {
  const get = <T extends HTMLElement>(selector: string) =>
    dialog.querySelector<T>(selector)!;
  const preferences = readBrainrotPreferences();
  const voice = get<HTMLSelectElement>('[data-br-voice]');
  const rate = get<HTMLSelectElement>('[data-br-rate]');
  const font = get<HTMLSelectElement>('[data-br-font]');
  const size = get<HTMLInputElement>('[data-br-size]');
  const volume = get<HTMLInputElement>('[data-br-volume]');
  const mute = get<HTMLButtonElement>('[data-br-mute]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const availableVoice = (value: string) =>
    [...voice.options].some((option) => option.value === value);
  if (!availableVoice(preferences.voice)) preferences.voice = 'piper';
  if (
    !availableVoice(preferences.lastVoice) ||
    preferences.lastVoice === 'silent'
  )
    preferences.lastVoice = 'piper';
  voice.value = preferences.voice;
  rate.value = String(preferences.rate);
  font.value = preferences.font;
  size.value = String(preferences.size);
  const save = () => saveBrainrotPreferences(preferences);

  function applyVolume() {
    const silent =
      voice.value === 'silent' || preferences.muted || preferences.volume === 0;
    mute.dataset.silent = String(silent);
    mute.setAttribute('aria-label', silent ? 'Ativar som' : 'Silenciar som');
    mute.setAttribute('aria-pressed', String(silent));
    volume.value = String(silent ? 0 : Math.round(preferences.volume * 100));
    volume.style.setProperty('--br-volume', `${volume.value}%`);
    volume.setAttribute('aria-valuetext', `${volume.value}%`);
    callbacks.volumeChanged(silent ? 0 : preferences.volume);
  }
  function updateVoice() {
    preferences.voice = voice.value;
    if (voice.value !== 'silent') preferences.lastVoice = voice.value;
    save();
    applyVolume();
    callbacks.voiceChanged();
  }
  voice.addEventListener('change', updateVoice);
  rate.addEventListener('change', () => {
    preferences.rate = Number(rate.value);
    save();
    callbacks.rateChanged(preferences.rate);
  });
  const checks = {
    highlight: '[data-br-highlight]',
    wordByWord: '[data-br-word-by-word]',
    motion: '[data-br-motion]',
    channel: '[data-br-show-channel]',
    likes: '[data-br-show-likes]',
    comments: '[data-br-show-comments]',
    bookmarks: '[data-br-show-bookmarks]',
  } as const;
  function applyText() {
    dialog.style.setProperty(
      '--br-caption-font',
      readingFonts.find((entry) => entry.id === preferences.font)!.family,
    );
    dialog.style.setProperty(
      '--br-caption-scale',
      String(preferences.size / 100),
    );
    get('[data-br-size-value]').textContent = `${preferences.size}%`;
    for (const item of ['channel', 'likes', 'comments', 'bookmarks'] as const)
      get(`[data-br-decoration="${item}"]`).hidden = !preferences[item];
    if (!preferences.motion)
      for (const element of dialog.querySelectorAll(
        '.brainrot-caption, .brainrot-visual',
      ))
        element.getAnimations().forEach((animation) => animation.cancel());
  }
  for (const [key, selector] of Object.entries(checks)) {
    const property = key as keyof typeof checks;
    const input = get<HTMLInputElement>(selector);
    input.checked = preferences[property];
    input.addEventListener('change', () => {
      preferences[property] = input.checked;
      save();
      applyText();
      callbacks.readingChanged();
    });
  }
  font.addEventListener('change', () => {
    preferences.font = font.value;
    save();
    applyText();
  });
  size.addEventListener('input', () => {
    preferences.size = Number(size.value);
    save();
    applyText();
  });
  mute.addEventListener('click', () => {
    const silent =
      voice.value === 'silent' || preferences.muted || preferences.volume === 0;
    preferences.muted = !silent;
    if (silent && !preferences.volume) preferences.volume = 1;
    if (voice.value === 'silent') {
      voice.value = preferences.lastVoice;
      updateVoice();
    }
    save();
    applyVolume();
  });
  volume.addEventListener('input', () => {
    const value = Number(volume.value) / 100;
    preferences.muted = value === 0;
    if (value > 0) preferences.volume = value;
    if (value > 0 && voice.value === 'silent') {
      voice.value = preferences.lastVoice;
      updateVoice();
    }
    save();
    applyVolume();
  });
  applyText();
  applyVolume();
  callbacks.rateChanged(preferences.rate);
  return {
    updateVoice,
    get wordsPerCaption() {
      return preferences.wordByWord ? 1 : 6;
    },
    pop(element: HTMLElement) {
      if (!preferences.motion || reducedMotion.matches || element.hidden)
        return;
      element.getAnimations().forEach((animation) => animation.cancel());
      element.animate(
        [
          { transform: 'scale(0.96)', opacity: 0.65 },
          { transform: 'scale(1)', opacity: 1 },
        ],
        { duration: 120, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      );
    },
  };
}
