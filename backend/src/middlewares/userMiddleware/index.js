const validateName = require('./validateName');
const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');

const newUserMiddleware = [validateName, validateEmail, validatePassword];

module.exports = newUserMiddleware;
