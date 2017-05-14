'use strict';

var express = require('express');
var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development'; //for prod, this needs set as env variable
var config = require('../config/config')[env];

//Error handling
var DB_CONNECT_ERR = { "status": 500, "statusText": "Error connecting to database." };
var BAD_REQUEST = { "status": 400, "statusText": "The client created  bad request." };
//var NOT_FOUND = { "status": 404, "statusText": "Resource not found." };

//using pool instead of connect to allow multiple threads
var pool = mysql.createPool({
	connectionLimit: 100, //important - no crashy
	host     : config.database.host,
	user     : config.database.user,
	password : config.database.password,
	database : config.database.database,
	debug    : config.database.debug
});

function handleDatabase (req, res) {

	pool.getConnection(function (err, connection) {

		//if errors out on connection, return 
		if (err) {
			res.status(500).json(DB_CONNECT_ERR);
			return;
		}

		connection.on('error', function () {
			res.status(500).json(DB_CONNECT_ERR);
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

		connection.on('error', function () {
			res.json(DB_CONNECT_ERR);
			return;
		});

	});
});

apiRouter.post('/finds', function (req, res) {

	//SET to be insert into DB
	//This is formatting into database accepted field names
	// var convertJsDateToSqlDate = function (d) {
	// 	console.log('and the date is...', d)
	// 	return new Date(d).toISOString().slice(0, 19).replace('T', ' ');
	// };

	var find = {

		//identifying info
		"Site": req.body.SID,
		"Clay": req.body.clay,
		"Type": req.body.type,
		"Indt Type": req.body.typeIndent,
		"Direc": req.body.dirIndent,
		"Indt Algn": req.body.indentAlign,
		"Elab": req.body.elab,
		"Form": req.body.rimForm,
		"Smg": req.body.smudging,
		"Int Surf": req.body.intSurf,
		"Soot": req.body.sooting,
		"Thick": req.body.thickness,
		"IndWidth AVG": req.body.widthIdnAvg,
		"Depth AVG": req.body.depthIdnAvg,
		"Coils AVG": req.body.coilWidthAvg,
		"IndPer Ct": req.body.indPerCt,
		"Oblit P": req.body.propOblCoils,
		"Dist to coils": req.body.distCoils,
		"Rim Form": req.body.rimForm,
		"Coil Direc": req.body.dirCoils,
		"Notes": req.body.other,
		"dateCollected": req.body.dateCollected
	};

	//if not all the required params exist, throw error
	if (!find.Site) {
		return res.status(400).json(BAD_REQUEST);
	}

	pool.getConnection(function (err, connection) {

		if (err) {
			res.status(500).json(DB_CONNECT_ERR);
			return;
		}

		connection.query("INSERT INTO tbl_all_finds SET ?", find, function (err, rows) {
			
			connection.release();

			if (err && err.code) {
				return res.status(400).json(err);
			}

			return res.status(200).json(rows);

		});

		connection.on('error', function () {
			res.json(DB_CONNECT_ERR);
			return;
		});

	});

});

//UPDATE existing record
//apiRouter.route('/finds/id/:find_id');

module.exports = apiRouter;
