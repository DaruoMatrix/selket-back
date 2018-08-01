var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
  
});

router.get('/error', function(req, res, next) {
  res.render('error', { message: 'errorrrrrrr' });
  
});
router.get('/test', function(req, res, next) {
  console.log('test');  
  res.send('test');
  
});
module.exports = router;
