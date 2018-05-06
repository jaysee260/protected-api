/**
 * Entry config file
 */

exports.port = process.env.PORT || 3000;
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`;
exports.init = () => require('./config.json');