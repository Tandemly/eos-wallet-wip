import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { reducer as reduxFormReducer } from "redux-form";
import { routerMiddleware } from "react-router-redux";
import { routerReducer } from "react-router-redux";
import accountReducer from "redux-modules/eos-account";
import { reducer as app } from "containers/App/reducer";
import { reducer as login } from "redux-modules/login/reducer";
import { reducer as notification } from "redux-modules/notifications/reducer";
import { reducer as transactions } from "redux-modules/transactions/reducer";
import { reducer as users } from "redux-modules/users/reducer";
import { createMemoryHistory } from "history";
import middlewares from "middleware";

const reducers = combineReducers({
  app,
  'eos-account': accountReducer,
  form: reduxFormReducer,
  login,
  notification,
  transactions,
  users,
  routing: routerReducer
});

function configureStoreAsync(history) {
  /* eslint-disable-next-line no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares, routerMiddleware(history))
  );

  return new Promise((resolve, reject) => {
    try {
      const store = createStore(reducers, compose(autoRehydrate(), enhancers));

      persistStore(store, {}, () => resolve(store));
    } catch (e) {
      reject(e);
    }
  });
}

// NOTE sans rehydrate / local storage
function configureStore(preloadState) {
  const history = createMemoryHistory();

  return createStore(
    reducers,
    preloadState,
    compose(applyMiddleware(...middlewares, routerMiddleware(history)))
  );
}

export { configureStoreAsync, configureStore };
