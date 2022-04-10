const userService = require('../services/userService');

const ApiError = require('../error/ApiError');

const save = (req, res, next) => {
  const newUser = req.body;

  userService
    .save(newUser)
    .then((result) => {
      res.status(201).json(result[0]);
    })
    .catch((err) => {
      next(ApiError.badRequest(err.message));
    });
};

const session = (req, res, next) => {
  const { email, password } = req.body;
  userService
    .session({ email, password })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(ApiError.unauthorized(err.message)));
};

module.exports = {
  save,
  session,
};
