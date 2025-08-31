import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "MagicUI",
  description:
    "A core mod to help other mods build UIs. Does nothing on its own.",
  version: "1.10.9277",
  repository: "https://github.com/BadMagic100/HollowKnight.MagicUI",
  links: {
    url: "https://github.com/BadMagic100/HollowKnight.MagicUI/releases/download/v1.10.9277.8364/MagicUI.zip",
    sha256: "EED36275276EA1BC5E8538A7E77A70D4DC47E13E7938585E51575D4D1D946D05",
  },
  tags: [Tags.LIBRARY],
  authors: ["BadMagic"],
});
