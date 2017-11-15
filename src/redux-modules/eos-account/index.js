import { combineReducers } from "redux";
import accountReducer from "./account-reducer";
import balanceReducer from "./balance-reducer";

export default combineReducers({
  account: accountReducer,
  balance: balanceReducer
});
