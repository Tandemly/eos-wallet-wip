//@flow
import {
  tryPostSignup,
  failPostSignup
} from "redux-modules/user/signup-actions";
import { succeedPostLogin, setProfile } from "redux-modules/user/user-actions";
import { appRequest } from "util/fetchUtil";
import type { Dispatch } from "redux";
import type { UserProfile } from "types/UserProfile";
import camelcaseObject from "camelcase-object";
import { push } from "react-router-redux";
import type { Action } from "../redux-modules/action-types";

export const doSignUp = (
  email: string,
  password: string
) => /* prettier-ignore */ async (dispatch: Dispatch<Action>) => {
  dispatch(tryPostSignup(email, password));
  try {
    const response = await appRequest("/app/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const profile: UserProfile = (camelcaseObject(response): UserProfile);
    dispatch(succeedPostLogin(email, password));
    dispatch(setProfile(profile));
    dispatch(push("/"));
  } catch (error) {
    dispatch(failPostSignup(error));
  }
};
