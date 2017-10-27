import { succeedLogout } from 'containers/Logout/reducer';

const logoutUser = (store, history) => {
  localStorage.clear();

  history.push('/signup');

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
