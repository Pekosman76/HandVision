const js = require("@eslint/js");
const nextVitals = require("eslint-config-next/core-web-vitals");
const nextTypescript = require("eslint-config-next/typescript");

module.exports = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"]
  },
  js.configs.recommended,
  ...nextVitals,
  ...nextTypescript
];
