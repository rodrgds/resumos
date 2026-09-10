type PendingAudio = {
  resolve: (wav: Blob) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
};

export class LocalVoice {
  #worker?: Worker;
  #nextId = 0;
  #pending = new Map<number, PendingAudio>();
  #progress: (loaded: number, total: number) => void;

  constructor(progress: (loaded: number, total: number) => void) {
    this.#progress = progress;
  }

  synthesize(text: string, model: string): Promise<Blob> {
    if (!this.#worker) {
      this.#worker = new Worker(
        new URL('./brainrot-voice.worker.ts', import.meta.url),
        { type: 'module' },
      );
      this.#worker.addEventListener('message', ({ data }) => {
        if (data.type === 'progress') {
          this.#progress(data.loaded, data.total);
          return;
        }
        const pending = this.#pending.get(data.id);
        if (!pending) return;
        clearTimeout(pending.timeout);
        this.#pending.delete(data.id);
        if (data.type === 'audio') pending.resolve(data.wav);
        else {
          pending.reject(new Error('Não foi possível preparar a voz.'));
          this.dispose();
        }
      });
      this.#worker.addEventListener('error', () => this.dispose());
    }
    const id = ++this.#nextId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => this.dispose(), 180_000);
      this.#pending.set(id, { resolve, reject, timeout });
      this.#worker!.postMessage({ id, text, model });
    });
  }

  dispose() {
    this.#worker?.terminate();
    this.#worker = undefined;
    for (const pending of this.#pending.values()) {
      clearTimeout(pending.timeout);
      pending.reject(new Error('A voz local foi interrompida.'));
    }
    this.#pending.clear();
  }
}
