import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ConnectionMetadataInjector",
  description:
    "A core mod to allow randomizer-supplemental mods like RandoStats and " +
    "RandoMapMod to get custom metadata from connections without hard dependencies",
  version: "2.2.8484",
  repository: "https://github.com/BadMagic100/ConnectionMetadataInjector",
  links: {
    url: "https://github.com/BadMagic100/ConnectionMetadataInjector/releases/download/v2.2.8484.33350/ConnectionMetadataInjector.zip",
    sha256: "02926D470544BA8D0CF25E1806B10B798ACDD5E85BB0E2D75A6022B536E5E1D0",
  },
  // note lazy import of IC
  dependencies: ["ItemChanger"],
  tags: [Tags.LIBRARY],
  authors: ["BadMagic"],
});
