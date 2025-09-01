import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "FrogCore",
  description:
    "Library mod containing helpers for adding journal entries, npcs, shops and many tk2d helpers for editing and creating sprite collections and animations.",
  version: "2.0.1",
  links: {
    sha256: "2943D569C5643521AB29BA17E8BA904FE1250719B2B1AD5E6116AFDA7F7BCDF8",
    url: "https://github.com/RedFrog6002/FrogCore/releases/download/v2.0.1.0/FrogCore.zip",
  },
  repository: "https://github.com/RedFrog6002/FrogCore",
  tags: [Tags.LIBRARY],
});
