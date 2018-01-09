/* global document */

import VueRouter from 'vue-router';
import Login from './components/login';
import Main from './components/main/Main.vue';
import Setup from './components/setup/Setup.vue';
import Sites from './components/sites';
import System from './components/system';

import Store from './store/index.js';

const routes = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/main',
		name: 'main',
		component: Main
	},
	Sites.routes.SiteList,
	Sites.routes.SiteItemEdit,
	Login.routes.LogIn,
	Login.routes.LogOut,
	System.routes.SystemUsersList,
	{
		path: '/setup',
		name: 'setup',
		component: Setup
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach(function (to, from, next) {
	document.title = to.meta.title || 'Scrilio Admin';
	let auth = to.matched.some(record => {
		return record.meta.auth;
	});

	if (auth) {
		return Store.store.dispatch('authentication/checkStatus', Store.store.getters['authentication/token'])
			.then(res => {
				if (res) {
					return next();
				}
				Store.store.dispatch('authentication/logout');
				return router.push('/log-in');
			});
	}

	return next();
});

export default router;
