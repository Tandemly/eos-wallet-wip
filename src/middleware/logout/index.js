import { succeedLogout } from 'containers/Logout/reducer';

const logoutUser = (store, history) => {
  localStorage.clear();

  // TODO find out if this is correct path to redirect logout
  history.push('/login');

  store.dispatch(succeedLogout());

  // TODO network call to dispatch success logout
}

const logout = store => next => (action) => {
  if (action.type === 'TRY_LOGOUT') {
    const { history } = action;

    logoutUser(store, history);
  }

  next(action);
};

export default logout;
