let $router = $app.make<RouterInterface>("$router");
import RouterInterface from "varie/lib/routing/RouterInterface";

/*
|--------------------------------------------------------------------------
| Your default routes for your application
|--------------------------------------------------------------------------
|
*/

// $router.route("/", "Home");
$router.redirect("/", "docs");
$router
  .prefix("/docs")
  .area("areas/Documentation")
  .group(() => {
    $router.route(":version?/:page?", "Docs").setName("docs");
  });

$router.route("*", "errors/404");
