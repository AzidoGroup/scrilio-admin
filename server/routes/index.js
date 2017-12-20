
const express = require('express');

module.exports = (app) => {

	let v1 = express.Router();

	require('./api/v1')(v1);

	app.use(v1);

	return app;
};
