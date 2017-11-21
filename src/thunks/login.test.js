/* global describe, it, expect */
import configureMockStore from "redux-mock-store";
import { push } from "react-router-redux";
import middlewares from "../middleware";
import {
  tryPostLogin,
  succeedPostLogin,
  setProfile
} from "../redux-modules/user/user-actions";
import { unsetNotification } from "../redux-modules/notifications/notifications-actions";
import { doLogin } from "./login";
import { rehydrateAccounts } from "../middleware/account-persist/account-persist-actions";

const mockStore = configureMockStore(middlewares);

describe("doLogin", () => {
  it("on login success, dispatch succeedPostLogin", async () => {
    const store = mockStore({
      user: {
        isAuthenticated: false
      },
      eosAccount: {
        account: {
          accountName: "testeos"
        }
      }
    });

    const email = "test@eafe.com";
    const password = "xyz20171424";

    const profile = {
      email
    };

    fetch.mockResponse(JSON.stringify(profile), {
      status: 200,
      headers: {
        "content-type": "application/json"
      }
    });

    const expectedActions = [
      tryPostLogin(email, password),
      unsetNotification(),
      succeedPostLogin(email, password),
      setProfile(profile),
      push("/"),
      rehydrateAccounts()
    ];

    await store.dispatch(doLogin(email, password));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
