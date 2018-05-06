/**
 * @description
 * User routes
 */

const bodyParser    = require('body-parser');

const register      = require('express').Router();
const login         = require('express').Router();

// Bring in route modules
require('./user/register')(register);
require('./user/login')(login);

// Register routes
const user = (router) => {
  router.use(bodyParser.json());
  // /api/user/join
  router.use('/register', register);
  // /api/user/login
  router.use('/login', login);
}

module.exports = user;