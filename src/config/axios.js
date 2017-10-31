const axios = require('axios');
const config = require('./vars');

module.exports = axios.create(config.axios);