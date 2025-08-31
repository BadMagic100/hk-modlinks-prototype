import { Manifest } from "../../manifest.js";
import storiesofahkplayer_ch1 from "./storiesofahkplayer-ch1.js";

export default new Manifest({
  name: "Stories of a HK player - Chapter 1",
  description: "Dummy mod. Install the dependency \"StoriesOfaHkPlayer-Ch1\" directly.",
  version: "9.9.9-final+9",
  repository: "https://github.com/SFGrenade/EmptyMod",
  links: {
    url: "https://github.com/SFGrenade/EmptyMod/releases/download/v9.9.9.9/EmptyMod.zip",
    sha256: "00280F51FB9F3030B4F1BBBAD3AB29082A706994E4FAF783AA955054673BC74B",
  },
  dependencies: [storiesofahkplayer_ch1],
});
