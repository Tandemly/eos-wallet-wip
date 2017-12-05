//@flow
import {
  FAIL_GET_BALANCE,
  SUCCESS_GET_BALANCE,
  TRY_GET_BALANCE
} from "./balance-actions";
import type { BalanceState } from "./types";
import type { Action } from "../action-types";
import { DISCONNECT_EOS_ACCOUNT } from "./account-actions";

export const initialState: BalanceState = {
  loading: false,
  total: 0
};

export default (state: BalanceState = initialState, action: Action) => {
  switch (action.type) {
    case TRY_GET_BALANCE:
      return {
        ...state,
        loading: true
      };
    case SUCCESS_GET_BALANCE:
      if (action.balance.total !== state.total) {
        const newTotal: number = action.balance.total;
        const oldTotal: number = state.total;
        const difference = newTotal - oldTotal;

        return {
          ...state,
          ...action.balance,
          loading: false,
          difference
        };
      }
      return { ...state, loading: false };
    case FAIL_GET_BALANCE:
      return {
        ...state,
        loading: false
      };
    case DISCONNECT_EOS_ACCOUNT:
      return initialState;
    default:
      return state;
  }
};
