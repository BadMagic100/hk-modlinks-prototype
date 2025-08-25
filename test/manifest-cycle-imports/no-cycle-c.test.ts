import { Manifest } from "../manifest.js";
import a from "./no-cycle-a.test.js";
import { type Expect, type TypesEqual } from "../test-util.js";

const c = new Manifest({
  name: "c",
  description: "",
  dependencies: [a],
});

type _ = Expect<TypesEqual<typeof c, Manifest<"c", "a">>>;

export default c;
