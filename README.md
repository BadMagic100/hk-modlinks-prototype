This repo is a proof of concept for how the Hollow Knight
modding community may implement modlinks for Silksong.
It uses Typescript to shift validation left and enable
rapid iteration, while providing a build step to improve
organization and provide multiple output formats via a
vended CLI and plugin architecture. For more detail on the
use cases this solves and design decisions, see 
https://github.com/BadMagic100/hk-modlinks-prototype/blob/main/docs/design.md

The built modlinks can be found in GitHub pages 
* JSON: https://badmagic100.github.io/hk-modlinks-prototype/json/modlinks.json
* Gzipped CBOR: https://badmagic100.github.io/hk-modlinks-prototype/cbor/modlinks.cbor.gz
