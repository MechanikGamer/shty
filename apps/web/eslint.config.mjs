import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser, // Default to browser globals for client-side files
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // Add overrides for Node.js-specific files
    files: ["next.config.js", "webpack.config.js", "*.cjs"],
    languageOptions: {
      globals: globals.node, // Use Node.js globals
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Allow `require` usage
      "no-undef": "off", // Allow Node.js-specific globals like `__dirname`
    },
  },
];
