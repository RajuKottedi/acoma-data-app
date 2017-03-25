var express = require('express');
var mysql = require('mysql');

var DB_CONNECT_ERR = { "status": 500, "status": "Error connecting to database." };
var NOT_FOUND = { "status": 404, "statusText": "Resource not found." };
var BAD_REQUEST = { "status": 400, "statusText": "The client created  bad request." };

//using pool instead of connect to allow multiple threads
var pool = mysql.createPool({
	connectionLimit: 100, //important - no crashy
	host     : 'localhost',
	user     : 'root', //I use root because I suck
	password : 'x273vrZZ!',
	database : 'db_cibola',
	debug    :  false
});

function handleDatabase (req, res) {

	pool.getConnection(function (err, connection) {

		//if errors out on connection, return 
		if (err) {
			res.json(DB_CONNECT_ERR);
			return;
		}

		console.log("Connected as ID " + connection.threadId);

		connection.on('error', function (err) {
			res.json(DB_CONNECT_ERR);
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

//GET all finds - Dashboard view
apiRouter.get('/finds', function (req, res) {

	pool.getConnection(function (err, connection) {

		//if errors out on connection, return 
		if (err) {
			res.status(500).json(DB_CONNECT_ERR);
			return;
		}

		connection.query("select * from vw_dashboard_finds", function (err, rows) {

			connection.release();
			
			if (err) {
				res.status(500).json(DB_CONNECT_ERR);
				return;
			}

			return res.status(200).json(rows);

		});

		connection.on('error', function (err) {
			res.json(DB_CONNECT_ERR);
			return;
		});

	});
});

apiRouter.post('/finds', function (req, res) {
	
	//SET to be insert into DB
	var find = {
		find_id: req.body.find_id || null,
		SID: req.body.SID || null,
		date_collected: req.body.date_collected
	};

	//if not all the required params exist, throw error
	if (!find.find_id || !find.SID) {
		return res.status(400).json(BAD_REQUEST);
	}

	pool.getConnection(function (err, connection) {

		if (err) {
			res.json(DB_CONNECT_ERR);
			return;
		}

		connection.query("INSERT INTO tbl_finds SET ?", find, function (err, rows) {
			
			connection.release();

			return res.status(200).json(rows);

		});

		connection.on('error', function (err) {
			res.json(DB_CONNECT_ERR);
			return;
		});

	});

});

//UPDATE existing record
//apiRouter.route('/finds/id/:find_id');

module.exports = apiRouter;