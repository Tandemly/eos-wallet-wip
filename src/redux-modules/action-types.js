import type { AccountActions } from "./eos-account/account-actions";
import type { BalanceActions } from "./eos-account/balance-actions";
import type { ConnectEosAccountActions } from "./eos-account/account-actions";

export type Action = AccountActions | BalanceActions | ConnectEosAccountActions | LoginActions;
