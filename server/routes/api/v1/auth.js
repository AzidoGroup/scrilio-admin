
const is = require('is_js');
const config = require('../../../config');
const Admin = new (require('../../../lib/admin'))(config.database.knex);
const adminRouteHelper = require('../../../lib/middleware/admin-router-middleware');

const ADMIN_URI = '/api/v1/auth';

module.exports = (router) => {

	/**
	 * [index description]
	 *
	 * @param  {Object}   request  Express Request object
	 * @param  {Object}   response Express Response object
	 *
	 * @return {[type]}          [description]
	 */
	function index(request, response) {

		if (is.not.existy(request.session.user) || is.empty(request.session.user)) {
			return response.redirect('/login');
		}

		return response.render('./admin/templates/main', {
			username: request.session.user.username
		});
	}

	/**
	 * [initializeSetup description]
	 *
	 * @param  {Object}   request  Express Request object
	 * @param  {Object}   response Express Response object
	 *
	 * @return {[type]}          [description]
	 */
	function initializeSetup(request, response) {
		return response.render('./admin/setup', {});
	}

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
		return response.redirect('/admin/login');
	}

	/**
	 * Logout!
	 *
	 * @param  {[type]} request  [description]
	 * @param  {[type]} response [description]
	 * @return {[type]}          [description]
	 */
	function other(request, response) {
		return response.json({message: 'yay!'});
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

	router.get(ADMIN_URI, adminRouteHelper.verifyAccessToken, index);
	router.post(`${ADMIN_URI}`, authenticate);
	router.post(`${ADMIN_URI}/check`, check);
	router.get(`${ADMIN_URI}/logout`, logout);
	router.get(`${ADMIN_URI}/other`, adminRouteHelper.verifyAccessToken, other);
	router.post(`${ADMIN_URI}/setup`, processSetup);

	return router;
};
