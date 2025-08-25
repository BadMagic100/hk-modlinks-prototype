import { Manifest } from "../manifest.js";
import b from "./no-cycle-b.test.js";
import c from "./no-cycle-c.test.js";
import { type Expect, type TypesEqual } from "../test-util.js";

const d = new Manifest({
  name: "d",
  description: "",
  dependencies: [b, c],
});

type _ = Expect<TypesEqual<typeof d, Manifest<"d", "a" | "b" | "c">>>;

export default d;
