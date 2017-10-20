const nJwt = require('njwt');
const secureRandom = require('secure-random');

module.exports = (req, res, next) => {
  const { body } = req;

  console.log(body, res);

  const claims = {
    iss: "http://localhost:4400/",
    ...body,
  };

  const signingKey = secureRandom(256, { type: 'Buffer' });
  const jwt = nJwt.create(claims, signingKey);

  // res.header('X-Hello', 'World')
  console.log('hello!', jwt);
  next()
}