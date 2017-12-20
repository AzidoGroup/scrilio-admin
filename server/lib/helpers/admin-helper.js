
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * [comparePassword description]
 *
 * @param  {[type]} rawPassword    [description]
 * @param  {[type]} storedPassword [description]
 *
 * @return {[type]}                [description]
 */
function comparePassword(rawPassword, storedPassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(rawPassword, storedPassword, (err, match) => {
			if (err) {
				return reject(err);
			}
			let token = crypto.randomBytes(126).toString('hex');
			return resolve({match, token});
		});
	});
}
/**
 * [validateAdminUser description]
 *
 * @param  {[type]} raw [description]
 *
 * @return {[type]}     [description]
 */
function validateAdminUser(raw) {
	let schema = Joi.object({
		username: Joi.string().alphanum().max(128).required(),
		password: Joi.string().max(128).required()
	}).required().options({
		allowUnknown: true,
		stripUnknown: false
	});

	return schema.validate(raw);
}

module.exports = {
	comparePassword,
	validateAdminUser
};
