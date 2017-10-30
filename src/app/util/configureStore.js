import { createStore, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as account } from 'containers/Balance/reducer';
import { reducer as app } from 'containers/App/reducer';
import { reducer as login } from 'containers/Login/reducer';
import { reducer as notification } from 'containers/Notifications/reducer';
import { reducer as transactions } from 'containers/Transactions/reducer';
import { reducer as users } from 'containers/Users/reducer';
import middlewares from "middleware";


const reducers = combineReducers({
  app,
  account,
  form: reduxFormReducer,
  login,
  notification,
  transactions,
  users,
});

function configureStoreAsync() {
  return new Promise((resolve, reject) => {
    try {
      const store = 
        createStore(
          reducers,
          undefined,
          compose(
            autoRehydrate(),
            middlewares
          ),
        );

      persistStore(
        store,
        { },
        () => resolve(store)
      );
    } catch (e) {
      reject(e);
    }
  });
}

// NOTE sans rehydrate / local storage
function configureStore(preloadState) {
  return createStore(
    reducers,
    preloadState,
    middlewares,
  );
}

export {
  configureStoreAsync,
  configureStore
};
