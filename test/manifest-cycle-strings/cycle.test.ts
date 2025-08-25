import { Manifest } from "../manifest.js";
import type { Expect, TypesEqual } from "../test-util.js";

const a = new Manifest({
  name: "a",
  description: "",
});

const b = new Manifest({
  name: "b",
  description: "",
  dependencies: ["a"],
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
});

const aCycleTransitive = new Manifest({
  name: "a",
  description: "",
  // @ts-expect-error transitive self-dependency through a
  dependencies: [b],
});
