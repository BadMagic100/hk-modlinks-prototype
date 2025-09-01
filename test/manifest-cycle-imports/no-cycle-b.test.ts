import { Manifest } from "../../src/manifest.js";
import a from "./no-cycle-a.test.js";
import { type Expect, type TypesEqual } from "../test-util.js";

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

type _ = Expect<TypesEqual<typeof b, Manifest<"b", "a">>>;

export default b;
