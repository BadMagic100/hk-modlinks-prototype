import { Manifest } from "../manifest.js";
import a from "./no-cycle-a.test.js";
import { type Expect, type TypesEqual } from "../test-util.js";

const b = new Manifest({
  name: "b",
  description: "",
  dependencies: [a],
});

type _ = Expect<TypesEqual<typeof b, Manifest<"b", "a">>>;

export default b;
