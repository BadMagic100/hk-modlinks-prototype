import { Manifest } from "../../src/manifest.js";
import { type Expect, type TypesEqual } from "../test-util.js";

const a = new Manifest({
  name: "a",
  description: "",
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});

type _ = Expect<TypesEqual<typeof a, Manifest<"a", never>>>;

export default a;
