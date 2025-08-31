import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "RedoBirthplace",
  displayName: "Redo Birthplace",
  description: "Redo the Birthplace cutscene.",
  version: "1.5.0+0",
  links: {
    sha256: "7944573C1D3567406D2D298F166204B3C8A6B03C2D30E248A43612B0B31653CC",
    url: "https://github.com/SFGrenade/RedoBirthplace/releases/download/v1.5/RedoBirthplace.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/RedoBirthplace",
  issues: "https://github.com/SFGrenade/RedoBirthplace/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
