import {
  FAIL_GET_TRANSACTIONS,
  SUCCESS_GET_TRANSACTIONS,
  TRY_GET_TRANSACTIONS
} from "./transactions-actions";

const initialState = {
  recents: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRY_GET_TRANSACTIONS:
      return {
        ...state
      };
    case FAIL_GET_TRANSACTIONS:
      return {
        ...state
      };
    case SUCCESS_GET_TRANSACTIONS:
      return {
        ...state,
        recents: action.transactions
      };
    default:
      return state;
  }
};
