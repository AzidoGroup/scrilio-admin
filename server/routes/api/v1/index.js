
module.exports = (router) => {
	// load up admin api
	require('./auth')(router);
};