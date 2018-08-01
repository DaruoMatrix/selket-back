var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./app/config/database');
var indexRouter = require('./routes/index');
var bankRouter = require('./routes/bank');
var userRouter = require('./routes/users');
var auth = require('./routes/auth');


var mongoose = require('mongoose');
var app = express();
var passport = require("passport");
var session = require('express-session');

const cors = require('cors');
// CORS Middleware
app.use(cors());
//jwt config
require('./app/config/passport')(passport);

 //database connection
 mongoose.connect(config.database);
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/banks', bankRouter);
app.use('/auth', auth);








module.exports = app;
