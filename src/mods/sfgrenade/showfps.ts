import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ShowFPS",
  displayName: "Show FPS",
  description: "A mod that adds a FPS display in the bottom right corner.",
  version: "1.5.0+0",
  links: {
    sha256: "B7929834A26AC17BF05CED9C51EE283AD5EB3DD207EA1E1FF80112004FBCF081",
    url: "https://github.com/SFGrenade/ShowFPS/releases/download/v1.5/ShowFPS.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/ShowFPS",
  issues: "https://github.com/SFGrenade/ShowFPS/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
