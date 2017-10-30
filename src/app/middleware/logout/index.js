import { succeedLogout } from 'containers/Logout/reducer';

const logoutUser = (store, history) => {
  ['id_token', 'access_token'].forEach(key => {
    localStorage.removeItem(key);
  });

  // TODO preserve some values
  localStorage.clear();

  // TODO find out if this is correct path to redirect logout
  history.push('/signup');

  store.dispatch(succeedLogout());
}

const logout = store => next => (action) => {
  if (action.type === 'TRY_LOGOUT') {
    const { history } = action;

    logoutUser(store, history);
  }

  next(action);
};

export default logout;
