import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "GeoLog",
  displayName: "Geo Log",
  description: "Logs all geo locations in the game. Goes through the entire game on startup.",
  version: "1.5.1+0",
  links: {
    sha256: "ABA4861BAA7FFDBF398AD22D6CE317FC41E5579843F80EFFD83B7C6355BE0093",
    url: "https://github.com/SFGrenade/GeoLog/releases/download/v1.5.1/GeoLog.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/GeoLog",
  issues: "https://github.com/SFGrenade/GeoLog/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
