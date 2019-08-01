var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Loggedinuser = require('../models/loggedinuser');

var multer = require('multer');
var path = require('path');

var app = express();

app.set('superSecret', 'config.secret'); // secret variable


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))  
    }
});
// var upload = multer({ dest: 'uploads/' }).single('profile');
var upload = multer({ storage: storage }).single('profile');


router.post('/register1', upload,function (req, res, next) {
    // console.log(req.headers['x-token']);

    if(req.headers['x-token']){
        function initPromise() {

            return new Promise(function(res,rej) {
                

                // var ret to remove public/ from the file path
                var ret = req.file.path;
                console.log("ret"+ret);
                // req.headers.host will give the host eg: localhost:3000
                var fileFullPath = req.protocol+'://' + req.headers.host + '/' + ret;

                res(fileFullPath);
            })
        }
        
        return initPromise().then(result => {
            
            var value ;
            console.log("hello-1");    
            return User.findOne({email: req.body.email}).then(obj => {
                return {res: result, obj: obj};
            }).catch(e => {
                console.log(e);
                throw new Error("ERROR")
            })

        }).then(function(result) {

            console.log(result);
            
            if(result.obj != null){

                // console.log(obj.value);
                return res.json({"message":"failure","email":req.body.email});
            }else{
                
                var user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    image_url: result.res,
                    role: 0
                });
                
                user.save(function(err) {
                    
                    if(err){
                       console.log(err);
                       return res.json({"message":"error"});      
                    }
                    console.log("success");
                    res.json({"message":"success","email":req.body.email});
                });
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }else{
        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});


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
                    
                    if (user.password != req.body.password) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    } 
                    else {

                        // if user is found and password is right
                        // create a token with only our given payload
                        // we don't want to pass in the entire user since that has the password

                        const payload = {
                          admin: 'user.admin' 
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
                                        email: req.body.email,
                                        role: user.role
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
                                    email: req.body.email,
                                    role: user.role
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
    
    console.log(req.body);
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
                    console.log("success");
                    res.json({"message":"success","email":req.body.email});
                });
            }
        });     
});


router.post('/reset-password', function(req,res){

    var query = { email: req.body.email };
    User.findOneAndUpdate(query,{ password:req.body.password },
        function(err){
            if(err){
               console.log(err);
               return res.json({"message":"error"});      
            }
            res.json({
                message: "success",
                success: 'password updated!'
            });     
        });
});

router.get('/all-users', function(req, res) {

    if(req.headers['x-token']){
        User.find(function (err, docs) {
            var userChunks = [];
            
            // var chunkSize = 3;
            // for (var i = 0; i < docs.length; i += chunkSize) {
            //     productChunks.push(docs.slice(i, i + chunkSize));
            // }
            userChunks = docs;
            res.json({ success: true, users: userChunks });
        });
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

router.get('/all-loggedin', function(req, res) {

    if(req.headers['x-token']){
        Loggedinuser.find(function (err, docs) {
            var userChunks = [];
            userChunks = docs;
            res.json({ success: true, users: userChunks });
        });
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

router.delete('/delete-loggedin/:id', function(req, res) {
    console.log(req.params.id);
    if(req.headers['x-token']){

        Loggedinuser.findByIdAndRemove(req.params.id, (err, data) => {
            // As always, handle any potential errors:
            if (err){
                return res.json({"Status":"failure","Error": err});
            }else{
                console.log(data);
                return res.json({"Status":"Success","message":data.email+"deleted Successfully"});
            }
        });
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

router.delete('/delete-user/:id', function(req, res) {
    console.log(req.params.id);
    if(req.headers['x-token']){
        
        User.findByIdAndRemove(req.params.id, (err, data) => {
            // As always, handle any potential errors:
            if (err){
                return res.json({"Status":"failure","Error": err});
            }else{
                console.log(data);
                return res.json({"Status":"Success", "message": data.email+" deleted Successfully"});
            }
        });
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

router.put('/update-loggedin', function(req, res) {
    // console.log(req.params.id);
    console.log(req.body);
    if(req.headers['x-token']){
        return res.json({"Status":"Success","message":"Testing update loggedin api"});
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

router.put('/update-user', function(req, res) {
    console.log(req.body);
    if(req.headers['x-token']){
        
        return res.json({"Status":"Success","message":"Testing update user api"});
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});


module.exports = router;