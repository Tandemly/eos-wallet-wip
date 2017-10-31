const Joi = require("joi");
const Transaction = require("../models/transaction.model");

module.exports = {
  // GET /v1/transactions
  listTransactions: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      transaction_id: Joi.string().min(64).max(64),
      block_id: Joi.string().min(64).max(64),
    }
  }
};
