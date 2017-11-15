import {
  tryPostEOSAccount,
  succeedPostEOSAccount,
  failPostEOSAccount
} from "redux-modules/eos-signup/actions";
import { apiRequest } from "util/fetchUtil";

export const connectEosAccount = (
  accountName,
  ownerKey,
  activeKey
) => async dispatch => {
  const payload = {
    account_name: accountName,
    owner_key: ownerKey,
    active_key: activeKey
  };
  dispatch(tryPostEOSAccount(payload));
  try {
    await apiRequest("/v1/account/", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    dispatch(succeedPostEOSAccount());
  } catch (error) {
    dispatch(failPostEOSAccount({ error }));
  }
};
