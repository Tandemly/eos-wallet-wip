//@flow
import {
  SET_EOS_ACCOUNT_NAME,
  SET_EOS_ACTIVE_KEYS,
  SET_EOS_OWNER_KEYS
} from "./account-actions";
import type { AccountState } from "./types";
import type { Action } from "../action-types";

export const initialState: AccountState = {
  accountName: null,
  ownerKeys: {},
  activeKeys: {}
};

export default (
  state: AccountState = initialState,
  action: Action
): AccountState => {
  switch (action.type) {
    case SET_EOS_ACCOUNT_NAME:
      return {
        ...state,
        accountName: action.accountName
      };
    case SET_EOS_ACTIVE_KEYS:
      return {
        ...state,
        activeKeys: { ...action.keys }
      };
    case SET_EOS_OWNER_KEYS:
      return {
        ...state,
        ownerKeys: { ...action.keys }
      };
    default:
      return state;
  }
};
