// TODO check expiration on JWT
// import jwtDecode from 'jwt-decode';

const FAIL_POST_LOGIN = 'FAIL_POST_LOGIN';
const SUCCEED_POST_LOGIN = 'SUCCEED_POST_LOGIN';
const TRY_POST_LOGIN = 'TRY_POST_LOGIN';

const SUCCEED_LOGOUT = 'SUCCEED_LOGOUT';

// NOTE token goes into local storage, not stored in redux
const initialState = {
  user: {
    id: '',
    email: '',
    name: '',
    role: '',
  },
  isFetching: false,
  isAuthenticated: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FAIL_POST_LOGIN:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.error,
      };
    case SUCCEED_POST_LOGIN:
      return {
        ...state,
        user: action.user,
        isFetching: false,
        isAuthenticated: true,
      };
    case SUCCEED_LOGOUT:
      return {
        ...state,
        user: action.user,
        isFetching: false,
        isAuthenticated: false,
      };
    case TRY_POST_LOGIN:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
}

export function failPostLogin({ error }) {
  return {
    type: FAIL_POST_LOGIN,
    form: 'login',
    error,
  };
}

export function succeedPostLogin({ user, token }) {
  return {
    type: SUCCEED_POST_LOGIN,
    user,
  };
}

// TODO "keep me logged in" should request longer expiry date
export function tryPostLogin({ account_name, owner_key, history }) {
  return {
    type: TRY_POST_LOGIN,
    account_name,
    history,
    owner_key,
  };
}
