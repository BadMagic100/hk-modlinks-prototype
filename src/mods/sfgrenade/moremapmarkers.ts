import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "MoreMapMarkers",
  displayName: "More Map Markers",
  description: "Adds configurably more map markers.",
  version: "1.5.1+2",
  links: {
    sha256: "D9C8898243A59753D094D652EA9BAD156FD883BF4D145671F9EC6A5E906418D1",
    url: "https://github.com/SFGrenade/MoreMapMarkers/releases/download/v1.5.1.2/MoreMapMarkers.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/MoreMapMarkers",
  issues: "https://github.com/SFGrenade/MoreMapMarkers/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
