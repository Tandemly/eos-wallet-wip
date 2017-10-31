const httpStatus = require('http-status');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const ResetToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const { mail } = require('../utils/email');

/**
* Returns a formated object with tokens
* @private
*/
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return { tokenType, accessToken, refreshToken, expiresIn };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const user = await new User(req.body).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns success with a valid, existing email and sends
 * reset email to the identified user. It also generates a
 * reset token that expires in 24 hours.
 * @public
 */
exports.passwordReset = async (req, res, next) => {
  try {
    const { email, url } = req.body;
    const { user, resetToken } = await User.findAndGenerateResetToken(req.body);
    // Send reset email to `email` directing them to `url?token=resetToken.token`
    mail({
      to: email,
      subject: '[API] Password Reset Requested',
      message: `
        <h3>Reset your API password?</h3>
        <p>
          If you requested a password reset for ${email}, click the link below. If you
          didn't make this request, ignore this email.
        </p>
        <a href="${url}?token=${resetToken.token}">Reset Password</a> 
      `,
    });
    const userTransformed = user.transform();
    return res.json({
      user: userTransformed,
      message: `Password reset mail sent to ${user.email}`,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns success with a valid, existing email + token 
 * and removes any existing refresh (jwt) and reset tokens
 * for the user identified by the email.
 * @public
 */
exports.passwordResetChange = async (req, res, next) => {
  try {
    // All fields preset and password/confirm match by here
    const { email, password, confirm, token } = req.body;
    // Ensure user is valid
    const user = await User.getByEmail(email);
    // Find a matching reset token and clear out tokens
    const valid = await User.matchAndClearAllTokens({ email, token });
    // Update password for user
    user.password = password;
    user.save();

    const userTransformed = user.transform();
    return res.json({
      user: userTransformed,
      message: `Password for user ${user.email} reset`,
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
// exports.oAuth = async (req, res, next) => {
//   try {
//     const { user } = req;
//     const accessToken = user.token();
//     const token = generateTokenResponse(user, accessToken);
//     const userTransformed = user.transform();
//     return res.json({ token, user: userTransformed });
//   } catch (error) {
//     return next(error);
//   }
// };

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
