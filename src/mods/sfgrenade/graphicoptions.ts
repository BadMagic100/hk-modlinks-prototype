import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "GraphicOptions",
  displayName: "Graphic Options",
  description:
    'Adds a "few" graphics options. Some of those "might" be unstable to change.',
  version: "1.5.1+1",
  links: {
    sha256: "A40DBEF1814D9DCE9A08693DD70CF15F3C11203B7F502233CF2F5F27E1F87222",
    url: "https://github.com/SFGrenade/GraphicOptions/releases/download/v1.5.1.1/GraphicOptions.zip",
  },
  dependencies: ["Satchel", "SFCore"],
  repository: "https://github.com/SFGrenade/GraphicOptions",
  issues: "https://github.com/SFGrenade/GraphicOptions/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
