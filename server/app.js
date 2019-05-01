var express = require('express');
var cors = require('cors');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const http = require('http');
// var taskRoutes = require('./routes/task.js');
var apiRoutes = require('./routes/index.js');
var auth0Settings = require('./auth0.json');

mongoose.connect('mongodb://vaibhsa:123456@ds125183.mlab.com:25183/sample');
app.use(cors());  

// var jwtCheck= jwt({ 
// 	secret: auth0Settings.secret
// 	// secret: new Buffer(auth0Settings.secret, 'base64'),
// 	// audience: auth0Settings.audience 
// });

app.use(express.static(__dirname+'/dist'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/',taskRoutes);
app.use('/api',apiRoutes);

app.use('/', expressJWT({
  secret : auth0Settings.secret,
}).unless({
    path:[
      '/',
      '/api',
    ]}
));

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`API running on localhost:${port}`));
app.get('/*',function(req,res){
	res.sendFile(path.join(__dirname+'/dist/index.html'));
})
// app.listen(3000, function () {
//   console.log('Backend listening on port 3000!');
// });

module.exports = app;