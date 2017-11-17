import configureMockStore from "redux-mock-store";
import middlewares from "middleware";
import { tryGetTransactions } from "redux-modules/transactions/actions";
import { tryGetBalance } from "redux-modules/eos-account/balance-actions";
import { succeedGetBalance } from "../../redux-modules/eos-account/balance-actions";
import { succeedGetTransactions } from "../../redux-modules/transactions/actions";
import { SUCCEED_POST_LOGIN } from "../../redux-modules/login/actions";
import { unsetNotification } from "../../redux-modules/notifications/actions";

const mockStore = configureMockStore(middlewares);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("async refresh middleware", () => {
  it("on refreshAction, dispatches tryGetBalance and tryGetTransactions action", async () => {
    const account_name = "testeos";
    const store = mockStore({
      login: {
        isAuthenticated: true
      },
      "eos-account": {
        account: {
          accountName: account_name
        }
      }
    });
    const refreshAction = { type: SUCCEED_POST_LOGIN };

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
    fetch.mockResponseOnce(JSON.stringify(balanceResponse), { status: 200 });
    fetch.mockResponseOnce(JSON.stringify(transactionsResponse), {
      status: 200
    });

    const expectedActions = [
      unsetNotification(),
      refreshAction,
      tryGetBalance(account_name),
      tryGetTransactions(account_name),
      unsetNotification(),
      succeedGetBalance({
        total: balanceResponse.eos_balance,
        staked: balanceResponse.staked_balance,
        unstaked: balanceResponse.unstaking_balance
      }),
      unsetNotification(),
      succeedGetTransactions(transactionsResponse)
    ];

    await store.dispatch(refreshAction);

    await delay(2000);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
