const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  ten: String,
  hang: String,
  namSX: Number,
  gia: Number
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
