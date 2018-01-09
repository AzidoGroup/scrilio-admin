'use strict';

module.exports = (router) => {
	// load up admin api
	require('./auth')(router);
	require('./setup')(router);
	require('./users')(router);
};
