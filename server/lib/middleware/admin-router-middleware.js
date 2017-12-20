
const config = require('../../config');
const is = require('is_js');
const Admin = new (require('../admin'))(config.database.knex);

/**
 * Attempts to determine whether the user is an admin user and logged in
 *
 * @param  {Object}   request  Express Request object
 * @param  {Object}   response Express Response object
 * @param  {Function} next     Next function in middleware chain
 *
 * @return {void}
 */
function verifyAccessToken(request, response, next) {

	if (is.not.existy(request.session.user) || is.empty(request.session.user)) {
		return response.status(304).redirect('/');
	}

	if (is.not.existy(request.session.user.token) || is.empty(request.session.user.token)) {
		return response.status(304).redirect('/');
	}

	let token = request.session.user.token;
	let username = request.session.user.username;

	Admin.validateToken(username, token)
		.then(res => {
			if (res === true) {
				return next();
			}
			return response.status(304).redirect('/admin/login');
			// Promise.reject(new Error('`username` `token` mismatch'));
		})
		.catch(err => {
			console.error(err.message);
			return response.status(304).redirect('/');
		});
}

module.exports = {
	verifyAccessToken
};
