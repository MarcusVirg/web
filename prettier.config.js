/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  useTabs: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: "none",
  printWidth: 85,
  svelteSortOrder: "scripts-markup-styles-options",
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
};

export default config;