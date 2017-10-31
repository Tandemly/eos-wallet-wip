const TRY_POST_PHONE = 'TRY_POST_PHONE';
const SUCCESS_POST_PHONE = 'SUCCESS_POST_PHONE';
const FAIL_POST_PHONE = 'FAIL_POST_PHONE';

const initialState = {
  isFetching: false,
  fetchSuccess: false,
  form: {
    phone: '',
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TRY_POST_PHONE:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: false,
      };
    case SUCCESS_POST_PHONE:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: true,
        form: {
          ...state.phone,
          phone: action.phone,
        },
      };
    case FAIL_POST_PHONE:
      return {
        ...state,
        errors: action.errors,
        isFetching: false,
        fetchSuccess: true,
      };
    default:
      return state;
  }
}

export function failPostPhone({ error }) {
  return {
    type: FAIL_POST_PHONE,
    form: 'sign-up',
    error,
  };
}

export function succeedPostPhone({ phone }) {
  return {
    type: SUCCESS_POST_PHONE,
    phone,
  };
}

export function tryPostPhone({ history, phone }) {
  return {
    type: TRY_POST_PHONE,
    history,
    phone,
  };
}
