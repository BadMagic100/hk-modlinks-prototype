import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "MoreHealing",
  displayName: "More Healing",
  description: "Adds more healing charms.",
  version: "1.5.3+7",
  links: {
    sha256: "9403D3FC7D959B01FBA20D355D14D0AEC35047A918F502496CBC70F981A7167B",
    url: "https://github.com/SFGrenade/MoreHealing/releases/download/v1.5.3.7/MoreHealing.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/MoreHealing",
  issues: "https://github.com/SFGrenade/MoreHealing/issues",
  integrations: [],
  tags: [Tags.GAMEPLAY],
  authors: ["SFGrenade"],
});
