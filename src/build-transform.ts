import type { Manifest } from "./manifest.js";

export type FileMapping = Record<string, Buffer>;

export abstract class BuildTransform {
  abstract readonly transformId: string;
  abstract run(manifests: Manifest<string, string>[]): PromiseLike<FileMapping>;
}
