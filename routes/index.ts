let $router = $app.make<RouterInterface>("$router");
import RouterInterface from "varie/lib/routing/RouterInterface";

/*
|--------------------------------------------------------------------------
| Your default routes for your application
|--------------------------------------------------------------------------
|
*/

$router.redirect("/", "/docs");

$router.template("/docs", "layouts/documentation").group(() => {
  $router.route(":version?/:page?", "docs").setName("docs");
});

$router.route("*", "404");
