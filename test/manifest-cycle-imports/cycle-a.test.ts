import { Manifest } from "../manifest.js";
import b from "./cycle-b.test.js";

// @ts-expect-error implicit any because of circular import
const a = new Manifest({
  name: "a",
  description: "",
  dependencies: [b],
});

// @ts-expect-error circular export
export default a;
