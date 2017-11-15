//@flow
import type { KeyPair } from "./types";

export const SET_EOS_ACCOUNT_NAME = "SET_EOS_ACCOUNT_NAME";
export const SET_EOS_OWNER_KEYS = "SET_EOS_OWNER_KEYS";
export const SET_EOS_ACTIVE_KEYS = "SET_EOS_ACTIVE_KEYS";

type SetEOSAccountName = {
  type: "SET_EOS_ACCOUNT_NAME",
  accountName: string
};

type SetEOSOwnerKeys = {
  type: "SET_EOS_OWNER_KEYS",
  keys: KeyPair
};

type SetEOSActiveKeys = {
  type: "SET_EOS_ACTIVE_KEYS",
  keys: KeyPair
};

export type AccountActions =
  | SetEOSAccountName
  | SetEOSOwnerKeys
  | SetEOSActiveKeys;

export const setEOSAccountName = (accountName: string): SetEOSAccountName => ({
  type: SET_EOS_ACCOUNT_NAME,
  accountName
});

export const setEOSOwnerKeys = (keys: KeyPair): SetEOSOwnerKeys => ({
  type: SET_EOS_OWNER_KEYS,
  keys
});

export const setEOSActiveKeys = (keys: KeyPair): SetEOSActiveKeys => ({
  type: SET_EOS_ACTIVE_KEYS,
  keys
});
