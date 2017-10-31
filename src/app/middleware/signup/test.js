import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import {
  succeedPostUsername,
  failPostUsername, } from 'containers/AccountName/reducer';
import {
  succeedPostEmail,
  failPostEmail, } from 'containers/Email/reducer';
import {
  succeedPostPhone,
  failPostPhone, } from 'containers/Phone/reducer';
import { failPostSignup } from 'containers/SignupFinal/actions';
import { succeedPostLogin } from 'containers/Login/reducer';
import createAccount from './';

const mockStore = configureMockStore(_middlewares);

describe('async balance middleware', () => {
  const store = mockStore({ login: [] });
  const next = jest.fn();
  const history = {
    push: jest.fn(),
  };
  const account_name = { account_name: 'inita' };
  const phone = { phone: '3147777909' };
  const email = { email: 'test@eafe.com' };

  it('on account_name POST success, dispatch succeedPostUsername', async () => {
    const triggerAction = {
      ...account_name,
      history,
      type: 'TRY_POST_USERNAME',
    };
    const expectedActions = [
      succeedPostUsername(account_name),
    ];
    
    fetch.mockResponse('', { status: 200 });
    await createAccount(store)(next)(triggerAction)

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('on email POST success, dispatch succeedPostEmail', async () => {
    const triggerAction = {
      ...email,
      history,
      type: 'TRY_POST_EMAIL',
    };
    const expectedActions = [
      succeedPostUsername(account_name),
      succeedPostEmail(email),
    ];
    
    fetch.mockResponse('', { status: 200 });
    await createAccount(store)(next)(triggerAction)

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('on phone POST success, dispatch succeedPostPhone', async () => {
    const triggerAction = {
      ...phone,
      history,
      type: 'TRY_POST_PHONE',
    };
    const expectedActions = [
      succeedPostUsername(account_name),
      succeedPostEmail(email),
      succeedPostPhone(phone),
    ];
    
    fetch.mockResponse('', { status: 200 });
    await createAccount(store)(next)(triggerAction)

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('on whole data POST success, dispatch succeedPostLogin', async () => {
    const triggerAction = {
      ...phone,
      ...account_name,
      ...email,
      history,
      type: 'TRY_POST_SIGNUP',
    };
    const response = {
      user: {
        account_name: 'inita',
        auth: {},
        display_name: '',
        image_url: '',
        website: '',
      },
    };
    const expectedActions = [
      succeedPostUsername(account_name),
      succeedPostEmail(email),
      succeedPostPhone(phone),
      // Unset notification removes all previous notifications before dispatching login action
      { type: 'UNSET_NOTIFICATION' },
      succeedPostLogin(response),
    ];
    
    fetch.mockResponse(JSON.stringify(response), { status: 200 });
    await createAccount(store)(next)(triggerAction)

    expect(store.getActions()).toEqual(expectedActions);
  });
});

