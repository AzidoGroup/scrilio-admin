'use strict';

const express = require('express');

module.exports = (app) => {

	app.all('*', (req, res, next) => {
		console.log(req.method, req.url);
		return next();
	});

	let v1 = express.Router();

	require('./api/v1')(v1);

	app.use(v1);

	return app;
};
