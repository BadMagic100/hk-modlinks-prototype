import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ZaliantsSurprise",
  displayName: "Zaliant's Surprise",
  description:
    "This is a mod idea by Zaliant.\nFormer Description:\nThis is the Pale Court mod.\nEnjoy!",
  version: "1.5.2+0",
  links: {
    sha256: "36F95A1C91874A2A617EA2D719262085E4F038DEF4F132C5C87AB9567DCC7720",
    url: "https://github.com/SFGrenade/ZaliantsSurprise/releases/download/v1.5.2/Pail-Curt.zip",
  },
  dependencies: ["FrogCore", "SFCore", "Vasi"],
  repository: "https://github.com/SFGrenade/ZaliantsSurprise",
  issues: "https://github.com/SFGrenade/ZaliantsSurprise/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade", "Zaliant"],
});
