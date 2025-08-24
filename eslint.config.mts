import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  globalIgnores(["node_modules/", "dist/", "coverage/"]),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          defaultProject: "tsconfig.json",
          allowDefaultProject: ["eslint.config.mts", "prettier.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // must be last
  eslintPluginPrettierRecommended,
);
