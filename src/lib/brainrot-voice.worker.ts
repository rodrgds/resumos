import { CachedFileReader, TtsSession } from '@jtsage/piper-tts-web';
import { brainrotVoices } from '../data/brainrot-voices';

let session: Promise<TtsSession> | undefined;
let activeModel: string | undefined;
let queue = Promise.resolve();

self.addEventListener(
  'message',
  ({ data }: MessageEvent<{ id: number; text: string; model: string }>) => {
    queue = queue.then(async () => {
      try {
        const model = brainrotVoices.find((voice) => voice.id === data.model);
        if (!model || (activeModel && activeModel !== model.id))
          throw new Error('Mudar de voz exige um novo Worker.');
        activeModel = model.id;
        session ??= TtsSession.create({
          voiceId: model.id,
          fileReader: new CachedFileReader({
            modelPathPrefix: `${model.repository}/resolve/${model.revision}`,
            pathMap: { [model.id]: model.file },
            cacheFolder: `brainrot-${model.id}-${model.revision}`,
            progress: ({ loaded, total }) =>
              self.postMessage({
                type: 'progress',
                id: data.id,
                loaded,
                total,
              }),
          }),
        });
        const voice = await session;
        const wav = await voice.predict(data.text);
        self.postMessage({ type: 'audio', id: data.id, wav });
      } catch {
        session = undefined;
        self.postMessage({ type: 'error', id: data.id });
      }
    });
  },
);
