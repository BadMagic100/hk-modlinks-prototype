import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";
import satchel from "./satchel.js";

export default new Manifest({
  name: "Custom Knight",
  description: "Supports Skins for Player, Enemies and Area overhauls",
  version: "3.5.0",
  repository: "https://github.com/PrashantMohta/HollowKnight.CustomKnight/",
  links: {
    url: "https://github.com/PrashantMohta/HollowKnight.CustomKnight/releases/download/v3.5.0/CustomKnight.zip",
    sha256: "928e240f030b008a374f3881663197b438d7660b3a23ce736024bfbf02fbb0d7",
  },
  authors: ["Dandy"],
  dependencies: [satchel],
  tags: [Tags.COSMETIC],
});
