import { MenuState } from "./stateInterface";

export default function () {
  return {
    OPEN_MENU: (state: MenuState) => {
      state.open = true;
    },
    CLOSE_MENU: (state: MenuState) => {
      state.open = false;
    },
  };
}
