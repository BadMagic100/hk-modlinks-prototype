# Implementing Modlinks in TypeScript

## Background and Problem Statement

On the current patch of Hollow Knight, all mods are managed in a single XML file on a
[central repository](https://github.com/hk-modding/modlinks/blob/main/ModLinks.xml). This has a
number of benefits, including having a full history of all revisions to all mods and being very
simple for mod installers to access. However, there are many pain points, particularly in
relationship to the developer experience.

- Working with a large centralized file is cumbersome.
  - There is no clear indication of where in the file a developer should put their mod manifests,
    and finding manifests for published mods can become challenging, especially if a developer's
    mods are used as dependencies.
  - A developer's mods can be inadvertently removed or modified during someone else's update.
  - It is challenging to publish mods via CI/CD workflows, largely because of the above points.
  - In some cases, the manual effort needed to update modlinks.xml is more than the effort spent
    creating/updating the mod.
- XML is an old and verbose data format.
  - Many developers would prefer to write something more modern and/or terse.
  - Some consumers would prefer to use a different input format for a variety of reasons (ability to
    parse, size over the network, etc.).
  - XML schema validation imposes some arbitrary restrictions on the way data can be provided, which
    are not transparent to developers.
- For new users, an intermediate-level knowledge of git and GitHub are required to create a pull
  request to modlinks, which can be a barrier to entry.
- For power users, there is limited additional support to improve efficiency.
  - IDEs do not automatically provide autocomplete about what is expected in the schema, which
    results in the need to find and copy-paste from a suitable mod.
  - IDEs do not automatically validate the schema, so there is no validation until the PR is
    created.
- For repository owners, there is no enforcement of formatting or other coding standards.

This document outlines a solution to these problems by leveraging TypeScript's powerful type system
and ecosystem of developer tools and introducing discovery and build steps to extend the
capabilities of modlinks.

## Requirements

### Functional Requirements

1. Mod manifests must be strictly validated at compile time.
2. Mods must be able to be declared in separate files at roughly arbitrary folder paths.
3. Modlinks must be compiled to various formats, including but not limited to gzipped CBOR, JSON,
   and Markdown (human readable list of mods).
4. Modlinks must be able to discover and generate source files for mods from various sources,
   including but not limited to GitHub releases, NuGet, and additional ModLinks registries published
   externally.

### Nonfunctional Requirements

1. Modlinks must be easily extensible to add new output formats.
2. Modlinks must be easily extensible to add new discovery mechanisms.
3. Modlinks discovery and compilation must be possible from GitHub's free action runners without the
   need to own additional infrastructure.
4. Modlinks should minimize the effort needed for contributors to add and update their mods.
5. Modlinks should provide IDE validation, autocomplete, and other common developer conveniences for
   developers who choose to use them.

## Solution

The common complaints about the current system roll up under 2 main themes: weak developer tooling
and a lack of ability to compile mods from multiple sources. This project addresses these themes by
implementing modlinks in TypeScript. The JavaScript/TypeScript ecosystem has one of the most
comprehensive developer tool suites of any language, largely owing to JavaScript's historic
reputation as a highly questionable language combined with the fact that it is functionally
mandatory for web development. With TypeScript and other developer tooling we can have:

- Strong compile-time validation and autocompletion (TypeScript's type system is well-known to be
  Turing-complete).
- Automatic and opinionated formatting and style checking with ESLint and Prettier.
- Automatically configured client-side git hooks with husky to enforce formatting in most cases.
- The ability to easily run arbitrary code to discover mods and transform to various formats
  (although any programming language can provide this).

Modlinks's discovery, build, and output systems will be designed with a plugin architecture. This
allows additional mods and output formats to be added easily with no frills. Particularly, this
means that developers PRing their mods do not need to touch code outside the file that will contain
their mod. For developers unfamiliar with git, copying from another mod and committing via the
GitHub website will still suffice (though they will of course lose the developer quality of life
tooling), which keeps it as one step to onboard.

The entry point for the plugin loader will be CLIs vended via package.json's `bin` property. The
main benefit of this as opposed to a standalone script run with e.g. Jiti or ts-node is that we can
vend it - meaning it can be used by other projects. This will be useful for discovery - more on this
later. Of course we will also be able use it in CI.

### Mod Manifests

Mods will be represented as instances of the `Manifest` class. This will primarily serve as a data
holder without any methods. Having it as a class is helpful for the plugin architecture though,
because

- It gives a way for the loader to easily type check the module, which plain objects do not have
- It enforces that mods are created via a type-checked function (the constructor) which ensures
  static type checks will be executed.

All manifests will reside in the `mods` directory or an arbitrarily nested sub-directory. By
convention, manifests are recommended, but not required, to use the path
`mods/author-name/mod-name.ts`. Manifests generated by the discovery system will be placed in
`mods/generated/author-name/mod-name.ts`. Even in the case that there are multiple authors, it's
typically the case that there is a primary maintainer of the mod, so it's recommended to pick that
developer for the `author-name` part of the path.

The plugin loader will check the default export of the module. So an example mod might look like
this:

```ts
// mods/badmagic/magic-ui.ts
export default new Manifest({
  name: "MagicUI",
  description: "A core mod to help other mods build UIs. Does nothing on its own.",
  version: "1.10.9277",
  links: {
    url: "https://github.com/BadMagic100/HollowKnight.MagicUI/releases/download/v1.10.9277.8364/MagicUI.zip",
    sha256: "EED36275276EA1BC5E8538A7E77A70D4DC47E13E7938585E51575D4D1D946D05",
  },
  repository: "https://github.com/BadMagic100/HollowKnight.MagicUI",
  tags: [Tag.LIBRARY],
  authors: "BadMagic",
});
```

A mod with dependencies would ideally import the manifests of its dependencies and integrations,
which can provide stronger compile-time protections about cyclic dependencies. However, for
simplicity, specifying the dependency and integration names as strings will also be allowed (note
that the validation will still happen; the failure may be deferred to build time though).

```ts
// mods/demo/demo-dependencies-import.ts
import MagicUI from "../badmagic/magic-ui";

export default new Manifest({
  name: "DemoDependenciesMod1",
  dependencies: [MagicUI],
  // ...
});
```

Or with string dependencies:

```ts
// mods/demo/demo-dependencies-no-import.ts
export default new Manifest({
  name: "DemoDependenciesMod2",
  dependencies: ["MagicUI"],
  // ...
});
```

### Discovery

Modlinks will provide a mechanism to automatically discover and create or update sets of manifests
from various sources. This will allow developers to simplify their release process. For example, one
possible discovery source might be to search GitHub for a given user's repositories that are
prefixed with `HollowKnight.` and generate manifests based on those. Another discovery source with a
much clearer path to implementation would be for a developer to create their own TypeScript package
with a dependency on the modlinks package, and vend their own "mini-modlinks" of their own mods
only, which could then be consumed and aggregated into the main modlinks.

Discovery will not run as part of each build, as it is generally expected to be an intensive process
which may go out to the internet multiple times and places. This can make builds extremely slow if
discovery is used extensively. Additionally, we still want to be able to review (and potentially
reject/blocklist) discovered content. As such, discovery will be implemented as a source gen step
which is run on a schedule, with changes automatically being PR'd to the main branch for review. For
source generation, [ts-morph](https://github.com/dsherret/ts-morph) will be used as a high level
wrapper over the TypeScript compiler API. Discovery will be run using the `modlinks discover`
command.

Discovery will also use a plugin architecture. Discovery plugins will reside in the
`discovery-rules` directory, conventionally `discovery-rules/author-name.ts` The default export of
each module will be an array of discovery plugins. We generally expect that most developers would
choose only one discovery mechanism and stick with it, but this enables them to partially migrate or
otherwise use multiple discovery mechanisms without needing additional files. Each plugin will be an
object containing a `async function generateSources(): void` which has the side effect of creating
any source files necessary. In practice, we would provide some classes for common discovery sources
which can be configured; however, ad-hoc discovery mechanisms could also be implemented. For
example:

```ts
// discovery/github.ts (we provide)
export interface GitHubDiscoveryProps {
  userName: string;
  repoNamePrefix?: string;
  repoLabels?: string[];
}

export class GitHubDiscovery {
  constructor(readonly props: GitHubDiscoveryProps) {}

  public async generateSources(): void {
    // use your imagination what might go in here :)
  }
}

// discovery-rules/badmagic.ts (user PRs)
import { GitHubDiscovery } from "../discovery/github.ts";

export default [
  new GitHubDiscovery({
    userName: "BadMagic100",
    repoNamePrefix: "HollowKnight.",
  }),
];
```

### Build

Once all mods' manifests are added, modlinks can then be built to various output formats using the
`modlinks build` command. By now it should be no surprise the builds will use a plugin architecture
as well. However, unlike the other components, it may not always be desirable to build to all output
formats. Therefore, all build transforms will have a transform ID that must be globally unique. This
allows build commands to directly specify what transforms to run or skip. Running a transform has
the side effect of generating any necessary files based on the aggregated list of mod links. An
interface for transforms and a toy example transformer are presented below.

```ts
interface BuildTransform {
  readonly transformId: string;
  run: (manifests: Manifest[]) => Promise<void>;
}

class JsonTransform {
  readonly transformId = "json";
  async run(manifests: Manifest[]): void {
    const content = JSON.stringify(manifests);
    await fs.writeFile("build/json/modlinks.json", content);
  }
}
```

### Publishing

We can use GitHub pages to host published modlinks artifacts. Recent improvements to GitHub Actions
and GitHub Pages integration will allow us to publish these artifacts as static content without
needing to ever surface the compiled artifacts in git directly. Consumers can then download the
artifacts, e.g. from `https://badmagic100.github.io/hk-modlinks/json/modlinks.json` for the example
transform above.

### Mini-Modlinks

While the ability to isolate manifests to an author-specific folder helps address some pain points
related to working with larger files, some developers may desire to contain their modlinks to a
separate repository entirely. This could be desirable for a few reasons, including but not
necessarily limited to:

- In CI, it's much easier to automatically PR to your own repository than someone else's repository.
  This enables a full-CD pipeline for all of an author's mods.
- Many developers keep a list of the mods they own in discord. This can serve as an easy place to
  host that list, including publishing certain output formats (e.g. HTML or markdown) automatically
  as a CI workflow.

This design enables this use case by:

- Vending all build tools as CLIs and publishing the package to npm
- Ensuring that all mods are available in main modlinks for importing (discovery source generation)
- Allowing customizability over which build transforms are run at an invocation level

Similarly to how modlinks itself will publish to GitHub pages, developers can then publish their
mini-modlinks to GitHub pages or any other static hosting site. Modlinks can then ingest the hosted
artifacts (e.g. in JSON format) as a discovery source.

### "Noob" Users

The main weakness of this design is that it doesn't do much to help users who are not familiar with
git or GitHub. There is a minimum of 1 PR required even if you want to use discovery. However, I
think we can safely say that we have not done a _worse_ job than the current system in the sense
that copy-pasting from another mod is always an option. Additionally there are some tailwinds in
this area which could be explored more thoroughly outside of the scope of this document; in
particular, much like how multiple smaller files are easier for CI to work with, they are also
easier for _tools_ to work with, which means we could create a publisher tool that makes the user
OAuth with GitHub and then fill in a form with the required fields, then fork modlinks, generate and
commit the file, and submit PR automatically on the user's behalf. Such a tool might also be
semi-reusable towards an "assetlinks" for things such as CustomHornet skins.
