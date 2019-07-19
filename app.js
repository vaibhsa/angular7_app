var express = require('express');
var jwt = require('express-jwt');
var cors = require('cors');
var app = express();
var logger = require('morgan');
// var bodyParser = require('body-parser');
// var quotes = require('./server/quotes.json');
var mongoose = require('mongoose');
var path = require('path');
const http = require('http');
// var taskRoutes = require('./server/routes/task.js');

var apiRoutes = require('./server/routes/index.js');

var productRoutes = require('./server/routes/product_detail.js');

var productAddRoutes = require('./server/routes/products_add.js');

var auth0Settings = require('./server/auth0.json');

mongoose.connect('mongodb://vaibhsa:123456@ds125183.mlab.com:25183/sample');
app.use(cors());

var jwtCheck= jwt({ 
	secret: auth0Settings.secret
	// secret: new Buffer(auth0Settings.secret, 'base64'),
	// audience: auth0Settings.audience 
});

// app.use(express.static(__dirname+'/dist/angular7-node/'));

app.use(express.static(path.join(__dirname+'/dist/angular7-node')));

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// app.use('/api',jwtCheck);
app.use('/api',apiRoutes);

app.use('/api/product', productRoutes);

app.use('/api/productadd', productAddRoutes);

// to display the image.
app.use('/public/uploads', express.static('./public/uploads'));



const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

app.set('view engine', 'html');
//   api.set('views', distPath);

/**
 * Listen on provided port, on all network interfaces.
 */

app.get('/*',function(req,res){

	res.sendFile(path.join(__dirname+'/dist/angular7-node/index.html'));
});

server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;




