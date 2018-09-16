import { injectable, inject } from "inversify";
import StateServiceInterface from "varie/lib/state/StateServiceInterface";
import RouteMiddlewareInterface from "varie/lib/routing/RouteMiddlewareInterface";

@injectable()
export default class CloseMobileMenu implements RouteMiddlewareInterface {
  private $store;

  constructor(@inject("StoreService") storeService: StateServiceInterface) {
    this.$store = storeService.getStore();
  }

  passes(to, from, next) {
    this.$store.commit("menu/CLOSE_MENU");
    return true;
  }
}
