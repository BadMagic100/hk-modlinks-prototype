import path from "path";
import { directoryImport } from "directory-import";
import createDebug from "debug";
import type { Class } from "./utility-types.js";

const debug = createDebug("hk-modlinks:loader");

export interface ModuleInfo {
  modulePath: string;
  moduleName: string;
  module: unknown;
}

export interface LoaderResult<T> {
  loaded: T[];
  failed: ModuleInfo[];
}

export function loadPlugins<T>(
  pluginType: Class<T>,
  callingDir: string,
  relativePath: string,
  recurse: boolean = true,
): LoaderResult<T> {
  const normRelativePath = path.normalize(relativePath);
  if (!path.isAbsolute(callingDir)) {
    throw new Error("callingDir must be an absolute path");
  }
  if (path.isAbsolute(normRelativePath)) {
    throw new Error("relativePath must be a relative path");
  }

  const resolvedPluginPath = path.resolve(callingDir, normRelativePath);

  const loaded: T[] = [];
  const failed: ModuleInfo[] = [];

  directoryImport(
    {
      includeSubdirectories: recurse,
      targetDirectoryPath: resolvedPluginPath,
      importMode: "sync",
    },
    (moduleName, modulePath, module) => {
      if (!(typeof module === "object" && module && "default" in module)) {
        debug(`Module ${moduleName} at ${modulePath} has no default export.`);
        failed.push({ moduleName, modulePath, module });
        return;
      }
      const { default: manifest } = module;
      if (manifest instanceof pluginType) {
        loaded.push(manifest);
      } else {
        debug(
          `Module ${moduleName} at ${modulePath} exported an incorrectly typed object (expected ${pluginType.name}): ${JSON.stringify(manifest)}`,
        );
        failed.push({ moduleName, modulePath, module });
      }
    },
  );

  return { loaded, failed };
}
