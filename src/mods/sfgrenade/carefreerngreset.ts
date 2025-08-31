import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "CarefreeRngReset",
  displayName: "Carefree Rng Reset",
  description: "This mod resets carefree melody rng to highest likelyhood of blocking each time the player enters the hall of gods.",
  version: "1.5.0+1",
  links: {
    sha256: "BDD97533C7626FF64DF8D638CDEADB960303D4DA3870D199D4F10D665BEA3C6B",
    url: "https://github.com/SFGrenade/MetabusserCheatMod/releases/download/v1.5.0.1/CarefreeRngReset.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/MetabusserCheatMod",
  issues: "https://github.com/SFGrenade/MetabusserCheatMod/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
