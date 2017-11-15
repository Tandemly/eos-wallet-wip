//@flow
export type KeyPair = {
  publicKey?: string,
  privateKey?: string
};

export type AccountBalance = {
  total: number,
  staked?: number,
  unstaked?: number
};

export type AccountState = {
  accountName: ?string,
  ownerKeys: KeyPair,
  activeKeys: KeyPair
};

export type BalanceState = AccountBalance & {
  loading: boolean,
  difference?: number,
  symbol?: string
};

export type EOSAccountState = {
  account: AccountState,
  balance: BalanceState
};
