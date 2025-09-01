import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "HollowKnightAchievementManager",
  displayName: "Hollow Knight Achievement Manager",
  description:
    "Allows to manage Hollow Knight achievements, both vanilla and modded. Also syncs them with the online store of choice (GOG, Steam, XBox). Also allows to un-/lock menu themes and game modes.",
  version: "1.5.2+0",
  links: {
    sha256: "09843B49A0BAC2E0CA47A247AC2D6D44D53AEC3D3AF39E228254481460B18DAF",
    url: "https://github.com/SFGrenade/HollowKnightAchievementManager/releases/download/v1.5.2/HollowKnightAchievementManager.zip",
  },
  dependencies: ["Satchel", "SFCore"],
  repository: "https://github.com/SFGrenade/HollowKnightAchievementManager",
  issues: "https://github.com/SFGrenade/HollowKnightAchievementManager/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
