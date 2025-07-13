(async () => {
  const { getDefaultConfig } = await import("expo/metro-config.js");
  const { withNativeWind } = await import("nativewind/dist/metro/index.js");

  const config = await getDefaultConfig(__dirname, {
    // Enable CSS support.
    isCSSEnabled: true,
  });

  module.exports = withNativeWind(config, {
    input: "./global.css",
    projectRoot: __dirname,
  });
})();