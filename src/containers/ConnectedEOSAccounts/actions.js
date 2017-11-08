const TRY_POST_EOS_ACCOUNT = 'TRY_POST_EOS_ACCOUNT';
const SUCCESS_POST_EOS_ACCOUNT = 'SUCCESS_POST_EOS_ACCOUNT';
const FAIL_POST_EOS_ACCOUNT = 'FAIL_POST_EOS_ACCOUNT';

export function failPostEOSAccount({ error }) {
  return {
    type: FAIL_POST_EOS_ACCOUNT,
    error,
  };
}

export function succeedPostEOSAccount() {
  return {
    type: SUCCESS_POST_EOS_ACCOUNT,
  };
}

export function tryPostEOSAccount({ account_name, owner_key, active_key }) {
  return {
    type: TRY_POST_EOS_ACCOUNT,
    account_name,
    owner_key,
    active_key,
  };
}
