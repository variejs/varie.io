Varie comes with a bundler so you don't have to worry about configuration.
It also comes with a fluent interface to help modify the webpack config,
just in case you want to have more control over how your application is built.

## Build

This builds the webpack config to be used by webpack or your IDE.

## Running the build

To build your applicatyion you just need to run

`$ npm run dev` or if you wish to build a modern build `$ npm run build -- --modern`

## Aliases

We define some default path aliases for you already, but you can change these
to however you like

```js
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
```

[{.alert} The Varie-CLI does not know that these have been changed, and will not correctly put files in the correct locations!]

## Webpack Chaining

The bundler is using [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain), which allows a fluent interface to
add / modify the webpack configuration file.

This allows you to modify the bundler without having to change the bundler itself.

### Adding a Loader

```js
    .chainWebpack((config, env) => {
        config.module
          .rule('markdown')
          .test(/\.md$/)
          .use('html')
            loader('html-loader')
            .end()
          .use('markdown')
            .loader('markdown-loader')
            .options({
                //
            })
            .end()
    });
```

### Adding a Plugin

```js
    .chainWebpack((config, env) => {
        config.plugin('webpack-notifier')
            .use(WebpackNotifierPlugin, [argument1, argument2])
            .end()
    });
```

### Modifying The Config

You should get yourself familiar with the [webpack-chain API](https://github.com/mozilla-neutrino/webpack-chain#getting-started)
as well as the source for [varie-bundler](https://github.com/variejs/varie-bundler)

```js
   .chainWebpack((config, env) => {
        config.when(!env.isProduction, () => {
             config.plugin("webpack-notifier").tap(args => {
             return [
               /* new args to pass to webpack-notifier's constructor */
             ];
           });
       });
    });
```

[{.info} Add in the inspect flag, `$ npm run dev -- --inspect`, should help diagnos how to modify the webpack config with webpack-chain.]

## Adding Entries

Adding a new entry consists of the name for the entry (the files output name),
and an array of the entry.

```js
    .entry("admin", ["app/admin.ts", "resources/sass/admin.scss"])
```

## Environment Variables

You may need to setup some variables that are needed per environment within your application.

```js
    .config({
        app : {
            someKey : "someValue"
        }
    })
```

You then can access them with the `$config` helper

```js
$config.get("app.someKey");
```

## Analyzing Configuration

To analyze your bundle with [webpack analyse](https://github.com/webpack/analyse), just add the `analyze` flag to your npm build command.

```
$ npm run dev -- --analyze
```

## Inspecting Configuration

To inspect your configuration just add the `inspect` flag to your npm build command.

```
$ npm run dev -- --inspect`
```

## Browser Comparability

Varie provides ways to choose your browser capability with The `.browerlistrc` and the `babel.config.js`.

### BrowserList

The BrowserList file allows to specify which browsers should be compatible with your build. These configurations
will be used by `autoprefixer` and `babel`.

Varie uses `defaults` for its default which you can see on [browserl.ist](https://browserl.ist/)

### Babel.config.js

This config allows you to pass all options into `@babel/preset-env`, you can review those options (here)[https://babeljs.io/docs/en/babel-preset-env].

### Polyfills

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "varie-app",
      {
        polyfills: ["es6.symbol"],
      },
    ],
  ],
};
```

#### JSX

To enable JSX pass `jsx` in the babel options.

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "varie-app",
      {
        jsx: true,
      },
    ],
  ],
};
```

#### BrowserList

BrowserList is a way to manage what browsers you support. There is a file called `browserlistrc` which determines
what features should be compatible with.

### Modern Build

The bundler supports a modern build configuration in which it will build two sets of assets. One that produces a
legacy bundle for older browsers that do not support some of the newer features.

- Browsers that support the `type` of `module` will download the modern build.
- Legacy browsers will not download the modern build and instead will use the legacy build automatically
  - The Safari 10 fix is automatically injected into the template

[{.info} While the size may seem small, the code parsing and evaluation should improve overall performance of your app.]
