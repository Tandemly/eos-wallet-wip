const SET_NOTIFICATION = 'SET_NOTIFICATION';
const UNSET_NOTIFICATION = 'UNSET_NOTIFICATION';

const initialState = {
  notification: {
    text: '',
    status: '',
  },
};

export function reducer(state = initialState, action) {
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
}

export function setNotification({ text, status }) {
  return {
    type: SET_NOTIFICATION,
    text,
    status,
  };
}

export function unsetNotification() {
  return {
    type: UNSET_NOTIFICATION,
  };
}
