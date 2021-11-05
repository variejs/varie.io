import path from "path";
import { WebBundler } from "varie-bundler";
import SentryCliPlugin from "@sentry/webpack-plugin";

const ENV = process.env;

export default function(mode) {
  return new WebBundler(mode, {
    vue: {
      runtimeOnly: false,
    },
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
    .varieConfig({
      // @ts-ignore
      raven: {
        url: ENV.RAVEN_URL,
      },
      documentation: {
        apiKey: ENV.DOC_SEARCH_API_KEY,
      },
    })
    .copy("resources/assets/img/varie-banner.png", "public/img")
    .chainWebpack((config) => {
      config.module
        .rule("markdown")
        .test(/\.md$/)
        .use("html")
        .loader("html-loader")
        .end()
        .use("markdown")
        .loader("markdown-loader");

      config.when(mode === "production", (config) => {
        config.plugin("sentry").use(SentryCliPlugin, [
          {
            include: [path.join(__dirname, "public")],
          },
        ]);
      });
    })
    .build();
}
