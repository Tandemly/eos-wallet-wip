const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment-timezone');

/**
 * Password Reset Token Schema
 * @private
 */
const resetTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: 'String',
    ref: 'User',
    required: true,
  },
  resetUrl: {
    type: 'String',
    required: true,
  },
  expires: { type: Date },
});

resetTokenSchema.statics = {
  /**
   * Generate a reset token object and saves it into the database
   *
   * @param {User} user
   * @returns {ResetToken}
   */
  generate(user, url) {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment()
      .add(24, 'hours')
      .toDate();
    const tokenObject = new ResetToken({ token, userId, userEmail, expires, resetUrl: url });
    tokenObject.save();
    return tokenObject;
  },
};

/**
 * @typedef ResetToken
 */
const ResetToken = mongoose.model('ResetToken', resetTokenSchema);
module.exports = ResetToken;
