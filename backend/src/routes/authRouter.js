const router = require('express').Router();

const controller = require('../controllers/authController');
const newUserMiddleware = require('../middlewares/userMiddleware');
const validateEmail = require('../middlewares/userMiddleware/validateEmail');
const validatePassword = require('../middlewares/userMiddleware/validatePassword');

router.post('/signup', newUserMiddleware, controller.save);

router.post('/signin', validateEmail, validatePassword, controller.session);

module.exports = router;
