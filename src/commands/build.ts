import { Command, Flags } from "@oclif/core";

import levenshtein from "fast-levenshtein";
import { Manifest, type PlatformLinks, type SingleLink } from "../manifest.js";
import { loadPlugins } from "../loader.js";
import { LoaderError } from "../errors/loader-error.js";
import { ErrorCodes } from "../errors/error-codes.js";
import { BuildTransform, type FileMapping } from "../build-transform.js";

import * as fsPromises from "node:fs/promises";
import * as crypto from "node:crypto";
import path from "node:path";
import { JsonTransform } from "../build-transforms/json.js";
import { compareSemVer, isValidSemVer } from "semver-parser";
import axios from "axios";

export default class Build extends Command {
  static override enableJsonFlag = false;
  static override description = "describe the command here";
  static override examples = ["<%= config.bin %> <%= command.id %> -o ./build"];
  static override flags = {
    output: Flags.directory({ char: "o", required: true }),
    "diff-against": Flags.url({
      char: "d",
      exactlyOne: ["diff-against", "no-diff"],
    }),
    "no-diff": Flags.boolean({ exactlyOne: ["diff-against", "no-diff"] }),
    format: Flags.string({ char: "f", multiple: true }),
    "require-hash-check": Flags.boolean({
      description:
        "Forces the hash check to be run even when it could be skipped because the link has not changed",
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Build);

    const modsResult = loadPlugins(
      Manifest<string, string>,
      import.meta.dirname,
      "../mods",
    );
    const transformsResult = loadPlugins(
      BuildTransform,
      import.meta.dirname,
      "../build-transforms",
    );

    if (modsResult.failed.length > 0) {
      this.error(new LoaderError(modsResult.failed), {
        exit: ErrorCodes.LOADER_FAULT,
      });
    }
    if (transformsResult.failed.length > 0) {
      this.error(new LoaderError(transformsResult.failed), {
        exit: ErrorCodes.LOADER_FAULT,
      });
    }
    const transformsMapping = transformsResult.loaded.reduce(
      (acc, item) => {
        if (item.transformId in acc) {
          this.error(
            `Encountered unexpected duplicate transform ${item.transformId}`,
            { exit: ErrorCodes.LOADER_FAULT },
          );
        }
        acc[item.transformId] = item;
        return acc;
      },
      {} as Record<string, BuildTransform>,
    );

    this.log(
      `Sucessfully loaded ${modsResult.loaded.length} manifests and ${transformsResult.loaded.length} output formats`,
    );

    await this.validate(
      modsResult.loaded,
      flags["diff-against"],
      flags["require-hash-check"],
    );

    const output = path.normalize(flags.output);
    this.log(`Outputting to ${output}`);
    await fsPromises.rm(output, { recursive: true, force: true });

    const finalOutputManifests = this.preTransform(modsResult.loaded);
    await this.postTransform(
      output,
      finalOutputManifests,
      transformsMapping,
      flags.format,
    );

    this.log("Build complete!");
  }

  /**
   * Performs validations that either can't be performed trivially or could be bypassed at build time.
   */
  private async validate(
    mods: Manifest<string, string>[],
    diffAgainst?: URL,
    requireHashCheck?: boolean,
  ): Promise<void> {
    this.debug("Beginning validation");

    const currentPublishedManifests: Record<
      string,
      Manifest<string, string> | undefined
    > = {};
    if (diffAgainst) {
      try {
        (await new JsonTransform().parse(diffAgainst)).forEach(
          (m) => (currentPublishedManifests[m.config.name] = m),
        );
      } catch (error) {
        this.warn(error as Error);
        this.error(
          `Could not parse ${diffAgainst.toString()} as JSON manifests`,
          { exit: ErrorCodes.BUILD_FAILURE },
        );
      }
    }

    let isValid = true;
    const modNames = mods.map((m) => m.config.name);
    for (const mod of mods) {
      // current published version is used to check for changes.
      // This is used to enforce some validations as well as to shortcut SHA verification.
      const published = currentPublishedManifests[mod.config.name];

      // validation 1 - check that all dependencies and integrations are actually real, can be bypassed by lazy refs
      const refs = (mod.config.dependencies ?? []).concat(
        mod.config.integrations ?? [],
      );
      for (const ref of refs) {
        if (!modNames.includes(ref)) {
          isValid = false;
          const distances = modNames
            .map((m) => [levenshtein.get(m, ref), m] as const)
            .filter((d) => d[0] < 3)
            .toSorted((a, b) => a[0] - b[0]);
          const suggestion = distances.length
            ? ` Did you mean "${distances[0][1]}?"`
            : "";
          this.warn(
            `Manifest ${mod.config.name} takes a reference on ${ref}, which is not defined.${suggestion}`,
          );
        }
      }
      if (!isValid) {
        // next validation won't work if we're already invalid so quit for this mod
        continue;
      }

      // validation 2 - check for cyclic dependencies, can be bypassed by lazy refs
      const visited = [mod.config.name];
      const toExplore =
        mod.config.dependencies?.map((d): { name: string; path: string[] } => ({
          name: d,
          path: [],
        })) ?? [];
      while (toExplore.length) {
        const { name: current, path } = toExplore.pop()!;
        const currentManifest = mods.filter(
          (m) => m.config.name === current,
        )[0];
        if (visited.includes(current)) {
          isValid = false;
          this.warn(
            `Manifest ${mod.config.name} contains a cycle via ${path.join(" -> ")}`,
          );
          break;
        }
        visited.push(current);
        currentManifest.config.dependencies
          ?.map((d) => ({
            name: d,
            path: path.concat(current),
          }))
          .forEach((x) => toExplore.push(x));
      }

      // validation 3 - check hashes. we can skip this one if comparing to published and the link is unchanged
      if (
        requireHashCheck ||
        !published ||
        !this.linksEqual(mod.config.links, published.config.links)
      ) {
        if (!(await this.linkShaMatches(mod.config.links))) {
          isValid = false;
          this.warn(
            `Link downloads for manifest ${mod.config.name} do not match the expected hashes`,
          );
        }
      }

      // validation 4 - check versioning rules
      // we can get close at build time but there are non-trivial subtleties that cannot be easily validated in the type system,
      // so we'll get some insurance at runtime as well.
      if (!isValidSemVer(mod.config.version, true)) {
        isValid = false;
        this.warn(
          `Manifest ${mod.config.name} declares the version ${mod.config.version} which is not valid semver`,
        );
      }
      // if it didn't exist before there's not any rules to evaluate.
      if (published) {
        // 4a - if urls or hashes changed, version must update
        if (mod.config.version === published.config.version) {
          if (!this.linksEqual(mod.config.links, published.config.links)) {
            isValid = false;
            this.warn(
              `Manifest ${mod.config.name} updated links (to ${JSON.stringify(mod.config.links)}, ` +
                `from ${JSON.stringify(published.config.links)}) but did not update version`,
            );
          }
        }

        // 4b - if version changed, it must be greater
        if (mod.config.version !== published.config.version) {
          if (
            compareSemVer(mod.config.version, published.config.version, true) <=
            0
          ) {
            isValid = false;
            this.warn(
              `Manifest ${mod.config.name} updated version (to ${mod.config.version}, ` +
                `from ${published.config.version}) but did not increase the version`,
            );
          }
        }
      }
    }

    if (!isValid) {
      this.error("Build failed due the errors above.", {
        exit: ErrorCodes.BUILD_FAILURE,
      });
    }
  }

  private linksEqual(
    a: SingleLink | PlatformLinks,
    b: SingleLink | PlatformLinks,
  ): boolean {
    if ("linux" in a && "linux" in b) {
      return (
        this.linksEqual(a.linux, b.linux) &&
        this.linksEqual(a.mac, b.mac) &&
        this.linksEqual(a.windows, b.windows)
      );
    } else if ("linux" in a) {
      return (
        this.linksEqual(a.linux, b) &&
        this.linksEqual(a.mac, b) &&
        this.linksEqual(a.windows, b)
      );
    } else if ("linux" in b) {
      return (
        this.linksEqual(a, b.linux) &&
        this.linksEqual(a, b.mac) &&
        this.linksEqual(a, b.windows)
      );
    } else {
      return (
        a.url === b.url && a.sha256.toLowerCase() === b.sha256.toLowerCase()
      );
    }
  }

  private async linkShaMatches(
    link: SingleLink | PlatformLinks,
  ): Promise<boolean> {
    if ("linux" in link) {
      const individualResults = await Promise.all([
        this.linkShaMatches(link.linux),
        this.linkShaMatches(link.mac),
        this.linkShaMatches(link.windows),
      ]);
      return individualResults.every((x) => x);
    } else {
      const response = await axios.get(link.url, {
        responseType: "arraybuffer",
      });
      const hash = crypto.createHash("sha256");
      const hexDigest = hash.update(Buffer.from(response.data)).digest("hex");
      return link.sha256.toLowerCase() === hexDigest.toLowerCase();
    }
  }

  private preTransform(
    mods: Manifest<string, string>[],
  ): Manifest<string, string>[] {
    this.debug("Beginning pre-transform");
    const transformed = mods.map((x) => structuredClone(x));
    // todo - this is where we'd add/change metadata
    transformed.sort((a, b) => a.config.name.localeCompare(b.config.name));
    return transformed;
  }

  private async postTransform(
    outputDir: string,
    mods: Manifest<string, string>[],
    outputTransforms: Record<string, BuildTransform>,
    requestedFormats?: string[],
  ): Promise<void> {
    this.debug("Beginning post-transform");

    const requestedTransforms: BuildTransform[] = [];
    if (requestedFormats) {
      for (const fmt of requestedFormats) {
        const tf = outputTransforms[fmt];
        if (tf) {
          requestedTransforms.push(tf);
        } else {
          this.warn(`Requested format ${fmt} is not defined`);
        }
      }
    } else {
      this.log("No output format specified, running all output formats");
      requestedTransforms.push(...Object.values(outputTransforms));
    }

    await Promise.all(
      requestedTransforms.map((x) =>
        x
          .run(mods)
          .then((m) => this.writeFileMapping(outputDir, x.transformId, m)),
      ),
    );
  }

  private writeFileMapping(
    outputDir: string,
    transformId: string,
    mapping: FileMapping,
  ) {
    return Promise.all(
      Object.entries(mapping).map(async ([p, buf]) => {
        const normPath = path.normalize(p);
        const resolvedPath = path.resolve(outputDir, transformId, normPath);
        const baseDir = path.dirname(resolvedPath);
        this.debug(`Preparing write to ${resolvedPath}`);
        await fsPromises.mkdir(baseDir, { recursive: true });
        await fsPromises.writeFile(resolvedPath, buf);
      }),
    );
  }
}
