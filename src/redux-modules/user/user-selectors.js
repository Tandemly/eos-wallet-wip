import { createSelector } from "reselect";

const selectUserState = state => state.user || {};

export const selectWalletUserId = createSelector(
  selectUserState,
  user => (user.profile ? user.profile.email : undefined)
);

export const selectWalletUserAuthenticated = createSelector(
  selectUserState,
  user => user.isAuthenticated
);

export const selectWalletUserHash = createSelector(
  selectUserState,
  user => user.hash
);
