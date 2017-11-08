import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import { getUser } from './';
import { succeedPostLogin } from 'containers/Login/reducer';

const mockStore = configureMockStore(_middlewares);
const mockHistory = {
  push: jest.fn(),
};

describe('async login middleware', () => {
  it('on successful network call, dispatches succeedPostLogin action', () => {
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
    const payload = { account_name: 'inita', owner_key: 'abcdefghijklmnop' };
    const response = {
      user: {
        timezone: '',
        id: '',
        name: '',
        email: '',
        role: 'user',
        createdAt: '',        
      },
      token: {
        tokenType: '',
        accessToken: '',
        refreshToken: '',
        expiresIn: '',        
      }
    };
    const expectedActions = [
      { type: 'UNSET_NOTIFICATION' },
      succeedPostLogin(response),
    ];

    fetch.mockResponse(JSON.stringify(response));

    return getUser(payload, store.dispatch, mockHistory).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

