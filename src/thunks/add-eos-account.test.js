//@flow
/* global describe, it, expect */
import configureMockStore from "redux-mock-store";
import ecc from "eosjs-ecc";
import randomize from "randomatic";
import middlewares from "../middleware";
import { addEOSAccount } from "thunks/add-eos-account";
import { setNotification } from "../redux-modules/notifications/notifications-actions";
import {
  setEOSAccountName,
  setEOSActiveKeys,
  setEOSOwnerKeys
} from "../redux-modules/eos-account/account-actions";

const mockStore = configureMockStore(middlewares);

describe("addEOSAccount", () => {
  it("should dispatch appropriate error action if the provided active key is invalid", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: true
      },
      "eos-account": {
        account: {}
      }
    });

    const accountName = randomize("aA0", 10);
    const ownerKey = ecc.randomKey();
    const activeKey = randomize("aA0", 64);

    const expectedActions = [
      setNotification("Invalid Active Key (Private)", "error")
    ];

    await store.dispatch(addEOSAccount(accountName, ownerKey, activeKey));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should dispatch appropriate error action if the provided owner key is invalid", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: true
      },
      "eos-account": {
        account: {}
      }
    });

    const accountName = randomize("aA0", 10);
    const ownerKey = randomize("aA0", 64);
    const activeKey = ecc.randomKey();

    const expectedActions = [
      setNotification("Invalid Owner Key (Private)", "error")
    ];

    await store.dispatch(addEOSAccount(accountName, ownerKey, activeKey));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should dispatch appropriate actions if both keys are valid", async () => {
    const store = mockStore({
      login: {
        isAuthenticated: true
      },
      "eos-account": {
        account: {}
      }
    });

    const accountName = randomize("aA0", 10);
    const ownerKey = ecc.randomKey();
    const activeKey = ecc.randomKey();

    const expectedActions = [
      setEOSAccountName(accountName),
      setEOSActiveKeys({
        publicKey: ecc.privateToPublic(activeKey),
        privateKey: activeKey
      }),
      setEOSOwnerKeys({
        publicKey: ecc.privateToPublic(ownerKey),
        privateKey: ownerKey
      })
    ];

    await store.dispatch(addEOSAccount(accountName, ownerKey, activeKey));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
