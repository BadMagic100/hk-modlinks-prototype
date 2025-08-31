import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "WideCamera",
  displayName: "Wide Camera",
  description: "Make ultrawide screens possible without black bars. Should also work for thinner/taller than 16:9. In theory.",
  version: "1.5.1+4",
  links: {
    sha256: "2F4C3DC72E885FB6E0B2200CD6DE887519288F585750A2BD92085864EF03C5D9",
    url: "https://github.com/SFGrenade/WideCamera/releases/download/v1.5.1.4/WideCamera.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/WideCamera",
  issues: "https://github.com/SFGrenade/WideCamera/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
