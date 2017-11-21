import {
  FAIL_LOGIN,
  LOGOUT,
  SUCCEED_LOGIN,
  TRY_LOGIN, SET_USER_PROFILE
} from "./user-actions";
import type { UserProfile } from "../../types/UserProfile";
import md5 from "nano-md5";

type StateShape = {
  profile: UserProfile,
  hash: ?string,
  isFetching: boolean,
  isAuthenticated: boolean
};

const initialState: StateShape = {
  profile: {
    email: ""
  },
  hash: null,
  isFetching: false,
  isAuthenticated: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FAIL_LOGIN:
      return {
        ...state,
        profile: {
          email: ""
        },
        hash: null,
        isFetching: false,
        error: action.error
      };
    case SUCCEED_LOGIN:
      return {
        ...state,
        profile: {
          email: action.email
        },
        hash: md5(action.password),
        isFetching: false,
        isAuthenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        profile: {
          email: ""
        },
        hash: null,
        isFetching: false,
        isAuthenticated: false
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case TRY_LOGIN:
      return {
        ...state,
        isFetching: true
      };
    default:
      return state;
  }
};
