import type { Tags } from "./tags.js";

type VersionCorePart = `${bigint}.${bigint}.${bigint}`;
type PrereleasePart = `-${string}` | "";
type BuildPart = `+${string}` | "";
type Version = `${VersionCorePart}${PrereleasePart}${BuildPart}`;

interface SingleLink {
  url: string;
  sha256: string;
}

interface PlatformLinks {
  linux: SingleLink;
  mac: SingleLink;
  windows: SingleLink;
}

type NoCycle<OwnName, DependencyClosure> = OwnName extends DependencyClosure
  ? never
  : DependencyClosure;

type BaseModConfig<Name extends string> = {
  readonly name: Name;
  readonly displayName?: string;
  readonly description: string;
  readonly version: Version;
  readonly links: SingleLink | PlatformLinks;
  readonly repository: string;
  readonly issues?: string;
  readonly tags?: Tags[];
  readonly authors?: string[];
};

type UncheckedConfig<Name extends string> = BaseModConfig<Name> & {
  readonly dependencies?: string[] | undefined;
  readonly integrations?: string[] | undefined;
};

type StringCheckedConfig<
  Name extends string,
  DependencyClosure extends string,
> = BaseModConfig<Name> & {
  readonly dependencies?: NoCycle<Name, DependencyClosure>[];
  readonly integrations?: string[];
};

type ManifestCheckedConfig<
  Name extends string,
  DependencyClosure extends string,
> = BaseModConfig<Name> & {
  readonly dependencies?: Manifest<
    NoCycle<Name, DependencyClosure>,
    NoCycle<Name, DependencyClosure>
  >[];
  readonly integrations?: Manifest<string, string>[];
};

type CheckedConfig<Name extends string, DependencyClosure extends string> =
  | StringCheckedConfig<Name, DependencyClosure>
  | ManifestCheckedConfig<Name, DependencyClosure>;

export class Manifest<
  const Name extends string,
  const DependencyClosure extends string = never,
> {
  readonly config: UncheckedConfig<Name>;

  // I don't really understand why the overload signatures are needed in order for DependencyClosure to be inferred correctly
  // but it seems they are...
  constructor(config: StringCheckedConfig<Name, DependencyClosure>);
  constructor(config: ManifestCheckedConfig<Name, DependencyClosure>);
  constructor(config: CheckedConfig<Name, DependencyClosure>) {
    this.config = {
      ...config,
      dependencies: config.dependencies?.map((x) =>
        x instanceof Manifest ? x.config.name : x,
      ),
      integrations: config.integrations?.map((x) =>
        x instanceof Manifest ? x.config.name : x,
      ),
    };
  }
}
