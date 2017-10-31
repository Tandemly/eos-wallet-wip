const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
    },
  },

  // POST /v1/auth/login
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .max(128),
    },
  },

  // POST /v1/auth/password/reset
  passwordReset: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      url: Joi.string()
        // .uri()
        .trim()
        .required(),
    },
  },

  passwordResetChange: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .max(128),
      confirm: Joi.string()
        .required()
        .max(128)
        .valid(Joi.ref('password'))
        .options({
          language: {
            any: {
              allowOnly: 'Passwords do not match',
            },
          },
        }),
      token: Joi.string().required(),
    },
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required(),
    },
  },
};
