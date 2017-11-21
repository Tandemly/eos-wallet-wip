export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const UNSET_NOTIFICATION = "UNSET_NOTIFICATION";

export function setNotification(text, status) {
  return {
    type: SET_NOTIFICATION,
    text,
    status
  };
}

export function unsetNotification() {
  return {
    type: UNSET_NOTIFICATION
  };
}
