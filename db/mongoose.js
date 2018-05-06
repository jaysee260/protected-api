const mongoose = require('mongoose');

module.exports = (keys) => {
  // Set up mongoose promises
  mongoose.Promise = global.Promise;

  // Construct db uri
  const uri = keys.uri + keys.name;
  mongoose.connect(uri);

  // Create db connection reference
  const db = mongoose.connection;

  // Set up DB event listeners
  db.on('error', function() {
    console.error('db connection error...');
  });
  db.once('open', function() {
    console.log('Connected to local mongodb');
  });

}