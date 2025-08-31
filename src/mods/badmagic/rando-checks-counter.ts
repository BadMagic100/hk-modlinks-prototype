import { Manifest } from "../../manifest.js";
import itemChanger from "../homothety/item-changer.js";
import magicUi from "./magic-ui.js";

export default new Manifest({
  name: "RandoChecksCounter",
  description:
    "An ItemChanger extension that provides a live counter of checked locations.",
  version: "1.1.8484",
  repository: "https://github.com/BadMagic100/RandoChecksCounter",
  links: {
    url: "https://github.com/BadMagic100/RandoChecksCounter/releases/download/v1.1.8484.32273/RandoChecksCounter.zip",
    sha256: "DA4DD9ABFB99BA1BDFD6AA21759EFF6ADAB89E60B2F434CE2C03EDECAFB29ED2",
  },
  authors: ["BadMagic"],
  // smart reference
  dependencies: [magicUi, itemChanger],
});
