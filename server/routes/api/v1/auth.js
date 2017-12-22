'use strict';

const config = require('../../../config');
const Admin = new (require('../../../lib/admin'))(config.database.knex);

const ADMIN_URI = '/api/v1/auth';

module.exports = (router) => {

	/**
	 * [processSetup description]
	 *
	 * @param  {Object}   request  Express Request object
	 * @param  {Object}   response Express Response object
	 *
	 * @return {void}
	 */
	function processSetup(request, response) {
		let raw = {
			username: request.body.username,
			password: request.body.password
		};

		return Admin.insertAdminUser(raw)
			.then(res => {
				return response.json(res);
			})
			.catch(err => {
				return response.status(500).json({error: err.message});
			});
	}

	/**
	 * authenticates the admin user
	 *
	 * @param  {Object}   request  Express Request object
	 * @param  {Object}   response Express Response object
	 *
	 * @return {void}
	 */
	function authenticate(request, response) {
		//
		let raw = {
			username: request.body.username,
			password: request.body.password
		};
		return Admin.authenticate(raw)
			.then(res => {
				console.log(res);
				if (res.match) {
					request.session.user = res;
					return response.json(res);
				}
				throw new Error('username and/or password does not match');
			})
			.catch(err => {
				return response.status(404).json({
					username: raw.username,
					error: {
						message: err.message
					}
				});
			});
	}

	/**
	 * Attempts to log out the user
	 *
	 * @param  {Object}   request  Express Request object
	 * @param  {Object}   response Express Response object
	 *
	 * @return {void}
	 */
	function logout(request, response) {
		request.session.destroy();
		return response.json();
	}

	function check(request, response) {
		let token = request.body.token;
		let username = request.session.user.username;

		Admin.validateToken(username, token)
			.then(res => {
				if (res === true) {
					return response.json({match: true});
				}
				return response.json({match: false});
			})
			.catch(err => {
				console.error(err);
				return response.status(500).json({error: err.message});
			});
	}

	router.post(`${ADMIN_URI}`, authenticate);
	router.post(`${ADMIN_URI}/check`, check);
	router.get(`${ADMIN_URI}/logout`, logout);
	router.post(`${ADMIN_URI}/setup`, processSetup);

	return router;
};
