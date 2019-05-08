/*
|--------------------------------------------------------------------------
| App Entry
|--------------------------------------------------------------------------
| Bootstrapping the application together
|
*/
import Vue from "vue";
import * as Raven from "raven-js";
import { Application } from "varie";
import RavenVue from "raven-js/plugins/vue";
import BaseLayout from "varie/BaseLayout.vue";
import RouterInterface from "varie/lib/routing/RouterInterface";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";

new Application().boot().then((app) => {
  if ($config.get("app.env") === "production") {
    Raven.config(
      "https://e4a9bb84172c4b8bbed481291a6f3423@sentry.codepier.io/8",
    )
      .addPlugin(RavenVue)
      .install();
  }

  new Vue({
    render: (h) => h(BaseLayout),
    router: app.make<RouterInterface>("RouterService").getRouter(),
    store: app.make<StateServiceInterface>("StateService").getStore(),
  }).$mount($config.get("app.mount"));
});
