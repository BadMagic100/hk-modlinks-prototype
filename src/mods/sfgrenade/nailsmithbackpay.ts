import { Manifest } from "../../manifest.js";
import { Tags } from "../../tags.js";

export default new Manifest({
  name: "NailsmithBackPay",
  displayName: "Nailsmith Back Pay",
  description: "Get your geo back from the nailsmith after upgrading your nail.",
  version: "1.5.0+0",
  links: {
    sha256: "16188DCD98860FCE814F075966936B434F8FAC7A1556881FFD8CD29A1030E40A",
    url: "https://github.com/SFGrenade/NailsmithBackPay/releases/download/v1.5/NailsmithBackPay.zip",
  },
  dependencies: [],
  repository: "https://github.com/SFGrenade/NailsmithBackPay",
  issues: "https://github.com/SFGrenade/NailsmithBackPay/issues",
  integrations: [],
  tags: [Tags.COSMETIC],
  authors: ["SFGrenade"],
});
