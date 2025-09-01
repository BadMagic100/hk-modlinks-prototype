import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "CursedMod",
  displayName: "Cursed Mod",
  description:
    "This mod does miscellaneous stuff. Like making the game window be dark mode on windows.",
  version: "1.5.0+0",
  links: {
    sha256: "B815042B3828AFCB90808331E72AA8E929369114FDB76906943C3D5799989F04",
    url: "https://github.com/SFGrenade/CursedMod/releases/download/v1.5/CursedMod.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/CursedMod",
  issues: "https://github.com/SFGrenade/CursedMod/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
