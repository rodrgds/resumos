import { readingFonts } from '../data/reading-fonts';
import type { SoproDelivery } from './brainrot-speech-stream';

const STORAGE_KEY = 'resumos-brainrot-preferences';
const defaults = {
  voice: 'piper',
  lastVoice: 'piper',
  delivery: 'complete' as SoproDelivery,
  rate: 1,
  highlight: true,
  wordByWord: false,
  font: 'sans',
  size: 100,
  motion: true,
  highlightColor: '#f6df8c',
  volume: 1,
  muted: false,
  channel: true,
  likes: true,
  comments: true,
  bookmarks: true,
};
export type BrainrotPreferences = typeof defaults;

export function readBrainrotPreferences(): BrainrotPreferences {
  const preferences = { ...defaults };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    if (!saved || typeof saved !== 'object') return preferences;
    for (const key of [
      'highlight',
      'wordByWord',
      'motion',
      'muted',
      'channel',
      'likes',
      'comments',
      'bookmarks',
    ] as const)
      if (typeof saved[key] === 'boolean') preferences[key] = saved[key];
    for (const key of ['voice', 'lastVoice'] as const)
      if (typeof saved[key] === 'string') preferences[key] = saved[key];
    if (readingFonts.some((font) => font.id === saved.font))
      preferences.font = saved.font;
    if (saved.delivery === 'complete' || saved.delivery === 'stream')
      preferences.delivery = saved.delivery;
    if (
      typeof saved.highlightColor === 'string' &&
      /^#[\da-f]{6}$/i.test(saved.highlightColor)
    )
      preferences.highlightColor = saved.highlightColor;
    if ([0.8, 1, 1.25, 1.5, 2].includes(saved.rate))
      preferences.rate = saved.rate;
    if (Number.isFinite(saved.size))
      preferences.size = Math.max(80, Math.min(140, saved.size));
    if (Number.isFinite(saved.volume))
      preferences.volume = Math.max(0, Math.min(1, saved.volume));
  } catch {
    // Reading remains available when storage is blocked or contains invalid data.
  }
  return preferences;
}

export function saveBrainrotPreferences(preferences: BrainrotPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Controls still work for this visit when storage is unavailable.
  }
}
