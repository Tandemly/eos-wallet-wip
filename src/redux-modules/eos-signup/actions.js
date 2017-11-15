export const TRY_POST_EOS_ACCOUNT = "TRY_POST_EOS_ACCOUNT";
export const SUCCESS_POST_EOS_ACCOUNT = "SUCCESS_POST_EOS_ACCOUNT";
export const FAIL_POST_EOS_ACCOUNT = "FAIL_POST_EOS_ACCOUNT";

type ConnectEosAccountTryType = {
  type: "TRY_POST_EOS_ACCOUNT",
  accountName: string,
  ownerKey: string,
  activeKey: string
};

type ConnectEosAccountSuccessType = {
  type: "SUCCESS_POST_EOS_ACCOUNT"
};

type ConnectEosAccountFailureType = {
  type: "FAIL_POST_EOS_ACCOUNT",
  error: any
};

export type ConnectEosAccountActions =
  | ConnectEosAccountTryType
  | ConnectEosAccountSuccessType
  | ConnectEosAccountFailureType;

export const tryPostEOSAccount = (
  accountName: string,
  ownerKey: string,
  activeKey: string
): ConnectEosAccountTryType => ({
  type: TRY_POST_EOS_ACCOUNT,
  accountName,
  ownerKey,
  activeKey
});

export const succeedPostEOSAccount = (): ConnectEosAccountSuccessType => ({
  type: SUCCESS_POST_EOS_ACCOUNT
});

export function failPostEOSAccount(error: any): ConnectEosAccountFailureType {
  return {
    type: FAIL_POST_EOS_ACCOUNT,
    error
  };
}