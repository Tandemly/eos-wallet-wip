import { stopSubmit } from 'redux-form';
import {
  setNotification,
  unsetNotification,
} from 'containers/Notifications/reducer';

const api = store => next => (action) => {
  const errorActions = [
    'FAIL_POST_LOGIN',
    'FAIL_POST_TRANSACTION',
    'FAIL_POST_EMAIL',
    'FAIL_POST_PHONE',
    'FAIL_POST_USERNAME',
    'FAIL_POST_SIGNUP',
    'FAIL_GET_BALANCE',
    'FAIL_GET_TRANSACTIONS',
    'CONNECTION_ERROR',
  ];

  const clearNotificationActions = [
    'ROUTE_LOAD',
    'ROUTE_NAVIGATE',
    'SUCCEED_POST_LOGIN',
    'SUCCEED_POST_TRANSACTION',
    'SUCCEED_POST_EMAIL',
    'SUCCEED_POST_PHONE',
    'SUCCEED_POST_USERNAME',
    'SUCCEED_POST_SIGNUP',
    'SUCCEED_GET_BALANCE',
    'SUCCEED_GET_TRANSACTIONS',
  ];

  if (errorActions.some(t => action.type === t) && process.env.NODE_ENV !== 'test') {
    const { message } = action.error;
    const errAction = stopSubmit(action.form, message);
    store.dispatch(errAction);
    
    // Subsequently after error action, notify user
    const text = typeof message === 'string' ? message : message[Object.keys(message)[0]];

    if (text) {
      store.dispatch(setNotification({
        status: 'error',
        text
      }));
    }
  }

  if (clearNotificationActions.some(t => action.type === t)) {
    store.dispatch(unsetNotification());
  }

  next(action);
};

export default api;
