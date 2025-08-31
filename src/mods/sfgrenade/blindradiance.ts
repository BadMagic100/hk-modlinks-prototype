import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "BlindRadiance",
  displayName: "Blind Radiance",
  description: "Makes background darker in selected scenes to make foreground objects more visible.",
  version: "1.5.2+3",
  links: {
    sha256: "C5FD2168D077FD8F96275804966E527F5361DD94927F598A47B415610DCEFE19",
    url: "https://github.com/SFGrenade/BlindRadiance/releases/download/v1.5.2.3/BlindRadiance.zip",
  },
  dependencies: ["Satchel", "SFCore"],
  repository: "https://github.com/SFGrenade/BlindRadiance",
  issues: "https://github.com/SFGrenade/BlindRadiance/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
