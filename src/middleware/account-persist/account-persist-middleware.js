import { createReducer } from "redux-modules/eos-account";
import { removeReducer, addReducer } from "../../util/configureStore";
import {
  REHYDRATE_ACCOUNTS,
  DEHYDRATE_ACCOUNTS
} from "./account-persist-actions";
import {
  selectWalletUserId,
  selectWalletUserHash
} from "../../redux-modules/user/user-selectors";
import { setEOSAccountName } from "../../redux-modules/eos-account/account-actions";
import { selectEOSAccountName } from "../../redux-modules/eos-account/account-selectors";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const persist = store => next => action => {
  // Rehydrate accounts by adding a reducer capable using the user hash
  if (action.type === REHYDRATE_ACCOUNTS) {
    addReducer(
      "eosAccount",
      createReducer(
        selectWalletUserId(store.getState()),
        selectWalletUserHash(store.getState())
      )
    );
    delay(1000).then(() => {
      store.dispatch(setEOSAccountName(selectEOSAccountName(store.getState())));
    });
    return;
  }

  if (action.type === DEHYDRATE_ACCOUNTS) {
    removeReducer("eosAccount");
    return;
  }

  next(action);
};

export default persist;
