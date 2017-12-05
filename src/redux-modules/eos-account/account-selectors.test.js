//@flow
/* global describe, it, expect */
import randomize from "randomatic";
import type { EOSAccountState, KeyPair } from "./types";
import {
  selectEOSAccountName,
  selectEOSActiveKeys,
  selectEOSBalanceDifference,
  selectEOSOwnerKeys,
  selectEOSTotalBalance
} from "./account-selectors";

describe("EOS Account Selectors", () => {
  const accountName = randomize("*", 10);
  const ownerKeys: KeyPair = {
    publicKey: randomize("aA0", 64),
    privateKey: randomize("aA0", 64)
  };
  const activeKeys: KeyPair = {
    publicKey: randomize("aA0", 64),
    privateKey: randomize("aA0", 64)
  };
  const total = Math.random() * 100;
  const difference = Math.random() * 100;

  const eosState: EOSAccountState = {
    account: {
      accountName,
      ownerKeys,
      activeKeys
    },
    balance: {
      loading: false,
      total,
      difference
    }
  };
  const state = {
    eosAccount: eosState
  };

  describe("account name selector", () => {
    it("should return the account name", () => {
      const actual = selectEOSAccountName(state);

      expect(actual).toEqual(accountName);
    });
  });

  describe("owner keys selector", () => {
    it("should return the owner keys", () => {
      const actual = selectEOSOwnerKeys(state);

      expect(actual).toEqual(ownerKeys);
    });
  });

  describe("active keys selector", () => {
    it("should return the active keys", () => {
      const actual = selectEOSActiveKeys(state);

      expect(actual).toEqual(activeKeys);
    });
  });

  describe("total balance selector", () => {
    it("should return the total balance", () => {
      const actual = selectEOSTotalBalance(state);

      expect(actual).toEqual(total);
    });
  });

  describe("balance difference selector", () => {
    it("should return the difference", () => {
      const actual = selectEOSBalanceDifference(state);

      expect(actual).toEqual(difference);
    });
  });
});
