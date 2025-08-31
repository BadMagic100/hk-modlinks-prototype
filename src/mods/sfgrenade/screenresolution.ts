import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "ScreenResolution",
  displayName: "Screen Resolution",
  description: "Adds more available screen resolution options.",
  version: "1.5.0+0",
  links: {
    sha256: "F6D78D2A01D6D9C9D6F1050F122BCFFD579405B728DA1DFFF54008D131B38153",
    url: "https://github.com/SFGrenade/ScreenResolution/releases/download/v1.5.0.0/ScreenResolution.zip",
  },
  dependencies: ["Satchel", "SFCore"],
  repository: "https://github.com/SFGrenade/ScreenResolution",
  issues: "https://github.com/SFGrenade/ScreenResolution/issues",
  integrations: [],
  tags: [Tags.UTILITY],
  authors: ["SFGrenade"],
});
