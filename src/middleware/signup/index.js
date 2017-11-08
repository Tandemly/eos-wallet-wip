/* global fetch */
import { failPostSignup } from 'containers/Signup/actions';
import { succeedPostLogin } from 'containers/Login/reducer';
import rejectBadResponse from 'util/rejectBadResponse';

export const postSignup = (payload, dispatch, history) => (
  fetch(`${process.env.REACT_APP_PROXY_ENDPOINT}/v1/auth/register/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(rejectBadResponse)
    .then(response => response.json())
    .then(response => {
      // Clear everything before writing incoming data to localStorage
      localStorage.clear();

      const { token, user } = response;
      Object.keys(token).forEach(key => {
        localStorage.setItem(`token.${key}`, token[key]);
      });

      dispatch(succeedPostLogin({ user }));
    })
    .then(() => history.push('/permissions'))
    // TODO fixup chain of errors
    .catch(error => error && dispatch(failPostSignup({ error })))
    .catch(() => dispatch({
      type: 'CONNECTION_ERROR',
      form: 'sign-up',
      error: { message: 'Unable to connect to the Wallet' }
    }))
);

const createAccount = store => next => async (action) => {
  if (action.type === 'TRY_POST_SIGNUP') {
    const { history, type, ...payload } = action;

    if (process.env.NODE_ENV === 'test') {
      await postSignup(payload, store.dispatch, history);
    } else {
      postSignup(payload, store.dispatch, history);
    }
  }

  next(action);
};

export default createAccount;
