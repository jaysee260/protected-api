const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
},
{
  collection: 'Users',
  versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;