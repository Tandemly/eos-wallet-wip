import camelcaseObject from "camelcase-object";
import {
  succeedGetTransactions,
  failGetTransactions
} from "redux-modules/transactions/transactions-actions";
import { apiRequest } from "../util/fetchUtil";
import { tryGetTransactions } from "../redux-modules/transactions/transactions-actions";

export const getTransactions = accountName => async dispatch => {
  dispatch(tryGetTransactions(accountName));
  try {
    const response = await apiRequest("/v1/transactions?sort=-sequence_num&limit=100&filter={\"scope.1\": { \"$exists\": true }}");
    const transactions = response
      ? response.map(transaction => camelcaseObject(transaction))
      : [];
    dispatch(succeedGetTransactions(transactions));
  } catch (error) {
    dispatch(failGetTransactions(error));
  }
};
