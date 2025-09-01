import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "LanguageSupport",
  displayName: "Language Support",
  description:
    "Allows additional languages to be supported. Doesn't allow for some characters of other languages yet.",
  version: "1.5.1+0",
  links: {
    sha256: "F1C9853EFF0361019DCAEE19CE652EB972127C08711701E71D5C79C679F99609",
    url: "https://github.com/SFGrenade/LanguageSupport/releases/download/v1.5.1/LanguageSupport.zip",
  },
  dependencies: ["SFCore"],
  repository: "https://github.com/SFGrenade/LanguageSupport",
  issues: "https://github.com/SFGrenade/LanguageSupport/issues",
  integrations: [],
  tags: [Tags.COSMETIC, Tags.UTILITY],
  authors: ["SFGrenade", "Mulhima"],
});
