/* eslint-disable camelcase, consistent-return */
/* global fetch */
import {
  succeedPostUsername,
  failPostUsername, } from 'containers/AccountName/reducer';
import {
  succeedPostEmail,
  failPostEmail, } from 'containers/Email/reducer';
import {
  succeedPostPhone,
  failPostPhone, } from 'containers/Phone/reducer';
import { failPostSignup } from 'containers/SignupFinal/actions';
import { succeedPostLogin } from 'containers/Login/reducer';
import rejectBadResponse from 'util/rejectBadResponse';

const createAccountFlow = {
  TRY_POST_USERNAME: {
    success: succeedPostUsername,
    fail: failPostUsername,
    to: '/signup/email',
  },
  TRY_POST_EMAIL: {
    success: succeedPostEmail,
    fail: failPostEmail,
    to: '/signup/phone',
  },
  TRY_POST_PHONE: {
    success: succeedPostPhone,
    fail: failPostPhone,
    to: '/signup/complete',
  },
  TRY_POST_SIGNUP: {
    success: succeedPostLogin,
    fail: failPostSignup,
    to: '/permissions',
  },
};

// WARN The API does not conform to this pattern
export const postSignup = (payload, dispatch, history, flow) => (
  fetch(`${process.env.REACT_APP_PROXY_ENDPOINT}/v1/auth/register/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(rejectBadResponse)
    .then(response => response.text())
    .then(text => (!text ? dispatch(flow.success(payload)) : JSON.parse(text)))
    .then(jsonResponse => jsonResponse && dispatch(flow.success(jsonResponse)))
    .then(() => history.push(flow.to))
    // TODO fixup chain of errors
    .catch(response => response.json())
    .then(error => error && dispatch(flow.fail({ error })))
    .catch(() => dispatch({
      type: 'CONNECTION_ERROR',
      form: 'sign-up',
      error: { message: 'Unable to connect to the Wallet' }
    }))
);

const createAccount = store => next => async (action) => {
  const triggerActions = [
    'TRY_POST_EMAIL',
    'TRY_POST_PHONE',
    'TRY_POST_USERNAME',
    'TRY_POST_SIGNUP',
  ];

  if (triggerActions.some(t => action.type === t)) {
    const { history, type, ...payload } = action;
    const flow = createAccountFlow[action.type];

    if (process.env.NODE_ENV === 'test') {
      await postSignup(payload, store.dispatch, history, flow);
    } else {
      postSignup(payload, store.dispatch, history, flow);
    }
  }

  next(action);
};

export default createAccount;
