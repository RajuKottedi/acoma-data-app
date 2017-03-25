var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 100, //important
	host     : 'localhost',
	user     : 'root',
	password : 'x273vrZZ!',
	database : 'db_cibola',
	debug    :  false
});


function handleDatabase (req, res) {

	pool.getConnection(function (err, connection) {

		//if errors out on connection, return 
		if (err) {
			res.json({ "code": 500, "status": "Error in database connection." });
			return;
		}

		console.log("Connected as ID " + connection.threadId);

		connection.query("select * from tbl_test", function (err, rows) {

			connection.release();

			if (!err) {
				res.json(rows);
			}

		});

		connection.on('error', function (err) {
			res.json({ "code": 500, "status": "Error in database connection" });
			return;
		})
	});

}

//create api router
var apiRouter = express.Router();

//REST API for the app
//for pinging
apiRouter.get('/', function(req, res) {
	res.json({message : 'API is up and running'});
});

// //users REST API
// apiRouter.get('/users',function(req, res) {
// 	 	User.find(function(err, users) {
// 			if (err) return res.status(500).send(err);
// 			return res.status(200).json(users);
// 		});
// 	 });

// apiRouter.route('/users/id/:user_id')
//          .get(function(req, res) {
// 	 	User.findById(req.params.user_id, function(err, user) {
// 			if (err) return res.status(500).send(err);
// 			return res.status(200).json(user);
// 		});
// 	 });

module.exports = apiRouter;