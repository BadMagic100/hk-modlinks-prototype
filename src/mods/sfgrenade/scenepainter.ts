import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ScenePainter",
  displayName: "Scene Painter",
  description: "Creates SVG images of all scenes in the game. Can be initiated manually using the K key.",
  version: "1.5.1+6",
  links: {
    sha256: "7924126A6BED1187FD6D28BC178622AB56CF9E62BE17751F855B4754153DB7E2",
    url: "https://github.com/SFGrenade/ScenePainter/releases/download/v1.5.1.6/ScenePainter.zip",
  },
  dependencies: ["SvgLib"],
  repository: "https://github.com/SFGrenade/ScenePainter",
  issues: "https://github.com/SFGrenade/ScenePainter/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
