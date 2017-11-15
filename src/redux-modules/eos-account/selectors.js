import { createSelector } from "reselect";
import numeral from "numeral";

const selectAccountState = state => state["eos-account"].account;
const selectBalanceState = state => state["eos-account"].balance;

export const selectEOSAccountName = createSelector(
  selectAccountState,
  account => account.accountName
);

export const selectEOSOwnerKeys = createSelector(
  selectAccountState,
  account => account.ownerKeys
);

export const selectEOSActiveKeys = createSelector(
  selectAccountState,
  account => account.activeKeys
);

export const selectEOSTotalBalance = createSelector(
  selectBalanceState,
  balance => balance.total
);

export const selectEOSBalanceDifference = createSelector(
  selectBalanceState,
  balance =>
    balance.difference !== undefined && !!balance.symbol
      ? `${balance.symbol}${Math.abs(balance.difference).toFixed(6)}`
      : ""
);
