import { createSelector } from "reselect";
import { selectEOSAccountName } from "../eos-account/selectors";

const selectTransactionsState = state => state.transactions;

export const selectRecentTransactions = createSelector(
  selectTransactionsState,
  selectEOSAccountName,
  (transactions, eosAccountName) =>
    transactions.recents &&
    transactions.recents
      // .filter(item => item && item.scope && item.scope.includes(eosAccountName))
      .filter(
        transaction =>
          transaction.messages &&
          transaction.messages[0] &&
          transaction.messages[0].type === "transfer" &&
          transaction.messages[0].data &&
          (transaction.messages[0].data.to === eosAccountName ||
            transaction.messages[0].data.from === eosAccountName)
      )
      .map(transaction => {
        const to = transaction.messages[0].data.to;
        const from = transaction.messages[0].data.from;
        const kind = to === eosAccountName ? "deposit" : "withdrawal";
        const name = kind === "deposit" ? from : to;
        const amount = transaction.messages[0].data.amount;
        const memo = transaction.messages[0].data.memo;
        return {
          key: transaction.id,
          date: transaction.createdAt,
          name,
          memo,
          amount,
          kind
        };
      })
);
