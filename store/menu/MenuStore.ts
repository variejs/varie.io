import state from "./state";
import mutations from "./mutations";
import { injectable, inject } from "inversify";
import StoreModule from "varie/lib/state/StoreModule";

@injectable()
export default class MenuStore extends StoreModule {
  constructor(@inject("HttpService") httpService) {
    super();
    this.setName("menu").addState(state).addMutations(mutations);
  }
}
