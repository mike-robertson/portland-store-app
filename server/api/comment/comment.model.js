'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  name: String,
  info: String,
  product: {type: String, ref: 'Product'}
});

module.exports = mongoose.model('Comment', CommentSchema);