import type { AccountActions } from "./eos-account/account-actions";
import type { BalanceActions } from "./eos-account/balance-actions";
import type { LoginActions } from "./user/user-actions";
import type { AccountPersistActions } from "../middleware/account-persist/account-persist-actions";

export type Action =
  | AccountActions
  | BalanceActions
  | LoginActions
  | AccountPersistActions;
