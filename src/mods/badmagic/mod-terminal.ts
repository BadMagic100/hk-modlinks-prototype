import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";
import debugMod from "../debug-mod.js";
import magicUi from "./magic-ui.js";

export default new Manifest({
  name: "ModTerminal",
  description:
    "Adds an in-game terminal for entering commands and cheats as a DebugMod addon.",
  version: "2.0.8464+8319",
  links: {
    url: "https://github.com/BadMagic100/ModTerminal/releases/download/v2.0.8464.8319/ModTerminal.zip",
    sha256: "48B995969024F19103CCCB89722033280C5D82E4E24F01F543963DB52FA0BFA5",
  },
  dependencies: [magicUi, debugMod],
  repository: "https://github.com/BadMagic100/ModTerminal",
  tags: [Tags.UTILITY],
  authors: ["BadMagic"],
});
