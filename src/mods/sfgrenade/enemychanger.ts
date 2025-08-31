import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "EnemyChanger",
  displayName: "Enemy Changer",
  description: "Allows to dump and replace enemy textures. Refer to the readme on how to do that.",
  version: "1.5.2+0",
  links: {
    sha256: "F1193A62CF17066B449C096CB5ECBAAE4528D6DD5EB97BDB756074E22AB77AF0",
    url: "https://github.com/SFGrenade/EnemyChanger/releases/download/v1.5.2/EnemyChanger.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/EnemyChanger",
  issues: "https://github.com/SFGrenade/EnemyChanger/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade", "nesrak1"],
});
