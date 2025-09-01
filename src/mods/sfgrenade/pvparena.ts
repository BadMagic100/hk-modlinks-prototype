import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "PvpArena",
  displayName: "PvP Arena",
  description:
    "This mod adds a PvP arena with an invisible entrance right of the bench in Dirtmouth.",
  version: "1.5.1+0",
  links: {
    sha256: "52A249727D8E357201A7AF68CB01CD55B64BF0C1633D8C773827FF92681B31A7",
    url: "https://github.com/SFGrenade/PvpArena/releases/download/v1.5.1/PvpArena.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/PvpArena",
  issues: "https://github.com/SFGrenade/PvpArena/issues",
  integrations: [],
  tags: [Tags.EXPANSION],
  authors: ["SFGrenade"],
});
