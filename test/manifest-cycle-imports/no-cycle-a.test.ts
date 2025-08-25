import { Manifest } from "../manifest.js";
import { type Expect, type TypesEqual } from "../test-util.js";

const a = new Manifest({
  name: "a",
  description: "",
});

type _ = Expect<TypesEqual<typeof a, Manifest<"a", never>>>;

export default a;
