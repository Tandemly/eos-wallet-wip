import {
  tryPostTransaction,
  succeedPostTransaction,
  failPostTransaction
} from "redux-modules/transfer/transfer-actions";
import { apiRequest } from "../util/fetchUtil";

export const doTransfer = (
  activeKey,
  amount,
  from,
  memo,
  ownerKey,
  to,
  accessToken
) => async dispatch => {
  const payload = {
    active_key: activeKey,
    amount,
    from,
    memo,
    owner_key: ownerKey,
    to
  };
  dispatch(tryPostTransaction(payload));
  try {
    const response = await apiRequest("/v1/transfer", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    dispatch(succeedPostTransaction(response));
  } catch (error) {
    dispatch(failPostTransaction(error));
  }
};
