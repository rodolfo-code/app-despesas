const ApiError = require('../../error/ApiError');

module.exports = (req, res, next) => {
  const name = req.body.name;

  if (!name) next(ApiError.badRequest('Campo nome é obrigatório'));

  next();
};
