import { MenuState } from "./stateInterface";

export default function() {
  return {
    OPEN_MENU: (state: MenuState) => {
      state.open = !state.open;
    },
    CLOSE_MENU: (state: MenuState) => {
      state.open = false;
    },
  };
}
