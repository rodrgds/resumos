import { CachedFileReader, TtsSession } from '@jtsage/piper-tts-web';
import { brainrotVoices } from '../data/brainrot-voices';
import { DownloadProgress } from './brainrot-download-progress';

let session: Promise<TtsSession> | undefined;
let activeModel: string | undefined;
let queue = Promise.resolve();
const cancelled = new Set<number>();
const transferred = new DownloadProgress();

self.addEventListener(
  'message',
  ({
    data,
  }: MessageEvent<{
    id: number;
    text: string;
    model: string;
    cancel?: number[];
  }>) => {
    if (data.cancel) {
      for (const id of data.cancel) cancelled.add(id);
      return;
    }
    queue = queue.then(async () => {
      if (cancelled.delete(data.id)) return;
      try {
        const model = brainrotVoices.find((voice) => voice.id === data.model);
        if (
          !model ||
          model.engine !== 'piper' ||
          (activeModel && activeModel !== model.id)
        )
          throw new Error('Mudar de voz exige um novo Worker.');
        activeModel = model.id;
        session ??= TtsSession.create({
          voiceId: model.id,
          fileReader: new CachedFileReader({
            modelPathPrefix: `${model.repository}/resolve/${model.revision}`,
            pathMap: { [model.id]: model.file },
            cacheFolder: `brainrot-${model.id}-${model.revision}`,
            progress: (progress) => {
              self.postMessage({
                type: 'progress',
                id: data.id,
                loaded: transferred.update(progress),
                total: 0,
              });
              if (progress.total > 0 && progress.loaded >= progress.total)
                self.postMessage({
                  type: 'phase',
                  id: data.id,
                  phase: 'initializing',
                });
            },
          }),
        });
        const voice = await session;
        if (cancelled.has(data.id)) return;
        self.postMessage({ type: 'phase', id: data.id, phase: 'generating' });
        const wav = await voice.predict(data.text);
        if (cancelled.has(data.id)) return;
        self.postMessage({
          type: 'audio',
          id: data.id,
          wav,
        });
      } catch {
        session = undefined;
        self.postMessage({ type: 'error', id: data.id });
      } finally {
        cancelled.delete(data.id);
      }
    });
  },
);
