//@flow
export const REHYDRATE_ACCOUNTS = "REHYDRATE_ACCOUNTS";
export const DEHYDRATE_ACCOUNTS = "DEHYDRATE_ACCOUNTS";

type RehydrateAccounts = {
  type: "REHYDRATE_ACCOUNTS"
};

type DehydrateAccounts = {
  type: "DEHYDRATE_ACCOUNTS"
};

export type AccountPersistActions = RehydrateAccounts | DehydrateAccounts;

export const rehydrateAccounts = (): RehydrateAccounts => ({
  type: REHYDRATE_ACCOUNTS
});

export const dehydrateAccounts = (): DehydrateAccounts => ({
  type: DEHYDRATE_ACCOUNTS
});
