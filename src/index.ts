/* eslint-disable @typescript-eslint/no-explicit-any */
import { directoryImport } from "directory-import";
import { Manifest } from "./manifest.js";

const safeDirName = import.meta.dirname.replaceAll("\\", "/");

const allMods: Manifest<string, string>[] = [];
directoryImport(
  {
    includeSubdirectories: true,
    targetDirectoryPath: `${safeDirName}/mods`,
    importMode: "sync",
  },
  (moduleName, modulePath, moduleData) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { default: manifest } = moduleData as any;
    if (!(manifest instanceof Manifest)) {
      throw new Error(
        `Module ${moduleName} at ${modulePath} exported a non-Manifest object: ${JSON.stringify(manifest)}`,
      );
    }
    allMods.push(manifest as Manifest<string, string>);
  },
);
export { allMods };
