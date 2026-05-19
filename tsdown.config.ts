import { readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { defineConfig, type UserConfig } from "tsdown";

const rngPath = "src/rng";

const entryPoints: Record<string, string> = {
  bundle: "src/index.ts",
  rng: "src/rng/index.ts",
};

readdirSync(rngPath)
  .filter((file: string) => !["index.ts", "constants.ts", "factory.ts", "types.ts"].includes(file))
  .forEach((file) => {
    entryPoints[basename(file, extname(file))] = join(rngPath, file);
  });

const commonConfig: UserConfig = {
  platform: "neutral",
  format: ["esm"],
  target: "es2022",
  dts: true,
  treeshake: true,
  outDir: "bundles",
  inputOptions: {
    optimization: {
      inlineConst: false,
    },
    experimental: {
      attachDebugInfo: "none",
    },
  },
  deps: {
    alwaysBundle: ["@fimbul-works/hash"],
  },
};

export default defineConfig(
  Object.entries(entryPoints).map(([key, entry]) => ({
    entry: {
      [key]: entry,
    },
    ...commonConfig,
  })),
);
