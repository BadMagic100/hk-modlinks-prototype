import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "SvgLib",
  displayName: "SvgLib",
  description: "SVG parser and composer library for .NET Framework and .NET Core.",
  version: "1.0.0+4",
  links: {
    sha256: "8EB73F3CF9A36919C1A153D702776515D5A58C5808C1FCB4D3400F72C272A795",
    url: "https://github.com/SFGrenade/svglib/releases/download/v1.0.0.4/SvgLib.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/svglib",
  issues: "https://github.com/SFGrenade/svglib/issues",
  integrations: [],
  tags: [Tags.LIBRARY],
  authors: ["Wouter Huysentruit", "SFGrenade"],
});
