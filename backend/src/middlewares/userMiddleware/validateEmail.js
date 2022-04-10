const ApiError = require('../../error/ApiError');

const validEmailRegex = (email) => {
  const reg = new RegExp(
    /^[a-zA-Z0-9]+(?:[_.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[_.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,3}$/,
  );
  return reg.test(email);
};

module.exports = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    next(ApiError.badRequest('O campo "email" é obrigatório'));
  }

  if (!validEmailRegex(email)) {
    next(ApiError.badRequest('O campo "email" deve conter um email válido'));
  }

  next();
};
