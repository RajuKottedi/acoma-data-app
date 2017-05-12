//This is a template of the config file. To  make this work on your machine, remove -tmp from the filename.
//The reason for this is to prevent accidentally pushing your database information if it's hardcoded, and also to make
//sure you set up your own conf.

//Some values in here should not be hardcoded eventually.
var config = {

	//local - need to match dev's env
	development: {
		database: {
			host: 'localhost',
			database: 'db_cibola',
			user: 'root',
			password: 'x273vrZZ!',
			debug: true
		},
		server: {
			host: '127.0.0.1',
			port: '8081'
		}
	},

	//where this app lives eventually...
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
			port: ''
		}
	}
};

module.exports = config;