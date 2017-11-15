//@flow
/* global describe, it, expect */
import randomize from "randomatic";
import reducer, {
  initialState as reducerInitialState
} from "./account-reducer";
import type { AccountState, KeyPair } from "./types";
import {
  setEOSAccountName,
  setEOSActiveKeys,
  setEOSOwnerKeys
} from "./account-actions";

describe("EOS Account Reducer", () => {
  it("should return the initial state if no state is provided", () => {
    const actualState = reducer(undefined, { type: "JUNK_ACTION" }); //$FlowFixMe

    expect(actualState).toEqual(reducerInitialState);
  });

  it("should update the account name when the set account name action is received", () => {
    const initialState: AccountState = {
      accountName: randomize("*", 10),
      activeKeys: {},
      ownerKeys: {}
    };

    const accountName = randomize("*", 15);

    const expectedState: AccountState = {
      ...initialState,
      accountName
    };

    const actualState: AccountState = reducer(
      initialState,
      setEOSAccountName(accountName)
    );

    expect(actualState).toEqual(expectedState);
  });

  it("should update the active keys when the set active keys action is received", () => {
    const initialState: AccountState = {
      accountName: null,
      activeKeys: {
        publicKey: randomize("*", 32),
        privateKey: randomize("*", 32)
      },
      ownerKeys: {}
    };

    const keys: KeyPair = {
      publicKey: randomize("*", 64),
      privateKey: randomize("*", 64)
    };

    const expectedState: AccountState = {
      ...initialState,
      activeKeys: {
        ...keys
      }
    };

    const actualState: AccountState = reducer(
      initialState,
      setEOSActiveKeys(keys)
    );

    expect(actualState).toEqual(expectedState);
  });

  it("should update the owner keys when the set owner keys action is received", () => {
    const initialState: AccountState = {
      accountName: null,
      activeKeys: {},
      ownerKeys: {
        publicKey: randomize("*", 32),
        privateKey: randomize("*", 32)
      }
    };

    const keys: KeyPair = {
      publicKey: randomize("*", 64),
      privateKey: randomize("*", 64)
    };

    const expectedState: AccountState = {
      ...initialState,
      ownerKeys: {
        ...keys
      }
    };

    const actualState: AccountState = reducer(
      initialState,
      setEOSOwnerKeys(keys)
    );

    expect(actualState).toEqual(expectedState);
  });
});
