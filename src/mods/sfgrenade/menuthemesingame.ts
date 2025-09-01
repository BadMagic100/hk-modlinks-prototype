import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "MenuThemesInGame",
  displayName: "Menu Themes In Game",
  description:
    "Applies the menu color correction to gameplay. Breaks immersion.",
  version: "1.5.0+0",
  links: {
    sha256: "8AF2B8C9FCBD5076F846F88BB2527ADF1DFE2EC47D77DCD7581D821831890CB0",
    url: "https://github.com/SFGrenade/MenuThemesInGame/releases/download/v1.5/MenuThemesInGame.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/MenuThemesInGame",
  issues: "https://github.com/SFGrenade/MenuThemesInGame/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
