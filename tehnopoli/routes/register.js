var express = require('express');
var router = express.Router();
var sha1 =require("sha1");

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  function isValidString(str) {
    return (typeof str === 'string' && str.length > 0);
  };
  const PASS_LENGHT = 8;
  
  function isValidPassword(pass) {
    return (typeof pass === 'string' && pass.length >= PASS_LENGHT)
  };
  
  function isValidPhoneNumber(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
  };

  router.post('/', function(req, res, next){
      // req.setHeader('Content-type', 'aplication/json');
      var userCollection = req.db.get('user');
      var newUser = req.body;
      console.log(userCollection)
      console.log(newUser)
      userCollection.insert(newUser, function(err, docs){
        if(err) throw err;
        res.status(200)
      });

      if(!(isValidPassword(newUser.email)) && !(isValidPassword(newUser.password)) 
          && !(isValidString(newUser.firstname)) && !(isValidString(newUser.lastname))){
          res.status(200);
          res.json({massages:"invalid data"});
      } else {
        userCollection.find({email:newUser.email}, {}, function(err, docs){
          if (err){
            res.status(500);
            res.json({err:err});
          }

          if(docs.length === 0) {
            newUser.password = sha1(newUser.password);
            userCollection.insert(newUser, function(err, docs){
              if(!err) throw err;
              res.status(200);
            });
          } else {
            res.status(500);
            res.json({err: err})
          }
        });
      }
    });
   

    module.exports = router;
