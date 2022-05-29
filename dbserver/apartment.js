const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ApartmentSchema = new Schema({
  size: {
    type: Number,
    required: true
  },
  room: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  security: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Available'
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  collection: 'apartment'
});

module.exports = mongoose.model('apartment', ApartmentSchema)