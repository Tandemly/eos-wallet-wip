import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import { getBalance } from './';
import { succeedGetBalance } from 'containers/Balance/reducer';

const mockStore = configureMockStore(_middlewares);

describe('async balance middleware', () => {
  it('on successful network call, dispatches succeedGetBalance action', () => {
    const store = mockStore({
      balance: [],
      login: {
        isAuthenticated: true,
        user: {
          id_token: '59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51',
          access_token: 'a0ec89756e2b765151e59e7ee1646d1a89d7a0ec5e68bba7bffbaaf0f9ab5c68qq',
        },
      }
    });

    const payload = { account_name: 'inita' };
    const response = {
      account: {
        total: "999995.5819 EOS",
        staked: "0.0000 EOS",
      },
    };
    const expectedActions = [
      succeedGetBalance(response),
    ];

    fetch.mockResponse(JSON.stringify(response));

    return getBalance(payload, '', store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

