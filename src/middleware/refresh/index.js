/* eslint-disable camelcase, consistent-return */
import { getTransactions } from "thunks/transactions";
import { getBalance } from "thunks/balance";
import { SUCCEED_LOGIN } from "../../redux-modules/user/user-actions";
import { SUCCESS_POST_TRANSACTION } from "../../redux-modules/transfer/transfer-actions";
import { selectEOSAccountName } from "../../redux-modules/eos-account/account-selectors";
import { selectWalletUserAuthenticated } from "../../redux-modules/user/user-selectors";
import { SET_EOS_ACCOUNT_NAME } from "../../redux-modules/eos-account/account-actions";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Dispatches action after events
const refresh = store => next => action => {
  const triggerActions = [
    SUCCESS_POST_TRANSACTION,
    SUCCEED_LOGIN,
    SET_EOS_ACCOUNT_NAME
  ];

  const eosAccountName =
    action.type === SET_EOS_ACCOUNT_NAME
      ? action.accountName
      : selectEOSAccountName(store.getState());
  const isAuthenticated =
    selectWalletUserAuthenticated(store.getState()) ||
    action.type === SUCCEED_LOGIN;

  if (
    triggerActions.some(t => action.type === t) &&
    eosAccountName &&
    isAuthenticated
  ) {
    // NOTE it may take up to 3 seconds for a new transaction to process on the blockchain
    delay(1000).then(() => {
      store.dispatch(getBalance(eosAccountName));
      store.dispatch(getTransactions(eosAccountName));
    });
  }

  next(action);
};

export default refresh;
