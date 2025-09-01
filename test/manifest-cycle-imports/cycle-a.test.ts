import { Manifest } from "../../src/manifest.js";
import b from "./cycle-b.test.js";

// @ts-expect-error implicit any because of circular import
const a = new Manifest({
  name: "a",
  description: "",
  dependencies: [b],
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});

// @ts-expect-error circular export
export default a;
