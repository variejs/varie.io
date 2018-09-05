import { ActionContext } from "vuex";
import RootState from "@store/rootState";
import { MenuState } from "./stateInterface";

export default function($http) {
  return {
    sampleAction: (context: ActionContext<MenuState, RootState>, data) => {
      return $http.post("/some-url", {
        data,
      });
    },
  };
}
