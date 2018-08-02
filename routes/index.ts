let $router = $app.make<RouterInterface>("$router");
import RouterInterface from "varie/lib/routing/RouterInterface";

/*
|--------------------------------------------------------------------------
| Your default routes for your application
|--------------------------------------------------------------------------
|
*/

let docsHomePage = "/docs/latest/what-is-varie";
$router.redirect("/", docsHomePage);
$router.redirect("/docs", docsHomePage);
$router.redirect("/docs/latest", docsHomePage);
$router
  .prefix("/docs")
  .area("areas/Documentation")
  .group(() => {
    $router.route(":version?/:page?", "Docs").setName("docs");
  });

$router.route("*", "errors/404");
