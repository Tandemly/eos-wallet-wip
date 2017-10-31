const TRY_POST_EMAIL = 'TRY_POST_EMAIL';
const SUCCESS_POST_EMAIL = 'SUCCESS_POST_EMAIL';
const FAIL_POST_EMAIL = 'FAIL_POST_EMAIL';

const initialState = {
  isFetching: false,
  fetchSuccess: false,
  form: {
    email: '',
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TRY_POST_EMAIL:
      return {
        ...state,
        isFetching: true,
      };
    case SUCCESS_POST_EMAIL:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: true,
        form: {
          ...state.form,
          email: action.email,
        },
      };
    case FAIL_POST_EMAIL:
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

export function failPostEmail({ error }) {
  return {
    type: FAIL_POST_EMAIL,
    form: 'sign-up',
    error,
  };
}

export function succeedPostEmail({ email }) {
  return {
    type: SUCCESS_POST_EMAIL,
    email,
  };
}

export function tryPostEmail({ email, history }) {
  return {
    type: TRY_POST_EMAIL,
    form: 'sign-up',
    history,
    email,
  };
}
