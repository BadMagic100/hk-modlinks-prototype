/**
 * @type {import("prettier").Config}
 */
const config = {
  proseWrap: "always",
  overrides: [
    {
      files: "docs/**.md",
      options: {
        printWidth: 100,
      },
    },
  ],
};

export default config;
