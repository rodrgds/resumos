const SAMPLE_RATE = 24_000;
const SPEECH_RMS = 0.1;
const PEAK_LIMIT = 0.89;
const MAX_GAIN = 10;
const WINDOW_SECONDS = 0.04;

export function speechWav(samples: Float32Array, sampleRate: number): Blob {
  const bytes = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(bytes);
  const text = (offset: number, value: string) =>
    [...value].forEach((letter, index) =>
      view.setUint8(offset + index, letter.charCodeAt(0)),
    );
  text(0, 'RIFF');
  view.setUint32(4, bytes.byteLength - 8, true);
  text(8, 'WAVEfmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, 'data');
  view.setUint32(40, samples.length * 2, true);
  samples.forEach((sample, index) =>
    view.setInt16(
      44 + index * 2,
      Math.round(Math.max(-1, Math.min(1, sample)) * 32767),
      true,
    ),
  );
  return new Blob([bytes], { type: 'audio/wav' });
}

export function speechGain(samples: Float32Array, sampleRate: number): number {
  const windowSize = Math.round(sampleRate * WINDOW_SECONDS);
  const windows: { energy: number; length: number }[] = [];
  let peak = 0;
  let loudest = 0;
  for (let start = 0; start < samples.length; start += windowSize) {
    const end = Math.min(samples.length, start + windowSize);
    let energy = 0;
    for (let index = start; index < end; index++) {
      energy += samples[index] ** 2;
      peak = Math.max(peak, Math.abs(samples[index]));
    }
    windows.push({ energy, length: end - start });
    loudest = Math.max(loudest, energy / (end - start));
  }
  // Ignore pauses when measuring speech, and leave silence or noise untouched.
  if (peak < 0.0001) return 1;
  const active = windows.filter(
    ({ energy, length }) => energy / length >= loudest * 0.01,
  );
  const rms = Math.sqrt(
    active.reduce((sum, window) => sum + window.energy, 0) /
      active.reduce((sum, window) => sum + window.length, 0),
  );
  return Math.min(SPEECH_RMS / rms, PEAK_LIMIT / peak, MAX_GAIN);
}

export function scaleSpeech(samples: Float32Array, gain: number) {
  for (let index = 0; index < samples.length; index++)
    samples[index] = Math.max(
      -PEAK_LIMIT,
      Math.min(PEAK_LIMIT, samples[index] * gain),
    );
}

export async function normalizeSpeech(wav: Blob): Promise<Blob> {
  const decoder = new OfflineAudioContext(1, 1, SAMPLE_RATE);
  const audio = await decoder.decodeAudioData(await wav.arrayBuffer());
  const samples = audio.getChannelData(0);
  const gain = speechGain(samples, audio.sampleRate);
  for (let index = 0; index < samples.length; index++) samples[index] *= gain;
  return speechWav(samples, audio.sampleRate);
}
