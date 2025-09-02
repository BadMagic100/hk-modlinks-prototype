import { BuildTransform, type FileMapping } from "../build-transform.js";
import type { Manifest } from "../manifest.js";

import * as cbor2 from "cbor2";
import * as zlib from "node:zlib";

export class GzippedCborTransformer extends BuildTransform {
  readonly transformId = "cbor";
  run(manifests: Manifest<string, string>[]): PromiseLike<FileMapping> {
    const outputJson = manifests.map((m) => m.config);
    const outputCbor = cbor2.encode(outputJson);
    return new Promise((resolve, reject) => {
      zlib.gzip(outputCbor, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            "modlinks.cbor.gz": result,
          });
        }
      });
    });
  }
}

export default new GzippedCborTransformer();
