import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "MoreMasks",
  displayName: "More Masks",
  description: "Makes more masks available to be displayed. Also works for lifeblood masks. By default it shows 28 masks per row. Can be adjusted by editing the globalsettings file of this mod.",
  version: "1.5.0+1",
  links: {
    sha256: "90310FBD2D7FB735351CB4089552EB84ABF3AF80D95FA550C48CC88F32C6A8C0",
    url: "https://github.com/SFGrenade/MoreMasks/releases/download/v1.5.0.1/MoreMasks.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/MoreMasks",
  issues: "https://github.com/SFGrenade/MoreMasks/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
