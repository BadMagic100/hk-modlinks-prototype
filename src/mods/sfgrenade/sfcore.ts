import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "SFCore",
  displayName: "SFCore",
  description: "Library mod used by other mods.",
  version: "1.5.14+16",
  links: {
    sha256: "E8882F764AF1E90A1574D0D87A8687995D786FC36965B7D0F053AE7F52755FA0",
    url: "https://github.com/SFGrenade/SFCore/releases/download/v1.5.14.16/SFCore.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/SFCore",
  issues: "https://github.com/SFGrenade/SFCore/issues",
  integrations: [],
  tags: [Tags.LIBRARY],
  authors: ["SFGrenade", "Clazex", "Dandy", "dplochcoder"],
});
