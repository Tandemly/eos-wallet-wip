const TRY_POST_SIGNUP = 'TRY_POST_SIGNUP';
const FAIL_POST_SIGNUP = 'FAIL_POST_SIGNUP';

export function failPostSignup({ error }) {
  return {
    type: FAIL_POST_SIGNUP,
    form: 'sign-up',
    error,
  };
}

export function tryPostSignup({ email, password, history }) {
  return {
    type: TRY_POST_SIGNUP,
    email,
    password,
    history,
  };
}
