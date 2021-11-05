import { Route, Location } from "vue-router";
import { injectable, inject } from "inversify";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";

@injectable()
export default class CloseMobileMenu implements RouteMiddlewareInterface {
  private $store;

  constructor(@inject("StateService") stateService) {
    this.$store = stateService.getStore();
  }

  handler(to: Route, from: Route, next: (route?: Location) => void) {
    this.$store.commit("menu/CLOSE_MENU");
    next();
  }
}
