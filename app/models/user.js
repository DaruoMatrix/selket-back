var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address = require('./address');
var Bank_agency=require('./bank_agency');
var bcrypt = require('bcryptjs');
var findOrCreate = require('mongoose-findorcreate')
var test = new Schema({name : 'String'});

var userSchema = new Schema({
    cin:    {type: String, required:false, unique: false, default:null},
    first_name:  {type: String, required : false,default:null},
    last_name:  {type: String, required : false,default:null},
    password :{type: String, default : null},
    email: {type: String, required : true},
    phone: {type: String, default: null},
    has_bank_account : {type: Boolean, default: null},
    credit: {
      amount :{type: Number, default: null},
      credit_reason :{type: String, default: null},
      hasCredit : {type: Boolean, default: null},
      credit_amount : {type: Number, default: null}
    },
   
    job:{
      has_job: {type: Boolean, default: null},
      job_type: {type: String, default: null},
      salary:{type: Number, default: null},
      job_sector : {type: String, default: null},
      jobless_years : {type: Number, default: null}
      
    },

  
    marital_status :{
        status:{type: String, default: null},
        children_number:{type: Number, default: null},
        
    },
    material_owns : {
      owns_car : {type: Boolean, default: null},
      owns_house : {type: Boolean, default: null},
      tenant_house : {type: Boolean, default: null},
      tenant_amount:{type: Boolean, default: null}
    }

    


  })


  const User = module.exports = mongoose.model('User',userSchema);

  module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  };


  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) console.log( err);
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };

  
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) console.log( err);
      callback(null, isMatch);
    });
  };

  module.exports.getUserByEmail = function(email, callback){
    const query = {email: email}
    User.findOne(query, callback);
  };

 