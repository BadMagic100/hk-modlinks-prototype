import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "Satchel",
  description:
    "A Satchel is a bag, this one has cool stuff for other mods to use",
  version: "0.9.4",
  repository: "https://github.com/PrashantMohta/Satchel",
  links: {
    url: "https://github.com/PrashantMohta/Satchel/releases/download/v0.9.4/Satchel.zip",
    sha256: "8999115b7a8e1f3c3303ccb3fb5fb57d536830bcecd74b4b11d6bf145fdf4e08",
  },
  tags: [Tags.LIBRARY],
  authors: ["Dandy", "Mulhima", "Ruttie"],
});
