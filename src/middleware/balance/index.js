/* eslint-disable camelcase, consistent-return */
/* global fetch */
import {
  succeedGetBalance,
  failGetBalance,
} from 'containers/Balance/reducer';
import rejectBadResponse from 'util/rejectBadResponse';

export const getBalance = (payload, token, dispatch) => (
  fetch(`${process.env.REACT_APP_PROXY_ENDPOINT}/v1/accounts/${payload.account_name}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(rejectBadResponse)
    .then(response => response.json())
    .then(data => dispatch(succeedGetBalance(data)))
    // TODO fixup chain of errors
    .catch(response => response.ok && response.json())
    .then(error => error && dispatch(failGetBalance({ error })))
    .catch(() => {
      dispatch({
        type: 'CONNECTION_ERROR',
        form: 'sign-up',
        error: { message: 'Unable to connect to the Wallet' },
      });
    })
);

const balance = store => next => (action) => {
  const {
    login: { 
      isAuthenticated,
      user: {
        id_token,
        access_token,
      } = {},
    },
  } = store.getState();

  if (isAuthenticated && action.type === 'TRY_GET_BALANCE') {
    const { account_name } = action;

    getBalance({ account_name }, access_token, store.dispatch);
  }

  next(action);
};

export default balance;
