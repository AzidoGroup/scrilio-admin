
const is = require('is_js');
const config = require('../../../config');
const Admin = new (require('../../../lib/admin'))(config.database.knex);
const adminRouteHelper = require('../../../lib/middleware/admin-router-middleware');

const ADMIN_URI = '/admin';

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
			username: request.body.admin_username,
			password: request.body.admin_password
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
		// test for a GET request and handle accordingly
		if (request.method === 'GET') {
			// if (is.existy(request.session.user) && is.not.empty(request.session.user)) {
			// 	return response.redirect('/admin');
			// }
			// console.log('here');
			return response.render('./admin/templates/login', {
				data: {
					username: 'user1',
					food: 'pizza'
				}
			});
		}

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
					return response.redirect('/admin');
				}
				throw new Error('username and/or password does not match');
			})
			.catch(err => {
				return response.status(404).render('./admin/templates/login', {
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

	router.get(ADMIN_URI, adminRouteHelper.verifyAccessToken, index);
	router.get(`${ADMIN_URI}/login`, authenticate);
	router.post(`${ADMIN_URI}/login`, authenticate);
	router.get(`${ADMIN_URI}/logout`, logout);
	router.get(`${ADMIN_URI}/other`, adminRouteHelper.verifyAccessToken, other);
	router.get(`${ADMIN_URI}/setup`, initializeSetup);
	router.post(`${ADMIN_URI}/setup`, processSetup);

	return router;
};
