import { createSelector } from "reselect";
import { selectEOSAccountName } from "../eos-account/selectors";

const selectTransactionsState = state => state.transactions;

export const selectRecentTransactions = createSelector(
  selectTransactionsState,
  selectEOSAccountName,
  (transactions, eosAccountName) =>
    transactions.recent &&
    transactions.recent
      .filter(item => item && item.scope && item.scope.includes(eosAccountName))
      .map(transaction => {})
);
