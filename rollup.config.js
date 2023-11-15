export default {
  input: "src/generate.js",
  output: {
    file: "lib/index.cjs",
    format: "cjs",
  },
  external: ["fs", "prettier"],
};
