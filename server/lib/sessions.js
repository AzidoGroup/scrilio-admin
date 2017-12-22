
const is = require('is_js');
const session = require('express-session');
const uuid = require('uuid/v4');
const MySQLStore = require('express-mysql-session')(session);

/**
 * Session handler
 *
 * @param  {Object} config Configuration object
 *
 * @class
 */
function Sessions(config) {
	config = config || require('../config');

	if (is.not.existy(config) || is.empty(config) || is.array(config) || is.not.object(config)) {
		throw TypeError('`config` must be a valid object');
	}

	let options = {
		host: config.connection.host,
		port: config.connection.port,
		user: config.connection.user,
		password: config.connection.password,
		database: config.connection.database,
		checkExpirationInterval: 900000,
		expiration: 86400000, // The maximum age of a valid session; milliseconds.
		createDatabaseTable: true,
		schema: {
			tableName: `${config.prefix}admin_sessions`,
			columnNames: {
				session_id: 'sessionId', // eslint-disable-line camelcase
				expires: 'expires',
				data: 'data'
			}
		}
	};

	let mySQLStore = new MySQLStore(options);

	return {
		cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
		genid: () => {
			return uuid();
		},
		name: 'cfr-sess',
		resave: false,
		saveUninitialized: true,
		secret: 'keyboard kat',
		store: mySQLStore
	};
}

module.exports = Sessions;
