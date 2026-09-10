import { SoproTTS } from '@soprotts/onnx-web';
import { soproModel } from '../data/brainrot-voices';
import { speechWav } from './brainrot-audio';

let session: Promise<SoproTTS> | undefined;
let reference: Awaited<ReturnType<SoproTTS['prepareReference']>> | undefined;
let queue = Promise.resolve();

self.addEventListener(
  'message',
  ({
    data,
  }: MessageEvent<{
    id: number;
    text: string;
    reference?: Float32Array;
  }>) => {
    queue = queue.then(async () => {
      try {
        session ??= SoproTTS.create({
          model: soproModel.repository,
          revision: soproModel.revision,
          wasmPaths:
            'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.29.0/dist/',
          onProgress: ({ loaded, total }) =>
            self.postMessage({ type: 'progress', id: data.id, loaded, total }),
        });
        const voice = await session;
        if (!reference) {
          if (!data.reference) throw new Error('Falta a referência de voz.');
          reference = await voice.prepareReference(data.reference, {
            sampleRate: 24_000,
          });
        }
        const samples = await voice.synthesize(data.text, reference, {
          language: 'pt',
          maxSeconds: 30,
          seed: 42,
        });
        self.postMessage({
          type: 'audio',
          id: data.id,
          wav: speechWav(samples, voice.sampleRate),
        });
      } catch (error) {
        console.error('Sopro não conseguiu gerar a voz.', error);
        self.postMessage({ type: 'error', id: data.id });
      }
    });
  },
);
