import configureMockStore from "redux-mock-store";
import { push } from "react-router-redux";
import middlewares from "middleware";
import { tryPostSignup } from "redux-modules/user/signup-actions";
import { succeedPostLogin, setProfile } from "redux-modules/user/user-actions";
import { unsetNotification } from "redux-modules/notifications/notifications-actions";
import { doSignUp } from "thunks/signup";

const mockStore = configureMockStore(middlewares);

describe("doSignUp", () => {
  it("on whole signup POST success, dispatch succeedPostLogin", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: false
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
      tryPostSignup(email, password),
      unsetNotification(),
      succeedPostLogin(email, password),
      setProfile(profile),
      push("/")
    ];

    await store.dispatch(doSignUp(email, password));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
