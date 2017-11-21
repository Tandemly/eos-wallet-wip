export const TRY_POST_TRANSACTION = "TRY_POST_TRANSACTION";
export const SUCCESS_POST_TRANSACTION = "SUCCESS_POST_TRANSACTION";
export const FAIL_POST_TRANSACTION = "FAIL_POST_TRANSACTION";

export function failPostTransaction({ error }) {
  return {
    type: FAIL_POST_TRANSACTION,
    form: "transfer",
    error
  };
}

export function succeedPostTransaction(transaction) {
  return {
    type: SUCCESS_POST_TRANSACTION,
    transaction
  };
}

export function tryPostTransaction({ amount, history, memo = " ", to }) {
  return {
    type: TRY_POST_TRANSACTION,
    amount,
    history,
    memo,
    to
  };
}
