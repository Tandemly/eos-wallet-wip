import configureMockStore from "redux-mock-store";
import middlewares from "middleware";
import { getTransactions } from "thunks/transactions";
import {
  tryGetTransactions,
  succeedGetTransactions
} from "redux-modules/transactions/actions";

const mockStore = configureMockStore(middlewares);

describe("getTransactions", () => {
  it("on successful network call, dispatches succeedGetTransactions action", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: true
      },
      "eos-account": {
        account: {
          accountName: "testeos"
        }
      },
      "eos-account": {
        account: {
          accountName: "testeos"
        }
      }
    });
    const accountName = "inita";

    const response = [
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

    const expectedActions = [
      tryGetTransactions(accountName),
      succeedGetTransactions(response)
    ];

    fetch.mockResponse(JSON.stringify(response));

    await store.dispatch(getTransactions(accountName));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
