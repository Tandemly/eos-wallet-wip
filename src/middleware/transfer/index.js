/* eslint-disable camelcase, consistent-return */
/* global fetch */
import {
  succeedPostTransaction,
  failPostTransaction } from 'containers/Transfer/reducer';
import rejectBadResponse from 'util/rejectBadResponse';

export const postTransfer = (payload, accessToken, dispatch) => (
  fetch(`${process.env.REACT_APP_PROXY_ENDPOINT}/v1/transfer`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
    .then(rejectBadResponse)
    .then(response => response.json())
    .then(data => dispatch(succeedPostTransaction(data)))
    // TODO fixup chain of errors
    .catch(response => response.json())
    .then(error => error && dispatch(failPostTransaction({ error })))
    .catch(() => dispatch({
      type: 'CONNECTION_ERROR',
      form: 'sign-up',
      error: { message: 'Unable to connect to the Wallet' }
    }))
);

const transfer = store => next => async (action) => {
  const {
    login: { 
      isAuthenticated,
      user: {
        account_name: from,
        accessToken,

        active_key,
        owner_key,
      } = {},
    },
  } = store.getState();

  if (isAuthenticated && action.type === 'TRY_POST_TRANSACTION') {
    const {
      amount,
      memo,
      to,
    } = action;

    // TODO sign transactions here via eosjs API
    if (process.env.NODE_ENV === 'test') {
      await postTransfer({
        active_key,
        amount,
        from,
        memo,
        owner_key,
        to,
      }, accessToken, store.dispatch);
    } else {
      postTransfer({
        active_key,
        amount,
        from,
        memo,
        owner_key,
        to,
      }, accessToken, store.dispatch);
    }
  }

  next(action);
};

export default transfer;
