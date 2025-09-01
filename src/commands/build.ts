import { Command, Flags } from "@oclif/core";

import { allMods } from "../index.js";
import levenshtein from "fast-levenshtein";

export default class Build extends Command {
  static override enableJsonFlag = false;
  static override description = "describe the command here";
  static override examples = ["<%= config.bin %> <%= command.id %> -o ./build"];
  static override flags = {
    output: Flags.directory({ char: "o", required: true }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Build);

    this.validate();

    const output = flags.output;
    this.log(`Outputting to ${output}`);
  }

  /**
   * Performs validations that either can't be performed trivially or could be bypassed at build time.
   */
  validate(): void {
    let isValid = true;
    const modNames = allMods.map((m) => m.config.name);
    for (const mod of allMods) {
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
        // next validation won't work if we're already invalid so quit
        break;
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
        const currentManifest = allMods.filter(
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
      this.error("Build failed due the errors above.", { exit: 1 });
    }
  }
}
