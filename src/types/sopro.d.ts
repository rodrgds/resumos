declare module '@soprotts/onnx-web' {
  export class SoproTTS {
    sampleRate: number;
    static create(options: {
      model: string;
      revision: string;
      wasmPaths: string;
      onProgress: (progress: { loaded: number; total: number }) => void;
    }): Promise<SoproTTS>;
    prepareReference(
      samples: Float32Array,
      options: { sampleRate: number },
    ): Promise<object>;
    synthesize(
      text: string,
      reference: object,
      options: {
        language: string;
        maxSeconds: number;
        seed: number;
      },
    ): Promise<Float32Array>;
  }
}
