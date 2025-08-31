import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "BenchWarpFix",
  displayName: "Bench Warp Fix",
  description: "When benchwarping into a scene without a bench, instead of softlock drops you into dirtmouth. Probably doesn't work with glitched runs.",
  version: "1.5.1+1",
  links: {
    sha256: "D22C6C90EFEFBB649314586EFD3A8FAACDD2D772CA0917FC3F701B574DE17FDE",
    url: "https://github.com/SFGrenade/BenchWarpFix/releases/download/v1.5.1.1/BenchWarpFix.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/BenchWarpFix",
  issues: "https://github.com/SFGrenade/BenchWarpFix/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
