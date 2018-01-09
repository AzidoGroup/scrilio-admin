'use strict';

const config = require('../../../config');
const Admin = new (require('../../../lib/admin'))(config.database.knex);
const is = require('is_js');
const URI = '/api/v1/users';

module.exports = (router) => {

	function fetch(request, response) {
		Admin.fetch()
			.then(res => {
				return response.json(res);
			})
			.catch(err => {
				console.error(err);
				return response.status(500).json({error: err.message});
			});
	}

	function byId(request, response) {
		let id = request.params.id;

		Admin.byId(id)
			.then(res => {
				if (is.empty(res)) {
					return response.status(404).json({error: 'not found'});
				}
				return response.json(res);
			})
			.catch(err => {
				console.error(err);
				return response.status(500).json({error: err.message});
			});
	}

	router.get(`${URI}`, fetch);
	// router.post(`${URI}/:id`, update);
	router.get(`${URI}/:id`, byId);

	return router;
};
