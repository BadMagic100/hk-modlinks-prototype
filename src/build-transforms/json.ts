import axios from "axios";
import { BuildTransform, type FileMapping } from "../build-transform.js";
import { Manifest, type StringCheckedConfig } from "../manifest.js";

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

  async parse(url: URL): Promise<Manifest<string, string>[]> {
    const response = await axios.get(url.toString());
    return (response.data as unknown[]).map(
      (x) => new Manifest(x as StringCheckedConfig<string, string>),
    );
  }
}

// plugin implementation
export default new JsonTransform();
