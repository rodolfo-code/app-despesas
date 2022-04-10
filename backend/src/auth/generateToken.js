const jwt = require('jsonwebtoken');

module.exports = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, process.env.APP_SECRET, jwtConfig);
};
