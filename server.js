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
const express       = require('express');
const bodyParser    = require('body-parser');

const app           = express();

// DB Set Up
const db_keys = require('./config/').init().db;
require('./db/mongoose')(db_keys);

// Register Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

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