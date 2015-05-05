'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  user: String,
  amount: Number,
  description: String
});


module.exports = mongoose.model('Payment', PaymentSchema);