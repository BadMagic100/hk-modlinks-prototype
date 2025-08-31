import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "CustomBgm",
  displayName: "Custom BGM",
  description: "Allows customization of background music. See its readme for a how-to.",
  version: "1.5.5+1",
  links: {
    sha256: "99E357CC7049FA686990A455764EB7BABE582BCA7F19010415B6C3C70B2FD26B",
    url: "https://github.com/SFGrenade/CustomBgm/releases/download/v1.5.5.1/CustomBgm.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/CustomBgm",
  issues: "https://github.com/SFGrenade/CustomBgm/issues",
  integrations: ["Custom Knight"],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
