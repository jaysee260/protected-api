/**
 * @description
 * Login Route
 * User is searched by username in database.
 * If found, password is hashed and compared to stored hash.
 * If password matches, token is generated and returned.
 * If password doesn't match, user is notified.
 * If user is not found, user is notified no matches were found.
 */

// Dependencies & keys
const User              = require("../../db/schemas/User");
const jwt               = require('jsonwebtoken');
const bcrypt            = require('bcrypt');
const { secret_key }    = require('../../config').init();

const login = router => {
  router.post('/', (req, res, next) => {
    // Capture username and password
    let { username, password } = req.body;

    // Look for user in db and verify password.
    // If user not found or if password doesn't match, deny access.
    // If user found and passwords match, generate JWT and return
    /**
     * @todo verifyUser | userExists could be a method
     * @param username
     * @param password
     * @returns boolean
     * 
     * @todo generateJTW could be a method. if user exists, generate JWT
     * @param user_id
     * @param username
     * @param secret_key
     * @returns JWT or null
     */
    User.findOne({ username })
      .then(user => {
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (isMatch) {
            let token = jwt.sign(
              { id: user._id, username: user.username },
              secret_key,
              // { expiresIn: # } time in seconds
            );
            res.status(200).json({ token });
          } else {
            res.status(403).json({ msg: 'Incorrect password' });
          }
        });
      })
      .catch(err => {
        res.json({
          msg: 'User not found'
        });
      });
  });
};

module.exports = login;
