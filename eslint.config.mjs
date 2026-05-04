import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: ["_legacy/**", "out/**", ".next/**", "node_modules/**"],
  },
];

export default config;
