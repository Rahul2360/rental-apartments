const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  id: {
    type: Number
  },
}, {
  collection: 'user'
});

module.exports = mongoose.model('user', UserSchema);