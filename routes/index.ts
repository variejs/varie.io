let $router = $app.make<RouterInterface>("$router");
import RouterInterface from "varie/lib/routing/RouterInterface";

/*
|--------------------------------------------------------------------------
| Your default routes for your application
|--------------------------------------------------------------------------
|
*/

$router.redirect("/", "/docs");

$router
  .prefix("/docs")
  .layout("layouts/documentation")
  .group(() => {
    $router.route(":version?/:page?", "docs").setName("docs");
  });

$router.route("*", "errors/404");
