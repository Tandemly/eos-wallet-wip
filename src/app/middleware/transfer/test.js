import configureMockStore from 'redux-mock-store';
import { _middlewares } from '../';
import { postTransfer } from './';
import { succeedPostTransaction } from 'containers/Transfer/reducer';
import { tryGetTransactions } from 'containers/Transactions/reducer';
import { tryGetBalance } from 'containers/Balance/reducer';

const mockStore = configureMockStore(_middlewares);
const mockHistory = {
  push: jest.fn(),
};

describe('async transfer middleware', () => {
  it('on successful transaction POST, dispatches succeedPostTransaction action', () => {
    const store = mockStore({
      login: {
        isAuthenticated: true,
        user: {
          account_name: 'inita',
          id_token: '88769942b62c0a2b3d86506d168daf97928167e9e77b5db3678e176fcd55febc',
          access_token: '59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51',
        }
      }
    });
    const payload = {
      amount: '1',
      history: mockHistory,
      memo: ' ',
      to: 'initb',
    };
    const response = {
      "transaction_id": "bf7eecb10bb7b588c413d2861548d85e45e52a2a966ffed5e0f64f0d71dadbac",
      "processed": {
        "refBlockNum": 54215,
        "refBlockPrefix": 3959318548,
        "expiration": "2017-10-10T16:23:51",
        "scope": [
          "inita",
          "initb"
        ],
        "signatures": [],
        "messages": [
          {
            "code": "eos",
            "type": "transfer",
            "authorization": [
              {
                "account": "initb",
                "permission": "active"
              }
            ],
            "data": {
              "from": "initb",
              "to": "inita",
              "amount": 100,
              "memo": " "
            },
            "hex_data": "000000000041934b000000008040934b64000000000000000120"
          }
        ],
        "output": [
          {
            "notify": [
              {
                "name": "inita",
                "output": {
                  "notify": [],
                  "deferred_transactions": []
                }
              },
              {
                "name": "initb",
                "output": {
                  "notify": [],
                  "deferred_transactions": []
                }
              }
            ],
            "deferred_transactions": []
          }
        ]
      }
    };
    const expectedActions = [
      tryGetBalance({ account_name: "inita" }),
      tryGetTransactions({ account_name: "inita" }),
      succeedPostTransaction(response),
    ];

    fetch.mockResponse(JSON.stringify(response));

    return postTransfer(payload, '', store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

