import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ResetCharmNotches",
  displayName: "Reset Charm Notches",
  description: "Reset charm notches and charm notch cost.",
  version: "1.5.0+0",
  links: {
    sha256: "69F8A5979D2C208933229FE7AD1FCFFB3201B07AF26C7958FCED9A5CDAF6834A",
    url: "https://github.com/SFGrenade/ResetCharmNotches/releases/download/v1.5/ResetCharmNotches.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/ResetCharmNotches",
  issues: "https://github.com/SFGrenade/ResetCharmNotches/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
