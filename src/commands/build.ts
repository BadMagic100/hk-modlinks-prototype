import { Command, Flags } from "@oclif/core";

import levenshtein from "fast-levenshtein";
import { Manifest } from "../manifest.js";
import { loadPlugins } from "../loader.js";
import { LoaderError } from "../errors/loader-error.js";
import { ErrorCodes } from "../errors/error-codes.js";
import { BuildTransform, type FileMapping } from "../build-transform.js";

import * as fsPromises from "node:fs/promises";
import path from "node:path";

export default class Build extends Command {
  static override enableJsonFlag = false;
  static override description = "describe the command here";
  static override examples = ["<%= config.bin %> <%= command.id %> -o ./build"];
  static override flags = {
    output: Flags.directory({ char: "o", required: true }),
    format: Flags.string({ char: "f", multiple: true }),
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

    this.validate(modsResult.loaded);

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
  }

  /**
   * Performs validations that either can't be performed trivially or could be bypassed at build time.
   */
  private validate(mods: Manifest<string, string>[]): void {
    this.debug("Beginning validation");

    let isValid = true;
    const modNames = mods.map((m) => m.config.name);
    for (const mod of mods) {
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
    }

    // validation 3 - check hashes (todo)

    if (!isValid) {
      this.error("Build failed due the errors above.", {
        exit: ErrorCodes.BUILD_FAILURE,
      });
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
