import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "CustomSaveArt",
  displayName: "Custom Save Art",
  description: "Makes white palace save art funny. Literally nothing else.",
  version: "1.5.0+1",
  links: {
    sha256: "8302BE9F5D2FB9464310E9F74E11A7581A99185B81662DC09449BDC426A7C060",
    url: "https://github.com/SFGrenade/CustomSaveArt/releases/download/v1.5.0.1/CustomSaveArt.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/CustomSaveArt",
  issues: "https://github.com/SFGrenade/CustomSaveArt/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
