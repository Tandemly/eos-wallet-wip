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
let timer = false;

// local flags for tracking combined state
let isPolling = false;
let isLoggedIn = false;

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

  // const eosAccountName =
  //   action.type === SET_EOS_ACCOUNT_NAME
  //     ? action.accountName
  //     : selectEOSAccountName(store.getState());
  // const isAuthenticated =
  //   selectWalletUserAuthenticated(store.getState()) ||
  //   action.type === SUCCEED_LOGIN;

  // // If user is logged in and has valid EOS account
  // // start polling for transaction & balance data
  // if (eosAccountName && isAuthenticated) {
  //   console.log(
  //     `[polling] eos_account=${eosAccountName}, authenticated=${
  //       isAuthenticated
  //     }, action=${action.type}`
  //   );
  // }
  // if (
  //   eosAccountName &&
  //   isAuthenticated &&
  //   action.type === SUCCEED_LOGIN &&
  //   !isLoggedIn &&
  //   !isPolling
  // ) {
  //   // NOTE it may take up to 3 seconds for a new transaction to process on the blockchain
  //   // refreshAccount(store, eosAccountName);
  //   isLoggedIn = true;
  //   isPolling = true;
  //   console.log("[polling] Staring polling");
  //   poll(() => refreshAccount(store, eosAccountName), interval);
  // }
  // Clean up when user logs out
  if (action.type === LOGOUT) {
    isLoggedIn = false;
    isPolling = false;
    if (timer) {
      console.log("[polling] Stopping polling");
      clearTimeout(timer);
    }
  }

  next(action);

  // TODO: How does this interact with polling transaction/balance info?
  if (
    action.type === "persist/REHYDRATE" &&
    action.key.endsWith("-account") &&
    selectEOSAccountRehydrated(store.getState())
  ) {
    const account = selectEOSAccountName(store.getState());
    const userId = selectWalletUserId(store.getState());

    store.dispatch(getProfile(userId));
    if (account && userId) {
      // refreshAccount(store, account);
      isLoggedIn = true;
      isPolling = true;
      poll(() => refreshAccount(store, account), interval);
    }
  }
};

export default refresh;
