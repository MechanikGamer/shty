import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/index.tsx",
  },
  banner: {
    js: "'use client'",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  minify: true, 
  esbuildOptions(options) {
    options.minifySyntax = true; 
    options.minifyWhitespace = true;
    options.minifyIdentifiers = true; 
  },
  ...options,
}));
