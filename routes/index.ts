let $router = $container.get<RouterInterface>("$router");
import RouterInterface from "varie/lib/routing/RouterInterface";

/*
|--------------------------------------------------------------------------
| Your default routes for your application
|--------------------------------------------------------------------------
|
*/

$router.route("/", "welcome");

$router.template('/docs', 'documentationArea').group(() => {
  $router.route('/docs', 'docs').setName('docs');
});