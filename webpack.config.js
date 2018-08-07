const path = require("path");
const VarieBundler = require("varie-bundler");
const SentryCliPlugin = require("@sentry/webpack-plugin");

module.exports = function(env, argv) {
  return new VarieBundler(argv, __dirname)
    .entry("app", ["app/app.ts", "resources/sass/app.scss"])
    .chainWebpack((config) => {
      config.module
        .rule("markdown")
        .test(/\.md$/)
        .use("html")
        .loader("html-loader")
        .end()
        .use("markdown")
        .loader("markdown-loader");

      config.when(argv.mode === "production", (config) => {
        config.plugin("sentry").use(SentryCliPlugin, [
          {
            include: [path.join(__dirname, "public")],
          },
        ]);
      });
    })
    .aliases({
      "@app": path.join(__dirname, "app"),
      "@routes": path.join(__dirname, "routes"),
      "@config": path.join(__dirname, "config"),
      "@store": path.join(__dirname, "app/store"),
      "@models": path.join(__dirname, "app/models"),
      "@resources": path.join(__dirname, "resources"),
      "@views": path.join(__dirname, "resources/views"),
      "@components": path.join(__dirname, "app/components"),
    })
    .build();
};
