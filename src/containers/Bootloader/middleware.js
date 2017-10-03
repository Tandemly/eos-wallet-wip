/* global window */
import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = applyMiddleware(logger, thunk);

export default composeEnhancers(middlewares);
