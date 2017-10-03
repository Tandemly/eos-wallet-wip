import { createStore, compose } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import middlewares from "./middleware";
// import { reducers } from "./containers";

function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        (state = {}, action) => state,
        undefined,
        compose(autoRehydrate(), middlewares)
      );

      persistStore(store, {}, () => resolve(store));
    } catch (e) {
      reject(e);
    }
  });
}

export default configureStore;
