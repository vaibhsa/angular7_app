var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Product = require('../models/product');
var app = express();

app.set('superSecret', 'config.secret');

router.post('/', function (req, res) {

	console.log(req.body.typeProduct);
	var product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imagePath: req.body.imagePath,
        typeProduct: req.body.typeProduct,
        tags: req.body.typeTag
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

router.delete('/delete-product/:id', function(req, res) {
    console.log(req.params.id);
    if(req.headers['x-token']){
		Product.findByIdAndRemove(req.params.id, (err, data) => {
		    // As always, handle any potential errors:
		    if (err){
		    	return res.json({"Status":"failure","Error": err});
		    }else{
		    	console.log(data);
		    	return res.json({"Status":"Success","message":data.title+"deleted Successfully"});
			}
		});
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

router.put('/update-product', function(req, res) {

	console.log(req.body);
	console.log(req.headers);
    
    if(req.headers['x-token']){

        return res.json({"Status":"Success","message":"Testing update product api"});
    }else{

        return res.json({"Status":"failure","message":"You can't run api from browser directly"});
    }
});

module.exports = router;



     

 		