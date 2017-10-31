import math from 'mathjs';

const TRY_GET_BALANCE = 'TRY_GET_BALANCE';
const SUCCESS_GET_BALANCE = 'SUCCESS_GET_BALANCE';
const FAIL_GET_BALANCE = 'FAIL_GET_BALANCE';

const initialState = {
  account: {
    total: 0,
    staked: '',
    unstaked: '',
    difference: 0,
    symbol: '',
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TRY_GET_BALANCE:
      return {
        ...state,
        account: 'loading',
      };
    /* eslint-disable no-nested-ternary, no-case-declarations */
    case SUCCESS_GET_BALANCE:
      const newTotal = parseFloat(action.account.total, 10);
      const oldTotal = parseFloat(state.total, 10);
      const difference = state ? math.subtract(newTotal, oldTotal) : 0;

      return {
        difference: isNaN(difference) || difference === 0 ? 0 : difference,
        symbol: Number.isFinite(difference) && (
          difference === 0 ? '' : difference >= 0 ? '+' : '-'),
        ...action.account,
      };
    /* eslint-enable no-nested-ternary, no-case-declarations */
    case FAIL_GET_BALANCE:
      return {
        ...state,
        account: 'error',
      };
    default:
      return state;
  }
}

export function succeedGetBalance({ account }) {
  return {
    type: SUCCESS_GET_BALANCE,
    account,
  };
}

export function failGetBalance({ errors }) {
  return {
    type: FAIL_GET_BALANCE,
    errors,
  };
}

export function tryGetBalance({ account_name }) {
  return {
    type: TRY_GET_BALANCE,
    account_name
  };
}
