const Joi = require("joi");
const Account = require("../models/account.model");

module.exports = {
  // GET /v1/accounts
  listAccounts: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      eos_balance: Joi.number(),
      staked_balance: Joi.number(),
      unstaking_balance: Joi.number()
    }
  }
};
