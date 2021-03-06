var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Product = require('../models/product');
var app = express();

router.get('/', function (req, res) {

	// console.log(req.headers.authorization);
    Product.find(function (err, docs) {
        var productChunks = [];
        productChunks = docs;
        res.json({ success: true, products: productChunks });
    });
});

module.exports = router;

