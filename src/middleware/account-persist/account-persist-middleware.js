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
    return;
  }

  if (action.type === DEHYDRATE_ACCOUNTS) {
    removeReducer("eosAccount");
    return;
  }

  next(action);
};

export default persist;
