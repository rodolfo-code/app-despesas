require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const error = require('./middlewares/error');
const apiErrorHandler = require('./error/api-error-handler');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.status(200).send('<h1>Server is running<h1>');
});

app.use('/auth', router.users);

// app.use(error);
app.use(apiErrorHandler);

module.exports = app;
