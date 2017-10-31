const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  axios: {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    url: '/v1/'
  },
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  mail: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'imqoag3vwp5pnzx7@ethereal.email',
      pass: 'E8nFghPzFh5jbyMFS6',
    },
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
