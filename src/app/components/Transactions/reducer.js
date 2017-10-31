const TRY_GET_TRANSACTIONS = 'TRY_GET_TRANSACTIONS';
const FAIL_GET_TRANSACTIONS = 'FAIL_GET_TRANSACTIONS';
const SUCCESS_GET_TRANSACTIONS = 'SUCCESS_GET_TRANSACTIONS';

const initialState = {
  recents: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TRY_GET_TRANSACTIONS:
      return {
        ...state,
      };
    case FAIL_GET_TRANSACTIONS:
      return {
        ...state,
      };
    case SUCCESS_GET_TRANSACTIONS:
      return {
        ...state,
        recents: action.transactions,
      };
    default:
      return state;
  }
}

export function failGetTransactions({ error }) {
  return {
    type: FAIL_GET_TRANSACTIONS,
    error,
  };
}

export function succeedGetTransactions({ transactions }) {
  return {
    type: SUCCESS_GET_TRANSACTIONS,
    transactions,
  };
}

export function tryGetTransactions({ account_name }) {
  return {
    type: TRY_GET_TRANSACTIONS,
    account_name,
  };
}
