/**
 * @param request
 * @param result
 * @param next 
 * 
 * @description
 * Middleware function for verifying authentication.
 * Checks authorization header for the existence 
 * of a Bearer Token - a JWT in this case.
 * If one exists, it extracts and attaches the JWT
 * to the request object and moves on.
 * If one doesn't exist, it ends the request with 403 Forbidden code,
 * thus denying un-authenticated access to the route.
 * 
 * Include this as a middleware function to any route to protect it.
 */

function verifyAuth(req, res, next) {
  // Extract Bearer Token
  const bearerHeader = req.headers['authorization'];

  // If one exists, extract JWT. Otherwise, deny access
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()
  } else {
    res.status(403).json({
      msg: 'Forbidden access; token undefined'
    })
  }
}

module.exports = verifyAuth;