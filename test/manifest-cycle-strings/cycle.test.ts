import { Manifest } from "../../src/manifest.js";
import type { Expect, TypesEqual } from "../test-util.js";

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

const b = new Manifest({
  name: "b",
  description: "",
  dependencies: ["a"],
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});

type _ = [
  Expect<TypesEqual<typeof a, Manifest<"a", never>>>,
  Expect<TypesEqual<typeof b, Manifest<"b", "a">>>,
];

const aCycleDirect = new Manifest({
  name: "a",
  description: "",
  // @ts-expect-error direct self-dependency
  dependencies: ["a"],
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});

const aCycleTransitive = new Manifest({
  name: "a",
  description: "",
  // @ts-expect-error transitive self-dependency through a
  dependencies: [b],
  version: "1.0.0",
  repository: "https://github.com/BadMagic100/hk-modlinks",
  links: {
    url: "https://github.com/BadMagic100/hk-modlinks/releases/latest/download.zip",
    sha256: "",
  },
});
