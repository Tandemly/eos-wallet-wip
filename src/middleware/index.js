/* global window */
import thunk from "redux-thunk";
import logger from "redux-logger";
import accountPersist from "./account-persist";
import api from "./api";
import refresh from "./refresh";

const middlewares =
  process.env.NODE_ENV === "test"
    ? [thunk, refresh, api]
    : [thunk, accountPersist, refresh, api];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export default middlewares;
