import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "StoriesOfaHkPlayer-Ch1",
  displayName: "Stories of a HK player - Chapter 1",
  description:
    "The start of a story of a Hollow Knight player and his personalized copy of the game.",
  version: "1.5.1+0",
  links: {
    sha256: "F4F9EB8CDC264D5F57EAD6C0FA68428D137635B7D1E4228A4100FF4AAA776B07",
    url: "https://github.com/SFGrenade/StoriesOfaHkPlayer-Ch1/releases/download/v1.5.1.0/StoriesOfaHkPlayer_Ch1.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/StoriesOfaHkPlayer-Ch1",
  issues: "https://github.com/SFGrenade/StoriesOfaHkPlayer-Ch1/issues",
  integrations: ["StoriesOfaHkPlayer-Ch2"],
  tags: [Tags.COSMETIC, Tags.EXPANSION],
  authors: ["SFGrenade"],
});
