import { Manifest } from "../manifest.js";
import a from "./cycle-a.test.js";

// @ts-expect-error implicit any due to circular import
const b = new Manifest({
  name: "b",
  description: "",

  dependencies: [a],
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});

// @ts-expect-error circular export
export default b;
