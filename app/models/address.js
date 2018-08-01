

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var addressSchema = new Schema({
    street: String,
    city:  String,
    state:  String,
    zip_code: Number,
  })

  
  module.exports = mongoose.model('Address',addressSchema);