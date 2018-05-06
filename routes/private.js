/**
 * @description
 * Private route - only logged in users can access
 */

// Dependencies
const jwt               = require('jsonwebtoken');

// Helper methods and keys
const verifyAuth        = require('./helpers/verifyAuth');
const { secret_key }    = require('../config').init();


const private = router => {
  router.get('/', verifyAuth, (req, res, next) => {
    // Extract token from request (set there by middleware function)
    let { token } = req;

    // Verify token validity
    jwt.verify(token, secret_key, (err, data) => {
      if (err)
        res.status(403).json({ msg: 'Forbidden access; invalid token'});
      else {
        res.json({
          msg: 'This is a protected route; you need to be authenticated to access it',
          data
        });
      }
    })
  });
}

module.exports = private;