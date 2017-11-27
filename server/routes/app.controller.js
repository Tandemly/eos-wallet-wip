const httpStatus = require("http-status");
const Profile = require("../models/profiles.model");
const moment = require("moment-timezone");
const APIError = require("../APIError");

/**
 * Returns success if able to create new user
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const profile = await new Profile(req.body).save();
    res.status(httpStatus.CREATED);
    return res.json(profile.transform());
  } catch (error) {
    console.log("-> error:", error);
    return next(Profile.checkDuplicateEmail(error));
  }
};

/**
 * Returns valid profile if email/password match
 * existing user
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const profile = await Profile.findAndValidate(req.body);
    res.status(httpStatus.CREATED);
    return res.json(profile.transform());
  } catch (error) {
    return next(Profile.checkDuplicateEmail(error));
  }
};
