import { Route, Location } from "vue-router";
import { injectable, inject } from "inversify";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";

@injectable()
export default class GoogleAnalytics implements RouteMiddlewareInterface {
  handler(to: Route, from: Route, next: (route?: Location) => void) {
    ga("set", "page", to.path);
    ga("send", "pageview");
    next();
  }
}
