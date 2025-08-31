import { Manifest } from "../../manifest.js";
import storiesofahkplayer_ch2 from "./storiesofahkplayer-ch2.js";

export default new Manifest({
  name: "Stories of a HK player - Chapter 2",
  description: "Dummy mod. Install the dependency \"StoriesOfaHkPlayer-Ch2\" directly.",
  version: "9.9.9-final+9",
  repository: "https://github.com/SFGrenade/EmptyMod",
  links: {
    url: "https://github.com/SFGrenade/EmptyMod/releases/download/v9.9.9.9/EmptyMod.zip",
    sha256: "00280F51FB9F3030B4F1BBBAD3AB29082A706994E4FAF783AA955054673BC74B",
  },
  dependencies: [storiesofahkplayer_ch2],
});
