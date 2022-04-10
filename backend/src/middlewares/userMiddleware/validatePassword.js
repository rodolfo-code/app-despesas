const ApiError = require('../../error/ApiError');

module.exports = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    next(ApiError.badRequest('O campo "password" é obrigatório'));
  }

  if (password.length < 6) {
    next(
      ApiError.badRequest('O campo "password" deve ter no mínimo 6 caracteres'),
    );
  }

  next();
};
