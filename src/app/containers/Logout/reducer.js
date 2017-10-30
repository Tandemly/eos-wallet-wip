const FAIL_LOGOUT = 'FAIL_LOGOUT';
const SUCCEED_LOGOUT = 'SUCCEED_LOGOUT';
const TRY_LOGOUT = 'TRY_LOGOUT';

const initialState = {};

// NOTE this doesn't need a reducer
// TODO assess if this is necessary
export function failLogout({ error }) {
  return {
    type: FAIL_LOGOUT,
    error,
  };
}

export function succeedLogout() {
  return {
    type: SUCCEED_LOGOUT,
  };
}

export function tryLogout({ history }) {
  return {
    type: TRY_LOGOUT,
    history,
  };
}
