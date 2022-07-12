const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { httpErrorHandler } = require('./error-handler');
const { configureRouting } = require('./routing-config');

const app = express();

// Base configuration
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

httpErrorHandler(app);
configureRouting(app);

module.exports = app;