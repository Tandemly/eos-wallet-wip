import { SET_NOTIFICATION, UNSET_NOTIFICATION } from "./notifications-actions";

const initialState = {
  text: "",
  status: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        text: action.text,
        status: action.status
      };
    case UNSET_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};
