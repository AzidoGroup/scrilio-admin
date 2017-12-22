import Joi from 'joi';

function validateUsername(raw) {
	// let schema = Joi.string().alphanum().max(128).required();
	// return schema.validate(raw);
}

module.exports = {
	validateUsername
};
