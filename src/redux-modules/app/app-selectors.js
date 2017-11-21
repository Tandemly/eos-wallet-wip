import { createSelector } from "reselect";

const selectAppState = state =>
  state && state.app ? state.app : {};

export const selectIsMenuOpen = createSelector(
  selectAppState,
  appState => appState.isMenuOpen
);
