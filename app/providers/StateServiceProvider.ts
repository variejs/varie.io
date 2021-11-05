import MenuStore from "@store/menu/MenuStore";
import { StateServiceProvider as ServiceProvider } from "varie";

/*
|--------------------------------------------------------------------------
| Store Service Provider
|--------------------------------------------------------------------------
|
*/
export default class StateServiceProvider extends ServiceProvider {
  public async boot() {
    super.boot();

    // ...
  }

  public async register() {
    super.register();

    // ...
  }

  public map() {
    this.$store.registerStore(MenuStore);
  }
}
