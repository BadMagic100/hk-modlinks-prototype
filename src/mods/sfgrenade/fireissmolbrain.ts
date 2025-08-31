import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "FireIsSmolBrain",
  displayName: "Fire Is Smol Brain",
  description: "Adds a soul totem to dirtmouth and blocks off boss arenas.",
  version: "1.5.0+0",
  links: {
    sha256: "5A7FC5C3AC551B0258BB01D1BE42D6D1073DF18C0FC767327A6497B65F80A12B",
    url: "https://github.com/SFGrenade/FireIsSmolBrain/releases/download/v1.5/FireIsSmolBrain.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/FireIsSmolBrain",
  issues: "https://github.com/SFGrenade/FireIsSmolBrain/issues",
  integrations: [],
  tags: [Tags.GAMEPLAY, Tags.UTILITY],
  authors: ["SFGrenade", "Fireb0rn"],
});
