import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import { tryGetTransactions } from 'containers/Transactions/reducer';
import { tryGetBalance } from 'containers/Balance/reducer';

const mockStore = configureMockStore(_middlewares);

function asyncDispatchAction(action) {
  return (dispatch) => {
    dispatch(action);
    return Promise.resolve();
  }
}

describe('async refresh middleware', () => {
  it('on refreshAction, dispatches tryGetBalance and tryGetTransactions action', () => {
    const account_name = {
      account_name: 'testeos',
    };
    const store = mockStore({ 
      login: {
        user: account_name
      }
    });
    const refreshAction = { type: 'SUCCEED_LOGIN' };
    const expectedActions = [
      tryGetBalance(account_name),
      tryGetTransactions(account_name),
      refreshAction,
    ];

    return store.dispatch(asyncDispatchAction(refreshAction)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

