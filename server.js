/**
 * @description
 * protected API - server.js
 * This simple application demonstrates how
 * JWTs can be used to authenticate users and
 * protect API routes.
 * 
 * It allows for the creation of a user, given
 * a username and a password are provided.
 * 
 * There is a public and a private route.
 * Public route can be accessed by anyone.
 * Private route requires authentication.
 * 
 * @todo
 * Build a simple front end (bulma?)
 */


// Dependencies
const path          = require('path');
const express       = require('express');
const engines       = require('consolidate');
const bodyParser    = require('body-parser');
const logger        = require('morgan');

const app           = express();

// DB Set Up
const db_keys = require('./config/').init().db;
require('./db/mongoose')(db_keys);

// Register Middleware
app.use(logger('dev'));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/register', express.static('public'));


/**
 * Routes Registration and Configuration
 */
const api = express.Router();

require('./routes/api')(api);

// API Catalogue
app.use('/api', api);

// Wildcard route handler
app.all('*', (req, res) => {
  res.status(404).json({
    alert: 'This page doesn\'t exist'
  })
})

/** @todo pull in port number from config file */
app.listen(3000, () => console.log('Listening on port 3000'));