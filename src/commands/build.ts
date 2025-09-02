import { Command, Flags } from "@oclif/core";

import levenshtein from "fast-levenshtein";
import { Manifest } from "../manifest.js";
import { loadPlugins } from "../loader.js";
import { LoaderError } from "../errors/loader-error.js";
import { ErrorCodes } from "../errors/error-codes.js";
import { setTimeout } from "timers/promises";

export default class Build extends Command {
  static override enableJsonFlag = false;
  static override description = "describe the command here";
  static override examples = ["<%= config.bin %> <%= command.id %> -o ./build"];
  static override flags = {
    output: Flags.directory({ char: "o", required: true }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Build);

    const result = loadPlugins(
      Manifest<string, string>,
      import.meta.dirname,
      "../mods",
    );

    if (result.failed.length > 0) {
      this.error(new LoaderError(result.failed), {
        exit: ErrorCodes.LOADER_FAULT,
      });
    }
    this.log(`Sucessfully loaded ${result.loaded.length} manifests`);

    this.validate(result.loaded);

    const output = flags.output;
    this.log(`Outputting to ${output}`);

    const finalOutputManifests = this.preTransform(result.loaded);
    await this.postTransform(finalOutputManifests);
  }

  /**
   * Performs validations that either can't be performed trivially or could be bypassed at build time.
   */
  validate(mods: Manifest<string, string>[]): void {
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

  preTransform(mods: Manifest<string, string>[]): Manifest<string, string>[] {
    this.debug("Beginning pre-transform");
    return mods;
  }

  async postTransform(mods: Manifest<string, string>[]): Promise<void> {
    this.debug("Beginning post-transform");
    await setTimeout(500);
    this.logJson(mods[0]);
  }
}
