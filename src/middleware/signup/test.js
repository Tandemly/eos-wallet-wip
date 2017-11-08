import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import { failPostSignup } from 'containers/Signup/actions';
import { succeedPostLogin } from 'containers/Login/reducer';
import createAccount from './';

const mockStore = configureMockStore(_middlewares);

describe('async signup middleware', () => {
  const store = mockStore({ login: [] });
  const next = jest.fn();
  const history = {
    push: jest.fn(),
  };
  const payload = {
    email: 'test@eafe.com',
    password: 'xyz20171424'
  };

  it('on whole signup POST success, dispatch succeedPostLogin', async () => {
    const triggerAction = {
      ...payload,
      history,
      type: 'TRY_POST_SIGNUP',
    };
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
      // Unset notification fires before succeedPostLogin action
      { type: 'UNSET_NOTIFICATION' },
      succeedPostLogin(response),
    ];
    
    fetch.mockResponse(JSON.stringify(response), { status: 200 });
    await createAccount(store)(next)(triggerAction)

    expect(store.getActions()).toEqual(expectedActions);
  });
});

