import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "TestOfTeamwork",
  displayName: "Test of Teamwork",
  description: "Adds a Path of Pain style section to the White Palace.\nStart by talking to people in and around dirtmouth.\nThis is a singleplayer mod. The \"teamwork\" refers to in-game events.",
  version: "1.5.79+11",
  links: {
    sha256: "E1AC9DC9F14045339392768DB95C5603AE6717413EFED5A55700AABD0FFEFB49",
    url: "https://github.com/SFGrenade/TestOfTeamwork/releases/download/v1.5.79.11/TestOfTeamwork.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/TestOfTeamwork",
  issues: "https://github.com/SFGrenade/TestOfTeamwork/issues",
  integrations: ["DebugMod", "HKMP"],
  tags: [Tags.BOSS, Tags.EXPANSION, Tags.GAMEPLAY],
  authors: ["SFGrenade", "NoSoundlow", "profdrmops", "Zaliant", "Chaktis", "HelenSB", "Clazex", "SalehAce1", "56", "Araraura", "Laucian", "Chrome", "Fireb0rn", "Astral Ruby"],
});
