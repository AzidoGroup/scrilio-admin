'use strict';

const config = require('../../../config');
const Admin = new (require('../../../lib/admin'))(config.database.knex);

const URL = '/api/v1/setup';

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

		return Admin.setupInitialized()
			.then(boolean => {
				if (boolean) {
					// admin user already exists...
					return response.status(500).json({error: 'setup already initialized'});
				}
				return Admin.insertAdminUser(raw)
					.then(() => {
						return Admin.authenticate(raw)
							.then(res => {
								return response.json(res);
							});
					})
					.catch(err => {
						return response.status(500).json({error: err.message});
					});
			})
			.catch(err => {
				return response.status(500).json({error: err.message});
			});
	}

	function setupInitialized(request, response) {
		return Admin.setupInitialized()
			.then(boolean => {
				return response.json(boolean);
			})
			.catch(err => {
				return response.status(500).json({error: err.message});
			});
	}

	router.get(`${URL}/`, setupInitialized);
	router.post(`${URL}/`, processSetup);

	return router;
};
