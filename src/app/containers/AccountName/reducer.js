const TRY_POST_USERNAME = 'TRY_POST_USERNAME';
const SUCCESS_POST_USERNAME = 'SUCCESS_POST_USERNAME';
const FAIL_POST_USERNAME = 'FAIL_POST_USERNAME';

const initialState = {
  isFetching: false,
  fetchSuccess: false,
  form: {
    username: '',
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TRY_POST_USERNAME:
      return {
        ...state,
        isFetching: true,
        fetchSuccess: false,
      };
    case SUCCESS_POST_USERNAME:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: true,
        form: {
          ...state.form,
          account_name: action.account_name,
        },
      };
    case FAIL_POST_USERNAME:
      return {
        ...state,
        errors: action.errors,
        isFetching: false,
        fetchSuccess: false,
      };
    default:
      return state;
  }
}

export function failPostUsername({ error }) {
  return {
    type: FAIL_POST_USERNAME,
    form: 'sign-up',
    error,
  };
}

export function succeedPostUsername({ account_name }) {
  return {
    type: SUCCESS_POST_USERNAME,
    account_name,
  };
}

export function tryPostUsername({ account_name, history }) {
  return {
    type: TRY_POST_USERNAME,
    history,
    /* eslint-disable camelcase */
    account_name,
    /* eslint-enable camelcase */
  };
}
