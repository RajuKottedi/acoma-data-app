var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var env = process.env.NODE_ENV || 'development'; //for prod, this needs set as env variable
var config = require('./api/config/config')[env];
var port = process.env.PORT || config.server.port || 8080;

//import router for our public REST API
var apiRouter  = require('./api/routers/api')

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

//Log all request to console
app.use(morgan('dev'));

//handle application/json content type
app.use(bodyParser.json());

//route for the web view of the app
app.use(express.static(__dirname + '/public/'))

//set up api route
app.use('/api', apiRouter);

//start the server
app.listen(port);

console.log('Starting server at port ' + port);