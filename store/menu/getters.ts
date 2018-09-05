import { MenuState } from "./stateInterface";

export default function() {
  return {
    SAMPLE_GETTER: (state: MenuState) => {
      return state;
    },
  };
}
