const TOGGLE_MENU = 'TOGGLE_MENU';
const CLOSE_MENU = 'CLOSE_MENU';
const ROUTE_LOAD = 'ROUTE_LOAD';

const initialState = {
  isMenuOpen: false,
};

export function reducer(state = initialState, action) {
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
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  };
}

export function closeMenu() {
  return {
    type: CLOSE_MENU,
  };
}

export function routeLoad() {
  return {
    type: ROUTE_LOAD,
  };
}
