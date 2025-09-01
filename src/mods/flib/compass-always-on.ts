import { Manifest } from "../../manifest.js";

export default new Manifest({
  name: "CompassAlwaysOn",
  description:
    "Makes it so the Knight's icon always appears on the map, even if Wayward Compass isn't in your inventory.",
  version: "1.2.1",
  repository: "https://github.com/flibber-hk/HollowKnight.CompassAlwaysOn",
  links: {
    url: "https://github.com/flibber-hk/HollowKnight.CompassAlwaysOn/releases/download/v1.2.1.0/CompassAlwaysOn.zip",
    sha256: "1c61505306092d651c360a60af1175a7ff8cd6f273ad7b3a0f9c1145e9001a2e",
  },
  integrations: ["HKMP", "AdditionalMaps"],
  authors: ["Flib"],
});
