import configureMockStore from "redux-mock-store";
import middlewares from "middleware";
import { doTransfer } from "thunks/transfer";
import {
  tryPostTransaction,
  succeedPostTransaction
} from "redux-modules/transfer/transfer-actions";
import {
  tryGetTransactions,
  succeedGetTransactions
} from "redux-modules/transactions/transactions-actions";
import {
  tryGetBalance,
  succeedGetBalance
} from "redux-modules/eos-account/balance-actions";
import {
  setNotification,
  unsetNotification
} from "../redux-modules/notifications/notifications-actions";
import { reset } from "redux-form";

const mockStore = configureMockStore(middlewares);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("doTransfer", () => {
  it.skip("on successful transaction POST, dispatches succeedPostTransaction action", async () => {
    const store = mockStore({
      user: {
        isAuthenticated: true
      },
      eosAccount: {
        account: {
          accountName: "inita",
          ownerKeys: {
            privateKey: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
          },
          activeKeys: {
            privateKey: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
          }
        }
      }
    });
    const amount = 12;
    const to = "initb";
    const memo = "test transfer";

    const response = {
      transaction_id:
        "fb04a6264b9637abee770d811a7f27224a5dbdf8ccc07015a835c9c8897b8338",
      processed: {
        refBlockNum: 795,
        refBlockPrefix: 3534734782,
        expiration: "2017-11-21T23:30:09",
        scope: ["inita", "initb"],
        signatures: [
          "1f36d285dd9f6eeb66e4dfc18163f83fc91f44cc5523d83b56992c7c18dd4e00e05cc59dd8ad120e08b711ed8082df502fe85b8483f5c1dfffbbfb7c95b1745534"
        ],
        messages: [
          {
            code: "eos",
            type: "transfer",
            authorization: [
              {
                account: "inita",
                permission: "active"
              }
            ],
            data: {
              from: "inita",
              to: "initb",
              amount: 12,
              memo: "Because twelve"
            },
            hex_data:
              "000000000093dd74000000008093dd740c000000000000000e42656361757365207477656c7665"
          }
        ],
        output: [
          {
            notify: [
              {
                name: "initb",
                output: {
                  notify: [],
                  deferred_transactions: []
                }
              },
              {
                name: "inita",
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

    const transactionsResponse = [
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
    ];

    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({
        head_block_num: 795,
        last_irreversible_block_num: 781,
        head_block_id:
          "0000031bd611fcebbec5afd215cd0f48913f17c1a1358550fcd2277d1e7d6522",
        head_block_time: "2017-11-21T23:29:09",
        head_block_producer: "initu",
        recent_slots:
          "1111111111111111111111111111111111111111111111111111111111111111",
        participation_rate: "1.00000000000000000"
      })
    );
    // fetch.mockResponseOnce(
    //   JSON.stringify({
    //     head_block_num: 795,
    //     last_irreversible_block_num: 781,
    //     head_block_id:
    //       "0000031bd611fcebbec5afd215cd0f48913f17c1a1358550fcd2277d1e7d6522",
    //     head_block_time: "2017-11-21T23:29:09",
    //     head_block_producer: "initu",
    //     recent_slots:
    //       "1111111111111111111111111111111111111111111111111111111111111111",
    //     participation_rate: "1.00000000000000000"
    //   })
    // );
    fetch.mockResponseOnce(
      JSON.stringify({
        required_keys: ["EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"]
      })
    );
    fetch.mockResponseOnce(JSON.stringify(response));
    fetch.mockResponseOnce(JSON.stringify(balanceResponse));
    fetch.mockResponseOnce(JSON.stringify(transactionsResponse));

    const expectedActions = [
      tryPostTransaction(to, amount, memo),
      unsetNotification(),
      succeedPostTransaction(response),
      setNotification(
        `${amount} EOS successfully transferred to ${to}`,
        "success"
      ),
      reset("transfer"),
      tryGetBalance("inita"),
      tryGetTransactions("inita"),
      succeedGetBalance({
        total: balanceResponse.eos_balance,
        staked: balanceResponse.staked_balance,
        unstaked: balanceResponse.unstaking_balance
      }),
      succeedGetTransactions(transactionsResponse)
    ];

    await store.dispatch(doTransfer(to, amount, memo));

    await delay(2000);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
