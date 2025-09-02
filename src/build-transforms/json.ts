import { BuildTransform, type FileMapping } from "../build-transform.js";
import type { Manifest } from "../manifest.js";

export class JsonTransform extends BuildTransform {
  readonly transformId = "json";
  readonly indentation: number;

  constructor(indentation: number = 2) {
    super();
    this.indentation = indentation;
  }

  run(manifests: Manifest<string, string>[]): Promise<FileMapping> {
    const outputJson = manifests.map((m) => m.config);
    const outputString = JSON.stringify(
      outputJson,
      undefined,
      this.indentation,
    );
    return Promise.resolve({
      "modlinks.json": Buffer.from(outputString, "utf8"),
    });
  }
}

// plugin implementation
export default new JsonTransform();
