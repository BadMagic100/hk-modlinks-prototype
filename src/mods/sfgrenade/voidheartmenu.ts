import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "VoidHeartMenu",
  displayName: "Void Heart Menu",
  description:
    "Makes the Voidheart edition text appear on pc versions of the game.",
  version: "1.5.0+0",
  links: {
    sha256: "18768E89D677E64AAB3C95DBCAD37901EC03413F643F26E58F22524C4452CE79",
    url: "https://github.com/SFGrenade/VoidHeartMenu/releases/download/v1.5.0.0/VoidHeartMenu.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/VoidHeartMenu",
  issues: "https://github.com/SFGrenade/VoidHeartMenu/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
