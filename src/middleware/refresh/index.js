/* eslint-disable camelcase, consistent-return */
import { getTransactions } from "thunks/transactions";
import { getBalance } from "thunks/balance";
import { SUCCEED_LOGIN, LOGOUT } from "../../redux-modules/user/user-actions";
import { SUCCESS_POST_TRANSACTION } from "../../redux-modules/transfer/transfer-actions";
import {
  selectEOSAccountName,
  selectEOSAccountRehydrated
} from "../../redux-modules/eos-account/account-selectors";
import {
  selectWalletUserAuthenticated,
  selectWalletUserId
} from "../../redux-modules/user/user-selectors";
import { SET_EOS_ACCOUNT_NAME } from "../../redux-modules/eos-account/account-actions";
import { getProfile } from "../../thunks/profile";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const interval = 5000;
let isPolling = false;
let timer = false;

const poll = (fn, intval) => {
  console.log("updating account data...");
  fn();
  timer = setTimeout(poll.bind(this, fn, intval), intval);
};

function refreshAccount(store, eosAccountName) {
  delay(1000).then(() => {
    store.dispatch(getBalance(eosAccountName));
    store.dispatch(getTransactions(eosAccountName));
  });
}

// Dispatches action after events
const refresh = store => next => action => {
  // const triggerActions = [
  //   SUCCESS_POST_TRANSACTION,
  //   SUCCEED_LOGIN,
  //   SET_EOS_ACCOUNT_NAME
  // ];

  const eosAccountName =
    action.type === SET_EOS_ACCOUNT_NAME
      ? action.accountName
      : selectEOSAccountName(store.getState());
  const isAuthenticated =
    selectWalletUserAuthenticated(store.getState()) ||
    action.type === SUCCEED_LOGIN;

  // If user is logged in and has valid EOS account
  // start polling for transaction & balance data
  if (
    // triggerActions.some(t => action.type === t) &&
    eosAccountName &&
    isAuthenticated &&
    [SUCCEED_LOGIN, "persist/REHYDRATE"].some(t => action.type === t) &&
    !isPolling
  ) {
    // NOTE it may take up to 3 seconds for a new transaction to process on the blockchain
    // refreshAccount(store, eosAccountName);
    isPolling = true;
    console.log("Staring polling");
    poll(() => refreshAccount(store, eosAccountName), interval);
  }
  // Clean up when user logs out
  if (action.type === LOGOUT && isPolling) {
    console.log("Stopping polling");
    clearTimeout(timer);
    isPolling = false;
  }

  next(action);

  // TODO: How does this interact with polling transaction/balance info?
  if (
    action.type === "persist/REHYDRATE" &&
    selectEOSAccountRehydrated(store.getState())
  ) {
    const account = selectEOSAccountName(store.getState());
    store.dispatch(getProfile(selectWalletUserId(store.getState())));
    if (account) {
      refreshAccount(store, account);
    }
  }
};

export default refresh;
