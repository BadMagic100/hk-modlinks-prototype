import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "AdditionalMaps",
  displayName: "Additional Maps",
  description:
    "Adds white palace and godhome maps. The white palace one is next to the bench in the big room. The godhome one is next to the bench above the pantheons.",
  version: "1.5.4+1",
  links: {
    sha256: "78F34209CA461769F15705B73F1C2437BFCFD8894D3DB2201DD4F5B4E635957B",
    url: "https://github.com/SFGrenade/AdditionalMaps/releases/download/v1.5.4.1/AdditionalMaps.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/AdditionalMaps",
  issues: "https://github.com/SFGrenade/AdditionalMaps/issues",
  integrations: ["CompassAlwaysOn", "HKMP"],
  tags: [Tags.GAMEPLAY, Tags.UTILITY],
  authors: ["SFGrenade", "HelenSB", "kapkekes"],
});
