var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../app/config/database');


/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('user', { user: req.user });
});

/* GET banks listing. */
router.get('/all'/*,passport.authenticate('jwt', {session:false}) */, function(req, res, next) {

  User.find({}, function (err, users) {

    if (err){
      res.send(err)
    }
  else{
    res.send(users);
  }
});
 
});


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({

      cin:req.body.cin,
      first_name:req.body.first_name,
      last_name:  req.body.last_name,
      password:req.body.password,
      email:  req.body.email,
      phone:  req.body.phone,
      has_bank_account :req.body.has_bank_account,
      credit: {
        amount : req.body.credit.amount,
        credit_reason : req.body.credit.credit_reason,
        hasCredit :  req.body.credit.hasCredit,
        credit_amount : req.body.credit.credit_amount
      },
     
      job:{
        has_job: req.body.job.has_job,
        job_type:  req.body.job.job_type,
        salary:req.body.job.salary ,
        job_sector :  req.body.job.job_sector,
        jobless_years : req.body.job.jobless_years
        
      },
      
      marital_status :{
          status: req.body.marital_status.status,
          children_number: req.body.marital_status.children_number
      },
      
      
      material_owns : {
        owns_car :  req.body.material_owns.owns_car,
        owns_house :  req.body.material_owns.owns_house,
        tenant_house :  req.body.material_owns.tenant_house,
        tenant_amount:req.body.material_owns.tenant_amount
      }
  });
 User.getUserByEmail(newUser.email, function(err, foundUser){
  if(foundUser){
    res.json({success: false, msg:'Failed- User already exists!'});
  } else {
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:err});
      } 
      else {
          res.json({success: true, msg:'User registered'});
      }
    });
  }
 });

});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
 
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
 
        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
        });
      } else {
        console.log('Wrong password');
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


router.post('/', function(req, res, next) {
  var email =  req.body.email;
  User.findOne({'email':email},(function(err,user){
    if(err)
    res.send(err)
    if(user)
    res.send('Utilisateur déja existant');
    else{
      var user = User();

     
      console.log(user);
    
      user.save(function(err){
        if (err){
            res.send(err)
        }
        else{
          res.send('user added success');
        }
      });
    }
  }))
});

router.get('/login?:email',function(req,res,next){
  var email = res.email;
 User.findOne({'email':emai},(function(err,user){
if(err)
 res.send(err)
 if(user)
 {
   re
 }

 }));


});



router.get('/:user_id', function(req,res,next){
  var user_id = req.params.user_id;
  User.findOne({ _id: user_id}, (function(err, user){
      if(err)
      console.log(err);
      else{
          res.json({message:'success',user })
      }
  }))
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}



module.exports = router;