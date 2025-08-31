import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "NeverMuffle",
  displayName: "Never Muffle",
  description: "Removes the muffling sound effect when taking damage.",
  version: "1.5.0+0",
  links: {
    sha256: "B14E6174A37CB08DEF7D52C3C3B392E54B3E26B9FBDF989D2FC322B778787D15",
    url: "https://github.com/SFGrenade/NeverMuffle/releases/download/v1.5/NeverMuffle.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/NeverMuffle",
  issues: "https://github.com/SFGrenade/NeverMuffle/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade", "Clazex"],
});
