import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "RadiantMenu",
  displayName: "Radiant Menu",
  description: "Adds a radiant menu theme to the game.",
  version: "1.5.2+0",
  links: {
    sha256: "DCE52F62E5B7FBF3AFA42D4CF0E7A8DC9DF2FD0A0DFDEED490A55EF6DF531983",
    url: "https://github.com/SFGrenade/RadiantMenu/releases/download/v1.5.2/RadiantMenu.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/RadiantMenu",
  issues: "https://github.com/SFGrenade/RadiantMenu/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade", "Mulhima"],
});
