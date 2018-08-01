

var express = require('express');
var router = express.Router();
var Bank = require('../app/models/bank')
/* GET banks listing. */
router.get('/', function(req, res, next) {

    Bank.find({}, function (err, banks) {
  
      if (err){
        res.send(err)
      }
    else{
      res.send(banks);
    }
  });
   
  });

router.post('/', function(req, res, next) {
        var bank = Bank();

        bank.name= req.body.name;
        bank.number_agencies= req.body.number_agencies;
        bank.email= req.body.email;
        bank.save();
    res.send('bank added success');
  });

router.get('/:bank_id', function(req,res,next){
    var bank_id = req.params.bank_id;
    Bank.find({_id: bank_id}, (function(err, bank){
        if(err)
        throw err;
        else{
            res.send({message:'success',bank })
        }
    }))
})
   
 
module.exports = router;