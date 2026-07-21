const mainBundles = ["bundles/bundle.js", "bundles/rng.js", "bundles/util.js", "bundles/decorators.js"];

export default {
  groups: [
    {
      name: "Bundles",
      include: mainBundles,
    },
    {
      name: "Generators",
      include: "bundles/*.js",
      exclude: mainBundles,
    },
  ],
  minify: true,
};
