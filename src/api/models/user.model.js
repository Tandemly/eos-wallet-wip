const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { isEmpty, compact, omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const ResetToken = require('./resetToken.model');
const RefreshToken = require('./refreshToken.model');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
* User Roles
*/
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    name: {
      type: String,
      minlength: 6,
      maxlength: 128,
      index: true,
      trim: true,
    },
    // services: {
    //   facebook: String,
    //   google: String,
    // },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    picture: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, 'minutes')
        .unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    const matches = await bcrypt.compare(password, this.password);
    return matches;
  },
});

/**
 * Statics
 */
userSchema.statics = {
  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user by email address
   *
   * @param {String} email - The email address of the user.
   * @returns {Promise<User, APIError>}
   */
  async getByEmail(email) {
    const user = await this.findOne({ email }).exec();
    if (!user) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'User email not found or invalid',
      });
    }
    return user;
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email) {
      throw new APIError({
        message: 'An email is required to generate a token',
      });
    }

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && user.passwordMatches(password)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      return { user, accessToken: user.token() };
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  /**
   * Find user by email and tries to generate a password reset token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateResetToken(options) {
    const { email, url } = options;
    if (!email) {
      throw new APIError({
        message: 'An email is required to generate a password reset token',
      });
    }
    if (!url) {
      throw new APIError({
        message: 'Client must provide a url to allow changing a password for a valid email + token',
      });
    }

    const user = await this.findOne({ email }).exec();
    const existingToken = await ResetToken.findOne({ userEmail: email }).exec();
    const now = moment();
    const err = {
      message: 'Non-existant email',
      status: httpStatus.NOT_FOUND,
      isPublic: true,
    };

    if (!user) {
      throw new APIError(err);
    }

    if (existingToken) {
      if (moment(existingToken.expires).isBefore(now)) {
        // token expired, remove and continue
        const deleted = await ResetToken.findByIdAndRemove(existingToken._id).exec();
      } else {
        // Otherwise, token still in effect, can't create a new one
        err.status = httpStatus.CONFLICT;
        err.message = 'A reset token has already been created for this email';
        throw new APIError(err);
      }
    }

    // generate token and return to caller
    const token = ResetToken.generate(user, url);
    return { user, resetToken: token };
  },

  /**
   * Finds a valid matching reset token for `email` and `token`
   * and removes matching resest token and any existing refresh 
   * token still existing for this user's email.
   *
   * @param {String} email - email address of user
   * @param {String} token - password reset token
   * @returns {Promise<User[]>}
   */
  async matchAndClearAllTokens(options) {
    const { email, token } = options;
    const match = await ResetToken.findOne({ userEmail: email, token }).exec();
    if (!match) {
      throw new APIError({
        status: httpStatus.CONFLICT,
        message: 'No matching reset token found for email',
      });
    }
    // Remove existing reset token
    const deletedReset = await ResetToken.findByIdAndRemove(match._id).exec();
    const deletedRefreshes = await RefreshToken.remove({
      userEmail: email,
    }).exec();
    return {
      nRefreshRemoved: deletedRefreshes.nRemoved,
      resetRemoved: !!deletedReset,
    };
  },

  /**
   * List Users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of entities to be skipped.
   * @param {number} limit - Limit number of entities to be returned.
   * @param {Object} [sort] - Object w/ keys matching fieldnames to be sorted, values as -1 (desc), 1 (asc)
   * @param {Object} [filter] - Object matching a Mongoose query object
   * @param {Object|String} [projection] - Mongoose `select()` arg denoting fields to include or exclude
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 30, sort, filter, projection }) {
    const $match = isEmpty(filter) ? null : { $match: filter };
    const $project = projection ? { $project: projection } : null;
    const $skip = { $skip: skip };
    const $limit = { $limit: limit };
    const $sort = sort ? { $sort: sort } : null;

    const agg = compact([$match, $project, $skip, $limit, $sort]);

    return this.aggregate(agg).exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [
          {
            field: 'email',
            location: 'body',
            messages: ['"email" already exists'],
          },
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  // async oAuthLogin({ service, id, email, name, picture }) {
  //   const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
  //   if (user) {
  //     user.services[service] = id;
  //     if (!user.name) user.name = name;
  //     if (!user.picture) user.picture = picture;
  //     return user.save();
  //   }
  //   const password = uuidv4();
  //   return this.create({ services: { [service]: id }, email, password, name, picture });
  // },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
