const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const { httpErrorHandler } = require('./error-handler');
const { configureRouting } = require('./routing-config');

// App initialization
const app = express();

// Base configuration
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Register route
httpErrorHandler(app);
configureRouting(app);

module.exports = http.createServer(app);