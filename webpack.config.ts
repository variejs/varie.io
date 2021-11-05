import { WebBundler } from 'varie-bundler'
import { EnvironmentTypes } from 'varie-bundler/lib/types/EnvironmentTypes'

const ENV = process.env;

export default function({ production }) {
  return new WebBundler(production ? EnvironmentTypes.Production : EnvironmentTypes.Development, {
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
    })
    .build();
}
