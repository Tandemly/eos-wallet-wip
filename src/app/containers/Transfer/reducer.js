const TRY_POST_TRANSACTION = 'TRY_POST_TRANSACTION';
const SUCCESS_POST_TRANSACTION = 'SUCCESS_POST_TRANSACTION';
const FAIL_POST_TRANSACTION = 'FAIL_POST_TRANSACTION';

const initialState = {
  transaction: {
    amount: 0,
    to: '',
    memo: '',
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TRY_POST_TRANSACTION:
      return {
        ...state,
        transaction: {
          amount: action.amount,
          to: action.to,
          memo: action.memo,
        }
      };
    case FAIL_POST_TRANSACTION :
      return {
        ...state,
      };
    case SUCCESS_POST_TRANSACTION:
      return {
        ...state,
        transaction: {
          amount: '',
          to: '',
          memo: '',
        },
      };
    default:
      return state;
  }
}

export function failPostTransaction({ error }) {
  return {
    type: FAIL_POST_TRANSACTION,
    form: 'transfer',
    error,
  };
}

export function succeedPostTransaction(transaction) {
  return {
    type: SUCCESS_POST_TRANSACTION,
    transaction,
  };
}

// TODO move memo = ' ' upstream
export function tryPostTransaction({ amount, history, memo = ' ', to }) {
  return {
    type: TRY_POST_TRANSACTION,
    amount,
    history,
    memo,
    to,
  };
}
