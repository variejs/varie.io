let $router = app.make<RouterInterface>("$router");
import RouterInterface from "varie/lib/routing/RouterInterface";

/*
|--------------------------------------------------------------------------
| Your default routes for your application
|--------------------------------------------------------------------------
|
*/

$router.route("/", "welcome");

$router.template("/docs", "documentationArea").group(() => {
  $router.route("/docs/:version?/:page?", "docs").setName("docs");
});

$router.route("*", "404");
