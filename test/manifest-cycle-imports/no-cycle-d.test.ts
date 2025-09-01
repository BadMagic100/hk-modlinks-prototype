import { Manifest } from "../../src/manifest.js";
import b from "./no-cycle-b.test.js";
import c from "./no-cycle-c.test.js";
import { type Expect, type TypesEqual } from "../test-util.js";

const d = new Manifest({
  name: "d",
  description: "",
  dependencies: [b, c],
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});

type _ = Expect<TypesEqual<typeof d, Manifest<"d", "a" | "b" | "c">>>;

export default d;
