const path = require("path");
const VarieBundler = require("varie-bundler");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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

      config.when(argv && argv.mode === "production", (config) => {
        config.plugin("sentry").use(SentryCliPlugin, [
          {
            include: [path.join(__dirname, "public")],
          },
        ]);
      });

      config.plugin("copy").use(CopyWebpackPlugin, [
        [
          {
            to: path.join(__dirname, "public/img"),
            from: path.join(__dirname, "resources/assets/img/varie-banner.png"),
          },
        ],
      ]);
    })
    .aliases({
      "@app": path.join(__dirname, "app"),
      "@views": path.join(__dirname, "views"),
      "@store": path.join(__dirname, "store"),
      "@routes": path.join(__dirname, "routes"),
      "@config": path.join(__dirname, "config"),
      "@models": path.join(__dirname, "app/models"),
      "@resources": path.join(__dirname, "resources"),
      "@components": path.join(__dirname, "app/components"),
    })
    .build();
};
