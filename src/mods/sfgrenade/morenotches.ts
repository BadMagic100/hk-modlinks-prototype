import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "MoreNotches",
  displayName: "More Notches",
  description:
    "Makes more charm notches available to be displayed. Also works for overcharm and charm detail notches. By default it shows up to 50 equipped notches and 20 charm detail notches. Can be adjusted by editing the globalsettings file of this mod.",
  version: "1.5.0+0",
  links: {
    sha256: "92B7FA09D41CB35E85205A5E5E52ED02DA35014C3CC759058AD906E4FE09C30C",
    url: "https://github.com/SFGrenade/MoreNotches/releases/download/v1.5.0.0/MoreNotches.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/MoreNotches",
  issues: "https://github.com/SFGrenade/MoreNotches/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
