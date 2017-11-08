import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import { postEOSAccount } from './';
import { succeedPostEOSAccount } from 'containers/ConnectedEOSAccounts/actions';

const mockStore = configureMockStore(_middlewares);

describe('async connect eos account middleware', () => {
  it('on successful network call, dispatches succeedPostEOSAccount action', () => {
    const store = mockStore({
      login: {
        isAuthenticated: true,
        user: {
          id_token: '59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51',
          access_token: 'a0ec89756e2b765151e59e7ee1646d1a89d7a0ec5e68bba7bffbaaf0f9ab5c68qq',
        },
      },
      user: []
    });
    const payload = {
      account_name: 'inita',
      owner_key: 'abcdefghijklmnop',
      active_key: 'wafefewfavbrfr',
    };

    const expectedActions = [
      succeedPostEOSAccount(),
    ];

    fetch.mockResponse('', { status: 200 });

    return postEOSAccount(payload, '', store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

