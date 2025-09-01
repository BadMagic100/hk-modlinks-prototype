import type { PrettyPrintableError } from "@oclif/core/interfaces";
import type { ModuleInfo } from "../loader.js";

export class LoaderError extends Error implements PrettyPrintableError {
  constructor(failedModules: ModuleInfo[]) {
    let msg = "The following plugin modules failed to load:\n";
    for (const module of failedModules) {
      msg += `    * ${module.moduleName} at ${module.modulePath}`;
    }
    super(msg);
  }
}
