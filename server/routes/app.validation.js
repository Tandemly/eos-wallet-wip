const Joi = require("joi");

module.exports = {
  // POST /app/register
  register: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
      display_name: Joi.string(),
      about: Joi.string(),
      location: Joi.string(),
      website: Joi.string(),
      image_url: Joi.string(),
      phone: Joi.string()
    }
  },

  // POST /app/login
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128)
    }
  }
};
