import { Manifest } from "../manifest.js";
import a from "./cycle-a.test.js";

// @ts-expect-error implicit any due to circular import
const b = new Manifest({
  name: "b",
  description: "",
  dependencies: [a],
});

// @ts-expect-error circular export
export default b;
