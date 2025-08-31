import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "FuryFix",
  displayName: "Fury Fix",
  description: "Tries to fix fury for 1 max health saves.",
  version: "1.5.0+0",
  links: {
    sha256: "7B30BF03780F7E5CA3C83D9D61B5EA19B6C6A0314B04874FAD1392ED7A1FF1D8",
    url: "https://github.com/SFGrenade/FuryFix/releases/download/v1.5/FuryFix.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/FuryFix",
  issues: "https://github.com/SFGrenade/FuryFix/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
