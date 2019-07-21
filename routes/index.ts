import middleware from "./middleware";
import RouterInterface from "varie/lib/routing/RouterInterface";

import ErrorViews from "@views/errors";
import Documentation from "@views/documentation/Documentation.vue";
import DocumentationArea from "@views/documentation/areas/DocumentationArea.vue";
import Temp from '@views/Temp.vue';
export default function($router: RouterInterface) {
  /*
  |--------------------------------------------------------------------------
  | Your default routes for your application
  |--------------------------------------------------------------------------
  |
  */

  let docsHomePage = `/docs/latest/${$config.get("documentation").defaultPage}`;

  $router.redirect("/", docsHomePage);
  $router.redirect("/docs", docsHomePage);

  $router.route('/temp', Temp)
  $router
    .prefix("/docs")
    .area(DocumentationArea)
    .middleware([middleware.CloseMobileMenu])
    .group(() => {
      $router.route(":version?/:page?", Documentation).setName("docs");
    });

  $router.route("*", ErrorViews.Error404);
}
