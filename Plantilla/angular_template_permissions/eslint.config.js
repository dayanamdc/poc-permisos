const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const templateParser = require("@angular-eslint/template-parser");
const templatePlugin = require("@angular-eslint/eslint-plugin-template");

module.exports = [
  { ignores: ["dist/**", "node_modules/**", ".angular/**"] },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { sourceType: "module", ecmaVersion: "latest" },
    },
    plugins: {
      "@angular-eslint": angularPlugin,
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...angularPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      "@angular-eslint/prefer-inject": "off",
      "@angular-eslint/use-lifecycle-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["src/**/*.html"],
    languageOptions: { parser: templateParser },
    plugins: { "@angular-eslint/template": templatePlugin },
    rules: templatePlugin.configs.recommended.rules,
  },
];
