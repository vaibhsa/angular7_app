var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Product = require('../models/product');
var app = express();

app.set('superSecret', 'config.secret');

router.post('/', function (req, res) {

	var product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imagePath: req.body.imagePath
    });

	

	var token = req.headers.authorization;

	if (token.startsWith('Bearer ')) {
	    // Remove Bearer from string
	    token = token.slice(7, token.length).trimLeft();
  	}
  	console.log(token);
  	var secrectText ='';
  	var errorRes = '';
  	// try{
  		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
		  if (err) {
		  	errorRes = err.name;
		  }else{ // Manage different errors here (Expired, untrusted...)
    	  	secrectText = decoded.admin; // If no 
    	  }	
		  // decoded undefined
		});

	    // var decoded = jwt.verify(token, app.get('superSecret'));
	    // console.log(decoded.exp);
	    // secrectText = decoded.admin;
	// }catch(err){
 //     	console.log(err);
 //  		//res.json({"status":"failure","message":"You should be an admin to complete this action"
	// 	// });
	// }

	console.log('hello '+secrectText);
	if(secrectText == 'user.admin'){
		Product.findOne({title: req.body.title}).then(function(result){
			// console.log(result);
			if(result ==null){
		
			    product.save(function(err) {
			        if(err){
			           console.log(err);
			           return res.json({"message":"error"});      
			        }
			        console.log("success");
			        res.json({"message":"success","product": req.body.title});
			    });	
			}else{
				res.json({"status":"failure","message":"Product with specified title already exist.",
					"product": req.body.title});
			}
		});
	}else{
		if(errorRes == 'TokenExpiredError'){
			res.json({
				"status":"failure", "message":"Token expired login again as admin to complete this action"
			});
		} else{
			res.json({"status":"failure","message":"You should be an admin to complete this action"
			});
		}
	}	

    
});

module.exports = router;



     

 		