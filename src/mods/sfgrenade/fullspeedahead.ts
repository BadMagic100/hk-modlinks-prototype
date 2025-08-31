import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "FullSpeedAhead",
  displayName: "Full Speed Ahead",
  description: "Removes Parry Slow-Down.",
  version: "1.5.1+0",
  links: {
    sha256: "23109D2296052F49D6DCD9B7E1040508AD3AAEA247D377BA680D6BD6CF858D5F",
    url: "https://github.com/SFGrenade/FullSpeedAhead/releases/download/v1.5.1/FullSpeedAhead.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/FullSpeedAhead",
  issues: "https://github.com/SFGrenade/FullSpeedAhead/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
