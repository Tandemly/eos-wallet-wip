import configureMockStore from "redux-mock-store";
import middlewares from "middleware";
import { connectEosAccount } from "thunks/connect-eos-accounts";
import {
  tryPostEOSAccount,
  succeedPostEOSAccount
} from "redux-modules/eos-signup/actions";

const mockStore = configureMockStore(middlewares);

describe("connectEosAccount", () => {
  it("on successful network call, dispatches succeedPostEOSAccount action", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: true,
        user: {
          id_token:
            "59d2aed2c8c5ac5f75bd3a719b65e75f06b4b88694655cad4cd3b540e6a3af51",
          access_token:
            "a0ec89756e2b765151e59e7ee1646d1a89d7a0ec5e68bba7bffbaaf0f9ab5c68qq"
        }
      },
      user: []
    });

    const accountName = "inita";
    const ownerKey = "abcdefghijklmnop";
    const activeKey = "wafefewfavbrfr";

    fetch.mockResponse("", { status: 200 });

    const expectedActions = [
      tryPostEOSAccount({
        account_name: accountName,
        owner_key: ownerKey,
        active_key: activeKey
      }),
      succeedPostEOSAccount()
    ];

    await store.dispatch(connectEosAccount(accountName, ownerKey, activeKey));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
