import {
  setEOSAccountName,
  setEOSOwnerKeys,
  setEOSActiveKeys
} from "redux-modules/eos-account/account-actions";
import ecc from "eosjs-ecc";
import type { KeyPair } from "../redux-modules/eos-account/types";
import { setNotification } from "../redux-modules/notifications/notifications-actions";

export const addEOSAccount = (
  accountName,
  ownerKey,
  activeKey
) => async dispatch => {
  let ownerKeys: KeyPair;
  let activeKeys: KeyPair;

  try {
    activeKeys = {
      publicKey: ecc.privateToPublic(activeKey),
      privateKey: activeKey
    };
  } catch (error) {
    dispatch(setNotification("Invalid Active Key (Private)", "error"));
    return;
  }

  try {
    ownerKeys = {
      publicKey: ecc.privateToPublic(ownerKey),
      privateKey: ownerKey
    };
  } catch (error) {
    dispatch(setNotification("Invalid Owner Key (Private)", "error"));
    return;
  }

  dispatch(setEOSAccountName(accountName));
  dispatch(setEOSActiveKeys(activeKeys));
  dispatch(setEOSOwnerKeys(ownerKeys));
};
