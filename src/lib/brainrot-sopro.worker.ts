import { SoproTTS } from '@soprotts/onnx-web';
import { soproModel } from '../data/brainrot-voices';
import { scaleSpeech, speechGain } from './brainrot-audio';
import { DownloadProgress } from './brainrot-download-progress';

const GAIN_SAMPLE_SECONDS = 1.2;
const generationOptions = { language: 'pt', seed: 42 };
let session: Promise<SoproTTS> | undefined;
let reference: object | undefined;
let queue = Promise.resolve();
const transferred = new DownloadProgress();
const cancelled = new Set<number>();

self.addEventListener(
  'message',
  ({
    data,
  }: MessageEvent<{
    id: number;
    text: string;
    reference?: Float32Array;
    cancel?: number[];
  }>) => {
    if (data.cancel) {
      for (const id of data.cancel) cancelled.add(id);
      return;
    }
    queue = queue.then(async () => {
      if (cancelled.delete(data.id)) return;
      const phase = (phase: string) =>
        self.postMessage({ type: 'phase', id: data.id, phase });
      try {
        phase('loading');
        session ??= SoproTTS.create({
          model: soproModel.repository,
          revision: soproModel.revision,
          wasmPaths:
            'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.29.0/dist/',
          onProgress: (progress) => {
            self.postMessage({
              type: 'progress',
              id: data.id,
              loaded: transferred.update(progress),
              total: 0,
            });
          },
        });
        const voice = await session;
        if (!reference) {
          if (!data.reference) throw new Error('Falta a referência de voz.');
          phase('reference');
          reference = await voice.prepareReference(data.reference, {
            sampleRate: 24_000,
          });
          phase('warming');
          await voice.prepareStreaming(reference, generationOptions);
        }
        if (cancelled.has(data.id)) return;
        phase('generating');
        let gain: number | undefined;
        let buffered: Float32Array[] = [];
        let sampleCount = 0;
        const emit = (samples: Float32Array<ArrayBuffer>) => {
          scaleSpeech(samples, gain!);
          self.postMessage(
            { type: 'chunk', id: data.id, samples },
            { transfer: [samples.buffer] },
          );
        };
        const flush = () => {
          if (!sampleCount) return;
          const samples = new Float32Array(sampleCount);
          let offset = 0;
          for (const chunk of buffered) {
            samples.set(chunk, offset);
            offset += chunk.length;
          }
          gain = speechGain(samples, voice.sampleRate);
          buffered = [];
          sampleCount = 0;
          emit(samples);
        };
        for await (const samples of voice.stream(
          data.text,
          reference,
          generationOptions,
        )) {
          if (cancelled.has(data.id)) return;
          if (gain !== undefined) {
            emit(samples);
            continue;
          }
          buffered.push(samples);
          sampleCount += samples.length;
          if (sampleCount >= GAIN_SAMPLE_SECONDS * voice.sampleRate) flush();
        }
        flush();
        self.postMessage({ type: 'end', id: data.id });
      } catch (error) {
        console.error('Sopro não conseguiu gerar a voz.', error);
        self.postMessage({ type: 'error', id: data.id });
      } finally {
        cancelled.delete(data.id);
      }
    });
  },
);
