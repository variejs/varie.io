import { injectable, inject } from "inversify";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";
import { Route, Location } from 'vue-router'

@injectable()
export default class CloseMobileMenu implements RouteMiddlewareInterface {
  private $store;

  constructor(@inject("StoreService") storeService: StateServiceInterface) {
    this.$store = storeService.getStore();
  }

  handler(to: Route, from: Route, next: (route?: Location) => void) {
    this.$store.commit("menu/CLOSE_MENU")
    next();
  }
}
