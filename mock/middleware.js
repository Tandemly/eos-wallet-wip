const nJwt = require('njwt');
const secureRandom = require('secure-random');

module.exports = (req, res, next) => {
  console.log(req.path, `\n\n`, req)

  if (/user$/.test(req.path)) {
    const { body } = req;
    const claims = {
      iss: "http://localhost:4400/",
      tokenType: '',
      accessToken: '',
      refreshToken: '',
      expiresIn: '',
      id: '',
      name: '',
      email: '',
      role: '',
      createdAt: '',
    };  
    const signingKey = secureRandom(256, { type: 'Buffer' });
    const jwt = nJwt.create(claims, signingKey);

    console.log(jwt)

    //console.log('hello!', req.headers);
  }

  next()
}