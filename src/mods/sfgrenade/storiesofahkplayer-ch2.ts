import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "StoriesOfaHkPlayer-Ch2",
  displayName: "Stories of a HK player - Chapter 2",
  description:
    "The second iteration of a story of a Hollow Knight player and his personalized copy of the game.\nWarning for people streaming this mod: This mod displays your windows/mac/linux username.",
  version: "1.5.2+2",
  links: {
    sha256: "C5E95E5D79E78737E32E22C0303DCBF3F24E1EB060C995382D7AA4E83735E29A",
    url: "https://github.com/SFGrenade/StoriesOfaHkPlayer-Ch2/releases/download/v1.5.2.2/StoriesOfaHkPlayer_Ch2.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/StoriesOfaHkPlayer-Ch2",
  issues: "https://github.com/SFGrenade/StoriesOfaHkPlayer-Ch2/issues",
  integrations: ["StoriesOfaHkPlayer-Ch1"],
  tags: [Tags.COSMETIC, Tags.EXPANSION],
  authors: ["SFGrenade", "HelenSB"],
});
