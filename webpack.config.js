const path = require("path");
const SentryCliPlugin = require("@sentry/webpack-plugin");

const VarieBundler = require("varie-bundler");

module.exports = function(env) {
  return new VarieBundler(env, {
    vue : {
      runtimeOnly : false
    }
  })
    .entry("app", ["app/app.ts", "resources/sass/app.scss"])
    .aliases({
      "@app": "app",
      "@views": "views",
      "@store": "store",
      "@config": "config",
      "@routes": "routes",
      "@models": "app/models",
      "@resources": "resources",
      "@components": "app/components",
    })
    .copy( path.join(__dirname, "resources/assets/img/varie-banner.png"), "public/img")
    .chainWebpack((config) => {
      config.module
        .rule("markdown")
        .test(/\.md$/)
        .use("html")
        .loader("html-loader")
        .end()
        .use("markdown")
        .loader("markdown-loader");

      config.when(env === "production", (config) => {
        config.plugin("sentry").use(SentryCliPlugin, [
          {
            include: [path.join(__dirname, "public")],
          },
        ]);
      });
    })
    .build();
};
