/* eslint-disable camelcase, consistent-return */
/* global fetch */
import {
  succeedPostEOSAccount,
  failPostEOSAccount,
} from 'containers/ConnectedEOSAccounts/actions';
import rejectBadResponse from 'util/rejectBadResponse';

export const postEOSAccount = (payload, accessToken, dispatch) => (
  fetch(`${process.env.REACT_APP_PROXY_ENDPOINT}/v1/account/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(rejectBadResponse)
    .then(() => dispatch(succeedPostEOSAccount()))
    // TODO fixup chain of errors
    .catch(response => response.ok && response.json())
    .then(error => error && dispatch(failPostEOSAccount({ error })))
    .catch(() => {
      dispatch({
        type: 'CONNECTION_ERROR',
        form: 'sign-up',
        error: { message: 'Unable to connect to the Wallet' },
      });
    })
);

const connectEOSAccount = store => next => (action) => {
  const {
    login: { 
      isAuthenticated,
      user: {
        accessToken,
      } = {},
    },
  } = store.getState();

  if (isAuthenticated && action.type === 'TRY_POST_EOS_ACCOUNT') {
    const { account_name, owner_key, active_key } = action;

    postEOSAccount({
      account_name,
      owner_key,
      active_key },
      accessToken,
      store.dispatch
    );
  }

  next(action);
};

export default connectEOSAccount;
