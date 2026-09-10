declare module '@soprotts/onnx-web' {
  type GenerationOptions = { language: string; seed: number };
  export class SoproTTS {
    sampleRate: number;
    static create(options: {
      model: string;
      revision: string;
      wasmPaths: string;
      onProgress: (progress: {
        url: string;
        loaded: number;
        total: number;
      }) => void;
    }): Promise<SoproTTS>;
    prepareReference(
      samples: Float32Array,
      options: { sampleRate: number; seconds?: number },
    ): Promise<object>;
    prepareStreaming(
      reference: object,
      options: GenerationOptions,
    ): Promise<void>;
    stream(
      text: string,
      reference: object,
      options: GenerationOptions,
    ): AsyncGenerator<Float32Array<ArrayBuffer>>;
    synthesize(
      text: string,
      reference: object,
      options: GenerationOptions,
    ): Promise<Float32Array<ArrayBuffer>>;
  }
}
