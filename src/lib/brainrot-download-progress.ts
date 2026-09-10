export class DownloadProgress {
  #assets = new Map<string, number>();

  update({ url, loaded }: { url: string; loaded: number }): number {
    this.#assets.set(url, Math.max(this.#assets.get(url) ?? 0, loaded));
    return [...this.#assets.values()].reduce((sum, bytes) => sum + bytes, 0);
  }
}
