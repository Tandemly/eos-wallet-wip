const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { isEmpty, omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

/**
 * EOS Account Schema
 * @private
 */
const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      match: /^[.12345a-z]+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 13,
    },
    abi: mongoose.Schema.Types.Mixed,
    eos_balance: {
      type: String,
      required: true,
      trim: true,
    },
    staked_balance: {
      type: String,
      required: true,
      trim: true,
    },
    unstaking_balance: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Accounts',
  },
);

/**
 * Methods
 */
accountSchema.method({
  transform() {
    const transformed = {};
    // TODO: figure out how we want to handle ABI sub-docs
    const fields = [
      'id',
      'name',
      'eos_balance',
      'staked_balance',
      'unstaking_balance',
      'abi',
      'createdAt',
    ];

    fields.forEach((field) => {
      if (this[field]) {
        if (/balance$/i.test(field)) {
          transformed[field] = parseFloat(this[field]);
        } else {
          transformed[field] = this[field];
        }
      }
    });

    return transformed;
  },
});

accountSchema.statics = {
  /**
   * Get account by name
   *
   * @param {String} name - The name of the EOS account.
   * @returns {Promise<Account, APIError>}
   */
  async get(name, { projection = {} }) {
    let account = this.findOne({ name });

    if (!isEmpty(projection)) {
      account = account.select(projection);
    }
    account = await account.exec();

    if (!account) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'EOS account not found or invalid',
      });
    }
    return account;
  },
  /**
   * List Accounts in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of entities to be skipped.
   * @param {number} limit - Limit number of entities to be returned.
   * @param {Object} [sort] - Object w/ keys matching fieldnames to be sorted, values as -1 (desc), 1 (asc)
   * @param {Object} [filter] - Object matching a Mongoose query object
   * @param {Object|String} [projection] - Mongoose `select()` arg denoting fields to include or exclude
   * @returns {Promise<Block[]>}
   */
  list({ skip = 0, limit = 30, sort, filter, projection }) {
    return this.find(filter)
      .sort(sort || { createdAt: -1 })
      .select(projection)
      .skip(skip)
      .limit(limit)
      .exec();
  },
};

/**
 * @typedef Account
 */
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
