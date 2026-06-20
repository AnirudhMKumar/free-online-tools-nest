import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"]
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  }
];
