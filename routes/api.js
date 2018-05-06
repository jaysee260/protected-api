/**
 * @description
 * Entry point to all available routes
 * 
 * /api/user/register   [creates new user]
 * /api/user/login      [assign token to user]
 * /api/public          [does not require authentication]
 * /api/private         [requires authentication]
 * 
 */

// Dependencies
const express       = require('express');
const bodyParser    = require('body-parser');

// Create Routes instances
const user          = express.Router();
const public        = express.Router();
const private       = express.Router();

// Bring in route modules
require('./user')(user);
require('./public')(public);
require('./private')(private);

// Register routes
const api = (router) => {
  router.use(bodyParser.json());

  // /api/user
  router.use('/user', user);
  // /api/public
  router.use('/public', public);
  // /api/private
  router.use('/private', private);
}

module.exports = api;