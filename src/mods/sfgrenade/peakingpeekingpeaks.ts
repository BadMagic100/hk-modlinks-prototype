import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "PeakingPeekingPeaks",
  displayName: "Peaking Peeking Peaks",
  description: "This mods aims to make the Crystal Peak name more memorable.",
  version: "1.5.0+0",
  links: {
    sha256: "681DABDFBC1DB965496047985C4378FC10D77AEF98B2D1DC5DA38F5B8A39E6BE",
    url: "https://github.com/SFGrenade/PeakingPeekingPeaks/releases/download/v1.5/PeakingPeekingPeaks.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/PeakingPeekingPeaks",
  issues: "https://github.com/SFGrenade/PeakingPeekingPeaks/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
