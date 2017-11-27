import { stopSubmit } from "redux-form";
import { unsetNotification } from "redux-modules/notifications/notifications-actions";
import { setNotification } from "../../redux-modules/notifications/notifications-actions";
import { DISCONNECT_EOS_ACCOUNT } from "../../redux-modules/eos-account/account-actions";
import { FAIL_GET_TRANSACTIONS } from "../../redux-modules/transactions/transactions-actions";
import {
  FAIL_LOGIN,
  SUCCEED_LOGIN,
  LOGOUT
} from "../../redux-modules/user/user-actions";
import {
  FAIL_POST_TRANSACTION,
  SUCCESS_POST_TRANSACTION
} from "../../redux-modules/transfer/transfer-actions";
import { FAIL_GET_BALANCE } from "../../redux-modules/eos-account/balance-actions";
import {
  FAIL_POST_EOS_ACCOUNT,
  SUCCESS_POST_EOS_ACCOUNT
} from "../../redux-modules/eos-signup/actions";
import { FAIL_POST_SIGNUP } from "../../redux-modules/user/signup-actions";

const api = store => next => action => {
  const errorActions = [
    FAIL_LOGIN,
    FAIL_GET_BALANCE,
    FAIL_GET_TRANSACTIONS,
    FAIL_POST_SIGNUP,
    FAIL_POST_EOS_ACCOUNT,
    FAIL_POST_TRANSACTION
  ];

  const clearNotificationActions = [
    SUCCEED_LOGIN,
    SUCCESS_POST_TRANSACTION,
    SUCCESS_POST_EOS_ACCOUNT,
    DISCONNECT_EOS_ACCOUNT,
    LOGOUT
  ];

  if (
    errorActions.some(t => action.type === t) &&
    process.env.NODE_ENV !== "test"
  ) {
    const { message, errors } = action.error;
    const errAction = stopSubmit(action.form, message);
    store.dispatch(errAction);

    // Subsequently after error action, notify user
    const text = errors
      ? errors[0].messages[0] // First validation error...for now.
      : typeof message === "string"
        ? message
        : message[Object.keys(message)[0]];

    if (text) {
      store.dispatch(setNotification(text, "error"));
    }
  }

  if (clearNotificationActions.some(t => action.type === t)) {
    store.dispatch(unsetNotification());
  }

  next(action);
};

export default api;
