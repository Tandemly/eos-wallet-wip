//@flow
import {
  FAIL_GET_BALANCE,
  SUCCESS_GET_BALANCE,
  TRY_GET_BALANCE
} from "./balance-actions";
import type { BalanceState } from "./types";
import type { Action } from "../action-types";

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
    /* eslint-disable no-nested-ternary, no-case-declarations */
    case SUCCESS_GET_BALANCE:
      const newTotal: number = action.balance.total;
      const oldTotal: number = state.total;
      const difference = newTotal - oldTotal;

      return {
        ...state,
        ...action.balance,
        loading: false,
        difference,
        symbol: difference === 0 ? "" : (difference >= 0 ? "+" : "-")
      };
    /* eslint-enable no-nested-ternary, no-case-declarations */
    case FAIL_GET_BALANCE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
