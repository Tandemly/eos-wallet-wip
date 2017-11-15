//@flow
import type { AccountBalance } from "./types";

export const TRY_GET_BALANCE = "TRY_GET_BALANCE";
export const SUCCESS_GET_BALANCE = "SUCCESS_GET_BALANCE";
export const FAIL_GET_BALANCE = "FAIL_GET_BALANCE";

type GetBalanceTryAction = {
  type: "TRY_GET_BALANCE"
};

type GetBalanceSuccessAction = {
  type: "SUCCESS_GET_BALANCE",
  balance: AccountBalance
};

type GetBalanceFailureAction = {
  type: "FAIL_GET_BALANCE",
  errors: any
};

export type BalanceActions =
  | GetBalanceTryAction
  | GetBalanceSuccessAction
  | GetBalanceFailureAction;

export const succeedGetBalance = (
  balance: AccountBalance
): GetBalanceSuccessAction => ({
  type: SUCCESS_GET_BALANCE,
  balance
});

export const failGetBalance = (errors: any): GetBalanceFailureAction => ({
  type: FAIL_GET_BALANCE,
  errors
});

export const tryGetBalance = (): GetBalanceTryAction => ({
  type: TRY_GET_BALANCE
});
