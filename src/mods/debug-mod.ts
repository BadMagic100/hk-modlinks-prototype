import { Manifest } from "../manifest.js";
import { Tags } from "../tags.js";

export default new Manifest({
  name: "DebugMod",
  description:
    "Allows for debug tools and features like no clip, invincibility, removing and giving items and abilities",
  version: "1.4.10",
  links: {
    url: "https://github.com/TheMulhima/HollowKnight.DebugMod/releases/download/v1.4.10.2/DebugMod.zip",
    sha256: "1220155C2E40E2D143180F24DFAB9357F7C0C83E2D76B091CE409962A3C9160A",
  },
  repository: "https://github.com/TheMulhima/HollowKnight.DebugMod",
  tags: [Tags.UTILITY],
  authors: [
    "Serena",
    "The Embraced One",
    "56",
    "KayDeeTee",
    "Cerpintext",
    "DemJameson",
    "Mulhima",
    "Flib",
    "pseudorandom",
    "Magnetic Pizza",
  ],
});
