/*
 * This is a template of the config file. To  make this work on your machine,
 * remove suffix from the filename to just be config.js
 * The reason for this is to prevent accidentally pushing your database information if it's hardcoded, and also to make
 * sure you set up your own conf.
 */

//Some values in here should not be hardcoded eventually.
var config = {

	//local - need to match dev's env
	development: {
		database: {
			host: 'localhost',
			database: '<db_name>',
			user: 'root',
			password: 'password',
			debug: true
		},
		server: {
			host: 'localhost',
			port: '8080'
		}
	},

	//where this app lives eventually...
	//Only use this if you've set an environment variable (process.env.NODE_ENV)
	production: {
		database: {
			host: '',
			port: '',
			db: '',
			user: '',
			debug: false
		},
		server: {
			host: '',
			port: '8080' //this will be used when you deploy the node app - this is the port it runs locally on
		}
	}
};

module.exports = config;