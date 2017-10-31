/* global window */
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import api from './api';
import balance from './balance';
import login from './login';
import logout from './logout';
import refresh from './refresh';
import signup from './signup';
import transactions from './transactions';
import transfer from './transfer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const _middlewares = [
  thunk,
  balance,
  login,
  signup,
  transactions,
  transfer,
  refresh,
  api,
  // NOTE must be last in middlewares
  logout,
];

if (process.env.NODE_ENV === 'development') {
  _middlewares.push(logger);
}

export { _middlewares };

const middlewares = applyMiddleware(..._middlewares);

export default composeEnhancers(middlewares);
