var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bankSchema = new Schema({
    name:    String,
    number_agencies:  Number,
    email: String,
  })

  module.exports = mongoose.model('Bank',bankSchema); 