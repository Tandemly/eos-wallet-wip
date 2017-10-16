import { succeedLogout } from 'containers/Logout/reducer';

const logoutUser = (dispatch, history) => {
  ['id_token', 'access_token'].forEach(key => {
    localStorage.removeItem(key);
  });

  dispatch(succeedLogout());
}

const logout = store => next => (action) => {
  if (action.type === 'TRY_LOGOUT') {
    const { history } = action;

    logoutUser(store.dispatch, history);
  }

  next(action);
};

export default logout;