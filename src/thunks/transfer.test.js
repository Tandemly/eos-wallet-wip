import configureMockStore from "redux-mock-store";
import middlewares from "middleware";
import { doTransfer } from "thunks/transfer";
import {
  tryPostTransaction,
  succeedPostTransaction
} from "redux-modules/transfer/actions";
import {
  tryGetTransactions,
  succeedGetTransactions
} from "redux-modules/transactions/actions";
import {
  tryGetBalance,
  succeedGetBalance
} from "redux-modules/eos-account/balance-actions";

const mockStore = configureMockStore(middlewares);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("doTransfer", () => {
  it("on successful transaction POST, dispatches succeedPostTransaction action", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: true,
        user: {
          account_name: "inita",
          id_token:
            "88769942b62c0a2b3d86506d168daf97928167e9e77b5db3678e176fcd55febc",
          access_token:
            "59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51"
        }
      }
    });

    const activeKey =
      "88769942b62c0a2b3d86506d168daf97928167e9e77b5db3678e176fcd55febc";
    const amount = 12;
    const from = "inita";
    const to = "initb";
    const memo = "test transfer";
    const ownerKey =
      "bf7eecb10bb7b588c413d2861548d85e45e52a2a966ffed5e0f64f0d71dadbac";
    const accessToken =
      "59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51";

    const payload = {
      active_key: activeKey,
      amount,
      from,
      memo,
      owner_key: ownerKey,
      to
    };

    const response = {
      transaction_id:
        "bf7eecb10bb7b588c413d2861548d85e45e52a2a966ffed5e0f64f0d71dadbac",
      processed: {
        refBlockNum: 54215,
        refBlockPrefix: 3959318548,
        expiration: "2017-10-10T16:23:51",
        scope: ["inita", "initb"],
        signatures: [],
        messages: [
          {
            code: "eos",
            type: "transfer",
            authorization: [
              {
                account: "initb",
                permission: "active"
              }
            ],
            data: {
              from: "initb",
              to: "inita",
              amount: 100,
              memo: " "
            },
            hex_data: "000000000041934b000000008040934b64000000000000000120"
          }
        ],
        output: [
          {
            notify: [
              {
                name: "inita",
                output: {
                  notify: [],
                  deferred_transactions: []
                }
              },
              {
                name: "initb",
                output: {
                  notify: [],
                  deferred_transactions: []
                }
              }
            ],
            deferred_transactions: []
          }
        ]
      }
    };

    const balanceResponse = {
      eos_balance: "999995.5819 EOS",
      staked_balance: "999995.0000 EOS",
      unstaking_balance: "0.5819 EOS"
    };

    const transactionsResponse = {
      transactions: [
        {
          sender: {
            name: "nujabes",
            icon: ""
          },
          direction: "up",
          amount: 1,
          memo: " ",
          date: "Tue Oct 03 2017 19:03:15 GMT-0500 (CDT)",
          id: "59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51"
        },
        {
          sender: {
            name: "nujabes",
            icon: ""
          },
          direction: "up",
          amount: 1,
          memo: " ",
          date: "Tue Oct 03 2017 19:01:57 GMT-0500 (CDT)",
          id: "d96fce7f61a583a2a8d8ac12bbaeca6b7ae7ffb6ba204aa1fb17e234c0462954"
        },
        {
          sender: {
            name: "nujabes",
            icon: ""
          },
          direction: "up",
          amount: 300000,
          memo: "zz",
          date: "Fri Sep 29 2017 20:50:06 GMT-0500 (CDT)",
          id: "a0ec89756e2b765151e59e7ee1646d1a89d7a0ec5e68bba7bffbaaf0f9ab5c68"
        }
      ]
    };

    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(response));
    fetch.mockResponseOnce(JSON.stringify(balanceResponse));
    fetch.mockResponseOnce(JSON.stringify(transactionsResponse));

    const expectedActions = [
      tryPostTransaction(payload),
      succeedPostTransaction(response),
      tryGetBalance("inita"),
      tryGetTransactions("inita"),
      succeedGetBalance({
        total: balanceResponse.eos_balance,
        staked: balanceResponse.staked_balance,
        unstaked: balanceResponse.unstaking_balance
      }),
      succeedGetTransactions(transactionsResponse)
    ];

    await store.dispatch(
      doTransfer(activeKey, amount, from, memo, ownerKey, to, accessToken)
    );

    await delay(2000);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
