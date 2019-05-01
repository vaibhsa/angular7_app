var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Loggedinuser = require('../models/loggedinuser');
var app = express();
app.set('superSecret', 'config.secret'); // secret variable

router.get('/settoken', function(req, res) {

  // create a sample user
  console.log("inside settoken()"); 
  var nick = new Loggedinuser({ 
    email: 'email@email.com', 
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE5MjA3NDA3LCJleHAiOjE1MTkyOTM4MDd9.ugRo6pHuUG5oiSZo0U7EwnEyk4CXsLUZRdIGGMU69wk'
  });
  // save the sample user
  nick.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.post('/login', function(req, res) {

  // Using promise to keep the synchronization between function calls.  
 //  https://stackoverflow.com/questions/38884522/promise-pending.
   
    Loggedinuser.findOne({email: req.body.email })
        .then(function(value) {
            
            // return value.email;
            var uemailT = "";
            if(value){
                uemailT = value.email;
            }       
            User.findOne({
                email: req.body.email
              }, function(err, user) {
            
                if (err) throw err;

                if (!user) {
                  res.json({ success: false, message: 'Authentication failed. User not found.' });
                } 
                else if (user) {

                    // console.log(unameT); //able to get the value here
                   // check if password matches
                    if (user.password != req.body.password) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } 
                    else {

                        // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password

                        const payload = {
                          admin: user.admin 
                        };
                        var token = jwt.sign(payload, app.get('superSecret'), {
                            // expiresInMinutes: 1440 // expires in 24 hours
                            expiresIn : 60*60*24
                        });

                        if(uemailT){

                            var query = { email: req.body.email };
                            Loggedinuser.findOneAndUpdate(query,{ token:token },
                                function(err){
                                    res.json({
                                        success: true,
                                        message: 'token updated!',
                                        token: token,
                                        email: req.body.email
                                    });     
                                });
                            // return the information including token as JSON
                            
                        }else{
                            var tokenI = new Loggedinuser({
                                email: req.body.email,
                                token: token
                            });
                            tokenI.save(function(err) {
                                if (err) throw err;
                                console.log('token saved successfully');
                                res.json({ 
                                    success: true,
                                    message: 'Token Inserted!',
                                    token: token,
                                    email: req.body.email
                                });
                            });
                        }
                    }   
                }
              });
        }).catch((err) => {
            console.log(err.message);
        });
// console.log(unameT); if we declare global variable here we will get the output as undefined.
});

router.post('/logout', function(req, res) {
    
    console.log(req.body.email);
    Loggedinuser.remove({ email: req.body.email }, function (err) {
        if (err) return handleError(err);
        // removed!
        res.json({"message":"success"});
        // res.json({"message":"success","username":req.body.email});
    });
    
});

router.post('/registration',function(req,res,next){

    User.findOne({email: req.body.email })
        .then(function(value) {

            if(value){
                return res.json({"message":"failure","email":req.body.email});
            }else{
                var user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                });
                user.save(function(err) {
                    if(err){
                       console.log(err);
                       return res.json({"message":"error"});      
                    }
                    res.json({"message":"success","email":req.body.email});
                });
            }
        });     
});

module.exports = router;