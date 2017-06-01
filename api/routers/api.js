'use strict';

//Required libraries
var express = require('express');
var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development'; //for prod, this needs set as env variable
var config = require('../config/config')[env];

//Generic errors
var DB_CONNECT_ERR = { "status": 500, "statusText": "Error connecting to database." };
var BAD_REQUEST = { "status": 400, "statusText": "The client created  bad request." };
var NOT_FOUND = { "status": 404, "statusText": "Resource not found." };

//Using pool instead of connect to allow multiple threads
//this defines the DB connection
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

//This is the call that adds a new find row to the DB
apiRouter.post('/finds', function (req, res) {

	/*
	 * This is the data to be posted into the DB.
	 * The property name must match the field in the database.
	 * The value must be in this format: req.body[question ID]
	 * The question ID is defined in the question configuration JSON.
	 */
	var find = {
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
		"IndWidth 1": req.body.widthInd1,
		"IndWidth 2": req.body.widthInd2,
		"IndWidth 3": req.body.widthInd3,

		"Depth AVG": req.body.depthIdnAvg,
		"Depth 1": req.body.depthInd1,
		"Depth 2": req.body.depthInd2,
		"Depth 3": req.body.depthInd3,

		"Coils AVG": req.body.coilWidthAvg,
		"Coils 1": req.body.coilWidth1,
		"Coils 2": req.body.coilWidth2,
		"Coils 3": req.body.coilWidth3,

		"IndPer Ct": req.body.indPerCt,
		"IndPer Calc": req.body.indPerCt ? req.body.indPerCt / 9 : null,
		"Oblit P": req.body.propOblCoils,
		"Dist to coils": req.body.distCoils,
		"Rim Form": req.body.rimForm,
		"Coil Direc": req.body.dirCoils,
		"Notes": req.body.other,
		"dateCollected": req.body.dateCollected,
		"Portion": req.body.vesselPortion,
		"Rim Rad": req.body.rimRadius
	};

	/* 
	 * If not all the required params exist, throw error
	 * To add more required params, add another condition
	 */

	if (!find.Site) {
		return res.status(400).json(BAD_REQUEST);
	}

	pool.getConnection(function (err, connection) {

		if (err) {
			res.status(500).json(DB_CONNECT_ERR);
			return;
		}

		/*
		 * This takes the formatted JSON post (find) and uses the mysql package to parse this
		 * into something the database can read. The "?" is replaced with the POST object.
		 */
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

module.exports = apiRouter;
