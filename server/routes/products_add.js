var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Product = require('../models/product');
var app = express();


router.post('/', function (req, res) {

	var product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imagePath: req.body.imagePath
    });

	Product.findOne({title: req.body.title}).then(function(result){

		console.log(result);
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


    
});

module.exports = router;



 				