import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ColosseumTrophy",
  displayName: "Colosseum Trophy",
  description: "Reenables the colosseum trophy cut content.",
  version: "1.5.0+1",
  links: {
    sha256: "FC34AA7EA88D8CAF4BF621EE15EB99CCEF06D72836C887FEA1371D0E113BE206",
    url: "https://github.com/SFGrenade/ColosseumTrophy/releases/download/v1.5.0.1/ColosseumTrophy.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/ColosseumTrophy",
  issues: "https://github.com/SFGrenade/ColosseumTrophy/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
