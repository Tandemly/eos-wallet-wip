/* eslint-disable camelcase, consistent-return, no-case-declarations */
/* global fetch, localStorage */
import {
  succeedPostLogin,
  failPostLogin } from 'containers/Login/reducer';
import rejectBadResponse from 'util/rejectBadResponse';

const getUser = (payload, dispatch, history) => (
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/login/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': '', // TODO
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(rejectBadResponse)
    .then(response => response.json())
    .then(user => {
      ['id_token', 'access_token'].forEach(key => {
        localStorage.setItem(key, user[key]);
      });

      dispatch(succeedPostLogin(user));
    })
    .then(() => history.push('/'))
    // TODO fixup chain of errors
    .catch(response => response.json())
    .then(error => error && dispatch(failPostLogin({ error })))
    .catch(() => dispatch({
      type: 'CONNECTION_ERROR',
      form: 'sign-up',
      error: { message: 'Unable to connect to the Wallet' }
    }))
);

const login = store => next => (action) => {
  if (action.type === 'TRY_POST_LOGIN') {
    const { account_name, owner_key, history } = action;

    getUser({ account_name, owner_key }, store.dispatch, history);
  }

  next(action);
};

export default login;
