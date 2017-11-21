//@flow
export const TRY_POST_SIGNUP = "TRY_POST_SIGNUP";
export const FAIL_POST_SIGNUP = "FAIL_POST_SIGNUP";

export function failPostSignup(error: string) {
  return {
    type: FAIL_POST_SIGNUP,
    form: "sign-up",
    error
  };
}

export function tryPostSignup(email: string, password: string) {
  return {
    type: TRY_POST_SIGNUP,
    email,
    password
  };
}
