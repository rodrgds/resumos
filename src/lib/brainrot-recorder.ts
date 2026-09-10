import { RECORDING_SECONDS } from './brainrot-personal-voice';

export class VoiceRecorder {
  #recorder?: MediaRecorder;
  #stream?: MediaStream;
  #timer?: ReturnType<typeof setTimeout>;
  #generation = 0;

  async start(callbacks: {
    recorded: (audio: Blob) => void;
    error: () => void;
  }) {
    this.cancel();
    const generation = this.#generation;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder)
      throw new Error(
        'Este navegador não permite gravar áudio. Experimenta uma versão recente do Chrome, Firefox ou Safari.',
      );
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: false,
    });
    if (generation !== this.#generation) {
      stream.getTracks().forEach((track) => track.stop());
      throw new DOMException('Gravação cancelada.', 'AbortError');
    }
    this.#stream = stream;
    try {
      const mimeType = [
        'audio/webm;codecs=opus',
        'audio/mp4',
        'audio/ogg;codecs=opus',
      ].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      this.#recorder = recorder;
      const chunks: Blob[] = [];
      recorder.addEventListener('dataavailable', ({ data }) => {
        if (data.size) chunks.push(data);
      });
      recorder.addEventListener('stop', () => {
        if (generation !== this.#generation) return;
        this.#releaseMicrophone();
        callbacks.recorded(new Blob(chunks, { type: recorder.mimeType }));
      });
      recorder.addEventListener('error', () => {
        if (generation !== this.#generation) return;
        this.cancel();
        callbacks.error();
      });
      recorder.start();
      this.#timer = setTimeout(() => this.stop(), RECORDING_SECONDS * 1000);
    } catch (error) {
      this.cancel();
      throw error;
    }
  }

  stop() {
    if (this.#recorder?.state === 'recording') this.#recorder.stop();
    this.#releaseMicrophone();
  }

  cancel() {
    this.#generation++;
    this.stop();
    this.#recorder = undefined;
  }

  #releaseMicrophone() {
    clearTimeout(this.#timer);
    this.#stream?.getTracks().forEach((track) => track.stop());
    this.#stream = undefined;
  }
}
