'use strict';

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const is = require('is_js');
const knex = require('knex');
const helper = require('./helpers/admin-helper');

// cache the database connector
let conn;
let table;

/**
 * Admin lib clas
 *
 * @param  {Object} config configuration object
 *
 * @class
 */
class Admin {

	/**
	 * [constructor description]
	 *
	 * @param  {[type]} config [description]
	 *
	 * @return {[type]}        [description]
	 */
	constructor(config) {
		if (is.not.existy(conn) || is.empty(conn)) {
			table = `${config.prefix}admin_users`;
			conn = knex(config);
		}

		return this;
	}

	/**
	 * Attempts to insert an admin user
	 *
	 * TODO make sure to add some sort of access token so this can only happen once
	 *
	 * @param  {Object} raw [description]
	 *
	 * @return {Promise} Resolves to a user object
	 */
	insertAdminUser(raw) {

		let validated = helper.validateAdminUser(raw);

		if (is.error(validated.error)) {
			return Promise.reject(validated.error);
		}

		let pass = validated.value.password;
		let user = validated.value.username;
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(pass, salt);
		let token = crypto.randomBytes(126).toString('hex');

		let record = {
			username: user,
			password: hash,
			salt,
			token
		};

		return conn(table).insert(record);
	}

	/**
	 * Attempts to authenticate an admin user
	 *
	 * @param  {Object} raw A raw object likely from a request
	 *
	 * @return {Promise} Resolves to admin user object
	 */
	authenticate(raw) {
		if (is.not.existy(raw) || is.empty(raw) || is.array(raw) || is.not.object(raw)) {
			return Promise.reject(new TypeError('`raw` must be a valid object'));
		}
		let lastLogin = new Date();
		let match = false;
		let token;
		let user;
		return conn(table).select('id', 'username', 'password') .where({username: raw.username}).limit(1)
			.then(record => {
				if (is.not.existy(record) || is.empty(record)) {
					throw new Error('no user found');
				}
				user = record[0];
				return helper.comparePassword(raw.password, user.password);
			})
			.then(results => {
				token = results.token;
				match = results.match;
				let update = { token, lastLogin };
				let query = { id: user.id };
				return conn(table).update(update).where(query);
			})
			.then(() => {
				return { token, match, username: user.username};
			});
	}

	/**
	 * [validateToken description]
	 *
	 * @param  {[type]} username [description]
	 * @param  {[type]} token    [description]
	 *
	 * @return {Promise}          [description]
	 */
	validateToken(username, token) {

		if (is.not.existy(username) || is.empty(username) || is.not.string(username)) {
			return Promise.reject(new TypeError('`username` must be a valid string'));
		}

		if (is.not.existy(token) || is.empty(token) || is.not.string(token)) {
			return Promise.reject(new TypeError('`username` must be a valid string'));
		}

		return conn(table).where({username, token}).limit(1)
			.then(record => {
				if (is.not.existy(record) || is.empty(record)) {
					return false;
				}
				return true;
			})
			.catch(err => {
				throw err;
			});
	}
}

module.exports = Admin;
