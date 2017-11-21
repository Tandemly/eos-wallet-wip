import { CLOSE_MENU, TOGGLE_MENU } from './app-actions';

const initialState = {
  isMenuOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        isMenuOpen: !state.isMenuOpen,
      };
      case CLOSE_MENU:
      return {
        isMenuOpen: false,
      };
    default:
      return state;
  }
};
