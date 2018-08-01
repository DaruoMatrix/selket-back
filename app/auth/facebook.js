


var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: "212670729526477",
    clientSecret: "0f6fc6ab059eddfa565341b38b9db71e",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields   : ['name ','email'],
},


function(accessToken, refreshToken, profile, done) {
  //check user table for anyone with a facebook ID of profile.id
  User.findOne({
      'facebook_id': profile.id 
  }, function(err, user) {
    
      if (err) {
          return done(err);
      }
      //No user was found... so create a new user with values from Facebook (all the profile. stuff)
      if (!user) {
          
          user = new User({
              facebook_id : profile.id,
              name: profile.displayName,
             // last_name: profile.name.givenName,
              email: profile.emails[0].value,
              provider: 'facebook',
              //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
              facebook: profile._json
          });
          console.log('User :',user);
          user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
          });
      } else {
          //found user. Return
          return done(err, user);
      }
  });
}


));

module.exports = passport;