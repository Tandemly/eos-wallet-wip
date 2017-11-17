import { createSelector } from "reselect";

const selectTransactionsState = state => state.transactions;

export const selectRecentTransactions = createSelector(
  selectTransactionsState,
  transactions => transactions.recent && transactions.recent.map(transaction => {

  })
);
