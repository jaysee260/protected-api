/**
 * @description
 * User Registration Router
 * Checks to ensure neither username or password are blank.
 * If one is missing, user is notified.
 * If both are provided, password is hashed and new user is created.
 * If a user with same username already exists, new user IS NOT
 *  created and user gets notified
 */

const User          = require("../../db/schemas/User");
const bcrypt        = require("bcrypt");
const saltRounds    = 10;

const register = router => {
  router.post('/', (req, res, next) => {
    // Catch username and password
    let { username, password } = req.body;
    username.trim(), password.trim();

    // Ensure neither username or password are empty
    if (username === "" || password === "") {
      res.status(403).json({
        alert: "username and password are required"
      });
    } else {
      // Hash password
      bcrypt.hash(password, saltRounds, (error, hash) => {
        let user = { username, password: hash };

        // Create user using hashed password
        User.create(user)
          .then(userDoc => {
            res.status(200).json({
              msg: "User created"
            });
          })
          .catch(err => {
            // If error creating user, possibly already exists
            res.status(404).json({
              msg: "Error creating user; may already exist"
            });
          });
      });
    }
  });
};

module.exports = register;
