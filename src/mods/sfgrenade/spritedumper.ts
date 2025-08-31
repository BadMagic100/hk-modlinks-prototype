import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "SpriteDumper",
  displayName: "Sprite Dumper",
  description: "A mod that dumps sprites. Can take more than 10 minutes per dump. Uses the P key to initiate dumping.",
  version: "1.5.0+0",
  links: {
    sha256: "D2425256B9851A2A21226897D8039CC1D511EF94B9FF0288BE499694B413AECC",
    url: "https://github.com/SFGrenade/SpriteDumper/releases/download/v1.5/SpriteDumper.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/SpriteDumper",
  issues: "https://github.com/SFGrenade/SpriteDumper/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
