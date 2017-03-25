var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 100, //important - no crashy
	host     : 'localhost',
	user     : '<user here>', //I use root because I suck
	password : '<password_here>',
	database : 'db_cibola',
	debug    :  false
});


function handleDatabase (req, res) {

	console.log('Trying to connect!');

	pool.getConnection(function (err, connection) {

		//if errors out on connection, return 
		if (err) {
			res.json({ "code": 500, "status": "Error in database connection." });
			return;
		}

		console.log("Connected as ID " + connection.threadId);

		connection.on('error', function (err) {
			res.json({ "code": 500, "status": "Error in database connection" });
			return;
		});

	});

}

//create api router
var apiRouter = express.Router();

//REST API for the app
//for pinging
apiRouter.get('/', function(req, res) {
	handleDatabase(req, res);
});

//Dashboard REST API
apiRouter.get('/finds', function (req, res) {

	pool.getConnection(function (err, connection) {

		//if errors out on connection, return 
		if (err) {
			res.json({ "code": 500, "status": "Error in database connection." });
			return;
		}

		connection.query("select * from vw_dashboard_finds", function (err, rows) {

			connection.release();
			
			if (err) {
				res.json({ "code": 500, "status": "Error in database connection." });
				return;
			}

			return res.status(200).json(rows);

		});

		connection.on('error', function (err) {
			res.json({ "code": 500, "status": "Error in database connection" });
			return;
		});


	});

});

module.exports = apiRouter;